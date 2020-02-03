//==========================VARIABLES DEVINITION================================
const lineColor = document.querySelector('#lineColor');
const bgColor = document.querySelector('#bgColor');
const lineSize = document.querySelector('input[name="size"]');
const clearSketch = document.querySelector('#clearSketch');
const drawLine = document.querySelector('#drawLine');
const drawRect = document.querySelector('input[name="drawRect"]');
const drawCirc = document.querySelector('input[name="drawCircle"]');
const pencilButton = document.querySelector('input[name="pencil"]');
const checkboxRect = document.querySelector('input[name="checkboxRect"]');
const checkboxCirc = document.querySelector('input[name="checkboxCirc"]');
let color = '#BADA55';

const canvas = document.querySelector('#draw');
const ctx = canvas.getContext('2d');

canvas.width = 1000;  
canvas.height = 600;

ctx.strokeStyle = color; 

ctx.lineJoin = 'round'; 
ctx.lineCap = 'round';
ctx.lineWidth = 3;

let isDrawing = false,
    isDrawingRect = false,
    isDrawingCircle = false;
    isDrawingLine = false;
    ischeckedRect = false;
    ischeckedCircle = false;
let lastX = 0; //pozycja startowa X
let lastY = 0; //pozycja startowa Y

let [startX,startY,endX,endY,rectHeight,rectWidth,radius] = [0,0,0,0,0,0,0]; //Definition of geometries variables

let accordionMenu = document.querySelectorAll('.panelHeader');

pencilDraw();
//=============================================================================
//==========================ACCORDION MENU=====================================
function showMenu(e) {
    console.log(e.toElement);
    let panelContent = this.nextElementSibling;
    console.log(panelContent);
    if (panelContent) {
        if (panelContent.style.display === "block") {
            panelContent.style.display = "none";  
        } else {
            panelContent.style.display = "block";
        }
        if (panelContent.style.maxHeight){
            panelContent.style.maxHeight = null;
        } else {
            panelContent.style.maxHeight = panelContent.scrollHeight + "px";
        } 
    }
    this.classList.toggle('active');
}

accordionMenu.forEach(panel => panel.addEventListener('click',showMenu));
//=============================================================================

function lineColorUpdate() {    
    color = this.value;    
    document.documentElement.style.setProperty('--selectColor', this.value);
}

function bgColorUpdate() {
    document.documentElement.style.setProperty(`--${this.name}`, this.value);
}

function lineSizeUpdate() {
    ctx.lineWidth = this.value;
}

function clearSketchUpdate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    document.documentElement.style.setProperty('--bgColor','white');  
}

//==================================PENCIL DRAW======================================
function pencilDraw() {
    function draw(e) {

        if (!isDrawing) return; //Zatrzymuje funkcje jeżeli LPM nie jest wciśnięty 
        isDrawingCircle = false;
        isDrawingRect = false; 
        isDrawingLine = false;
        ctx.strokeStyle = color;  
        // zaczynamu od:
        ctx.beginPath(lastX,lastY);
    
        //kończymy na:
        ctx.moveTo(lastX,lastY);
        ctx.lineTo(e.offsetX,e.offsetY);
        ctx.stroke();
    
        [lastX,lastY] =[e.offsetX,e.offsetY];      
        
    }
//================================================================================
    
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true; //jeżeli LPM jest wciśnięty zmienia zmienną na true
        console.log('click');
        [lastX,lastY] =[e.offsetX,e.offsetY]; //po wciśnięciu LPM ustawia zmienne lastX,lastY na współrzędne myszki [e.offsetX,e.offsetY]
    });
    
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false); // po odkliknięciu LPM zmienna zmienia się na false
    canvas.addEventListener('mouseover', () => isDrawing = false);
}

pencilButton.addEventListener('click',pencilDraw);

//================================================================================
//==============================LINE DRAW=========================================
function lineDrawFunc() {
    isDrawingCircle = false;
    isDrawingRect = false;
    isDrawingLine = true;
    
    function beginCoordinates(e) {
        isDrawing = false;

        [startX,startY] = [e.offsetX,e.offsetY];
        console.log(`${startX},${startY}`);
    }
    function finishCoordinates(e) {
        if (!isDrawingLine) return;
        [endX,endY] = [e.offsetX,e.offsetY];
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.moveTo(startX,startY);
        ctx.lineTo(endX,endY);
        ctx.stroke();
    }
    canvas.addEventListener('mousedown',beginCoordinates);
    canvas.addEventListener('mouseup',finishCoordinates);
}

drawLine.addEventListener('click',lineDrawFunc);
drawLine.addEventListener('mouseup',() => isDrawingLine = false);
//================================================================================
//===========================CHECKING THE CHECKBOXES==============================

checkboxRect.addEventListener('click', () => {
    if (checkboxRect.checked === true) {
        ischeckedRect = true;
        console.log('checked');
    } else {
        ischeckedRect = false
        console.log('unchecked');
    };
});
checkboxCirc.addEventListener('click', () => {
    if (checkboxCirc.checked === true) {
        ischeckedCircle = true;
        console.log('checked');
    } else {
        ischeckedCircle = false
        console.log('unchecked');
    };
});
//==============================RECTANGLE DRAW====================================
function drawRectangle() { 
        isDrawingRect = true;        
        isDrawingCircle = false;
        isDrawingLine = false;
    
    canvas.addEventListener('mousedown',beginCoordinates);
    canvas.addEventListener('mouseup',finishCoordinates);
    
    function beginCoordinates (e) {
        isDrawing = false;
        [startX,startY] = [e.offsetX,e.offsetY];        
    }
    function finishCoordinates(e) {
        if (!isDrawingRect) return;
        [endX,endY] = [e.offsetX,e.offsetY];

        rectWidth = endX - startX;
        rectHeight = endY - startY;

        ctx.fillStyle = color;
        ctx.strokeStyle = color;        
        ctx.beginPath();
        if (ischeckedRect == true) {                        
            ctx.fillRect(startX,startY,rectWidth,rectHeight);
        } else ctx.rect(startX,startY,rectWidth,rectHeight);        
        ctx.stroke();        
    } 
}
//=================================================================================
//=================================CIRCLE DRAW=====================================
function drawCircle() {
    isDrawRect = false;
    isDrawingLine = false;    
    isDrawingCircle = true;

    canvas.addEventListener('mousedown',beginCoordinates);
    canvas.addEventListener('mouseup',finishCoordinates);

    function beginCoordinates(e) {            
        isDrawing = false;
        
        [startX,startY] = [e.offsetX,e.offsetY];
        console.log(`${startX},${startY}`);
    }

    function finishCoordinates(e) {
        if (!isDrawingCircle) return;

        [endX,endY] = [e.offsetX,e.offsetY];
               
        radius = Math.sqrt(Math.pow((endX - startX),2) + Math.pow((endY - startY),2));
        console.log(radius);
        ctx.strokeStyle = color;
        ctx.beginPath();
        ctx.arc(startX,startY,radius,0,2 * Math.PI);
        if (ischeckedCircle == true) ctx.fill();
        ctx.stroke();          
    } 
}
//=================================================================================
lineColor.addEventListener('change',lineColorUpdate);
bgColor.addEventListener('change',bgColorUpdate);
lineSize.addEventListener('change',lineSizeUpdate);
clearSketch.addEventListener('click',clearSketchUpdate);

drawRect.addEventListener('click',drawRectangle,false);
drawRect.addEventListener('mouseup', () => isDrawingCirc = false);
drawCirc.addEventListener('click',drawCircle,false);
drawCirc.addEventListener('mouseup', () => isDrawingRect = false);
