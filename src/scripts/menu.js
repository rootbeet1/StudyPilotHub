// Dark Mode
const darkModeButton = document.getElementById("dark-mode-button");

darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    const isDarkMode = document.body.classList.contains("dark-mode");
    localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");

    darkModeButton.textContent = isDarkMode ? "Light" : "Dark";
});

window.addEventListener("DOMContentLoaded", () => {
    const savedDarkMode = localStorage.getItem("darkMode");
    if (savedDarkMode === "enabled") {
        document.body.classList.add("dark-mode");
        darkModeButton.textContent = "Light";
    }
});

// Elementreferenzen
const customizeButton = document.getElementById("customize-button");
const customizeInputs = document.getElementById("customize-inputs");
const presetButtons = document.getElementById("preset-buttons");
const submitButton = document.getElementById("submit-button");
const backButton = document.getElementById("back-button");

// Zeige Customize-Menü und verstecke Vordefinierte Timer
customizeButton.addEventListener("click", () => {
    customizeInputs.style.display = "flex";
    presetButtons.style.display = "none";
});

// Zurück ins Auswahlmenü
backButton.addEventListener("click", () => {
    customizeInputs.style.display = "none";
    presetButtons.style.display = "flex";
});

// Weiterleitung nach Eingabe
submitButton.addEventListener("click", () => {
    const focusTime = document.getElementById("focus-time").value || 0;
    const pauseTime = document.getElementById("pause-time").value || 0;

    const focusTimeInt = parseInt(focusTime, 10);
    const pauseTimeInt = parseInt(pauseTime, 10);

    if (isNaN(focusTimeInt) || isNaN(pauseTimeInt) || focusTimeInt < 0 || pauseTimeInt < 0) {
        alert("Bitte gültige Zahlen für Fokus- und Pausenzeit eingeben.");
        return;
    }

    const value = `${focusTimeInt.toString().padStart(2, '0')}${pauseTimeInt.toString().padStart(2, '0')}`;
    window.location.href = `timer.html?value=${value}`;
});
