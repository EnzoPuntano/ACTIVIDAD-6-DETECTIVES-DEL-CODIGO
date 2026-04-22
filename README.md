CompareInsta - Generador de Contraseñas Seguras
Aplicación web que genera contraseñas seguras con opciones personalizables.
Proyecto desarrollado para la Actividad 6: Detectives del Código — Materia: Proyecto de Implementación de Sitios Web Dinámicos.
EEST N.º 1 "Eduardo Ader" — Vicente López — 7° año 2° — 2026.

<img width="1591" height="720" alt="image" src="https://github.com/user-attachments/assets/620dd53a-c1a3-41e5-978e-4609882d19f5" />

¿Qué es el Clean Code?
Es escribir código que sea fácil de leer y mantener por otros desarrolladores, no solo por la computadora.
¿Qué es la Refactorización?
Es reestructurar código existente sin cambiar lo que hace, para que sea más legible y profesional.

El código sucio del PDF (punto de partida)
<script>
    function g(l, s) {
    let c = "abc...123";
    if(s) c += "!@#";
    let p = "";
    for(let i=0; i<l; i++) {
        p += c.charAt(Math.floor(Math.random()*c.length));
    }
    return p;
}
</script>
<script>
    El código refactorizado (versión profesional)
/**
 * Genera una contraseña segura según los criterios seleccionados.
 *
 * @param {number}  length       - Longitud deseada.
 * @param {boolean} useUppercase - Si incluye mayúsculas.
 * @param {boolean} useNumbers   - Si incluye números.
 * @param {boolean} useSymbols   - Si incluye símbolos.
 * @returns {string} La contraseña generada.
 */
function generateSecurePassword(length, useUppercase, useNumbers, useSymbols) {

    let availableCharacters = LOWERCASE_CHARACTERS;

    if (useUppercase) availableCharacters += UPPERCASE_CHARACTERS;
    if (useNumbers)   availableCharacters += NUMERIC_CHARACTERS;
    if (useSymbols)   availableCharacters += SYMBOL_CHARACTERS;

    let securePassword = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableCharacters.length);
        securePassword += availableCharacters.charAt(randomIndex);
    }

    return securePassword;
</script>
