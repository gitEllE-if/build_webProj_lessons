import "./dateCalcMain.js";
import "./timerMain.js";

const menu = document.querySelector('.menu');
menu.addEventListener('change', showFunc);

function showFunc(event) {
    let formEls = document.getElementsByTagName('form');
    for (let form of formEls) {
        form.classList.add('invisible');
    }
    document.getElementById(event.target.dataset.func).classList.remove('invisible');
}