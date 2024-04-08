//Calculator
let currentTotal = 0; 
let buffer = "0"; //what's on display
let previousOperator = null;

const calcScreen = document.querySelector(".calc-numbers");

document.querySelector('.calculator-buttons').addEventListener("click",function(event){
    buttonClick(event.target.innerHTML);
});

function buttonClick(value){
    if(isNaN(parseFloat(value))){
        handleSymbol(value);
    }else{
        handleNumber(value);
    }
    rerenderScreen();
}

function handleSymbol(value){
    switch (value){
        case "AC":
            buffer = "0";
            currentTotal = 0;
            previousOperator = null;
            break;
        case "=":
            if(previousOperator === null){
                return;
            }
            flushOperation(parseFloat(buffer));
            buffer = "" + currentTotal;
            previousOperator = null;
            currentTotal = 0;
            break;
        case ".":
            if (!buffer.includes('.')) {
                buffer += ".";
            }
            break;
        case "%":
            buffer = parseFloat(buffer) / 100;
            break;
        case "+/-":
            buffer = (parseFloat(buffer) * -1).toString();
            break;
        default:
            handleMath(value);
            break;
    }
}

function handleNumber(value){
    if(buffer === "0" && value !== "."){
        buffer = value;
    }else{
        buffer += value;
    }
}

function handleMath(value){
    const internalBuffer = parseFloat(buffer);
    
    if (currentTotal === 0){
        currentTotal = internalBuffer;
    }else{
        flushOperation(internalBuffer);
    }

    previousOperator = value;

    buffer = "0";
}

function flushOperation(internalBuffer){
    if(previousOperator === "+"){
        currentTotal += internalBuffer;
    }else if(previousOperator === "-"){
        currentTotal -= internalBuffer;
    }else if(previousOperator === "x"){
        currentTotal *= internalBuffer;
    }else if(previousOperator === "/"){
        currentTotal /= internalBuffer;
    }
}

function rerenderScreen(){
    calcScreen.value = buffer;
}

///////////////////////////////////////////////////////////
//Drag
//////////////////////////////////////////////////////////

var cursor = {
    x: 0,
    y: 0
};
var dragobj = null,
    h1, i1, oLeft, oTop;

function rel(ob) {
    if (ob) {
        return document.getElementById(ob)
    } else {
        return null
    }
}

function gTxt(ob, txt) {
    rel(ob).innerHTML = txt;
}

function makeObjectToDrag(obj) {
    if (obj) {
        dragobj = rel(obj.id);
        document.onmousedown = startMove;
        document.onmouseup = drop;
        document.onmousemove = moving;
    }
}

function startMove(e) {
    if (dragobj) {
        getCursorPos(e);
        dragobj.className = "moving";
        i1 = cursor.x - dragobj.offsetLeft;
        h1 = cursor.y - dragobj.offsetTop;
    }
}

function drop() {
    if (dragobj) {
        dragobj.className = "container";
        dragobj = null;
    }
}

function getCursorPos(e) {
    e = e || window.event;
    if (e.pageX || e.pageY) {
        cursor.x = e.pageX;
        cursor.y = e.pageY;
    } else {
        var de = document.documentElement;
        var db = document.body;
        cursor.x = e.clientX +
            (de.scrollLeft || db.scrollLeft) - (de.clientLeft || 0);
        cursor.y = e.clientY +
            (de.scrollTop || db.scrollTop) - (de.clientTop || 0);
    }
    return cursor;
}

function moving(e) {
    getCursorPos(e);
    if (dragobj) {
        oLeft = cursor.x - i1;
        oTop = cursor.y - h1;
        dragobj.style.left = oLeft + 'px';
        dragobj.style.top = oTop + 'px';
    }
}