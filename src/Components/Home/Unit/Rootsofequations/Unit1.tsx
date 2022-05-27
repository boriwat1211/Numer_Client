import axios from "axios";
import React, { ChangeEvent } from "react";
import * as math from 'mathjs'
import { MathJax, MathJaxContext} from "better-react-mathjax";
import {Cal_Bitsection,Cal_FalsePosition,Cal_NewtonRaphson,Cal_OnePointiteration, Cal_Secant} from "./Unit1_code"
import Unit1Chart from "./Unit1_Charts";
//MUI///
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, FormControl } from "@mui/material";
import TextField from '@mui/material/TextField';
//-----//
interface Bitsection
{
    XL:string,
    XR:string
}
interface FalsePosition
{
    XL:string,
    XR:string
}
interface NewtonRaphson
{
    Diff_Question:string,
    X0:string
}
interface OnePointIteration
{
    X0:string
}
interface Secant
{
    X0:string
    X1:string
} 
interface ServerResponse_Data
{
    Name:String,
    Context:String,
    Question:Array<String>
}

// interface ServerResponse_Result
// {
//     Result:Number,
//     Loop_Result:Array<number>
//     Loop_Error:Array<number>
// }
interface Iprops
{
    Header:String,
    SubHeader:String
    Token:String
}
interface Cutom_list
{
    Bitsection: Bitsection
    FalsePosition: FalsePosition
    NewtonRaphson: NewtonRaphson
    OnePointIteration: OnePointIteration
    Secant:Secant
}
interface Istate
{
    Data:{
        Name:String,
        Context:String,
        Question:Array<String>
    },
    Header:String,
    SubHeader:String,
    Result:Number,
    LoopResult:Array<number>,
    LoopError:Array<number>,
    Custom_Para:boolean,
    Cerrent_Question:string,
    Custom_Para_list:Cutom_list,
    Check_code:boolean
    L:Array<number>
    R:Array<number>
}
class Unit1 extends React.Component<Iprops,Istate>
{
    constructor(props:Iprops)
    {
        super(props)
        const custom_param:Cutom_list = {
            Bitsection:
            {
                XL:"0.1",
                XR:"100"
            },
            FalsePosition:
            {
                XL:"0.01",
                XR:"100"
            },
            NewtonRaphson:
            {
                Diff_Question:"2*x",
                X0:"0.1"
            },
            OnePointIteration:
            {
                X0:"0.1"
            },
            Secant:{
                X0:"3",
                X1:"1.156"
            }
        }
        this.state=
        {
            Data:{
                Name:" ",
                Context:" ",
                Question:[]
            },
            Header:this.props.Header,
            SubHeader:this.props.SubHeader,
            Result:0,
            LoopResult:[],
            LoopError:[],
            Custom_Para:false,
            Cerrent_Question:"",
            Custom_Para_list:custom_param,
            Check_code:false,
            L:[],
            R:[]
        }   
        this.get_Data() 
    }
    Get_Result = () =>
    {
        let Result:any,Loop_Result:any,Loop_Error:any,L:any,R:any;
        switch (this.state.SubHeader)
        {
            case "Bitsection":
                let bisection:Cal_Bitsection = new Cal_Bitsection(this.state.Cerrent_Question,this.state.Custom_Para_list.Bitsection.XL,this.state.Custom_Para_list.Bitsection.XR,"0","","0") as Cal_Bitsection;
                [Result,Loop_Result,Loop_Error,L,R] = bisection.Result()
                this.setState({Result:Result},()=>{this.setState({LoopResult:Loop_Result},()=>{this.setState({LoopError:Loop_Error},()=>{this.setState({L:L},()=>{this.setState({R:R})})})})})
                break
            case "FalsePosition":
                let FalsePosition:Cal_FalsePosition = new Cal_FalsePosition(this.state.Cerrent_Question,this.state.Custom_Para_list.FalsePosition.XL,this.state.Custom_Para_list.FalsePosition.XR,"0","","0") as Cal_FalsePosition
                [Result,Loop_Result,Loop_Error,L,R] = FalsePosition.Result()
                this.setState({Result:Result},()=>{this.setState({LoopResult:Loop_Result},()=>{this.setState({LoopError:Loop_Error},()=>{this.setState({L:L},()=>{this.setState({R:R})})})})})
                break
            case "NewtonRaphson":
                let NewtonRaphson:Cal_NewtonRaphson = new Cal_NewtonRaphson(this.state.Cerrent_Question,"","",this.state.Custom_Para_list.NewtonRaphson.X0,this.state.Custom_Para_list.NewtonRaphson.Diff_Question,"0") as Cal_NewtonRaphson
                [Result,Loop_Result,Loop_Error] = NewtonRaphson.Result()
                this.setState({Result:Result},()=>{this.setState({LoopResult:Loop_Result},()=>{this.setState({LoopError:Loop_Error})})})
                break
            case "OnePointIteration":
                let OnePointIteration:Cal_OnePointiteration = new Cal_OnePointiteration(this.state.Cerrent_Question,"","",this.state.Custom_Para_list.OnePointIteration.X0,"","0") as Cal_OnePointiteration
                [Result,Loop_Result,Loop_Error] = OnePointIteration.Result()
                this.setState({Result:Result},()=>{this.setState({LoopResult:Loop_Result},()=>{this.setState({LoopError:Loop_Error})})})
                break
            case "Secant":
                let Secant:Cal_Secant = new Cal_Secant(this.state.Cerrent_Question,"","",this.state.Custom_Para_list.OnePointIteration.X0,"",this.state.Custom_Para_list.Secant.X1) as Cal_Secant
                [Result,Loop_Result,Loop_Error] = Secant.Result()
                this.setState({Result:Result},()=>{this.setState({LoopResult:Loop_Result},()=>{this.setState({LoopError:Loop_Error})})})
                break
        }
    }
    get_Data = () =>
    {   
        axios.get<ServerResponse_Data>("https://numerserver.herokuapp.com/Data/"+this.state.SubHeader,
        {
            headers:{
                Authorization: 'Bearer ' + this.props.Token 
            }
        }).then((res)=>{
            let Data : any = {
                Name:res.data.Name,
                Context:res.data.Context,
                Question:res.data.Question
            }
            this.setState({Data:Data},()=>{this.setState({Cerrent_Question:this.state.Data.Question[0].toString().replace(/\r/g,"")},()=>{
                this.Get_Result()
            })})
        })
    }
    reset_para = () =>
    {
        const custom_param:Cutom_list = {
            Bitsection:
            {
                XL:"1",
                XR:"100"
            },
            FalsePosition:
            {
                XL:"0.01",
                XR:"100"
            },
            NewtonRaphson:
            {
                Diff_Question:"2*x",
                X0:"0.1"
            },
            OnePointIteration:
            {
                X0:"0.1"
            },
            Secant:{
                X0:"3",
                X1:"1.156"
            }
        }
        this.setState({Custom_Para:false,Cerrent_Question:"",Result:0,Custom_Para_list:custom_param},()=>this.get_Data())
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
        if(e.target.name === "Question")
        {
            this.setState({Cerrent_Question:e.target.value.toString()})
        }
        else
        {

        }
    }
    handelResult = (e:React.MouseEvent<HTMLButtonElement>) =>
    {
        const button: HTMLButtonElement = e.currentTarget
        if(button.name === "Result")
        {
            if(this.state.Cerrent_Question !=="")
            {
                switch (this.state.SubHeader)
                {
                    case "Bitsection" :
                        if(Object.values(this.state.Custom_Para_list.Bitsection).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.Get_Result()
                        }
                        break
                    case "FalsePosition" :
                        if(Object.values(this.state.Custom_Para_list.FalsePosition).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.Get_Result()
                        }
                        break
                    case "NewtonRaphson" :
                        if(Object.values(this.state.Custom_Para_list.NewtonRaphson).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.Get_Result()
                        }
                        break
                    case "OnePointIteration":
                        if(Object.values(this.state.Custom_Para_list.OnePointIteration).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.Get_Result()
                        }
                        break
                    case "Secant":
                        if(Object.values(this.state.Custom_Para_list.Secant).includes(""))
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
    handelCustom = (e:ChangeEvent<HTMLInputElement>) =>
    {
        let para:Cutom_list = this.state.Custom_Para_list
        switch (this.state.SubHeader)
        {
            case "Bitsection" :
                para.Bitsection[e.target.name as keyof Bitsection] = e.target.value
                break
            case "FalsePosition" :
                para.FalsePosition[e.target.name as keyof FalsePosition] = e.target.value
                break
            case "NewtonRaphson" :
                para.NewtonRaphson[e.target.name as keyof NewtonRaphson] = e.target.value
                break
            case "OnePointIteration":
                para.OnePointIteration[e.target.name as keyof OnePointIteration] = e.target.value
                break
            case "Secant":
                para.Secant[e.target.name as keyof Secant] = e.target.value
                break
        }
        this.setState({Custom_Para_list:para})
    }
    // get_Select_Question = () =>
    // {
    //     let result:Array<any> = []
    //     if(this.state.Data.Question.length !== 0)
    //     {   
    //         for(let i = 0;i<this.state.Data.Question.length;i++)
    //         {
    //             result.push(<option key={i.toString()} value={this.state.Data.Question[i].toString().replace(/\r/g,"")}>{this.state.Data.Question[i].toString()}</option>)
    //         }
    //     }
    //     return result
    // }
    // set_Current_Question = (e:ChangeEvent<HTMLSelectElement>) =>
    // {
    //     this.setState({Cerrent_Question:e.target.value},()=>{
    //         this.Get_Result()
    //     })
    // }
    set_Current_Question = (e:SelectChangeEvent) =>
    {
        this.setState({Cerrent_Question:e.target.value},()=>{
            this.Get_Result()
        })
    }
    get_Select_Question = () =>
    {
        let result:Array<any> = []
        if(this.state.Data.Question.length !== 0)
        {   
            for(let i = 0;i<this.state.Data.Question.length;i++)
            {
                result.push(
                <MenuItem key={i.toString()} value={this.state.Data.Question[i].toString().replace(/\r/g,"")}>
                        <MathJaxContext>
                            <MathJax dynamic inline >{"\\("+math.parse(this.state.Data.Question[i].toString().replace(/\r/g,"")).toTex({parenthesis: 'keep',implicit: 'show'})+"\\)"}</MathJax>
                        </MathJaxContext>
                </MenuItem>
                )
            }
        }
        return result
    }
    get_custom_param = () =>
    {
        let result:Array<any> = [] 
        for(let i:number = 0;i<Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list]).length;i++)
        {
            switch (this.state.SubHeader)
            {
                case "Bitsection" :
                    result.push(
                        <label key={i.toString()}>
                            {Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}:{" "}
                            <TextField 
                                label={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                variant="outlined"
                                margin="normal"
                                key={i.toString()}
                                disabled = {(!this.state.Custom_Para)}
                                type="number" 
                                value={this.state.Custom_Para_list.Bitsection[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof Bitsection]}
                                name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                onChange={this.handelCustom}
                            >
                            </TextField>
                        </label>
                    )
                    break
                case "FalsePosition" :
                    result.push(
                        <label key={i.toString()}>
                            {Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}:{" "}
                            <TextField 
                                label={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                variant="outlined"
                                margin="normal"
                                key={i.toString()}
                                disabled = {(!this.state.Custom_Para)}
                                type="number" 
                                value={this.state.Custom_Para_list.FalsePosition[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof FalsePosition]}
                                name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                onChange={this.handelCustom}
                            >
                            </TextField>
                        </label>
                    )
                    break
                case "NewtonRaphson" :
                    if(Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]==="Diff_Question")
                    {
                        result.push(
                            <label key={i.toString()}>
                                {Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}:{" "}
                                <TextField 
                                    label={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                    variant="outlined"
                                    margin="normal"
                                    key={i.toString()}
                                    disabled = {(!this.state.Custom_Para)}
                                    type="text" 
                                    value={this.state.Custom_Para_list.NewtonRaphson[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof NewtonRaphson]}
                                    name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                    onChange={this.handelCustom}
                                >
                                </TextField>
                            </label>
                        )
                    }
                    else
                    {
                        result.push(
                            <label key={i.toString()}>
                                {Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}:{" "}
                                <TextField
                                    label={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                    variant="outlined" 
                                    margin="normal"
                                    key={i.toString()}
                                    disabled = {(!this.state.Custom_Para)}
                                    type="number" 
                                    value={this.state.Custom_Para_list.NewtonRaphson[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof NewtonRaphson]}
                                    name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                    onChange={this.handelCustom}
                                >
                                </TextField>
                            </label>
                        )
                    }
                    break
                case "OnePointIteration":
                    result.push(
                        <label key={i.toString()}>
                            {Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}:{" "}
                            <TextField
                                label={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                variant="outlined"
                                margin="normal"
                                key={i.toString()}
                                disabled = {(!this.state.Custom_Para)}
                                type="number" 
                                value={this.state.Custom_Para_list.OnePointIteration[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof OnePointIteration]}
                                name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                onChange={this.handelCustom}
                            >
                            </TextField>
                        </label>
                    )
                    break
                case "Secant":
                    result.push(
                        <label key={i.toString()}>
                            {Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}:{" "}
                            <TextField 
                                label={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                variant="outlined"
                                margin="normal"
                                key={i.toString()}
                                disabled = {(!this.state.Custom_Para)}
                                type="number" 
                                value={this.state.Custom_Para_list.Secant[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof Secant]}
                                name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                onChange={this.handelCustom}
                            >
                            </TextField>
                        </label>
                    )
                    break
            }
        }
        return result
    }
    showEquation = () =>
    {
        if(this.state.Cerrent_Question!=="")
        {
            try{
                return(
                    <MathJax dynamic inline >{"\\("+math.parse(this.state.Cerrent_Question.toString().replace(/\r/g,"")).toTex({parenthesis: 'keep',implicit: 'show'})+"\\)"}</MathJax>
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
    showTrueResult = () =>
    {
        if(this.state.Cerrent_Question!=="")
        {
            if(this.props.SubHeader==="OnePointIteration")
            {
                try {
                    return ( 
                        <div>
                            <h2>TestResult : {parseFloat(((math.evaluate(this.state.Cerrent_Question,{x:this.state.Result}) as number ) - (this.state.Result as number)).toString()).toFixed(6)}</h2>
                        </div>
                    )
                } catch (error) {
                    return <div></div>
                }
            }
            else
            {
                try {
                    return ( 
                        <div>
                            <h2>TestResult : {parseFloat(math.evaluate(this.state.Cerrent_Question,{x:this.state.Result})).toFixed(6)}</h2>
                        </div>
                    )
                } catch (error) {
                    return <div></div>
                }
            }
        }
        else
        {
            return <div></div>
        }
    }
    render()
    {
        return(
            <div>
                <h1>{this.state.Data.Name}</h1>
                <h2>{this.state.Data.Context}</h2>
                <div>
                    <div>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="Select-Question-Unit1">Question</InputLabel>
                            <Select
                                disabled = {this.state.Custom_Para}
                                labelId="Select-Question-Unit1"
                                id="Select-Qusetion-Unit1-Value"
                                value={this.state.Cerrent_Question}
                                onChange={this.set_Current_Question}
                                inputProps={
                                    {
                                        "data-testid":"Unit1-Select-Question"
                                    }
                                }
                            >
                                {this.get_Select_Question()}
                            </Select>
                        </FormControl>
                    </div>
                    {/* <div>
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
                    </div> */}
                    <div>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox  checked={this.state.Custom_Para} onChange={this.handelCheckbox}/>} label="Custom Question"/>
                        </FormGroup>
                    </div>
                    {/* <div>
                        <label>
                            Question:{" "}
                            <input 
                                disabled = {(!this.state.Custom_Para)}
                                type="text" 
                                name="Question"
                                value={this.state.Cerrent_Question}
                                onChange={this.handelQuestion}
                            >
                            </input>
                        </label>
                    </div> */}
                    <div>
                        <label>
                            Question:{" "}
                            <TextField 
                                label="Custom Question" 
                                variant="outlined" 
                                margin="normal"
                                type="text" 
                                name="Question" 
                                value={this.state.Cerrent_Question} 
                                onChange={this.handelQuestion} 
                                disabled = {!this.state.Custom_Para}/>
                        </label>
                    </div>
                    <div>
                        {this.get_custom_param()}
                    </div>
                    <div>
                        <Button 
                            variant="contained"
                            disabled = {(!this.state.Custom_Para)}
                            name="Result"
                            onClick={this.handelResult}
                        >
                            calulator
                        </Button>
                    </div>
                    <div>
                        <MathJaxContext>
                            <h2>Current Question : {this.showEquation()}</h2>
                        </MathJaxContext>
                    </div>
                    <div>
                        <h2>Result : {this.state.Result.toFixed(6)}</h2>
                    </div>
                        {this.showTrueResult()}
                    <div>
                        <Unit1Chart Unit={this.state.SubHeader} loop_result={this.state.LoopResult} Loop_Error ={this.state.LoopError} L={this.state.L} R = {this.state.R} Q = {this.state.Cerrent_Question}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default Unit1;