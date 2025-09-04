export function sanitizeSanitasResponse(rawResponse) {
  return rawResponse
    // Elimina los corchetes y comillas dobles al principio y al final de toda la cadena
    .replace(/^"\[\s*/, '[')
    .replace(/\s*\]"$/, ']')
    // Elimina las comillas que rodean los números (caso durationUnit malformado)
    .replace(/"(durationUnit":\s*)"(\d+-\d+)"/g, '$1$2')
    // Convierte los arreglos de arreglos en arreglos de objetos
    .replace(/\[\s*\[\s*\{/g, '[ {')
    .replace(/}\]\s*\]/g, '} ]')
    // Elimina las comillas dobles que encierran todo
    .replace(/^"|"$/g, '')
    // Reemplaza las comillas internas escapadas
    .replace(/\\"/g, '"')
    // Vuelve a encerrar los durationUnit inválidos entre comillas
    .replace(/("durationUnit":\s*)(\d+-\d+)/g, '$1"$2"');
}