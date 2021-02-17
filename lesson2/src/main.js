import "./dateCalcMain.js";
import "./timerMain.js";

import "./style.scss";

const menu = document.querySelector('.menu');
menu.addEventListener('change', showFunc);

function showFunc(event) {
    let formEls = document.getElementsByClassName('appForm');
    for (let form of formEls) {
        form.classList.add('invisible');
    }
    document.getElementById(event.target.dataset.func).classList.remove('invisible');
}