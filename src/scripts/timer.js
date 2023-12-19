const value= window.location.href.slice(-2);
const seconds =(value*60)/100;
const timer = document.querySelector(".timer");
const h1=document.querySelector("h1");
let gradientSize = 101; 
const interval = seconds*1000; 

function decreaseGradientSize() {
    gradientSize -= 1;
    timer.style.background = `conic-gradient(#43423f ${gradientSize}%,0,white)`;
    console.log(seconds*(100-gradientSize))
    if (gradientSize <= 0) {
        clearInterval(timerInterval); 
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
            countdownElement.textContent = '00:00'; 
        } else {
            totalSeconds--;
        }
    }, 1000);
}

startCountdown(value);
const timerInterval = setInterval(decreaseGradientSize, interval);
