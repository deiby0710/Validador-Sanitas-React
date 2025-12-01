export function mapMedicationDispenseResponse(apiResponse) {
    if (!Array.isArray(apiResponse) || apiResponse.length === 0) {
        return { error: "Respuesta vacía del servidor" };
    }

    const bundle = apiResponse[0];

    if (!bundle?.entry) {
        return { error: "Respuesta sin entradas (entry) del servidor" };
    }

    const firstResource = bundle.entry[0];
      // 👇 Captura OperationOutcome
    if (firstResource?.resourceType === "OperationOutcome") {
        const issue = firstResource.issue?.[0]; 
        const msg =
        issue?.details?.text ||
        issue?.details?.coding?.[0]?.display ||
        "Error desconocido en la autorización";
        throw new Error(msg);  // 👈 aquí lanzamos
    }

    // if (!bundle?.entry) return null;

    const patientEntry = bundle.entry.find(
        e => e.resource.resourceType === "Patient"
    );
    const medicationEntries = bundle.entry.filter(
        e => e.resource.resourceType === "MedicationDispense"
    );
    const prescriptionEntries = bundle.entry.filter(
        e => e.resource.resourceType === "MedicationRequest"
    );
    const locationEntries = bundle.entry.filter(
        e => e.resource.resourceType === "Location"
    );

    const patient = patientEntry
        ? {
            name: patientEntry.resource.name?.[0]?.text,
            identifiers: patientEntry.resource.identifier?.map(id => ({
                type: id.type?.coding?.[0]?.code,
                value: id.value,
            })),
        }
        : null;

    // 📦 SUPPORTING INFORMATION agrupado por system
    const supportingInfoBySystem = {};
    medicationEntries.forEach(med => {
        med.resource?.supportingInformation?.forEach(si => {
            const sys = si.identifier?.system;
            const val = si.identifier?.value;
            if (sys) supportingInfoBySystem[sys] = val;
        });
    });

    const medications = medicationEntries.map(m => {
        const med = m.resource;
        return {
            id: med.id,
            name:
                med.medication?.[0]?.medicationCodeableConcept?.code?.text ||
                "Medicamento sin nombre",
            code:
                med.medication?.[0]?.medicationCodeableConcept?.code?.coding?.[0]
                ?.code,
            status: med?.status,
            recorded: med.recorded || "",
            location: med.location?.display || "",
            prescription: med.authorizingPrescription?.display || "",

            // 🔥 CAMPOS NPBS
            cum: supportingInfoBySystem["MIPRES/CODIGO"] || "",
            diagnostico: supportingInfoBySystem["BH/CODIGO_DIAGNOSTICO"] || "",
            direccionamiento: supportingInfoBySystem["MIPRES/ID_DIRECCIONAMIENTO"] || "",
            nroPrescripcion: supportingInfoBySystem["MIPRES/NRO_PRESCRIPCION"] || "",
            codigoLegal: supportingInfoBySystem["BH/CODIGO_LEGAL"] || "",
            formaFarmaceutica:
                supportingInfoBySystem["MIPRES/COD_FORMA_FARAMCEUTICA"] || "",
        };
    });

    const prescriptions = prescriptionEntries.map(p => {
        const pr = p.resource;
        return {
            id: pr.identifier?.[0]?.value,
            date: pr.authoredOn,
            repeats: pr.dispenseRequest?.numberOfRepeatsAllowed,
            quantity: pr.dispenseRequest?.quantity?.value,
            duration:
                (pr.dispenseRequest?.expectedSupplyDuration?.value || "") +
                " " +
                (pr.dispenseRequest?.expectedSupplyDuration?.unit || ""),
        };
    });

    const locations = locationEntries.map(l => ({
        name: l.resource.name || "Sede sin nombre",
        city: l.resource.address?.city,
        postalCode: l.resource.address?.postalCode,
    }));

    // 🧑‍⚕️ PRESCRIPTOR REAL
    const firstMed = medicationEntries[0]?.resource;
    const prescriptorName = firstMed?.extension?.find(
        ex => ex.url === "sie000000063-medicationdispense-requesterName"
    )?.valueString;

    const prescriptorId = firstMed?.extension
        ?.find(ex => ex.url === "sie000000063-medicationdispense-requesterId")
        ?.valueIdentifier?.value;

    // 👇 retornamos un único objeto
    return {
        patient,
        medications,
        prescriptions,
        locations,
        supportingInfoBySystem,
        prescriptorName,
        prescriptorId,
        raw: bundle.entry,
    };
}
