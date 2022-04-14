class Cal_ALL
{
    public static Mem:Array<Array<number>> = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
    ]
    public static Result(x:Array<number>,y:Array<number>,x_cal:number,point:Array<number>,count1:number,count2:number):number
    { 
        if(count1-count2 === 0)
        {
            return y[point[count1]]
        }
        else if(this.Mem[count1][count2]!==0)
        {
            return this.Mem[count1][count2]
        }
        else 
        {
            this.Mem[count1][count2] = ((this.Result(x,y,x_cal,point,count1,count2+1)-this.Result(x,y,x_cal,point,count1-1,count2))/(x[point[count1]]-x[point[count2]]))
            return this.Mem[count1][count2]
        }
    }
    public static reset()
    {
        this.Mem =
        [
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
            [0,0,0,0,0,0,0,0,0,0],
        ]
    }
}
export class Cal_NewtonDividedDifference
{
    private X:Array<number>
    private Y:Array<number>
    private X_CAL:number
    private Point:Array<number>
    constructor(x:string,y:string,x_cal:string,point:string)
    {
        this.X = JSON.parse(x);
        this.Y = JSON.parse(y);
        this.X_CAL = parseFloat(x_cal);
        this.Point = JSON.parse(point);
        for(let i:number =0;i<this.Point.length;i++) this.Point[i]-=1
    }
    public Result():number
    {
        let temp:number = 0;
        Cal_ALL.reset();
        for(let i =0;i<this.Point.length;i++)
        { 
            let temp2:number = 1;
            for(let j = 0;j<i;j++)
            {
                temp2 = temp2*(this.X_CAL-this.X[this.Point[j]])
            }
            temp+=Cal_ALL.Result(this.X, this.Y, this.X_CAL, this.Point, i, 0)*temp2
        }
        return temp;
    }
}
export class Cal_LagrangeInterpolation
{
    private X:Array<number>
    private Y:Array<number>
    private X_CAL:number
    private Point:Array<number>
    constructor(x:string,y:string,x_cal:string,point:string)
    {
        this.X = JSON.parse(x);
        this.Y = JSON.parse(y);
        this.X_CAL = parseFloat(x_cal);
        this.Point = JSON.parse(point);
        for(let i:number =0;i<this.Point.length;i++) this.Point[i]-=1
    }
    public Result():number
    {
        let result:number = 0;
        for(let i =0;i<this.Point.length;i++)
        {
            let temp1:number = 1,temp2:number = 1;
            for(let j = 0;j<this.Point.length;j++)
            {
                if(this.Point[j]!==this.Point[i])
                {
                    temp1 *= (this.X[this.Point[j]]-this.X_CAL)
                    temp2 *= (this.X[this.Point[j]]-this.X[this.Point[i]])
                }
            }
            console.log(this.Y[this.Point[i]]*(temp1/temp2))
            result+= this.Y[this.Point[i]]*(temp1/temp2);
        }
        return result;
    }
}