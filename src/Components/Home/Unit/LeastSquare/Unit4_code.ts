import * as math from "mathjs"
import { Cal_GaussElimination } from "../LinearAlgebra/Unit2_code";


export class Cal_LinearRegression{
    private X:Array<number>
    private Y:Array<number>
    private X_CAL:number
    constructor(x:Array<number>,y:Array<number>,x_cal:string)
    {
        this.X = JSON.parse(JSON.stringify(x));
        this.Y = JSON.parse(JSON.stringify(y));
        this.X_CAL = parseFloat(x_cal);
        console.log(this.X_CAL)
    }
    public Result():number
    {
        let XMet = Array.from(Array(2),()=>Array(2).fill(0));
        let YMet = Array(2).fill(0);
        XMet[0][0]= this.X.length;
        for(let i =0;i<this.Y.length;i++)
        {
            XMet[0][1] +=this.X[i];
            XMet[1][0] +=this.X[i];
            XMet[1][1] +=math.pow(this.X[i],2);
            YMet[0] += this.Y[i];
            YMet[1] += this.X[i]*this.Y[i];
        }
        let Result:any,Loop_Result:any,Loop_Error:any;
        let GaussElimination:Cal_GaussElimination = new Cal_GaussElimination(XMet,YMet) as Cal_GaussElimination;
        [Result,Loop_Result,Loop_Error] = GaussElimination.Result()
        console.log(XMet,YMet)
        return Result[0]+(this.X_CAL*Result[1]);
    }
}

export class Cal_PolynomialRegression{
    private X:Array<number>
    private Y:Array<number>
    private X_CAL:number
    constructor(x:Array<number>,y:Array<number>,x_cal:string)
    {
        this.X = JSON.parse(JSON.stringify(x));
        this.Y = JSON.parse(JSON.stringify(y));
        this.X_CAL = parseFloat(x_cal);
        console.log(this.X_CAL)
    }
    public Result():number
    {
        let XMet = Array.from(Array(3),()=>Array(3).fill(0));
        let YMet = Array(3).fill(0);
        XMet[0][0]= this.X.length;
        for(let i =0;i<this.Y.length;i++)
        {
            XMet[0][1] +=this.X[i];
            XMet[0][2] +=math.pow(this.X[i],2);
            XMet[1][0] +=this.X[i];
            XMet[1][1] +=math.pow(this.X[i],2);
            XMet[1][2] +=math.pow(this.X[i],3);
            XMet[2][0] +=math.pow(this.X[i],2);
            XMet[2][1] +=math.pow(this.X[i],3);
            XMet[2][2] +=math.pow(this.X[i],4);
            YMet[0] += this.Y[i];
            YMet[1] += this.X[i]*this.Y[i];
            YMet[2] += (math.pow(this.X[i],2) as number)*this.Y[i];
        }
        let Result:any,Loop_Result:any,Loop_Error:any;
        let GaussElimination:Cal_GaussElimination = new Cal_GaussElimination(XMet,YMet) as Cal_GaussElimination;
        [Result,Loop_Result,Loop_Error] = GaussElimination.Result()
        console.log(XMet,YMet)
        return Result[0]+(this.X_CAL*Result[1])+(Result[2]*(math.pow(this.X_CAL,2) as number));
    }
}

export class Cal_MultipleLinearRegression{
    private X:Array<Array<number>>
    private Y:Array<number>
    private X_CAL:Array<number>
    constructor(x:Array<Array<number>>,y:Array<number>,x_cal:string)
    {
        this.X = JSON.parse(JSON.stringify(x));
        this.Y = JSON.parse(JSON.stringify(y));
        this.X_CAL = JSON.parse("["+x_cal+"]");;
    }
    public Result():number
    {
        let XMet = Array.from(Array(this.X.length+1),()=>Array(this.X.length+1).fill(0));
        let YMet = Array(this.X.length+1).fill(0);
        // XMet[0][0]= this.X.length;
        // for(let i =0;i<this.Y.length;i++)
        // {
        //     XMet[0][1] +=this.X[0][i];
        //     XMet[0][2] +=this.X[1][i];
        //     XMet[0][3] +=this.X[2][i];
        //     XMet[1][0] +=this.X[0][i];
        //     XMet[1][1] +=this.X[0][i]*this.X[0][i];
        //     XMet[1][2] +=this.X[0][i]*this.X[1][i];
        //     XMet[1][3] +=this.X[0][i]*this.X[2][i];
        //     XMet[2][0] +=this.X[1][i];
        //     XMet[2][1] +=this.X[1][i]*this.X[0][i];
        //     XMet[2][2] +=this.X[1][i]*this.X[1][i];
        //     XMet[2][3] +=this.X[1][i]*this.X[2][i];
        //     XMet[3][0] +=this.X[2][i];
        //     XMet[3][1] +=this.X[2][i]*this.X[0][i];
        //     XMet[3][2] +=this.X[2][i]*this.X[1][i];
        //     XMet[3][3] +=this.X[2][i]*this.X[2][i];
        //     YMet[0] += this.Y[i];
        //     YMet[1] += this.X[0][i]*this.Y[i];
        //     YMet[2] += this.X[1][i]*this.Y[i];
        //     YMet[3] += this.X[2][i]*this.Y[i];
        // }
        // console.log(XMet);
        // XMet = Array.from(Array(this.X.length+1),()=>Array(this.X.length+1).fill(0));
        for(let i = 0;i<this.X.length+1;i++)
        {
            for(let j = 0;j<this.X.length+1;j++)
            {
                for(let k = 0;k<this.Y.length;k++)
                {
                    if(i===0&&j===0)
                    {
                        XMet[i][j]+=1;
                    }
                    else if(i===0)
                    {
                        XMet[i][j]+=this.X[j-1][k];
                    }
                    else if(j===0)
                    {   
                        XMet[i][j]+=this.X[i-1][k];
                    }
                    else
                    {
                        XMet[i][j]+=(this.X[i-1][k]*this.X[j-1][k])
                    }
                }
            }
        }
        for(let i = 0;i<this.X.length+1;i++)
        {
            for(let j = 0;j<this.Y.length;j++)
            {
                if(i===0)
                {
                    YMet[i]+=this.Y[j];
                }
                else
                {
                    YMet[i]+=(this.X[i-1][j]*this.Y[j]);
                }
            }
        }
        let Result:any,Loop_Result:any,Loop_Error:any;
        let GaussElimination:Cal_GaussElimination = new Cal_GaussElimination(XMet,YMet) as Cal_GaussElimination;
        [Result,Loop_Result,Loop_Error] = GaussElimination.Result();
        let Cal_Result = 0;
        for(let i =0;i<Result.length;i++)
        {
            if(i===0)
            {
                Cal_Result+=Result[i]
            }
            else
            {
                Cal_Result+=(Result[i]*this.X_CAL[i-1])
            }
        }
        return Cal_Result;
    }
}