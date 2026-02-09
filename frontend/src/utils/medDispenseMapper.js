export function mapMedicationDispenseResponse(apiResponse) {
    if (!Array.isArray(apiResponse) || apiResponse.length === 0) {
        return { error: "Respuesta vacía del servidor" };
    }

    const bundle = apiResponse[0];

    if (!Array.isArray(bundle?.entry)) {
        return { error: "Respuesta sin entry válido" };
    }

    // 🧠 entry ahora es un array de paquetes
    const packages = bundle.entry;

    // 🔴 Validar OperationOutcome (primer paquete)
    const firstPkg = packages[0];
    const firstResource = firstPkg?.[0]?.resource;

    if (firstResource?.resourceType === "OperationOutcome") {
        const issue = firstResource.issue?.[0];
        const msg =
            issue?.details?.text ||
            issue?.details?.coding?.[0]?.display ||
            "Error desconocido en la autorización";
        throw new Error(msg);
    }

    // ==============================
    // 🧑‍🦱 PACIENTE (igual para todos)
    // ==============================
    const patientEntry = firstPkg.find(
        e => e.resource?.resourceType === "Patient"
    )?.resource;

    const patient = patientEntry
        ? {
              name: patientEntry.name?.[0]?.text,
              identifiers: patientEntry.identifier?.map(id => ({
                  type: id.type?.coding?.[0]?.code,
                  value: id.value,
              })),
          }
        : null;

    // ==============================
    // 💊 MEDICAMENTOS (uno por paquete)
    // ==============================
    const medications = packages.map(pkg => {
        const medDispense = pkg.find(
            e => e.resource?.resourceType === "MedicationDispense"
        )?.resource;

        const prescription = pkg.find(
            e => e.resource?.resourceType === "MedicationRequest"
        )?.resource;

        const location = pkg.find(
            e => e.resource?.resourceType === "Location"
        )?.resource;

        // 📦 supportingInformation SOLO del medicamento
        const supportingInfoBySystem = {};
        medDispense?.supportingInformation?.forEach(si => {
            const sys = si.identifier?.system;
            const val = si.identifier?.value;
            if (sys) supportingInfoBySystem[sys] = val;
        });

        return {
            // === LO QUE YA CAPTURABAS ===
            id: medDispense?.id,
            name:
                medDispense?.medication?.[0]?.medicationCodeableConcept?.code
                    ?.text || "Medicamento sin nombre",
            code:
                medDispense?.medication?.[0]?.medicationCodeableConcept?.code
                    ?.coding?.[0]?.code,
            status: medDispense?.status || "",
            recorded: medDispense?.recorded || "",
            location: medDispense?.location?.display || "",
            prescription:
                medDispense?.authorizingPrescription?.display || "",

            // 🔥 CAMPOS NPBS (igual que antes)
            cum: supportingInfoBySystem["MIPRES/CODIGO"] || "",
            diagnostico:
                supportingInfoBySystem["BH/CODIGO_DIAGNOSTICO"] || "",
            direccionamiento:
                supportingInfoBySystem["MIPRES/ID_DIRECCIONAMIENTO"] || "",
            nroPrescripcion:
                supportingInfoBySystem["MIPRES/NRO_PRESCRIPCION"] || "",
            codigoLegal:
                supportingInfoBySystem["BH/CODIGO_LEGAL"] || "",
            formaFarmaceutica:
                supportingInfoBySystem["MIPRES/COD_FORMA_FARAMCEUTICA"] || "",

            // 📄 PRESCRIPCIÓN (como ya lo hacías)
            prescriptionInfo: prescription
                ? {
                      id: prescription.identifier?.[0]?.value,
                      date: prescription.authoredOn,
                      repeats:
                          prescription.dispenseRequest
                              ?.numberOfRepeatsAllowed,
                      quantity:
                          prescription.dispenseRequest?.quantity?.value,
                      duration:
                          (prescription.dispenseRequest
                              ?.expectedSupplyDuration?.value || "") +
                          " " +
                          (prescription.dispenseRequest
                              ?.expectedSupplyDuration?.unit || ""),
                  }
                : null,

            // 🏥 SEDE
            locationInfo: location
                ? {
                      name: location.name || "Sede sin nombre",
                      city: location.address?.city,
                      postalCode: location.address?.postalCode,
                  }
                : null,
        };
    });

    // ==============================
    // 🧑‍⚕️ PRESCRIPTOR (del primer medicamento)
    // ==============================
    const firstMedDispense = packages[0].find(
        e => e.resource?.resourceType === "MedicationDispense"
    )?.resource;

    const prescriptorName = firstMedDispense?.extension?.find(
        ex => ex.url === "sie000000063-medicationdispense-requesterName"
    )?.valueString;

    const prescriptorId = firstMedDispense?.extension
        ?.find(
            ex => ex.url === "sie000000063-medicationdispense-requesterId"
        )
        ?.valueIdentifier?.value;

    // ==============================
    // ✅ RESPUESTA FINAL
    // ==============================
    return {
        patient,
        medications,
        prescriptorName,
        prescriptorId,
        raw: bundle.entry,
    };
}