var test = new Color_cond
test.red(100,200)
test1 = new Colorpicker()
test1.addcond(test.cond)
test1.color_in_range(150,0,0)


/*
multiple conditions
*/
var cond1 = new Color_cond
var cond2 = new Color_cond

cond1.red(100,200)
cond1.blue(75,100)
cond1.green(200,250)

cond1.red(10,20)
cond1.blue(30,40)
cond1.green(150,160)
Colorpicker = new Colorpicker()
Colorpicker.addcond(cond1.cond)
Colorpicker.addcond(cond2.cond)
for(var i = 0;i<50;i++){
    r =     Math.floor((Math.random() * 255) + 1); 
    g =     Math.floor((Math.random() * 255) + 1); 
    b =     Math.floor((Math.random() * 255) + 1); 
   console.log([r,g,b],Colorpicker.color_conds,Colorpicker.color_in_range(r,g,b))
}
var match = true
while(match){
    r =     Math.floor((Math.random() * 255) + 1); 
    g =     Math.floor((Math.random() * 255) + 1); 
    b =     Math.floor((Math.random() * 255) + 1);
    console.log(Colorpicker.color_in_range(r,g,b))
    if(Colorpicker.color_in_range(r,g,b)){
        console.log([r,g,b],Colorpicker.color_conds,Colorpicker.color_in_range(r,g,b))
        break
    }
}
