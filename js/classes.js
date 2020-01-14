class Figure {
    constructor(pixel, width) {
        this.pixelarea = [];
            for (var i = 0; i < pixel.data.length; i += 4) {
                if ((pixel.data[i] > 150
                    &&
                    pixel.data[i + 1] > 100
                    &&
                    pixel.data[i + 2] < 90)
                    ||
                    (pixel.data[i] > 200
                        &&
                        pixel.data[i + 1] > 150)
                    ||
                    (pixel.data[i] < 20
                        &&
                        pixel.data[i + 1] < 60
                        &&
                        pixel.data[i + 2] < 150)) {
                    pixel.data[i] = 100;
                    pixel.data[i + 1] = 0;
                    pixel.data[i + 2] = 0;
                    this.pixelarea.push(new Array(getcolumn(i, width), gety(i, width)));
                    
                }
            }
        context.putImageData(pixel, 0, 0);
    }
    get area(){
        return this.pixelarea
    }
    get mittelpunkt_y(){
        var y1 = this.pixelarea[0][1]
        var y2 = this.pixelarea[this.pixelarea.length-1][1]
        return [y1,y2]
    }
    get mittelpunkt_x(){
        var x1 = 99999999   //upper bound
        var x2= 0           //lower bound
        for(i =0;i<this.pixelarea.length;i++){
            if(this.pixelarea[i][0] <x1){
                x1 = this.pixelarea[i][0]
            }
            if(this.pixelarea[i][0] >x2){
                x2 = this.pixelarea[i][0]
            }
        }
        return [x1,x2]
    }
    get sumx(){
        var result = 0 
            for(var i = 0;i<this.pixelarea.length;i++){
                result+=this.pixelarea[i][0]
            }
        return result
    }
    get sumy(){
        var result = 0
            for(var i = 0;i<this.pixelarea.length;i++){
                result+=this.pixelarea[i][1]
            }
        return result
    }
    get middlepoint(){
        var x = Math.round(this.sumx/this.area.length)
        var y = Math.round(this.sumy/this.area.length)
        return[x,y]
    }
}
class Colorpicker{
    constructor(){
        this.color_conds = []
    }
    addcond(cond){
        this.color_conds.push(cond)
    }
    color_in_range(r,g,b){
        for(var i=0;i<this.color_conds.length;i++){
            var r_cond = this.color_conds[i][0]
            var g_cond = this.color_conds[i][1]
            var b_cond = this.color_conds[i][2]
            //console.log(r_cond,g_cond,b_cond)
            //console.log(r,g,b)
            if
            (
                (
                    r_cond[0] <= r 
                    &&
                    r<=r_cond[1]
                )
                &&
                (
                    g_cond[0] <= g 
                    &&
                    g<=g_cond[1]
                )
                &&
                (
                    b_cond[0] <= b 
                    &&
                    b<=b_cond[1]
                )    
            )
                {
                    return true
                }
        }
        return false
    }
}
class Color_cond{
    constructor(){
        this.r_cond = [0,0]
        this.g_cond = [0,0]
        this.b_cond = [0,0]
    }
    red(r1,r2){
        this.r_cond = [r1,r2]
        return true
    }
    green(g1,g2){
        this.g_cond = [g1,g2]
        return true
    }
    blue(b1,b2){
        this.b_cond = [b1,b2]
        return true
    }
    get cond(){
        return [this.r_cond,this.g_cond,this.g_cond]
    }
}