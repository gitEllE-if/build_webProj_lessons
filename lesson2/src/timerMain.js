import { turnSound } from "./sound.js";
import { formatError, formatOk } from "./utils.js";
import { DateTime } from "luxon";

const TIME_ZERO = -62169993000000; //luxon: timeValue.ts {year:0, month:0, day:0, hour:0, minute:0, second:0}
const timerForm = document.getElementById("timer");
const timerResult = document.getElementById("timer__result");
const timerStart = timerForm.querySelector("#timerStart");
let timerIntervalID = null;

timerForm.addEventListener("submit", startTimer);
timerForm.addEventListener("reset", stopTimer);

function startTimer(event) {
    timerResult.innerHTML = "";
    event.preventDefault();
    let timerVal = event.target.elements[0].value;
    if (timerVal) {
        timerVal = DateTime.fromISO(timerVal).set({ year: 0, month: 0, day: 0 });
        if (timerVal.ts != TIME_ZERO) {
            timerStart.disabled = true;
            timerIntervalID = setInterval(function () {
                timerVal = timerVal.minus({ second: 1 });
                event.target.elements[0].value = timerVal.toFormat('HH:mm:ss');
                if (timerVal.ts == TIME_ZERO) {
                    clearInterval(timerIntervalID);
                    turnSound();
                    timerResult.innerHTML = formatOk("Время истекло");
                    timerStart.disabled = false;
                }
            }
                , 1000);
        }
        else timerResult.innerHTML = formatError("Значение поля должно быть больше нуля");
    }
    else timerResult.innerHTML = formatError("Для запуска таймера необходимо заполнить поле");
}

function stopTimer(event) {
    event.preventDefault();
    clearInterval(timerIntervalID);
    timerStart.disabled = false;
}