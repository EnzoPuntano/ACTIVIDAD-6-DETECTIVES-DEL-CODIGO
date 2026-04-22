// ─── CONJUNTOS DE CARACTERES ──────────────────────────────────────────────────
 
const LOWERCASE_CHARACTERS = "abcdefghijklmnopqrstuvwxyz";
const UPPERCASE_CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const NUMERIC_CHARACTERS   = "0123456789";
const SYMBOL_CHARACTERS    = "!@#$%^&*()_+-=[]{}|;:,.<>?";
 
 
// ─── REFERENCIAS AL DOM ───────────────────────────────────────────────────────
 
const generateButton   = document.getElementById("generate-btn");
const copyButton       = document.getElementById("copy-btn");
const passwordDisplay  = document.getElementById("password-display");
const lengthInput      = document.getElementById("length-input");
const lengthDisplay    = document.getElementById("length-display");
const includeUppercase = document.getElementById("include-uppercase");
const includeNumbers   = document.getElementById("include-numbers");
const includeSymbols   = document.getElementById("include-symbols");
const strengthBar      = document.getElementById("strength-bar");
const strengthLabel    = document.getElementById("strength-label");
 
 
// ─── FUNCIÓN PRINCIPAL: GENERAR CONTRASEÑA ────────────────────────────────────
 
/**
 *
 * @param {number}  length          - Longitud deseada de la contraseña.
 * @param {boolean} useUppercase    - Si se incluyen letras mayúsculas.
 * @param {boolean} useNumbers      - Si se incluyen números.
 * @param {boolean} useSymbols      - Si se incluyen símbolos especiales.
 * @returns {string} La contraseña generada.
 */
function generateSecurePassword(length, useUppercase, useNumbers, useSymbols) {
 
    // Siempre incluimos minúsculas como base
    let availableCharacters = LOWERCASE_CHARACTERS;
 
    // Agregamos los conjuntos de caracteres según las opciones elegidas
    if (useUppercase) availableCharacters += UPPERCASE_CHARACTERS;
    if (useNumbers)   availableCharacters += NUMERIC_CHARACTERS;
    if (useSymbols)   availableCharacters += SYMBOL_CHARACTERS;
 
    // Construimos la contraseña carácter por carácter
    let securePassword = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * availableCharacters.length);
        securePassword += availableCharacters.charAt(randomIndex);
    }
 
    return securePassword;
}
 
 
// ─── FUNCIÓN: CALCULAR FORTALEZA ──────────────────────────────────────────────
 
/**
 * Calcula la fortaleza de una contraseña según su longitud y variedad de caracteres.
 * @param {string}  password     - La contraseña a evaluar.
 * @param {boolean} useUppercase - Si incluye mayúsculas.
 * @param {boolean} useNumbers   - Si incluye números.
 * @param {boolean} useSymbols   - Si incluye símbolos.
 * @returns {{ level: string, percentage: number, color: string }}
 */
function calculatePasswordStrength(password, useUppercase, useNumbers, useSymbols) {
    const varietyScore = [useUppercase, useNumbers, useSymbols].filter(Boolean).length;
    const lengthScore  = password.length;
 
    if (lengthScore >= 20 && varietyScore === 3) {
        return { level: "Muy fuerte", percentage: 100, color: "#1a8a4a" };
    }
    if (lengthScore >= 14 && varietyScore >= 2) {
        return { level: "Fuerte",     percentage: 75,  color: "#4caf50" };
    }
    if (lengthScore >= 10 && varietyScore >= 1) {
        return { level: "Media",      percentage: 50,  color: "#ff9800" };
    }
    return         { level: "Débil",      percentage: 25,  color: "#e53935" };
}
 
 
// ─── FUNCIÓN: ACTUALIZAR BARRA DE FORTALEZA ───────────────────────────────────
 
/**
 * Actualiza visualmente la barra y el texto de fortaleza de la contraseña.
 *
 * @param {string}  password     - La contraseña generada.
 * @param {boolean} useUppercase - Si incluye mayúsculas.
 * @param {boolean} useNumbers   - Si incluye números.
 * @param {boolean} useSymbols   - Si incluye símbolos.
 */
function updateStrengthIndicator(password, useUppercase, useNumbers, useSymbols) {
    const strength = calculatePasswordStrength(password, useUppercase, useNumbers, useSymbols);
 
    strengthBar.style.width      = strength.percentage + "%";
    strengthBar.style.background = strength.color;
    strengthLabel.textContent    = "Fortaleza: " + strength.level;
}
 
 
// FUNCIÓN: COPIAR AL PORTAPAPELES
 
/**
 * Copia la contraseña mostrada al portapapeles del usuario.
 * Cambia el texto del botón temporalmente para confirmar la acción.
 */
function copyPasswordToClipboard() {
    const currentPassword = passwordDisplay.textContent;
 
    // No copiamos si todavía no se generó ninguna contraseña
    if (!currentPassword || currentPassword.includes("—")) return;
 
    navigator.clipboard.writeText(currentPassword).then(() => {
        copyButton.textContent = "✓";
        setTimeout(() => { copyButton.textContent = "📝"; }, 1500);
    });
}
 
 
// FUNCIÓN: LEER OPCIONES Y GENERAR
 
/**
 * Lee los valores actuales del formulario y dispara la generación de la contraseña.
 * Se ejecuta al hacer clic en el botón "Generar".
 */
function handleGenerateClick() {
    const selectedLength      = parseInt(lengthInput.value);
    const selectedUppercase   = includeUppercase.checked;
    const selectedNumbers     = includeNumbers.checked;
    const selectedSymbols     = includeSymbols.checked;
 
    const newPassword = generateSecurePassword(
        selectedLength,
        selectedUppercase,
        selectedNumbers,
        selectedSymbols
    );
 
    passwordDisplay.textContent = newPassword;
 
    updateStrengthIndicator(newPassword, selectedUppercase, selectedNumbers, selectedSymbols);
}
 
 
// ACTUALIZAR DISPLAY DE LONGITUD EN TIEMPO REAL
 
/**
 * Sincroniza el número visible de longitud con el valor del slider.
 */
function updateLengthDisplay() {
    lengthDisplay.textContent = lengthInput.value;
}
 
 
// EVENTOS
 
generateButton.addEventListener("click", handleGenerateClick);
copyButton.addEventListener("click", copyPasswordToClipboard);
lengthInput.addEventListener("input", updateLengthDisplay);