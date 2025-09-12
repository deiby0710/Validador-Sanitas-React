export function mapMedicationDispenseResponse(apiResponse) {
    if (!Array.isArray(apiResponse) || apiResponse.length === 0) return null;

    const bundle = apiResponse[0]; // 👈 nos quedamos con el primer bundle
    if (!bundle?.entry) return null;

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
        quantity:
            med.dosageInstruction?.[1]?.doseAndRate?.[0]?.dose?.doseQuantity
            ?.value || 0,
        prescription: med.authorizingPrescription?.display,
        location: med.location?.display,
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

    // 👇 retornamos un único objeto
    return {
        patient,
        medications,
        prescriptions,
        locations,
    };
}
