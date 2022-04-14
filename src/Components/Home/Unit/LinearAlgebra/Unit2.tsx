import axios from "axios";
import React, { ChangeEvent } from "react";
import * as math from 'mathjs'
import { MathJax, MathJaxContext} from "better-react-mathjax";
import { Cal_Conjugategradient, Cal_CramerRule, Cal_GaussElimination, Cal_GaussJordan, Cal_GaussSeidelIteration, Cal_JacobiIteration } from "./Unit2_code";
import Unit2Chart from "./Unit2_Charts";
interface CramerRule
{
   
}
interface JacobiIteration
{
    Starter:Array<number>
}
interface GaussSeidelIteration
{
    Starter:Array<number>
}   
interface Conjugategradient
{
    Starter:Array<number>
}
interface GaussElimination
{

}
interface GaussJordan
{

}
interface ServerResponse_Data
{
    Name:String,
    Context:String,
    Question1:Array<String>
    Question2:Array<String>
}
// interface ServerResponse_Result
// {
//     Result:Array<number>,
//     Loop_Result:Array<Array<number>>
//     Loop_Error:Array<Array<number>>
// }
interface Iprops
{
    Header:String,
    SubHeader:String
    Token:String
}
interface Cutom_list
{
    CramerRule: CramerRule
    JacobiIteration:JacobiIteration
    GaussSeidelIteration:GaussSeidelIteration
    Conjugategradient:Conjugategradient
    GaussElimination:GaussElimination
    GaussJordan:GaussJordan
}
interface Istate
{
    Data:{
        Name:String,
        Context:String,
        Question1:Array<String>
        Question2:Array<String>
    },
    Header:String,
    SubHeader:String,
    Result:Array<number>,
    LoopResult:Array<Array<number>>,
    LoopError:Array<Array<number>>
    Custom_Para:boolean,
    Cerrent_Question1:Array<Array<number>>,
    Cerrent_Question2:Array<number>,
    Custom_Para_list:Cutom_list,
    Check_code:boolean,
    dimensionX:string,
    dimensionY:string
}
class Unit2 extends React.Component<Iprops,Istate>
{
    constructor(props:Iprops)
    {
        super(props)
        const custom_param:Cutom_list = {
            CramerRule:
            {
                
            },
            JacobiIteration:
            {
                Starter:[]
            },
            GaussSeidelIteration:
            {
                Starter:[]
            },
            Conjugategradient:
            {
                Starter:[]
            },
            GaussElimination:
            {

            },
            GaussJordan:
            {

            }
        }
        this.state=
        {
            Data:{
                Name:" ",
                Context:" ",
                Question1:[],
                Question2:[]
            },
            Header:this.props.Header,
            SubHeader:this.props.SubHeader,
            Result:[],
            LoopResult:[],
            LoopError:[],
            Custom_Para:false,
            Cerrent_Question1:[],
            Cerrent_Question2:[],
            Custom_Para_list:custom_param,
            Check_code:false,
            dimensionX:"",
            dimensionY:"",
        }   

        this.get_Data() 
    }
    Get_Result = () =>
    {
        let Result:any,Loop_Result:any,Loop_Error:any;
        switch (this.state.SubHeader)
        {
            case "CramerRule":
                // axios.get<ServerResponse_Result>("http://localhost:6060/Result/"+this.state.Header+"/"+this.state.SubHeader,
                // {
                //     params:{
                //         Question1:this.state.Cerrent_Question1,
                //         Question2:this.state.Cerrent_Question2
                //     },
                //     headers: {
                //         Authorization: 'Bearer ' + this.props.Token 
                //     }
                // }).then((res)=>{this.setState({Result:res.data.Result},()=>{this.setState({LoopResult:res.data.Loop_Result},()=>this.setState({LoopError:res.data.Loop_Error}))})})
                let CramerRule:Cal_CramerRule = new Cal_CramerRule(this.state.Cerrent_Question1,this.state.Cerrent_Question2) as Cal_CramerRule;
                [Result,Loop_Result,Loop_Error] = CramerRule.Result()
                this.setState({Result:Result},()=>{this.setState({LoopResult:Loop_Result},()=>{this.setState({LoopError:Loop_Error})})})
                break
            case "JacobiIteration":
                // axios.get<ServerResponse_Result>("http://localhost:6060/Result/"+this.state.Header+"/"+this.state.SubHeader,
                // {
                //     params:{
                //         Question1:this.state.Cerrent_Question1,
                //         Question2:this.state.Cerrent_Question2
                //     },
                //     headers: {
                //         Authorization: 'Bearer ' + this.props.Token 
                //     }
                // }).then((res)=>{this.setState({Result:res.data.Result},()=>{this.setState({LoopResult:res.data.Loop_Result},()=>this.setState({LoopError:res.data.Loop_Error}))})})
                let JacobiIteration:Cal_JacobiIteration = new Cal_JacobiIteration(this.state.Cerrent_Question1,this.state.Cerrent_Question2,this.state.Custom_Para_list.JacobiIteration.Starter) as Cal_JacobiIteration;
                [Result,Loop_Result,Loop_Error] = JacobiIteration.Result()
                this.setState({Result:Result},()=>{this.setState({LoopResult:Loop_Result},()=>{this.setState({LoopError:Loop_Error})})})
                break
            case "GaussSeidelIteration":
                // axios.get<ServerResponse_Result>("http://localhost:6060/Result/"+this.state.Header+"/"+this.state.SubHeader,
                // {
                //     params:{
                //         Question1:this.state.Cerrent_Question1,
                //         Question2:this.state.Cerrent_Question2
                //     },
                //     headers: {
                //         Authorization: 'Bearer ' + this.props.Token 
                //     }
                // }).then((res)=>{this.setState({Result:res.data.Result},()=>{this.setState({LoopResult:res.data.Loop_Result},()=>this.setState({LoopError:res.data.Loop_Error}))})})
                console.log(this.state.Custom_Para_list.GaussSeidelIteration.Starter)
                let GaussSeidelIteration:Cal_GaussSeidelIteration = new Cal_GaussSeidelIteration(this.state.Cerrent_Question1,this.state.Cerrent_Question2,this.state.Custom_Para_list.GaussSeidelIteration.Starter) as Cal_GaussSeidelIteration;
                [Result,Loop_Result,Loop_Error] = GaussSeidelIteration.Result()
                this.setState({Result:Result},()=>{this.setState({LoopResult:Loop_Result},()=>{this.setState({LoopError:Loop_Error})})})
                break
            case "Conjugategradient":
                let Conjugategradient:Cal_Conjugategradient= new Cal_Conjugategradient(this.state.Cerrent_Question1,this.state.Cerrent_Question2,this.state.Custom_Para_list.Conjugategradient.Starter) as Cal_Conjugategradient;
                [Result,Loop_Result,Loop_Error] = Conjugategradient.Result()
                this.setState({Result:Result},()=>{this.setState({LoopResult:Loop_Result},()=>{this.setState({LoopError:Loop_Error})})})
                break
            case "GaussElimination":
                let GaussElimination:Cal_GaussElimination = new Cal_GaussElimination(this.state.Cerrent_Question1,this.state.Cerrent_Question2) as Cal_GaussElimination;
                [Result,Loop_Result,Loop_Error] = GaussElimination.Result()
                this.setState({Result:Result},()=>{this.setState({LoopResult:Loop_Result},()=>{this.setState({LoopError:Loop_Error})})})
                break
            case "GaussJordan":
                let GaussJordan:Cal_GaussJordan = new Cal_GaussJordan(this.state.Cerrent_Question1,this.state.Cerrent_Question2) as Cal_GaussJordan;
                [Result,Loop_Result,Loop_Error] = GaussJordan.Result()
                this.setState({Result:Result},()=>{this.setState({LoopResult:Loop_Result},()=>{this.setState({LoopError:Loop_Error})})})
                break
        }
    }
    get_Data = () =>
    {
        // axios.get<ServerResponse_Data>("http://localhost:6060/Data/"+this.state.Header+"/"+this.state.SubHeader,{
        //     headers: {
        //         Authorization: 'Bearer ' + this.props.Token 
        //       }
        // }).then((res)=>{
        //     let Data : any = {
        //         Name:res.data.Name,
        //         Context:res.data.Context,
        //         Code:res.data.Code,
        //         Question1:res.data.Question1,
        //         Question2:res.data.Question2
        //     }
        //     this.setState({Data:Data},()=>{this.setState({Cerrent_Question1:this.state.Data.Question1[0].toString().replace(/\r/g,"")},()=>{
        //         this.setState({Cerrent_Question2:this.state.Data.Question2[0].toString().replace(/\r/g,"")},()=>this.Get_Result())
        //     })})
        // })      
        axios.get<ServerResponse_Data>("http://localhost:6061/Data/"+this.state.SubHeader,{
            headers:{
                Authorization: 'Bearer ' + this.props.Token 
            }
        }).then((res)=>{
            let Data : any = {
                Name:res.data.Name,
                Context:res.data.Context,
                Question1:res.data.Question1,
                Question2:res.data.Question2
            }
            this.setState({Data:Data},()=>{this.setState({Cerrent_Question1:JSON.parse(this.state.Data.Question1[0].toString().replace(/\r/g,""))},()=>{
                this.setState({Cerrent_Question2:JSON.parse(this.state.Data.Question2[0].toString().replace(/\r/g,""))},()=>
                    this.setState({dimensionY:JSON.parse(this.state.Data.Question1[0].toString().replace(/\r/g,"")).length.toString()},()=>{
                    this.setState({dimensionX:JSON.parse(this.state.Data.Question1[0].toString().replace(/\r/g,""))[0].length.toString()},()=>{
                        const custom_param:Cutom_list = {
                            CramerRule:
                            {
                                
                            },
                            JacobiIteration:
                            {
                                Starter:new Array(JSON.parse(this.state.Data.Question1[0].toString().replace(/\r/g,"")).length).fill(0)
                            },
                            GaussSeidelIteration:
                            {
                                Starter:new Array(JSON.parse(this.state.Data.Question1[0].toString().replace(/\r/g,"")).length).fill(0)
                            },
                            Conjugategradient:
                            {
                                Starter:new Array(JSON.parse(this.state.Data.Question1[0].toString().replace(/\r/g,"")).length).fill(0)
                            },
                            GaussElimination:
                            {
                
                            },
                            GaussJordan:
                            {
                
                            }
                        }
                        this.setState({Custom_Para_list:custom_param},()=>this.Get_Result())
                    })
                }))
            })})
        })    
    }
    reset_para = () =>
    {
        const custom_param:Cutom_list = {
            CramerRule:
            {
                
            },
            JacobiIteration:
            {
                Starter:[]
            },
            GaussSeidelIteration:
            {
                Starter:[]
            },
            Conjugategradient:
            {
                Starter:[]
            },
            GaussElimination:
            {

            },
            GaussJordan:
            {

            }
        }
        this.setState({Custom_Para:false,Cerrent_Question1:[],Result:[],Custom_Para_list:custom_param},()=>this.get_Data())
    }
    componentDidUpdate = () =>
    {
        if(this.state.Header!==this.props.Header || this.state.SubHeader!==this.props.SubHeader)
        {
            this.setState({Header:this.props.Header})
            this.setState({SubHeader:this.props.SubHeader},()=>this.reset_para())
        }
        return null;
    }
    handelCheckbox = (e:ChangeEvent<HTMLInputElement>)=>
    {
        if(e.target.name==="ShowCode")
        {
            this.setState({Check_code:e.target.checked})
        }
        else
        {
            this.setState({Custom_Para:e.target.checked})
        }
    }
    handelQuestion = (e:ChangeEvent<HTMLInputElement>) =>
    {
        let check1:RegExp = new RegExp("dimensionX[0-9]+")
        let check2:RegExp = new RegExp("dimensionY[0-9]+")
        let check3:RegExp = new RegExp("dimensionS[0-9]+")
        let check4:RegExp = new RegExp("^-[0-9]+$")
        let check5:RegExp = new RegExp("^[0-9]+$")
        if(e.target.name === "Question1")
        {
            this.setState({Cerrent_Question1:JSON.parse(e.target.value.toString())})
        }
        else if(e.target.name === "Question2")
        {
            this.setState({Cerrent_Question2:JSON.parse(e.target.value.toString())})
        }
        else if(e.target.name === "dimensionX")
        {
            if(e.target.value.toString()!=="0")
            {
                this.setState({dimensionX:e.target.value.toString()},()=>this.reset_dimenstion(this.state.dimensionX,this.state.dimensionY))
            }
        }
        else if(e.target.name === "dimensionY")
        {
            if(e.target.value !=="0")
            {
                this.setState({dimensionY:e.target.value.toString()},()=>this.reset_dimenstion(this.state.dimensionX,this.state.dimensionY))
            }
        }
        else if(check1.test(e.target.name))
        {  
            if(check4.test(e.target.value)||check5.test(e.target.value))
            {
                let temp:Array<Array<number>> = this.state.Cerrent_Question1
                temp[parseInt(e.target.name.split('X')[1].split('_')[0])][parseInt(e.target.name.split('X')[1].split('_')[1])] = parseFloat(e.target.value.toString())
                this.setState({Cerrent_Question1:temp})
            }
            else if(e.target.value[e.target.value.length-1]==="-")
            {
                if(e.target.value.length===1)
                {
                    let temp:Array<Array<number>> = this.state.Cerrent_Question1
                    temp[parseInt(e.target.name.split('X')[1].split('_')[0])][parseInt(e.target.name.split('X')[1].split('_')[1])] = parseFloat("0")
                    this.setState({Cerrent_Question1:temp})
                }
                else
                {
                    let temp:Array<Array<number>> = this.state.Cerrent_Question1
                    temp[parseInt(e.target.name.split('X')[1].split('_')[0])][parseInt(e.target.name.split('X')[1].split('_')[1])] = parseFloat("-"+e.target.value.toString())
                    this.setState({Cerrent_Question1:temp})
                }
            }
            else if(e.target.value==="")
            {
                let temp:Array<Array<number>> = this.state.Cerrent_Question1
                temp[parseInt(e.target.name.split('X')[1].split('_')[0])][parseInt(e.target.name.split('X')[1].split('_')[1])] = parseFloat("0")
                this.setState({Cerrent_Question1:temp})
            }
        }
        else if(check2.test(e.target.name))
        {  
            if(check4.test(e.target.value)||check5.test(e.target.value))
            {
                let temp:Array<number>= this.state.Cerrent_Question2
                temp[parseInt(e.target.name.split('Y')[1])] = parseFloat(e.target.value.toString())
                this.setState({Cerrent_Question2:temp})
            }
            else if(e.target.value[e.target.value.length-1]==="-")
            {
                if(e.target.value.length===1)
                {
                    let temp:Array<number>= this.state.Cerrent_Question2
                    temp[parseInt(e.target.name.split('Y')[1])] = parseFloat("0")
                    this.setState({Cerrent_Question2:temp})
                }
                else
                {
                    let temp:Array<number>= this.state.Cerrent_Question2
                    temp[parseInt(e.target.name.split('Y')[1])] = parseFloat("-"+e.target.value.toString())
                    this.setState({Cerrent_Question2:temp})
                }
            }
            else if(e.target.value==="")
            {
                let temp:Array<number>= this.state.Cerrent_Question2
                temp[parseInt(e.target.name.split('Y')[1])] = parseFloat("0")
                this.setState({Cerrent_Question2:temp})
            }

        }
        else if(check3.test(e.target.name))
        {
            let Cus_temp1:Array<number> = this.state.Custom_Para_list.JacobiIteration.Starter;
            let Cus_temp2:Array<number> = this.state.Custom_Para_list.GaussSeidelIteration.Starter;
            let Cus_temp3:Array<number> = this.state.Custom_Para_list.Conjugategradient.Starter;
            switch (this.state.SubHeader)
            {
                case "JacobiIteration" :
                    if(check4.test(e.target.value)||check5.test(e.target.value))
                    {
                        Cus_temp1[parseInt(e.target.name.split('S')[1])] = parseFloat(e.target.value.toString());
                    }
                    else if(e.target.value[e.target.value.length-1]==="-")
                    {
                        if(e.target.value.length===1)
                        {
                            Cus_temp1[parseInt(e.target.name.split('S')[1])] = parseFloat("0");
                        }
                        else
                        {
                            Cus_temp1[parseInt(e.target.name.split('S')[1])] = parseFloat("-"+e.target.value.toString());
                        }
                    }
                    else if(e.target.value==="")
                    {
                        Cus_temp1[parseInt(e.target.name.split('S')[1])] = parseFloat("0");
                    }
                break
                case "GaussSeidelIteration" :
                    if(check4.test(e.target.value)||check5.test(e.target.value))
                    {
                        Cus_temp2[parseInt(e.target.name.split('S')[1])] = parseFloat(e.target.value.toString());
                    }
                    else if(e.target.value[e.target.value.length-1]==="-")
                    {
                        if(e.target.value.length===1)
                        {
                            Cus_temp2[parseInt(e.target.name.split('S')[1])] = parseFloat("0");
                        }
                        else
                        {
                            Cus_temp2[parseInt(e.target.name.split('S')[1])] = parseFloat("-"+e.target.value.toString());
                        }
                    }
                    else if(e.target.value==="")
                    {
                        Cus_temp2[parseInt(e.target.name.split('S')[1])] = parseFloat("0");
                    }
                break
                case "Conjugategradient" :
                    if(check4.test(e.target.value)||check5.test(e.target.value))
                    {
                        Cus_temp3[parseInt(e.target.name.split('S')[1])] = parseFloat(e.target.value.toString());
                    }
                    else if(e.target.value[e.target.value.length-1]==="-")
                    {
                        if(e.target.value.length===1)
                        {
                            Cus_temp3[parseInt(e.target.name.split('S')[1])] = parseFloat("0");
                        }
                        else
                        {
                            Cus_temp3[parseInt(e.target.name.split('S')[1])] = parseFloat("-"+e.target.value.toString());
                        }
                    }
                    else if(e.target.value==="")
                    {
                        Cus_temp3[parseInt(e.target.name.split('S')[1])] = parseFloat("0");
                    }
                break
            }
            const custom_param:Cutom_list = {
                CramerRule:
                {
                    
                },
                JacobiIteration:
                {
                    Starter:Cus_temp1
                },
                GaussSeidelIteration:
                {
                    Starter:Cus_temp2
                },
                Conjugategradient:
                {
                    Starter:Cus_temp3
                },
                GaussElimination:
                {
    
                },
                GaussJordan:
                {
    
                }
            }
            this.setState({Custom_Para_list:custom_param})
        }
        else
        {

        }
    }
    reset_dimenstion = (x:string,y:string)=>
    {
        let check:RegExp = new RegExp("[0-9]+")
        if(check.test(x) && check.test(y)){
            let temp1:Array<Array<number>> = []
            let temp3:Array<number>=[]
            for(let i=0;i<parseInt(y);i++)
            {
                let temp2:Array<number> = []
                for(let j=0;j<parseInt(x);j++)
                {
                    temp2.push(0)
                }
                temp1.push(temp2)
                temp3.push(0)
            }
            this.setState({Cerrent_Question1:temp1},()=>this.setState({Cerrent_Question2:temp3},()=>{
                const custom_param:Cutom_list = {
                    CramerRule:
                    {
                        
                    },
                    JacobiIteration:
                    {
                        Starter:temp3
                    },
                    GaussSeidelIteration:
                    {
                        Starter:temp3
                    },
                    Conjugategradient:
                    {
                        Starter:temp3
                    },
                    GaussElimination:
                    {
        
                    },
                    GaussJordan:
                    {
        
                    }
                }
                console.log(custom_param);
                this.setState({Custom_Para_list:custom_param})
            }))
        }
    }
    handelResult = (e:React.MouseEvent<HTMLButtonElement>) =>
    {
        const button: HTMLButtonElement = e.currentTarget
        if(button.name === "Result")
        {
            if(this.state.Cerrent_Question1.toString() !=="" && this.state.Cerrent_Question2.toString() !=="")
            {
                switch (this.state.SubHeader)
                {
                    case "CramerRule" :
                        if(Object.values(this.state.Custom_Para_list.CramerRule).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.Get_Result()
                        }
                        break
                    case "JacobiIteration" :
                        if(Object.values(this.state.Custom_Para_list.JacobiIteration).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.Get_Result()
                        }
                        break
                     case "GaussSeidelIteration" :
                        if(Object.values(this.state.Custom_Para_list.GaussSeidelIteration).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.Get_Result()
                        }
                        break
                    case "Conjugategradient" :
                        if(Object.values(this.state.Custom_Para_list.Conjugategradient).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.Get_Result()
                        }
                        break
                    case "GaussElimination" :
                        if(Object.values(this.state.Custom_Para_list.GaussElimination).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.Get_Result()
                        }
                        break
                    case "GaussJordan" :
                        if(Object.values(this.state.Custom_Para_list.GaussJordan).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.Get_Result()
                        }
                        break
                }
            }
            else 
            {
                alert("Enter all inputs")
            }
        }
        else
        {

        }
    }
    get_Select_Question = () =>
    {
        let result:Array<any> = []
        if(this.state.Data.Question1.length !== 0)
        {   
            for(let i:number = 0;i<this.state.Data.Question1.length;i++)
            {
                result.push(<option key={i.toString()} value={this.state.Data.Question1[i].toString().replace(/\r/g,"")}>{this.state.Data.Question1[i].toString()}</option>)
            }
        }
        return result
    }
    set_Current_Question = (e:ChangeEvent<HTMLSelectElement>) =>
    {
        let i:number = 0;
        for( i =0;i<this.state.Data.Question1.length;i++)
        {
            if(e.target.value===this.state.Data.Question1[i].toString().replace(/\r/g,""))
            {
                break
            }
        }
        // this.setState({Cerrent_Question1:this.state.Data.Question1[i].toString().replace(/\r/g,"")},()=>this.setState({Cerrent_Question2:this.state.Data.Question2[i].toString().replace(/\r/g,"")},()=>{this.Get_Result()}))
        this.setState({Cerrent_Question1:JSON.parse(this.state.Data.Question1[i].toString().replace(/\r/g,""))},()=>{
            this.setState({Cerrent_Question2:JSON.parse(this.state.Data.Question2[i].toString().replace(/\r/g,""))},()=>
                this.setState({dimensionY:JSON.parse(this.state.Data.Question1[i].toString().replace(/\r/g,"")).length.toString()},()=>{
                this.setState({dimensionX:JSON.parse(this.state.Data.Question1[i].toString().replace(/\r/g,""))[0].length.toString()},()=>{
                    const custom_param:Cutom_list = {
                        CramerRule:
                        {
                            
                        },
                        JacobiIteration:
                        {
                            Starter:new Array(JSON.parse(this.state.Data.Question1[i].toString().replace(/\r/g,"")).length).fill(0)
                        },
                        GaussSeidelIteration:
                        {
                            Starter:new Array(JSON.parse(this.state.Data.Question1[i].toString().replace(/\r/g,"")).length).fill(0)
                        },
                        Conjugategradient:
                        {
                            Starter:new Array(JSON.parse(this.state.Data.Question1[i].toString().replace(/\r/g,"")).length).fill(0)
                        },
                        GaussElimination:
                        {
            
                        },
                        GaussJordan:
                        {
            
                        }
                    }
                    this.setState({Custom_Para_list:custom_param},()=>this.Get_Result())
                })
            }))
        })
    }
    get_custom_param = () =>
    {
        let result:Array<any> = [] 
        let X:number = parseInt(this.state.dimensionX)
        let Y:number = parseInt(this.state.dimensionY)
        for(let i:number = 0;i<Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list]).length;i++)
        {
            switch (this.state.SubHeader)
            {
                case "CramerRule" :
                    break;
                case "JacobiIteration" :
                    if(this.state.Cerrent_Question1.toString()!==""&&this.state.Cerrent_Question2.toString()!==""&&this.state.Custom_Para_list.JacobiIteration.Starter.toString()!==""){
                        if(this.state.Custom_Para_list.JacobiIteration[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof JacobiIteration].length.toString() === this.state.dimensionY &&this.state.dimensionY===this.state.Cerrent_Question1.length.toString() && this.state.dimensionX === this.state.Cerrent_Question1[0].length.toString() && this.state.dimensionY === this.state.Cerrent_Question2.length.toString())
                        {
                            result.push(<label key={"Custom_Header"}>Custom JacobiIteration</label>)
                            for(let j=0;j<Y;j++)
                            {
                                result.push(
                                    <input 
                                        disabled = {(!this.state.Custom_Para)}
                                        type="text" 
                                        key={`${j}`}
                                        name={`dimensionS${j}`}
                                        value={this.state.Custom_Para_list.JacobiIteration[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof JacobiIteration][j]}
                                        onChange={this.handelQuestion}
                                    >
                                    </input>
                                )
                            }
                        }
                    }
                    break
                case "GaussSeidelIteration" :
                    if(this.state.Cerrent_Question1.toString()!==""&&this.state.Cerrent_Question2.toString()!==""&&this.state.Custom_Para_list.GaussSeidelIteration.Starter.toString()!=="")
                    {
                        if(this.state.Custom_Para_list.GaussSeidelIteration[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof GaussSeidelIteration].length.toString() === this.state.dimensionY && this.state.dimensionY===this.state.Cerrent_Question1.length.toString() && this.state.dimensionX === this.state.Cerrent_Question1[0].length.toString() && this.state.dimensionY === this.state.Cerrent_Question2.length.toString())
                        {
                            result.push(<label key={"Custom_Header"}>Custom GaussSeidelIteration</label>)
                            for(let j=0;j<Y;j++)
                            {
                                result.push(
                                    <div key={`${j}`}>
                                        <input 
                                            disabled = {(!this.state.Custom_Para)}
                                            type="text" 
                                            key={`${j}`}
                                            name={`dimensionS${j}`}
                                            value={this.state.Custom_Para_list.GaussSeidelIteration[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof GaussSeidelIteration][j]}
                                            onChange={this.handelQuestion}
                                        >
                                        </input>
                                    </div>
                                )
                            }
                        }
                    }
                    break
                case "Conjugategradient" :
                    if(this.state.Cerrent_Question1.toString()!==""&&this.state.Cerrent_Question2.toString()!==""&&this.state.Custom_Para_list.Conjugategradient.Starter.toString()!=="")
                    {
                        if(this.state.Custom_Para_list.Conjugategradient[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof Conjugategradient].length.toString() === this.state.dimensionY &&this.state.dimensionY===this.state.Cerrent_Question1.length.toString() && this.state.dimensionX === this.state.Cerrent_Question1[0].length.toString() && this.state.dimensionY === this.state.Cerrent_Question2.length.toString())
                        {
                            result.push(<label key={"Custom_Header"}>Custom Conjugategradient</label>)
                            for(let j=0;j<Y;j++)
                            {
                                result.push(
                                    <div key={`${j}`}>
                                        <input 
                                            disabled = {(!this.state.Custom_Para)}
                                            type="text" 
                                            key={`${j}`}
                                            name={`dimensionS${j}`}
                                            value={this.state.Custom_Para_list.Conjugategradient[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof Conjugategradient][j]}
                                            onChange={this.handelQuestion}
                                        >
                                        </input>
                                    </div>
                                )
                            }
                        }
                    }
                    // result.push(
                    //     <label key={i.toString()}>
                    //         {Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}:{" "}
                    //         <input 
                    //             key={i.toString()}
                    //             disabled = {(!this.state.Custom_Para)}
                    //             type="number" 
                    //             value={this.state.Custom_Para_list.Conjugategradient[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof Conjugategradient]}
                    //             name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                    //             onChange={this.handelCustom}
                    //         >
                    //         </input>
                    //     </label>
                    // )
                    break
                case "GaussElimination" :
                    break
                case "GaussJordan" : 
                    break
            }
        }
        return result
    }
    showEquation1 = () =>
    {
        if(this.state.Cerrent_Question1.toString()!=="")
        {
            try{
                return(
                    <MathJax dynamic inline>{"\\("+math.parse(JSON.stringify(this.state.Cerrent_Question1).replace(/\r/g,"")).toTex({parenthesis: 'keep',implicit: 'show'})+"\\)"}</MathJax>
                )
            }
            catch(err:any)
            {
                return(
                    <MathJax  dynamic inline style={{color:"red"}}>{err.toString()}</MathJax>
                )
            }
        }
        else
        {
            return(
                <MathJax></MathJax>
            )
        }
    }
    showEquation2 = () =>
    {
        if(this.state.Cerrent_Question2.toString()!=="")
        {
            try{
                return(
                    <MathJax dynamic inline>{"\\("+math.parse(JSON.stringify(this.state.Cerrent_Question2).replace(/\r/g,"")).toTex({parenthesis: 'keep',implicit: 'show'})+"\\)"}</MathJax>
                )
            }
            catch(err:any)
            {
                return(
                    <MathJax  dynamic inline style={{color:"red"}}>{err.toString()}</MathJax>
                )
            }
        }
        else
        {
            return(
                <MathJax></MathJax>
            )
        }
    }
    showResult = () =>
    {
        if(this.state.Result.toString()!==""||this.state.Result.length>0 ||this.state.Result!=null)
        {
            try{
                return(
                    <MathJax dynamic inline >{"\\("+math.parse("["+this.state.Result.toString().replace(/\r/g,"")+"]").toTex({parenthesis: 'keep',implicit: 'show'})+"\\)"}</MathJax>
                )
            }
            catch(err:any)
            {
                return(
                    <MathJax  dynamic inline style={{color:"red"}}>{err.toString()}</MathJax>
                )
            }
        }
        else
        {
            return(
                <MathJax></MathJax>
            )
        }
    }
    setInputMetrix_X = ()=>
    {
        let X:number = parseInt(this.state.dimensionX)
        let Y:number = parseInt(this.state.dimensionY)
        if(this.state.Cerrent_Question1.toString()!==""&&this.state.Cerrent_Question2.toString()!==""){
            if(this.state.dimensionY===this.state.Cerrent_Question1.length.toString() && this.state.dimensionX === this.state.Cerrent_Question1[0].length.toString() && this.state.dimensionY === this.state.Cerrent_Question2.length.toString())
            {
                let temp1:Array<any> = []
                for(let i=0;i<Y;i++)
                {
                    let temp2:Array<any> = []            
                    for(let j=0;j<X;j++)
                    {
                        // console.log(i,j)
                        temp2.push(
                            <input 
                                disabled = {(!this.state.Custom_Para)}
                                type="text" 
                                key={`${i}${j}`}
                                name={`dimensionX${i}_${j}`}
                                value={this.state.Cerrent_Question1[i][j]}
                                onChange={this.handelQuestion}
                            >
                            </input>
                        )
                    }
                    temp1.push(<div key={`${i}`}>{temp2}</div>)
                }
                return temp1
            }
        }
        return <div></div>
    }
    setInputMetrix_Y = ()=>
    {
        let X:number = parseInt(this.state.dimensionX)
        let Y:number = parseInt(this.state.dimensionY)
        if(this.state.Cerrent_Question1.toString()!==""&&this.state.Cerrent_Question2.toString()!==""){
            if(this.state.dimensionY===this.state.Cerrent_Question1.length.toString() && this.state.dimensionX === this.state.Cerrent_Question1[0].length.toString() && this.state.dimensionY === this.state.Cerrent_Question2.length.toString())
            {
                let temp1:Array<any> = []
                for(let i=0;i<Y;i++)
                {
                    temp1.push(
                        <div key={`${i}`}>
                            <input 
                                disabled = {(!this.state.Custom_Para)}
                                type="text" 
                                key={`${i}`}
                                name={`dimensionY${i}`}
                                value={this.state.Cerrent_Question2[i]}
                                onChange={this.handelQuestion}
                            >
                            </input>
                        </div>
                    )
                }
                return temp1
            }
        }
        return <div></div>
    }
    render()
    {
        return(
            <div>
                <h1>{this.state.Data.Name}</h1>
                <h2>{this.state.Data.Context}</h2>
                <div style={{backgroundColor:"lightcoral"}}>
                    <div>
                        <label>
                            Select Question :
                            <select value={this.state.Cerrent_Question1.toString()} onChange={this.set_Current_Question}>
                                {this.get_Select_Question()}
                            </select>
                        </label>
                    </div>
                    <div>
                        <label>
                            <input 
                                type="checkbox" 
                                name="CustomCheack"
                                title="Custom"
                                checked={this.state.Custom_Para} 
                                onChange={this.handelCheckbox}
                            >
                            </input>
                            Custom!
                        </label>
                    </div>
                    <div>
                        <label>
                            X :{" "}
                            <input 
                                disabled = {(!this.state.Custom_Para)}
                                type="text" 
                                name="Question1"
                                value={JSON.stringify(this.state.Cerrent_Question1)}
                                onChange={this.handelQuestion}
                            >
                            </input>
                        </label>
                    </div>
                    <div>
                        <label>
                            Y :{" "}
                            <input 
                                disabled = {(!this.state.Custom_Para)}
                                type="text" 
                                name="Question2"
                                value={JSON.stringify(this.state.Cerrent_Question2)}
                                onChange={this.handelQuestion}
                            >
                            </input>
                        </label>
                    </div>
                    <div>
                        <label>
                        dimensionX :{" "}
                            <input 
                                disabled = {(!this.state.Custom_Para)}
                                type="text" 
                                name="dimensionX"
                                value={this.state.dimensionX}
                                onChange={this.handelQuestion}
                            >
                            </input>
                        </label>
                        <label>
                        dimensionY :{" "}
                            <input 
                                disabled = {(!this.state.Custom_Para)}
                                type="text" 
                                name="dimensionY"
                                value={this.state.dimensionY}
                                onChange={this.handelQuestion}
                            >
                            </input>
                        </label>
                    </div>
                    <div>
                        <label>X </label>
                        {this.setInputMetrix_X()}
                    </div>
                    <div>
                        <label>Y </label>
                        {this.setInputMetrix_Y()}
                    </div>
                    <div>
                        {this.get_custom_param()}
                    </div>
                    <div>
                        <button 
                            disabled = {(!this.state.Custom_Para)}
                            name="Result"
                            onClick={this.handelResult}
                        >
                            calulator
                        </button>
                    </div>
                    <div style={{display: "flex"}}>
                        <MathJaxContext>
                            <h2>X: {this.showEquation1()}</h2>
                        </MathJaxContext>
                        <MathJaxContext>
                            <h2>Y : {this.showEquation2()}</h2>
                        </MathJaxContext>
                    </div>
                    <div>
                        <MathJaxContext>
                            <h2>Result: {this.showResult()}</h2>
                        </MathJaxContext>
                    </div>
                    <div>
                        {/* <Charts loop_result_L={this.state.LoopResult} Unit={this.state.Header} loop_result_R={[]} Loop_Error_L={this.state.LoopError} Loop_Error_R={[]} L={[]} R={[]}/> */}
                        <Unit2Chart Unit={this.state.SubHeader} loop_result={this.state.LoopResult} Loop_Error = {this.state.LoopError} />
                    </div>
                </div>
            </div>
        )
    }
}
export default Unit2;