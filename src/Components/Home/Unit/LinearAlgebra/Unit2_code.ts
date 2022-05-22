import * as math from "mathjs"
export class Cal_Conjugategradient
{
    private Met1:Array<Array<number>>
    private Met2:Array<number>
    private LoopResult:Array<Array<Number>>
    private LoopError:Array<Array<Number>>
    private Starter:Array<number>
    constructor(met1:Array<Array<number>>,met2:Array<number>,start:Array<number>)
    {
        this.Met1 = JSON.parse(JSON.stringify(met1));
        this.Met2 = JSON.parse(JSON.stringify(met2));
        this.Starter = JSON.parse(JSON.stringify(start));
        this.LoopResult = [];
        this.LoopError = [];

    }
    public Result()
    {
        if(math.matrix(math.transpose(this.Met1)).toString() !== math.matrix(this.Met1).toString())
        {
            return [0,0,0]
        }
        let count:number = 0;
        let X:any = this.Starter
        X = math.matrix(X)
        let R:any = math.subtract(math.multiply(this.Met1,X),this.Met2);
        let D:any = math.multiply(R,-1);
        while(true && count<1000)
        {
            let lamda:any = math.multiply(math.divide(math.multiply(math.transpose(D),R),math.multiply(math.multiply(math.transpose(D),this.Met1),D)),-1);
            X = math.add(X,math.multiply(lamda,D));
            R = math.subtract(math.multiply(this.Met1,X),this.Met2);
            let alpha:any = math.divide(math.multiply(math.multiply(math.transpose(R),this.Met1),D),math.multiply(math.multiply(math.transpose(D),this.Met1),D));
            D = math.add(math.multiply(R,-1),math.multiply(alpha,D));
            let Error:any = math.sqrt(math.multiply(math.transpose(R),R))
            this.LoopResult.push(JSON.parse(X.toString()))
            this.LoopError.push([JSON.parse(Error.toString())])
            if(Error<0.000001)
            {
                break
            }
            count++;
        }   
        return [JSON.parse(X.toString()),this.LoopResult,this.LoopError];
    }
}
export class Cal_CramerRule
{
    private Met1:Array<Array<number>>
    private Met2:Array<number>
    constructor(met1:Array<Array<number>>,met2:Array<number>)
    {
        this.Met1 = JSON.parse(JSON.stringify(met1));
        this.Met2 = JSON.parse(JSON.stringify(met2));
    }
    private changeMet(row:number)
    {
        let dummy:Array<Array<number>> = JSON.parse(JSON.stringify(this.Met1))
        for(let i:number=0;i<this.Met1[0].length;i++)
        {
            dummy[i][row] = this.Met2[i];
        }
        return(math.det(dummy));
    }
    public Result()
    {
        let Result:Array<number> = [];
        let Loop_Result:Array<number> = [];
        let Loop_Error:Array<number> = [];
        let Det_All = math.det(this.Met1);
        for(let i:number = 0;i<this.Met1.length;i++)
        {
            Result.push(parseFloat((this.changeMet(i)/Det_All).toFixed(8)))
        }
        return [Result,Loop_Result,Loop_Error]
    }
}
export class Cal_JacobiIteration
{
    private Met1:Array<Array<number>>
    private Met2:Array<number>
    private LoopResult:Array<Array<Number>>
    private LoopError:Array<Array<Number>>
    private Starter:Array<number>
    constructor(met1:Array<Array<number>>,met2:Array<number>,start:Array<number>)
    {
        this.Met1 = JSON.parse(JSON.stringify(met1));
        this.Met2 = JSON.parse(JSON.stringify(met2));
        this.Starter = JSON.parse(JSON.stringify(start));
        this.LoopResult = [];
        this.LoopError = [];
    }
    private checkError(X:Array<number>,X_old:Array<number>)
    {
        let check:boolean = false;
        let dummy:Array<Number> = [];
        for(let i:number = 0;i<X.length;i++)
        {
            let Error_cal:Number = math.abs((X[i]-X_old[i])/X[i])
            dummy.push(Error_cal)
            if(Error_cal>0.0001)
            {
                check = true;
            }
        }
        if(dummy[0] !== Infinity)
        {
            this.LoopError.push(dummy)
        }
        return check;
    }
    public Result()
    {
        let X:Array<number> = this.Starter
        let X_Old:Array<number> = [];for(let i:number = 0;i<this.Met1.length;i++) X_Old.push(99999);
        let dummy:Array<number> = JSON.parse(JSON.stringify(X))
        let count:number = 0
        while(this.checkError(X,X_Old)&&count<=1000)
        {
            for(let i:number=0;i<this.Met1.length;i++)
            {
                let Result:number = this.Met2[i];
                for(let j:number=0;j<this.Met1[0].length;j++)
                {
                    
                    if(j!==i)
                    {
                        Result-=this.Met1[i][j]*X[j];
                    }
                }
                dummy[i] = parseFloat((Result/this.Met1[i][i]).toFixed(8));
            }
            X_Old  = JSON.parse(JSON.stringify(X))
            X = JSON.parse(JSON.stringify(dummy))
            this.LoopResult.push(X);
            count++
        }
        return [X,this.LoopResult,this.LoopError]
    }
}
export class Cal_GaussSeidelIteration
{
    private Met1:Array<Array<number>>
    private Met2:Array<number>
    private LoopResult:Array<Array<Number>>
    private LoopError:Array<Array<Number>>
    private Starter:Array<number>
    constructor(met1:Array<Array<number>>,met2:Array<number>,start:Array<number>)
    {
        this.Met1 = JSON.parse(JSON.stringify(met1));
        this.Met2 = JSON.parse(JSON.stringify(met2));
        this.Starter = JSON.parse(JSON.stringify(start));
        this.LoopResult = [];
        this.LoopError = [];
    }
    private checkError(X:Array<number>,X_old:Array<number>)
    {
        let check:boolean = false;
        let dummy:Array<Number> = [];
        for(let i:number = 0;i<X.length;i++)
        {
            let Error_cal:Number = math.abs((X[i]-X_old[i])/X[i])
            dummy.push(Error_cal)
            if(Error_cal>0.0001)
            {
                check = true;
            }
        }
        let check_push:boolean = true;
        dummy.forEach(d=>
        {
            if(d === Infinity)
            {
                check_push = false;
            }
        })
        if(check_push&&this.Met1.length===dummy.length)
        {
            this.LoopError.push(dummy)
        }
        return check;
    }
    public Result()
    {
        let X:Array<number> =this.Starter;
        let X_Old:Array<number> = [];for(let i:number = 0;i<this.Met1.length;i++) X_Old.push(99999);
        let count:number = 0
        while(this.checkError(X,X_Old)&&count<=1000)
        {
            for(let i:number=0;i<this.Met1.length;i++)
            {
                let Result:number = this.Met2[i];
                for(let j:number=0;j<this.Met1[0].length;j++)
                {
                    
                    if(j!==i)
                    {
                        Result-=this.Met1[i][j]*X[j];
                    }
                }
                X_Old[i] = X[i];
                X[i] = parseFloat((Result/this.Met1[i][i]).toFixed(8));
            }
            this.LoopResult.push(JSON.parse(JSON.stringify(X)))
            count++
        }
        return [X,this.LoopResult,this.LoopError]
    }
}
export class Cal_GaussElimination
{
    private Met1:Array<Array<number>>
    private Met2:Array<number>
    private LoopResult:Array<Array<Number>>
    private LoopError:Array<Array<Number>>
    constructor(met1:Array<Array<number>>,met2:Array<number>)
    {
        this.Met1 = JSON.parse(JSON.stringify(met1));
        this.Met2 = JSON.parse(JSON.stringify(met2));
        this.LoopResult = [];
        this.LoopError = [];
    }
    public Result()
    {
        let X:Array<number> = [];for(let i:number = 0;i<this.Met1.length;i++) X.push(0);
        for(let i:number=0;i<this.Met1.length;i++)
        {
            for(let j:number=0;j<i;j++)
            {
                let dummy:number = this.Met1[i][j]
                for(let k:number=0;k<this.Met1[i].length;k++)
                {
                    if( (dummy*math.abs(this.Met1[j][j])>0 && this.Met1[j][j]*math.abs(dummy)>0) || (dummy*math.abs(this.Met1[j][j])<0&&this.Met1[j][j]*math.abs(dummy)<0) )
                    {
                        this.Met1[i][k] = (this.Met1[i][k]*math.abs(this.Met1[j][j]))-(this.Met1[j][k]*math.abs(dummy))
                        if(k===this.Met1[i].length-1)
                        {
                            this.Met2[i] = this.Met2[i]*math.abs(this.Met1[j][j])-(this.Met2[j]*math.abs(dummy))
                        }
                    }
                    else
                    {
                        this.Met1[i][k] = (this.Met1[i][k]*math.abs(this.Met1[j][j]))+(this.Met1[j][k]*math.abs(dummy))
                        if(k===this.Met1[i].length-1)
                        {
                            this.Met2[i] = this.Met2[i]*math.abs(this.Met1[j][j])+(this.Met2[j]*math.abs(dummy))
                        }
                    }
                }
            }
        }
        for(let i:number = this.Met1.length-1;i>=0;i--)
        {
            let temp:number = 0;
            for(let j:number=0;j<this.Met1[i].length;j++)
            {
                if(j!==i)
                {
                    temp+=this.Met1[i][j]*this.Met2[j]
                }
            }
            if(temp>0)
            {
                this.Met2[i] = (this.Met2[i]-math.abs(temp))/this.Met1[i][i]
            }
            else{
                this.Met2[i] = (this.Met2[i]+math.abs(temp))/this.Met1[i][i]
            }
        }
        return [this.Met2,this.LoopResult,this.LoopError]
    }
}

export class Cal_GaussJordan
{
    private Met1:Array<Array<number>>
    private Met2:Array<number>
    private LoopResult:Array<Array<Number>>
    private LoopError:Array<Array<Number>>
    constructor(met1:Array<Array<number>>,met2:Array<number>)
    {
        this.Met1 = JSON.parse(JSON.stringify(met1));
        this.Met2 = JSON.parse(JSON.stringify(met2));
        this.LoopResult = [];
        this.LoopError = [];
    }
    public Result()
    {
        let X:Array<number> = [];for(let i:number = 0;i<this.Met1.length;i++) X.push(0);
        for(let i:number=0;i<this.Met1.length;i++)
        {
            for(let j:number=0;j<i;j++)
            {
                let dummy:number = this.Met1[i][j]
                for(let k:number=0;k<this.Met1[i].length;k++)
                {
                    if( (dummy*math.abs(this.Met1[j][j])>0 && this.Met1[j][j]*math.abs(dummy)>0) || (dummy*math.abs(this.Met1[j][j])<0&&this.Met1[j][j]*math.abs(dummy)<0) )
                    {
                        this.Met1[i][k] = (this.Met1[i][k]*math.abs(this.Met1[j][j]))-(this.Met1[j][k]*math.abs(dummy))
                        if(k===this.Met1[i].length-1)
                        {
                            this.Met2[i] = this.Met2[i]*math.abs(this.Met1[j][j])-(this.Met2[j]*math.abs(dummy))
                        }
                    }
                    else
                    {
                        this.Met1[i][k] = (this.Met1[i][k]*math.abs(this.Met1[j][j]))+(this.Met1[j][k]*math.abs(dummy))
                        if(k===this.Met1[i].length-1)
                        {
                            this.Met2[i] = this.Met2[i]*math.abs(this.Met1[j][j])+(this.Met2[j]*math.abs(dummy))
                        }
                    }
                }
            }
        }
        for(let i:number=this.Met1.length-1;i>=0;i--)
        {
            for(let j:number=this.Met1.length-1;j>i;j--)
            {
                let dummy:number = this.Met1[i][j]
                for(let k:number=0;k<this.Met1[i].length;k++)
                {
                    if( (dummy*math.abs(this.Met1[j][j])>0 && this.Met1[j][j]*math.abs(dummy)>0) || (dummy*math.abs(this.Met1[j][j])<0&&this.Met1[j][j]*math.abs(dummy)<0) )
                    {
                        this.Met1[i][k] = (this.Met1[i][k]*math.abs(this.Met1[j][j]))-(this.Met1[j][k]*math.abs(dummy))
                        if(k===this.Met1[i].length-1)
                        {
                            this.Met2[i] = this.Met2[i]*math.abs(this.Met1[j][j])-(this.Met2[j]*math.abs(dummy))
                        }
                    }
                    else
                    {
                        this.Met1[i][k] = (this.Met1[i][k]*math.abs(this.Met1[j][j]))+(this.Met1[j][k]*math.abs(dummy))
                        if(k===this.Met1[i].length-1)
                        {
                            this.Met2[i] = this.Met2[i]*math.abs(this.Met1[j][j])+(this.Met2[j]*math.abs(dummy))
                        }
                    }
                }
            }
        }
        for(let i:number = this.Met1.length-1;i>=0;i--)
        {
            let temp:number = 0;
            for(let j:number=0;j<this.Met1[i].length;j++)
            {
                if(j!==i)
                {
                    temp+=this.Met1[i][j]*this.Met2[j]
                }
            }
            if(temp>0)
            {
                this.Met2[i] = (this.Met2[i]-math.abs(temp))/this.Met1[i][i]
            }
            else{
                this.Met2[i] = (this.Met2[i]+math.abs(temp))/this.Met1[i][i]
            }
        }
        return [this.Met2,this.LoopResult,this.LoopError]
    }
}
export class Cal_LUdecomposition
{
    private Met1:Array<Array<number>>
    private Met2:Array<number>
    constructor(met1:Array<Array<number>>,met2:Array<number>)
    {
        this.Met1 = JSON.parse(JSON.stringify(met1));
        this.Met2 = JSON.parse(JSON.stringify(met2));
    }
    public Result()
    {
        let Loop_Result:Array<number> = [];
        let Loop_Error:Array<number> = [];
        let Lower:Array<Array<number>> = Array(this.Met1.length).fill(0).map(x=>Array(this.Met1[0].length).fill(0));
        let Upper:Array<Array<number>> = Array(this.Met1.length).fill(0).map(x=>Array(this.Met1[0].length).fill(0));
        let Y:Array<number> = Array(this.Met1.length).fill(0);
        let X:Array<number> = Array(this.Met1.length).fill(0);
        for(let A:number = 0;A<this.Met1.length;A++)
        {
            for(let B:number = A;B<this.Met1[0].length;B++)
            {
                let sum:number = 0;
                for(let C:number=0;C<A;C++)
                {
                    sum+= (Lower[A][C]*Upper[C][B]);
                }
                Upper[A][B] = this.Met1[A][B] - sum;
            }
            for(let B:number = A;B<this.Met1[0].length;B++)
            {
                if(A===B)
                {
                    Lower[A][A] = 1;
                }
                else
                {
                    let sum:number = 0;
                    for(let C:number=0;C<A;C++)
                    {
                        sum+= (Lower[B][C]*Upper[C][A]);
                    }
                    Lower[B][A] = (this.Met1[B][A] - sum )/Upper[A][A];
                }
            }
        }
        for(let i =0;i<this.Met1.length;i++)
        {
            let sum =0;
            for(let j= 0;j<this.Met1[0].length;j++)
            {
                if(j!==i)
                {
                    sum+=Lower[i][j]*Y[j];
                }
            }
            Y[i]=(this.Met2[i]-sum)/Lower[i][i];
        }
        console.log(Y)
        for(let i =this.Met1.length-1;i>=0;i--)
        {
            let sum =0;
            for(let j= 0;j<this.Met1[0].length;j++)
            {
                if(j!==i)
                {
                    sum+=Upper[i][j]*X[j];
                }
            }
            X[i]=parseFloat(((Y[i]-sum)/Upper[i][i]).toPrecision(15));
        }
        return [X,Loop_Result,Loop_Error]
    }
}