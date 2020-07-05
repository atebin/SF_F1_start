let objSvetofor = {
    linksToReds: {
        item1: document.querySelectorAll('.avt-svetofor-item1 .avt-svetofor-item-lamp--red'),
        item2: document.querySelectorAll('.avt-svetofor-item2 .avt-svetofor-item-lamp--red'),
        item3: document.querySelectorAll('.avt-svetofor-item3 .avt-svetofor-item-lamp--red'),
        item4: document.querySelectorAll('.avt-svetofor-item4 .avt-svetofor-item-lamp--red'),
        item5: document.querySelectorAll('.avt-svetofor-item5 .avt-svetofor-item-lamp--red'),
    },
    linksToGreens: document.querySelectorAll('.avt-svetofor-item-lamp--off'),
    linkToResultTime: document.querySelector('.avt-result-time'),
    linkToResultStatus: document.querySelector('.avt-result-status'),
    timerIdRed: null,
    timerIdGreen: null,
    currentStatus: '-',
    countImpuls: 0,
}

InitPage();

function InitPage(){
    document.body.addEventListener('click', bodyClickPrepair);

}

function bodyClickPrepair(event) {
    let currStepCount = 0;
    document.body.removeEventListener('click', bodyClickPrepair);
    document.body.addEventListener('click', bodyClickFail);
    document.body.style.backgroundColor = 'gray';

    objSvetofor.timerIdRed = setInterval(() => {
        // меняем обработчики на click
        if (++currStepCount <= 5) {
            console.log(currStepCount);
            // гасим красные огни, пока они есть на табло
            let currReds = [...objSvetofor.linksToReds['item' + currStepCount]];
            currReds.forEach(elem => {
                elem.classList.toggle('avt-svetofor-item-lamp--red');
                elem.classList.toggle('avt-svetofor-item-lamp--off');
            });
        } else {
            // останавливаем таймер с отсчетом времени
            clearInterval(objSvetofor.timerIdRed);

            // меняем обработчики на click
            document.body.removeEventListener('click', bodyClickFail);
            document.body.addEventListener('click', bodyClickSuccess);

            // зажигаем зеленые огни
            let currGreens = [...objSvetofor.linksToGreens];
            currGreens.forEach(elem => {
                elem.classList.toggle('avt-svetofor-item-lamp--off');
                elem.classList.toggle('avt-svetofor-item-lamp--green');
            });

            //
           objSvetofor.timerIdRed = setInterval(() => {
                ++objSvetofor.countImpuls;
            },5);
        }
    }, 800); 
}

function ImpulseParser() {
    
    clearInterval(objSvetofor.timerIdGreen);
    let intervalInMilliSec = 5;
    let result = objSvetofor.countImpuls * intervalInMilliSec / 1000;
    
    return result.toFixed(3);
}

function bodyClickFail(){
    document.body.removeEventListener('click', bodyClickFail);
    clearInterval(objSvetofor.timerIdRed);
    objSvetofor.linkToResultTime.innerHTML = '0.000';
    objSvetofor.linkToResultStatus.innerHTML = 'фальшстарт!';
    objSvetofor.linkToResultStatus.style.color = '#a00';
    document.body.style.backgroundColor = 'lightgrey';
}

function bodyClickSuccess() {
    document.body.removeEventListener('click', bodyClickSuccess);
    objSvetofor.linkToResultTime.innerHTML = ImpulseParser();
    objSvetofor.linkToResultStatus.innerHTML = 'Success!';
    objSvetofor.linkToResultStatus.style.color = '#3b3';
    document.body.style.backgroundColor = 'lightgrey';
}