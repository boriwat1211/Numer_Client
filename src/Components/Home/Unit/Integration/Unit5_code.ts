import * as math from "mathjs"
export class Cal_Trapzoidal
{
    private Question:string;
    private L:number;
    private R:number;
    private N:number;
    constructor(Q:string,l:string,r:string,n:string)
    {
        this.Question = Q;
        this.L = parseFloat(l);
        this.R = parseFloat(r);
        this.N = parseFloat(n);
    }
    private cal(X:number)
    {
        return math.evaluate(this.Question,{x:X})
    }
    public Result()
    {
        let jump = (this.R-this.L)/this.N;
        console.log(jump)
        let hight = (jump/2);
        let Subresult:number =0;
        let result:number= 0;
        for(let i = this.L;i<=this.R;i+=jump)
        {
            if(i!==this.L&&i!==this.R)
            {
                Subresult+=this.cal(i)
            }
            else
            {
                result+=(this.cal(i));
            }
            
        }
        return hight*(result+(2*Subresult))
    }
}
export class Cal_Simpson
{
    private Question:string;
    private L:number;
    private R:number;
    private N:number;
    constructor(Q:string,l:string,r:string,n:string)
    {
        this.Question = Q;
        this.L = parseFloat(l);
        this.R = parseFloat(r);
        this.N = parseFloat(n);
    }
    private cal(X:number)
    {
        return math.evaluate(this.Question,{x:X})
    }
    public Result()
    {
        let jump = (this.R-this.L)/this.N;
        console.log(jump)
        let hight = (jump/3);
        let even:number = 0;
        let odd:number = 0;
        let result:number= 0;
        let count =0;
        for(let i = this.L;i<=this.R;i+=jump)
        {
            if(i!==this.L&&i!==this.R)
            {
                if(count%2===0)
                {
                    even+=this.cal(i);
                }
                else
                {
                    odd+=this.cal(i);
                }
            }
            else
            {
                result+=(this.cal(i));
            }
            count++;
        }
        return (hight)*(result+(4*odd)+(2*even))
    }
}