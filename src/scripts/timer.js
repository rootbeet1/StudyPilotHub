// URL-Parameter auslesen
const params = new URLSearchParams(window.location.search);
const value = params.get("value"); 

// Arbeits- und Pausenzeiten extrahieren
const workValue = parseInt(value.slice(0, 2), 10); 
const pauseValue = parseInt(value.slice(2, 4), 10); 

console.log("Arbeitszeit:", workValue, "Minuten");
console.log("Pausenzeit:", pauseValue, "Minuten");

const totalWorkDuration = workValue * 60; // Arbeitszeit in Sekunden
const totalPauseDuration = pauseValue * 60; // Pausenzeit in Sekunden

const timerElement = document.querySelector(".timer");
const countdownElement = document.getElementById("countdown");
const toggleButton = document.getElementById("start-stop-button"); // Ein Button für Start/Stop
const resetButton = document.getElementById("reset-button"); // Separater Reset-Button
const alarmSound = new Audio("../../public/sounds/bell.mp3");
let totalSeconds = totalWorkDuration;
let gradientSize = 101;
let isRunning = false; // Status des Countdowns
let isWorkPhase = true; // Arbeits- oder Pausenphase
let timerInterval = null;
let countdownInterval = null;

// Countdown-Display aktualisieren
function updateCountdownDisplay() {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    countdownElement.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

// Hintergrund-Animation anpassen
function updateGradient() {
    gradientSize = (totalSeconds / (isWorkPhase ? totalWorkDuration : totalPauseDuration)) * 100;
    const color = isWorkPhase ? "#43423f" : "#30a05f"; // Schwarz für Arbeit, Grün für Pause
    timerElement.style.background = `conic-gradient(white ${100-gradientSize}%, ${color} ${100-gradientSize}%)`;
}

// Status in der Überschrift ändern
function updateStatus() {
    const h1Element = document.querySelector("h1"); // <h1> aus der HTML-Datei
    h1Element.textContent = isWorkPhase ? "FOCUS" : "PAUSE"; // Phase-basierter Text
}

// Countdown starten
function startCountdown() {
    isRunning = true;
    updateStatus();
    toggleButton.textContent = "STOP"; // Button-Text ändern

    countdownInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(countdownInterval);
            clearInterval(timerInterval);
            playAlarmSound();
            // Wechsel zwischen Arbeits- und Pausenphase
            if (isWorkPhase) {
                isWorkPhase = false;
                totalSeconds = totalPauseDuration;
                gradientSize = 101;
                startCountdown(); // Pause starten
            } else {
                resetCountdown(); // Gesamten Countdown zurücksetzen
            }
            playAlarmSound();
            updateStatus();
            return;
        }
        totalSeconds--;
        updateCountdownDisplay();
        updateGradient();
    }, 1000);

    timerInterval = setInterval(updateGradient, 100); // Hintergrund-Animation
}

// Countdown stoppen
function stopCountdown() {
    isRunning = false;
    toggleButton.textContent = "START"; // Button-Text ändern
    clearInterval(countdownInterval);
    clearInterval(timerInterval);
}

// Countdown zurücksetzen
function resetCountdown() {
    stopCountdown();
    isWorkPhase = true;
    totalSeconds = totalWorkDuration;
    gradientSize = 101;
    updateCountdownDisplay();
    updateGradient();
    updateStatus();
    toggleButton.textContent = "START"; // Button zurücksetzen
}

// Ton abspielen
function playAlarmSound() {
    alarmSound.play()
}


// Event-Listener für Start/Stop-Button
toggleButton.addEventListener("click", () => {
    if (isRunning) {
        stopCountdown();
    } else {
        startCountdown();
    }
});

// Event-Listener für Reset-Button
resetButton.addEventListener("click", resetCountdown);


// Initiales Update des Displays und Status
updateCountdownDisplay();
updateGradient();
updateStatus();
