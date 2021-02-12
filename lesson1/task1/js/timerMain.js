import { turnSound } from "./sound.js";
import { formatError, formatOk } from "./utils.js";
import { DateTime } from "./luxon.js";

const timerForm = document.getElementById("timer");
const timerResult = document.getElementById("timer__result");
let timerIntervalID = null;
timerForm.addEventListener("submit", startTimer);
timerForm.addEventListener("reset", stopTimer);

function startTimer(event) {
    timerResult.innerHTML = "";
    event.preventDefault();
    let timerVal = event.target.elements[0].value;
    if (timerVal) {
        timerVal = DateTime.fromISO(timerVal);
        timerVal = timerVal.set({ year: 0, month: 0, day: 0 });
        if (timerVal.ts != -62169993000000) {
            timerIntervalID = setInterval(function () {
                timerVal = timerVal.minus({ second: 1 });
                event.target.elements[0].value = timerVal.toFormat('HH:mm:ss');
                if (timerVal.ts == -62169993000000) {
                    clearInterval(timerIntervalID);
                    turnSound();
                    timerResult.innerHTML = formatOk("Время истекло")
                }
            }, 1000);
        }
        else timerResult.innerHTML = formatError("Значение поля должно быть больше нуля");
    }
    else timerResult.innerHTML = formatError("Для запуска таймера необходимо заполнить поле");
}

function stopTimer(event) {
    event.preventDefault();
    clearInterval(timerIntervalID);
}