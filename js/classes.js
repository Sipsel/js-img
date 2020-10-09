class Figure {
    constructor(pixel, width) {
        this.pixelarea = [];
        this.conditions = [new Rgb_condition(0,255,0,50,0,50)]
            for (var i = 0; i < pixel.data.length; i += 4) {
                var r = pixel.data[i]
                var g = pixel.data[i + 1]
                var b = pixel.data[i + 2]
                if  (this.evaluate_conditions(r,g,b))
                    /*
                        (
                        pixel.data[i] > 150
                            &&
                        pixel.data[i + 1] > 100
                            &&
                        pixel.data[i + 2] < 90
                        )
                    ||
                        (
                        pixel.data[i] > 200
                            &&
                        pixel.data[i + 1] > 150
                        )
                    ||
                    (pixel.data[i] < 20
                        &&
                        pixel.data[i + 1] < 60
                        &&
                        pixel.data[i + 2] < 150))
                    */
                    {
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
    evaluate_conditions(pr,pg,pb)
    {
        var result = false;
        for(var x = 0; x<this.conditions.length;x++)
        {
            //checks if r,g,b are inside of the set 
            if(this.conditions[x].is_in_boundaries(pr,pg,pb))
            {
                result = true;
            }
        }
        return result;
    }
}
// used for simplyfing rgb in pixel matching
class Rgb_condition
{
    constructor(r_p_lower_limit,r_p_upper_limit,g_p_lower_limit,g_p_upper_limit,b_p_lower_limit,b_p_upper_limit)
    {
        /*  
        Array if Form of        +++++++++++++
                                +__r1__+__r2+
                                +__g1__+__g2+
                                +__b1__+__b2+
                                +++++++++++++
        */
        this.conditions = [[r_p_lower_limit,r_p_upper_limit],[g_p_lower_limit,g_p_upper_limit],[b_p_lower_limit,b_p_upper_limit]];
    }
    is_in_boundaries(pr,pg,pb)
    {
        if
        (
            (this.conditions[0][0] < pr) && (pr < this.conditions[0][1]) 
            &&
            (this.conditions[1][0] < pg) && (pg < this.conditions[1][1])
            && 
            (this.conditions[2][0] < pb) && (pb < this.conditions[2][1])
        )
        {
            return true;
        }
        else{
            return false;
        }
    }
}
