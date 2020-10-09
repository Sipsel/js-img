function main(){
    var pixel = getpixel(canvas,context) // get bitmap of the canvas
    
    F = new Figure(pixel,canvas.width) // matches the figure inside the canvas
    makecircle(F.middlepoint[0],F.middlepoint[1])
    // put values into ui
    document.getElementById("xvalue").innerHTML = "Delta x = " + F.sumx + "<br>" + "middlpoint on the  x axis = " + F.middlepoint[0]
    document.getElementById("yvalue").innerHTML = "Delta y = " + F.sumy + "<br>" + "middlepoint on the y axis = " + F.middlepoint[1]
    document.getElementById("area").innerHTML = "Area: " + F.area.length + "<br> <strong>all information in pixel"
}
//helper functions for converting bitmap to matrix
function getcolumn(value,width){
    return  (value/4) - (gety(value,width)*width) 
}
function gety(value,width){
    return Math.floor(value/4/width)
}
function getpixel(canvas,context){      
    return context.getImageData(0,0,canvas.width,canvas.height)
}
//user input functions
function previewimage(param){
    var reader = new FileReader()
    reader.onload = function (e){
        document.getElementById("preview").setAttribute("src",e.target.result)
        document.getElementById("preview").style.display="block"
    }
    reader.readAsDataURL(param.files[0]);
}
function setImage(){
    var image = document.getElementById("preview")
    canvas.width = image.width
    canvas.height = image.height
    context.drawImage(image,0,0,image.width,image.height)
    document.getElementById("preview").style.display = "none"
}
// graphical functions
function drawliney(from,width,thickness){ // not used
        for(var i =0;i<thickness;i++){
                context.beginPath();
                context.moveTo(0, from+i);
                context.lineTo(width, from+i);
                context.stroke();
    }  
}
function drawlinex(from,width,thickness){
    for(var i =0;i<thickness;i++){
                context.beginPath();
                context.moveTo(from+i,0);
                context.lineTo(from+i,width);
                context.stroke();
        }
}
function makecircle(x,y){
    context.beginPath();
    context.arc(x, y, 20, 0, 2 * Math.PI, false);
    context.fillStyle = 'green';
    context.fill();
    context.lineWidth = 5;
    context.strokeStyle = '#003300';
    context.stroke();
}

//vendor function https://stackoverflow.com/questions/6735470/get-pixel-color-from-canvas-on-mouseover
function findPos(obj) {
    var curleft = 0, curtop = 0;
    if (obj.offsetParent) {
        do {
            curleft += obj.offsetLeft;
            curtop += obj.offsetTop;
        } while (obj = obj.offsetParent);
        return { x: curleft, y: curtop };
    }
    return undefined;
}