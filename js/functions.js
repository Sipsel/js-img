function main(){
    var pixel = getpixel(canvas,context) // get bitmap of the canvas
    
    Figure = new Figure(pixel,canvas.width) // matches the figure inside the canvas

    makecircle(Figure.middlepoint[0],Figure.middlepoint[1])
    // put values into ui
    document.getElementById("xvalue").innerHTML = "Delta x = " + Figure.sumx + "<br>" + "middlpoint on the  x axis = " + Figure.middlepoint[0]
    document.getElementById("yvalue").innerHTML = "Delta y = " + Figure.sumy + "<br>" + "middlepoint on the y axis = " + Figure.middlepoint[1]
    document.getElementById("area").innerHTML = "Area: " + Figure.area.length + "<br> <strong>all information in pixel"
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
    // condition input
//jquery 

$('#conditions').draggable({
    cursor:"crosshair"
});
function show_cond(){
    if(document.getElementById("conditions").style.opacity == 0){
        document.getElementById("conditions").style.opacity = 100
    }else{
        hide_cond()
    }
}
function hide_cond(){
    if(color_picker_changed){
        if(save_cond()){
            document.getElementById("conditions").style.opacity = 0
        }else{
            return false
        }
        
    }else{
        document.getElementById("conditions").style.opacity = 0
    }
    
}
function save_cond(){
    if(window.confirm("save changes?")){
        color_picker_changed = false
        return true
    }else{
        return false
    }
    
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
function initcircles(){
    document.getElementById("circle-left").style.backgroundColor = "rgb(0,0,0)"
    document.getElementById("circle-right").style.backgroundColor = "rgb(0,0,0)"
}
//conditions
function update_cond_circle(e){
    var color = e.id.substring(0,1)
    var value = parseInt(e.value)
    if(e.id.substring(1,2) == 1){
        var side = "left"
    }else{
        var side = "right"
    }
    var circle = document.getElementById("circle-"+side)
    var regex = /\(\d{0,3},\s\d{0,3},\s\d{0,3}\)/g // rgb string from css to 
    var str = circle.style.backgroundColor
    console.log(str)
    var result = str.match(regex)[0].split(" ")
    for(var i = 0;i<result.length;i++){
        result[i] = parseInt(result[i].replace(/\D+/g,""))
    }
    switch(color){
        case("r"):
            result[0] = value
            break
        case("g"):
            result[1] = value
            break
        case("b"):
            result[2] = value
            break

    }
    console.log(`rgb(${result[0]},${result[1]},${result[2]})`)
    document.getElementById("circle-"+side).style.backgroundColor =`rgb(${result[0]},${result[1]},${result[2]})`
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
