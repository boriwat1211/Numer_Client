import * as math from "mathjs"
export class Cal_Bitsection
{
    private Question:string;
    private XL:number;
    private XR:number;
    private X0:number;
    private Diff_Q:string;
    private X1:number;
    constructor(Q:string,xl:string,xr:string,x0:string,diff:string,x1:string)
    {
        this.Question = Q;
        this.XL = parseFloat(xl);
        this.XR = parseFloat(xr);
        this.X0 = parseFloat(x0);
        this.Diff_Q = diff;
        this.X1 = parseFloat(x1)
    }
    private cal(X:number)
    {
        return math.evaluate(this.Question,{x:X})
    }
    public Result()
    {
        let Result_loop:Array<number> = [];
        let Error:Array<number>  = [];
        let left:Array<number> = [];
        let right:Array<number> = [];
        let M:number = (this.XL+this.XR)/2 , old_M:number = 0 , L:number = this.XL , R:number = this.XR;
        Result_loop.push(M);
        Error.push(math.abs((M-old_M)/M));
        left.push(L)
        right.push(R)
        while(math.abs((M-old_M)/M)>0.000001)
        {
            if(this.cal(M)*this.cal(R)>0)
            {
                old_M = R;
                R = M;
            }
            else
            {
                old_M = L;
                L = M;
            }
            M = (L+R)/2;
            Result_loop.push(M);
            Error.push(math.abs((M-old_M)/M));
            left.push(L);
            right.push(R);
        }
        return [M,Result_loop,Error,left,right]
    }
}
export class Cal_FalsePosition
{
    private Question:string;
    private XL:number;
    private XR:number;
    private X0:number;
    private Diff_Q:string;
    private X1:number;
    constructor(Q:string,xl:string,xr:string,x0:string,diff:string,x1:string)
    {
        this.Question = Q;
        this.XL = parseFloat(xl);
        this.XR = parseFloat(xr);
        this.X0 = parseFloat(x0);
        this.Diff_Q = diff;
        this.X1 = parseFloat(x1)
    }
    private cal(X:number)
    {
        return math.evaluate(this.Question,{x:X})
    }
    public Result()
    {
        let Result_loop:Array<number> = [];
        let Error:Array<number>  = [];
        let left:Array<number> = [];
        let right:Array<number> = [];
        let M:number = ((this.XL*this.cal(this.XR))-(this.XR*this.cal(this.XL)))/(this.cal(this.XR)-this.cal(this.XL)) , old_M:number = 0 , L:number = this.XL , R:number = this.XR;
        Result_loop.push(M);
        Error.push(math.abs((M-old_M)/M))
        left.push(L)
        right.push(R)
        while(math.abs((M-old_M)/M)>0.000001)
        {
            if(this.cal(M)*this.cal(R)>0)
            {
                old_M = R;
                R = M;
            }
            else
            {
                old_M = L;
                L = M;
            }
            M = ((L*this.cal(R))-(R*this.cal(L)))/(this.cal(R)-this.cal(L));
            Result_loop.push(M);
            Error.push(math.abs((M-old_M)/M))
            left.push(L)
            right.push(R)
        }
        return [M,Result_loop,Error,left,right]
    }
}
export class Cal_NewtonRaphson
{
    private Question:string;
    private XL:number;
    private XR:number;
    private X0:number;
    private Diff_Q:string;
    private X1:number;
    constructor(Q:string,xl:string,xr:string,x0:string,diff:string,x1:string)
    {
        this.Question = Q;
        this.XL = parseFloat(xl);
        this.XR = parseFloat(xr);
        this.X0 = parseFloat(x0);
        this.Diff_Q = diff;
        this.X1 = parseFloat(x1)
    }
    private cal(X:number)
    {
        return math.evaluate("x-(("+this.Question+")/("+this.Diff_Q+"))",{x:X})
    }
    public Result()
    {
        let Result_loop:Array<number> = [];
        let Error:Array<number> = [];
        let x_o:number = 9999,x:number = this.cal(this.X0)
        Result_loop.push(x);
        Error.push(math.abs((x-this.X0)/x))
        while(math.abs((x-x_o)/x)>0.000001)
        {
            x_o = x;
            x = this.cal(x);
            Result_loop.push(x)
            Error.push(math.abs((x-x_o)/x))
        }
        return [x,Result_loop,Error]
    }
}
export class Cal_OnePointiteration
{
    private Question:string;
    private XL:number;
    private XR:number;
    private X0:number;
    private Diff_Q:string;
    private X1:number;
    constructor(Q:string,xl:string,xr:string,x0:string,diff:string,x1:string)
    {
        this.Question = Q;
        this.XL = parseFloat(xl);
        this.XR = parseFloat(xr);
        this.X0 = parseFloat(x0);
        this.Diff_Q = diff;
        this.X1 = parseFloat(x1)
    }
    private cal(X:number)
    {
        return math.evaluate(this.Question,{x:X})
    }
    public Result()
    {
        let Result_loop:Array<number> = [];
        let Error:Array<number> = [];
        let x_o:number = 9999,x:number = this.cal(this.X0)
        Result_loop.push(x);
        Error.push(math.abs((x-this.X0)/x))
        while(math.abs((x-x_o)/x)>0.000001)
        {
            x_o = x;
            x = this.cal(x);
            Result_loop.push(x)
            Error.push(math.abs((x-x_o)/x))
        }
        return [x,Result_loop,Error]
    }
}
export class Cal_Secant
{
    private Question:string;
    private XL:number;
    private XR:number;
    private X0:number;
    private Diff_Q:string;
    private X1:number;
    constructor(Q:string,xl:string,xr:string,x0:string,diff:string,x1:string)
    {
        this.Question = Q;
        this.XL = parseFloat(xl);
        this.XR = parseFloat(xr);
        this.X0 = parseFloat(x0);
        this.Diff_Q = diff;
        this.X1 = parseFloat(x1)
    }
    private cal(X:number)
    {
        return math.evaluate(this.Question,{x:X})
    }
    public Result()
    {
        let Result_loop:Array<number> = [];
        let Error:Array<number> = [];
        let x_o:number = this.X0,x:number = this.X1
        Result_loop.push(x);
        Error.push(math.abs((x-x_o)/x))
        while(math.abs((x-x_o)/x)>0.000001)
        {
            let cal:number = x-(this.cal(x)/((this.cal(x_o)-this.cal(x))/(x_o-x)));
            x_o = x;
            x = cal
            Result_loop.push(x)
            Error.push(math.abs((x-x_o)/x))
        }
        return [x,Result_loop,Error]
    }
}