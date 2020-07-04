let objSvetofor = {
    linksToReds: {
        item1: null,
        item2: null,
        item3: null,
        item4: null,
        item5: null,
    },
    linksToGreens: document.querySelectorAll('.avt-svetofor-item-lamp--off'),
    linkToResult: document.querySelector('.avt-result')
}

let timerIdInterval = null;
let currStepCount = 0;
let currTime = '-';

InitPage();

function InitPage(){
    let myBody = document.body;
    myBody.addEventListener('click', bodyClick);

    let allReds = objSvetofor.linksToReds;
    for (elem in allReds){
        allReds[elem] = document.querySelectorAll('.avt-svetofor-' + elem +' .avt-svetofor-item-lamp--red');
    }
    console.log(objSvetofor);
}

function bodyClick(event) {
    if (currStepCount == 0) {
        currTime = 'фальшстарт!!!'; 
        timerIdInterval = setInterval(StepCount, 800); 
    } else if (currTime == 'фальшстарт!!!') {
        objSvetofor.linkToResult.innerHTML = currTime;
        clearInterval(timerIdInterval);
    } else {
        objSvetofor.linkToResult.innerHTML = currTime;
    }

    
}

function StepCount(){
    if (++currStepCount <= 5) {
        let currReds = [...objSvetofor.linksToReds['item' + currStepCount]];
        
        currReds.forEach(elem => {
            elem.classList.toggle('avt-svetofor-item-lamp--red');
            elem.classList.toggle('avt-svetofor-item-lamp--off');
        });
    } else {
        clearInterval(timerIdInterval);
        //LetSGo();

        let currGreens = [...objSvetofor.linksToGreens];
        
        currGreens.forEach(elem => {
            elem.classList.toggle('avt-svetofor-item-lamp--off');
            elem.classList.toggle('avt-svetofor-item-lamp--green');
        });
        currTime = "Success!";
        //currStepCount = -1;

    }
}

function LetSGo() {
    console.log('GO !!!');
}