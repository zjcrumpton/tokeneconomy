//Global Variables
const tokenSize = document.querySelectorAll(".tokenItem");
//Reset Button Functionality
function resetBtn() {
    let circleToken = document.querySelectorAll(".circleItem");
    for (let i = 0; i < circleToken.length; i++) {
        circleToken[i].classList.remove("circleItem");
        circleToken[i].style.backgroundColor = "#000";
    }
};

tokenSize.forEach(item => item.addEventListener("click", () => {
    resetGrid();
    makeGrid(item.value);
}));
const btnArea = document.querySelector('.btnArea');
function resetGrid(){
    btnArea.innerHTML = "";
}
function makeGrid(size){
    for(let i = 0; i < size; i++){
        const btn = document.createElement('DIV');
        btn.classList.add('btn');
        btnArea.appendChild(btn);
        btn.addEventListener("click", ()=> {
            changeColor(btn);
        })
    }
}
makeGrid(10);

//Color Generation - Array of Possible Colors
let Colors = {};
Colors.names = {
    aqua: "#00ffff",
    azure: "#f0ffff",
    beige: "#f5f5dc",
    brown: "#a52a2a",
    cyan: "#00ffff",
    darkblue: "#00008b",
    darkcyan: "#008b8b",
    darkgrey: "#a9a9a9",
    darkgreen: "#006400",
    darkkhaki: "#bdb76b",
    darkmagenta: "#8b008b",
    darkolivegreen: "#556b2f",
    darkorange: "#ff8c00",
    darkorchid: "#9932cc",
    darkred: "#8b0000",
    darksalmon: "#e9967a",
    darkviolet: "#9400d3",
    fuchsia: "#ff00ff",
    gold: "#ffd700",
    green: "#008000",
    indigo: "#4b0082",
    khaki: "#f0e68c",
    lightblue: "#add8e6",
    lightcyan: "#e0ffff",
    lightgreen: "#90ee90",
    lightgrey: "#d3d3d3",
    lightpink: "#ffb6c1",
    lightyellow: "#ffffe0",
    lime: "#00ff00",
    magenta: "#ff00ff",
    maroon: "#800000",
    olive: "#808000",
    orange: "#ffa500",
    pink: "#ffc0cb",
    purple: "#800080",
    violet: "#800080",
    red: "#ff0000",
    silver: "#c0c0c0",
    yellow: "#ffff00"
};

//Generates a random color
Colors.random = function() {
    let result;
    let count = 0;
    for (let prop in this.names)
        if (Math.random() < 1/++count)
            result = prop;
    return result;
    
};

function changeColor(_this) {
    _this.style.backgroundColor = Colors.random();
    _this.classList.add("circleItem");
}

//addMin
//displaySet
//subMin
//startTimer

const addMin = document.querySelector(".addMin");
const displaySet = document.querySelector(".displaySet");
const subMin = document.querySelector(".subMin");
const startTimerBtn = document.querySelector(".startTimer");
const digitTable = document.querySelector(".digitTable");

addMin.addEventListener("click", () => addMinFunc());
subMin.addEventListener("click", () => subMinFunc());
startTimerBtn.addEventListener("click", () => {
    timer();
});
let setMin = 5;
function addMinFunc(){
    setMin++;
    updateSetMin();
    return setMin;
}
function subMinFunc(){
    setMin--;
    if(setMin < 0){
        setMin = 0;
    }
    updateSetMin();
    return setMin;
}
function updateSetMin(){
    displaySet.innerHTML = `${setMin}:00`;
}
updateSetMin();



let timer = function(){
    let distance = setMin * 1000 * 60;
    let timer = setInterval(function() {
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
        digitTable.innerHTML = minutes + "m " + seconds + "s ";
          
      
        if (distance < 0) {
          clearInterval(timer);
          digitTable.innerHTML = `Time's up!`
          //Play sound effect
        }
        distance -= 1000;
      }, 1000);
}