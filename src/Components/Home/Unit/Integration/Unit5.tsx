import axios from "axios";
import React, { ChangeEvent } from "react";
import * as math from 'mathjs'
import { MathJax, MathJaxContext} from "better-react-mathjax";

//MUI///
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, FormControl } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Cal_Simpson, Cal_Trapzoidal } from "./Unit5_code";
//-----//
interface Trapzoidal
{
   
}
interface Simpson
{

}
interface ServerResponse_Data
{
    Name:String,
    Context:String,
    Question:Array<String>,
    Left:Array<String>,
    Right:Array<String>
}
interface Iprops
{
    Header:String,
    SubHeader:String
    Token:String
}
interface Cutom_list
{
    Trapzoidal:Trapzoidal,
    Simpson:Simpson
}
interface Istate
{
    Data:{
        Name:String,
        Context:String,
        Question:Array<String>,
        Left:Array<String>,
        Right:Array<String>
    },
    Header:String,
    SubHeader:String,
    Result:Number,
    LoopResult:Array<number>,
    LoopError:Array<number>,
    Custom_Para:boolean,
    Cerrent_Question:string,
    Custom_Para_list:Cutom_list,
    Check_code:boolean,
    L:String,
    R:String,
    N:String,
}
class Unit5 extends React.Component<Iprops,Istate>
{
    constructor(props:Iprops)
    {
        super(props)
        const custom_param:Cutom_list = {
            Trapzoidal:{},
            Simpson:{}
        }
        this.state=
        {
            Data:{
                Name:" ",
                Context:" ",
                Question:[],
                Right:[],
                Left:[]
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
            L:"",
            R:"",
            N:(this.props.SubHeader==="Simpson")?"2":"1",
        }   
        this.get_Data() 
    }
    Get_Result = () =>
    {
        let Result:any;
        switch (this.state.SubHeader)
        {
            case "Trapzoidal":
                let Trapzoidal:Cal_Trapzoidal = new Cal_Trapzoidal(this.state.Cerrent_Question,this.state.L.toString(),this.state.R.toString(),this.state.N.toString());
                Result = Trapzoidal.Result()
                this.setState({Result:Result});
                break
            case "Simpson":
                let Simpson:Cal_Simpson = new Cal_Simpson(this.state.Cerrent_Question,this.state.L.toString(),this.state.R.toString(),this.state.N.toString());
                Result = Simpson.Result()
                this.setState({Result:Result});
                break
        }
    }
    get_Data = () =>
    {   
        axios.get<ServerResponse_Data>("http://localhost:6061/Data/"+this.state.SubHeader,
        {
            headers:{
                Authorization: 'Bearer ' + this.props.Token 
            }
        }).then((res)=>{
            let Data : any = {
                Name:res.data.Name,
                Context:res.data.Context,
                Question:res.data.Question,
                Right:res.data.Right,
                Left:res.data.Left
            }
            this.setState({Data:Data},()=>{this.setState({Cerrent_Question:this.state.Data.Question[0].toString().replace(/\r/g,"")},()=>{
                this.setState({L:this.state.Data.Left[0]},()=>{
                    this.setState({R:this.state.Data.Right[0]},()=>{
                        this.Get_Result();
                    })
                })
            })})
        })
    }
    reset_para = () =>
    {
        const custom_param:Cutom_list = {
            Trapzoidal:{},
            Simpson:{}
        }
        this.setState({Custom_Para:false,Cerrent_Question:"",Result:0,Custom_Para_list:custom_param},()=>this.get_Data())
    }
    componentDidUpdate = () =>
    {
        if(this.state.Header!==this.props.Header || this.state.SubHeader!==this.props.SubHeader)
        {
            this.setState({Header:this.props.Header})
            this.setState({SubHeader:this.props.SubHeader},()=>this.reset_para())
            this.setState({N:(this.props.SubHeader==="Simpson")?"2":"1"});
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
        else if(e.target.name === "Left")
        {
            this.setState({L:e.target.value.toString()})
        }
        else if(e.target.name === "Right")
        {
            this.setState({R:e.target.value.toString()})
        }
        else if(e.target.name === "N")
        {
            this.setState({N:e.target.value.toString()})
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
            if(this.state.Cerrent_Question !=="" && this.state.L!=="" && this.state.R!=="" && this.state.N!=="")
            {
                this.Get_Result()
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
            case "Trapzoidal" :
                
                break;
            case "Simpson":
                break;    
           
        }
        this.setState({Custom_Para_list:para})
    }
    set_Current_Question = (e:SelectChangeEvent) =>
    {
        let i:number;
        for( i =0;i<this.state.Data.Question.length;i++)
        {
            if(e.target.value===this.state.Data.Question[i].toString().replace(/\r/g,""))
            {
                break
            }
        }
        this.setState({Cerrent_Question:this.state.Data.Question[i].toString().replace(/\r/g,"")},()=>{
            this.setState({L:this.state.Data.Left[i]},()=>{
                this.setState({R:this.state.Data.Right[i]},()=>{
                    this.Get_Result();
                })
            })
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
                case "Trapzoidal" :
                    break;
                case "Simpson":
                    break;
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
        // if(this.state.Cerrent_Question!=="")
        // {
        //     if(this.props.SubHeader==="OnePointIteration")
        //     {
        //         try {
        //             return ( 
        //                 <div>
        //                     <h2>TestResult : {parseFloat(((math.evaluate(this.state.Cerrent_Question,{x:this.state.Result}) as number ) - (this.state.Result as number)).toString()).toFixed(6)}</h2>
        //                 </div>
        //             )
        //         } catch (error) {
        //             return <div></div>
        //         }
        //     }
        //     else
        //     {
        //         try {
        //             return ( 
        //                 <div>
        //                     <h2>TestResult : {parseFloat(math.evaluate(this.state.Cerrent_Question,{x:this.state.Result})).toFixed(6)}</h2>
        //                 </div>
        //             )
        //         } catch (error) {
        //             return <div></div>
        //         }
        //     }
        // }
        // else
        // {
        //     return <div></div>
        // }
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
                            >
                                {this.get_Select_Question()}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormGroup>
                            <FormControlLabel control={<Checkbox  checked={this.state.Custom_Para} onChange={this.handelCheckbox}/>} label="Custom Question"/>
                        </FormGroup>
                    </div>
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
                        <label>
                            Left:{" "}
                            <TextField 
                                label="Left" 
                                variant="outlined" 
                                margin="normal"
                                type="text" 
                                name="Left" 
                                value={this.state.L} 
                                onChange={this.handelQuestion} 
                                disabled = {!this.state.Custom_Para}/>
                        </label>
                        <label>
                            Right:{" "}
                            <TextField 
                                label="Right" 
                                variant="outlined" 
                                margin="normal"
                                type="text" 
                                name="Right" 
                                value={this.state.R} 
                                onChange={this.handelQuestion} 
                                disabled = {!this.state.Custom_Para}/>
                        </label>
                        <label>
                            N:{" "}
                            <TextField 
                                label="N" 
                                variant="outlined" 
                                margin="normal"
                                type="text" 
                                name="N" 
                                value={this.state.N} 
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
                        <h2>Left : {this.state.L} </h2>
                        <h2>Right : {this.state.R}</h2>
                        <h2>N : {this.state.N}</h2>
                    </div>
                    <div>
                        <h2>Result : {this.state.Result.toFixed(6)}</h2>
                    </div>
                        {this.showTrueResult()}
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Unit5;