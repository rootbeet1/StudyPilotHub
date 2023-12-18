const value= window.location.href.slice(-2);
const seconds =(value*60)/100;
const timer = document.querySelector(".timer");
const h1=document.querySelector("h1");
let gradientSize = 100; // Startgröße des Gradienten in Prozent
const interval = seconds*1000; // Intervall in Millisekunden (hier: 1 Sekunde)
// Funktion, um die Größe des Hintergrundgradients zu ändern
function decreaseGradientSize() {
    gradientSize -= 1; // Hier können Sie die Schrittgröße anpassen
    timer.style.background = `conic-gradient(#43423f ${gradientSize}%,0,white)`;
    console.log(seconds*(100-gradientSize))
    if (gradientSize <= 0) {
        clearInterval(timerInterval); // Timer stoppen, wenn die Größe 0 erreicht
    }
}
function startCountdown(minutes) {
    const countdownElement = document.getElementById('countdown');

    let totalSeconds = minutes * 60;
    let intervalId = setInterval(() => {
        let minutes = Math.floor(totalSeconds / 60);
        let seconds = totalSeconds % 60;

        let displayMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
        let displaySeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

        countdownElement.textContent = `${displayMinutes}:${displaySeconds}`;

        if (totalSeconds <= 0) {
            clearInterval(intervalId);
            countdownElement.textContent = '00:00'; // Optional: Anzeige auf 00:00 setzen, wenn der Timer abgelaufen ist
        } else {
            totalSeconds--;
        }
    }, 1000);
}

// Beispiel: Starten des Timers für 30 Minuten
startCountdown(value);


// Starten des Intervalls
const timerInterval = setInterval(decreaseGradientSize, interval);