export const NoteConsultAuth = ({notas = []}) => {
    // const printedNotes = notas.filter(nota => nota.printed === true)
    const printedNotes = notas;

    if (printedNotes.length === 0) return null;
    return (
        <div className="border rounded mt-2 bg-light">
            <div className="d-flex justify-content-center align-items-center">
                <h5 className="mt-4 mx-5">Nota</h5>
            </div>

            <ul className="mx-4">
                {printedNotes.map((nota, index) => (
                    <li key={index}>
                        {nota.supportingInfo}
                    </li>
                ))}
            </ul>
        </div>
    )
}