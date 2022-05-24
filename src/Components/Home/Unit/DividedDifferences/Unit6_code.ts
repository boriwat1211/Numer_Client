import * as math from "mathjs"
export class Cal_DividedDifference
{
    private Question:string;
    private Order:string;
    private X:number;
    private OrderError:string;
    private Height:number;
    private Point:string
    constructor(question:string,order:string,x:string,ordererror:string,height:string,point:string)
    {
        this.Question = question;
        this.Order = order;
        this.X = parseFloat(x);
        this.OrderError = ordererror;
        this.Height = parseFloat(height);
        this.Point = point;
    }
    private cal(X:number)
    {
        return math.evaluate(this.Question,{x:X})
    }
    private TrueResult()
    {
        let start = this.Question;
        for(let i =1;i<=parseInt(this.Order);i++)
        {
            start = math.derivative(start, 'x').toString()
        }
        console.log(start)
        return math.evaluate(start,{x:this.X})
    }
    public Result()
    {
        this.TrueResult()
        if(this.OrderError === "O(h)")
        {
            if(this.Point==="Forward")
            {
                switch(this.Order)
                {
                    case "1":
                        return [(this.cal(this.X+this.Height)-this.cal(this.X))/this.Height,this.TrueResult()];
                    case "2":
                        return [(this.cal(this.X+(2*this.Height))-(2*this.cal(this.X+this.Height))+this.cal(this.X))/(this.Height^2),this.TrueResult()];
                    case "3":
                        return [(this.cal(this.X+(3*this.Height))-(3*this.cal(this.X+(2*this.Height)))+(3*this.cal(this.X+this.Height))-this.cal(this.X))/(this.Height^3),this.TrueResult()];
                    case "4":
                        return [(this.cal(this.X+(4*this.Height))-(4*this.cal(this.X+(3*this.Height)))+(6*this.cal(this.X+(2*this.Height)))-(4*this.cal(this.X+this.Height))+this.cal(this.X))/(this.Height^4),this.TrueResult()];
                }
            }
            else
            {
                switch(this.Order)
                {
                    case "1":
                        return [(this.cal(this.X)-this.cal(this.X-this.Height))/this.Height,this.TrueResult()];
                    case "2":
                        return [(this.cal(this.X)-(2*this.cal(this.X-(1*this.Height)))+this.cal(this.X-(2*this.Height)))/(this.Height^2),this.TrueResult()];
                    case "3":
                        return [(this.cal(this.X)-(3*this.cal(this.X-(1*this.Height)))+(3*this.cal(this.X-(2*this.Height)))-this.cal(this.X-(3*this.Height)))/(this.Height^3),this.TrueResult()];
                    case "4":
                        return [(this.cal(this.X)-(4*this.cal(this.X-(1*this.Height)))+(6*this.cal(this.X-(2*this.Height)))-(4*this.cal(this.X-(3*this.Height)))+this.cal(this.X-(4*this.Height)))/(this.Height^4),this.TrueResult()];
                }
            }
        }
        else if(this.OrderError === "O(h^2)")
        {
            console.log("test");
            if(this.Point==="Central")
            {
                switch(this.Order)
                {
                    case "1":
                        return [(this.cal(this.X+this.Height)-this.cal(this.X-this.Height))/(2*this.Height),this.TrueResult()];
                    case "2":
                        return [(this.cal(this.X+this.Height)-(2*this.cal(this.X))+this.cal(this.X-this.Height))/(this.Height^2),this.TrueResult()];
                    case "3":
                        return [(this.cal(this.X+(2*this.Height))-(2*this.cal(this.X+this.Height))+(2*this.cal(this.X-this.Height))-this.cal(this.X-(2*this.Height)))/(2*(this.Height^3)),this.TrueResult()];
                    case "4":
                        return [(this.cal(this.X+(2*this.Height))-(4*this.cal(this.X+this.Height))+(6*this.cal(this.X))-(4*this.cal(this.X-this.Height))+this.cal(this.X-(2*this.Height)))/(this.Height^4),this.TrueResult()];
                }
            }
            else if(this.Point==="Forward")
            {
                switch(this.Order)
                {
                    case "1":
                        return [(-this.cal(this.X+(2*this.Height))+(4*this.cal(this.X+this.Height))-(3*this.cal(this.X)))/(2*this.Height),this.TrueResult()];
                    case "2":
                        return [(-this.cal(this.X+(3*this.Height))+(4*this.cal(this.X+(2*this.Height)))-(5*this.cal(this.X+this.Height))+(2*this.cal(this.X)))/(this.Height^2),this.TrueResult()];
                    case "3":
                        return [(-(3*this.cal(this.X+(4*this.Height)))+(14*this.cal(this.X+(3*this.Height)))-(24*this.cal(this.X+(2*this.Height)))+(18*this.cal(this.X+this.Height))-(5*this.cal(this.X)))/(2*(this.Height^3)),this.TrueResult()];
                    case "4":
                        return [(-(2*this.cal(this.X+(5*this.Height)))+(11*this.cal(this.X+(4*this.Height)))-(24*this.cal(this.X+(3*this.Height)))+(26*this.cal(this.X+(2*this.Height)))-(14*this.cal(this.X+this.Height))+(3*this.cal(this.X)))/(this.Height^4),this.TrueResult()];
                }
            }
            else
            {
                switch(this.Order)
                {
                    case "1":
                        return [((3*this.cal(this.X))-(4*this.cal(this.X-this.Height))+this.cal(this.X-(2*this.Height)))/(2*this.Height),this.TrueResult()];
                    case "2":
                        return [((2*this.cal(this.X))-(5*this.cal(this.X-(1*this.Height)))+(4*this.cal(this.X-(2*this.Height)))-this.cal(this.X-(3*this.Height)))/(this.Height^2),this.TrueResult()];
                    case "3":
                        return [((5*this.cal(this.X))-(18*this.cal(this.X-(1*this.Height)))+(24*this.cal(this.X-(2*this.Height)))-(14*this.cal(this.X-(3*this.Height)))+(3*this.cal(this.X-(4*this.Height))))/(2*(this.Height^3)),this.TrueResult()];
                    case "4":
                        return [((3*this.cal(this.X))-(14*this.cal(this.X-(1*this.Height)))+(26*this.cal(this.X-(2*this.Height)))-(24*this.cal(this.X-(3*this.Height)))+(11*this.cal(this.X-(4*this.Height)))-(2*this.cal(this.X-(5*this.Height))))/(this.Height^4),this.TrueResult()];
                }
            }
        }
        else
        {
            switch(this.Order)
            {
                case "1":
                    return [(-this.cal(this.X+(2*this.Height))+(8*this.cal(this.X+this.Height))-(8*this.cal(this.X-this.Height))+(this.cal(this.X-(2*this.Height))))/(this.Height*12),this.TrueResult()];
                case "2":
                    return [(-(this.cal(this.X+(2*this.Height)))+(16*this.cal(this.X+(1*this.Height)))-(30*this.cal(this.X))+(16*this.cal(this.X-this.Height))-(this.cal(this.X-(this.Height*2))))/(12*(this.Height^2)),this.TrueResult()];
                case "3":
                    return [(-(this.cal(this.X+(3*this.Height)))+(8*this.cal(this.X+(2*this.Height)))-(13*this.cal(this.X+(1*this.Height)))+(13*this.cal(this.X-(1*this.Height)))-(8*this.cal(this.X-(this.Height*2)))+(this.cal(this.X-(this.Height*3))))/(8*(this.Height^3)),this.TrueResult()];
                case "4":
                    return [(-(this.cal(this.X+(3*this.Height)))+(12*this.cal(this.X+(2*this.Height)))-(39*this.cal(this.X+(1*this.Height)))+(56*this.cal(this.X))-(39*this.cal(this.X-(1*this.Height)))+(12*this.cal(this.X-(this.Height*2)))-(this.cal(this.X-(this.Height*3))))/(6*(this.Height^4)),this.TrueResult()];
            }
        }
        
    }
}