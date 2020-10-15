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
//
function user_input_add_row(table_row)
{
    console.log(table_row.parentElement)
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
function change_range_slider(param)
{
    let r1_circle = document.getElementById("r1-circle")
    let r2_circle = document.getElementById("r2-circle")
    let g1_circle = document.getElementById("g1-circle")
    let g2_circle = document.getElementById("g2-circle")
    let b1_circle = document.getElementById("b1-circle")
    let b2_circle = document.getElementById("b2-circle")
    let rgb1_circle = document.getElementById("rgb1-circle")
    let rgb2_circle = document.getElementById("rgb2-circle")

    let r1_circle_value = parseInt(r1_circle.parentElement.parentElement.parentElement.children[0].children[1].innerHTML)
    let r2_circle_value = parseInt(r2_circle.parentElement.parentElement.parentElement.children[2].children[1].innerHTML)
    let g1_circle_value = parseInt(g1_circle.parentElement.parentElement.parentElement.children[0].children[1].innerHTML)
    let g2_circle_value = parseInt(g2_circle.parentElement.parentElement.parentElement.children[2].children[1].innerHTML)
    let b1_circle_value = parseInt(b1_circle.parentElement.parentElement.parentElement.children[0].children[1].innerHTML)
    let b2_circle_value = parseInt(b2_circle.parentElement.parentElement.parentElement.children[2].children[1].innerHTML)

    if((r1_circle_value > r2_circle_value)|| (g1_circle_value > g2_circle_value) || (b1_circle_value > b2_circle_value) )
    {
        r1_circle_value = r2_circle_value--;
        
        g1_circle_value = g2_circle_value--;
        b1_circle_value = b2_circle_value--;
        alert("bitte nur werte eingeben die im Wertebereich liegen")
        return null;
    }
    
    let circle = param.parentElement.parentElement.parentElement.children[1].children[0]
    
    
    switch(param.id[0])
    {
        case 'r':
            circle.children[param.id[1]-1].style.backgroundColor = "rgb(" + param.value + ",0,0)";  
        break;
        case 'g':
            circle.children[param.id[1]-1].style.backgroundColor = 'rgb(0,' + param.value + ',0)';
        break;
        case 'b':
            circle.children[param.id[1]-1].style.backgroundColor = 'rgb(0,0,' + param.value + ')';
        break;
    }

    param.parentElement.parentElement.children[1].innerHTML = param.value // adjust the value under the slider

    rgb1_circle.style.backgroundColor = "rgb(" + r1_circle_value + "," + g1_circle_value + "," + b1_circle_value + ")"; 
    rgb2_circle.style.backgroundColor = "rgb(" + r2_circle_value + "," + g2_circle_value + "," + b2_circle_value + ")";
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
// modal window
$('#exampleModalCenter').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
  })
