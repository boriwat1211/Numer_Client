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
import { Cal_Simpson, Cal_Trapzoidal } from "../Integration/Unit5_code";
import { Cal_DividedDifference } from "./Unit6_code";
//-----//
interface DividedDifference
{

}
interface ServerResponse_Data
{
    Name:String,
    Context:String,
    Question:Array<String>,
    X:Array<String>,
    Height:Array<String>,
}
interface Iprops
{
    Header:String,
    SubHeader:String
    Token:String
}
interface Cutom_list
{
    DividedDifference:DividedDifference
}
interface Istate
{
    Data:{
        Name:String,
        Context:String,
        Question:Array<String>,
        X:Array<String>,
        Height:Array<String>
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
    Order:string,
    ErrorOrder:string,
    Point:string,
    X:string,
    Height:string,
    TrueResult:Number,
    Error:Number
}
class Unit6 extends React.Component<Iprops,Istate>
{
    constructor(props:Iprops)
    {
        super(props)
        const custom_param:Cutom_list = {
            DividedDifference:{}
        }
        this.state=
        {
            Data:{
                Name:" ",
                Context:" ",
                Question:[],
                X:[],
                Height:[],
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
            Order:"1",
            ErrorOrder:"O(h)",
            X:"",
            Height:"",
            Point:"Forward",
            TrueResult:0,
            Error:0
        }   
        this.get_Data() 
    }
    Get_Result = () =>
    {
        let Result:any;
        let DividedDifference:Cal_DividedDifference= new Cal_DividedDifference(this.state.Cerrent_Question,this.state.Order,this.state.X,this.state.ErrorOrder,this.state.Height,this.state.Point);
        Result =  DividedDifference.Result()
        this.setState({Result:Result[0]},()=>{this.setState({TrueResult:Result[1]},()=>{this.setState({Error:((parseFloat(this.state.TrueResult.toString())-parseFloat(this.state.Result.toString()))/parseFloat(this.state.TrueResult.toString()))*100})})});
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
                Question:res.data.Question,
                X:res.data.X,
                Height:res.data.Height
            }
            this.setState({Data:Data},()=>{this.setState({Cerrent_Question:this.state.Data.Question[0].toString().replace(/\r/g,"")},()=>{
                this.setState({X:this.state.Data.X[0].toString().replace(/\r/g,"")},()=>{
                    this.setState({Height:this.state.Data.Height[0].toString().replace(/\r/g,"")},()=>this.Get_Result())
                })
            })})
        })
    }
    reset_para = () =>
    {
        const custom_param:Cutom_list = {
            DividedDifference:{}
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
        else if(e.target.name === "Height")
        {
            this.setState({Height:e.target.value.toString()})
        }
        else if(e.target.name === "X")
        {
            this.setState({X:e.target.value.toString()})
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
            if(this.state.Cerrent_Question !=="" && this.state.Height !== "" && this.state.X !== "")
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
            case "DividedDifference" :
                
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
            this.setState({X:this.state.Data.X[i].toString().replace(/\r/g,"")},()=>{
                this.setState({Height:this.state.Data.Height[i].toString().replace(/\r/g,"")},()=>{
                    this.setState({
                    Order:"1",
                    ErrorOrder:"O(h)",
                    Point:"Forward"},()=> this.Get_Result())
                })
            })
        })
    }
    set_Current_Order = (e:SelectChangeEvent) =>
    {
        this.setState({Order:e.target.value})
    }
    set_Current_Error_Order = (e:SelectChangeEvent) =>
    {
        if(e.target.value==="O(h)")
        {
            this.setState({Point:"Forward"})
        }
        else if(e.target.value === "O(h^2)")
        {
            this.setState({Point:"Central"})
        }
        else if(e.target.value === "O(h^4)")
        {
            this.setState({Point:"Central"})
        }
        this.setState({ErrorOrder:e.target.value})
    }
    set_Current_Point = (e:SelectChangeEvent) =>
    {
        this.setState({Point:e.target.value})
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
    get_Select_Point = () =>
    {
        switch(this.state.ErrorOrder)
        {
            case "O(h)" :
                return(
                    <Select
                        disabled = {!this.state.Custom_Para}
                        labelId="Select-Question-Unit1"
                        id="Select-Qusetion-Unit1-Value"
                        value={this.state.Point}
                        onChange={this.set_Current_Point}
                    >
                        <MenuItem key={"2"} value={"Forward"}>
                            <label>Forward</label>
                        </MenuItem>
                        <MenuItem key={"3"} value={"Backward"}>
                            <label>Backward</label>
                        </MenuItem>
                    </Select>
                )
            case "O(h^2)" :
                return(
                    <Select
                        disabled = {!this.state.Custom_Para}
                        labelId="Select-Question-Unit1"
                        id="Select-Qusetion-Unit1-Value"
                        value={this.state.Point}
                        onChange={this.set_Current_Point}
                    >
                        <MenuItem key={"1"} value={"Central"}>
                            <label>Central</label>
                        </MenuItem>
                        <MenuItem key={"2"} value={"Forward"}>
                            <label>Forward</label>
                        </MenuItem>
                        <MenuItem key={"3"} value={"Backward"}>
                            <label>Backward</label>
                        </MenuItem>
                    </Select>
                )
            case "O(h^4)" :
                return(
                    <Select
                        disabled = {!this.state.Custom_Para}
                        labelId="Select-Question-Unit1"
                        id="Select-Qusetion-Unit1-Value"
                        value={this.state.Point}
                        onChange={this.set_Current_Point}
                    >
                        <MenuItem key={"1"} value={"Central"}>
                            <label>Central</label>
                        </MenuItem>
                    </Select>
                )
        }
    }
    get_custom_param = () =>
    {
        let result:Array<any> = [] 
        for(let i:number = 0;i<Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list]).length;i++)
        {
            switch (this.state.SubHeader)
            {
                case "DividedDifference" :
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
                            X:{" "}
                            <TextField 
                                label="X" 
                                variant="outlined" 
                                margin="normal"
                                type="text" 
                                name="X" 
                                value={this.state.X} 
                                onChange={this.handelQuestion} 
                                disabled = {!this.state.Custom_Para}/>
                        </label>
                    </div>
                    <div>
                        <label>
                            Height:{" "}
                            <TextField 
                                label="Height" 
                                variant="outlined" 
                                margin="normal"
                                type="text" 
                                name="Height" 
                                value={this.state.Height} 
                                onChange={this.handelQuestion} 
                                disabled = {!this.state.Custom_Para}/>
                        </label>
                    </div>
                    <div>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="Select-Question-Unit1">Order</InputLabel>
                            <Select
                                disabled = {!this.state.Custom_Para}
                                labelId="Select-Question-Unit1"
                                id="Select-Qusetion-Unit1-Value"
                                value={this.state.Order}
                                onChange={this.set_Current_Order}
                            >
                                <MenuItem key={"1"} value={"1"}>
                                    <label>1</label>
                                </MenuItem>
                                <MenuItem key={"2"} value={"2"}>
                                    <label>2</label>
                                </MenuItem>
                                <MenuItem key={"3"} value={"3"}>
                                    <label>3</label>
                                </MenuItem>
                                <MenuItem key={"4"} value={"4"}>
                                    <label>4</label>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="Select-Question-Unit1">Error of Order</InputLabel>
                            <Select
                                disabled = {!this.state.Custom_Para}
                                labelId="Select-Question-Unit1"
                                id="Select-Qusetion-Unit1-Value"
                                value={this.state.ErrorOrder}
                                onChange={this.set_Current_Error_Order}
                            >
                                <MenuItem key={"1"} value={"O(h)"}>
                                    <MathJaxContext>
                                        <MathJax dynamic inline >{"\\("+math.parse("O(h)").toTex({parenthesis: 'keep',implicit: 'show'})+"\\)"}</MathJax>
                                    </MathJaxContext>
                                </MenuItem>
                                <MenuItem key={"2"} value={"O(h^2)"}>
                                    <MathJaxContext>
                                        <MathJax dynamic inline >{"\\("+math.parse("O(h^2)").toTex({parenthesis: 'keep',implicit: 'show'})+"\\)"}</MathJax>
                                    </MathJaxContext>
                                </MenuItem>
                                <MenuItem key={"3"} value={"O(h^4)"}>
                                    <MathJaxContext>
                                        <MathJax dynamic inline >{"\\("+math.parse("O(h^4)").toTex({parenthesis: 'keep',implicit: 'show'})+"\\)"}</MathJax>
                                    </MathJaxContext>
                                </MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="Select-Question-Unit1">Point</InputLabel>
                            {this.get_Select_Point()}
                        </FormControl>
                    </div>
                    <div>
                        {/* <label>
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
                        </label> */}
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
                        {/* <h2>Left : {this.state.L} </h2>
                        <h2>Right : {this.state.R}</h2> */}
                        <h2>X : {this.state.X}</h2>
                        <h2>Height : {this.state.Height}</h2>
                        <h2>Order : {this.state.Order}</h2>
                        <h2>Point : {this.state.Point}</h2>
                        <h2>Error of Order : 
                            {
                                <MathJaxContext>
                                    <MathJax dynamic inline >{"\\("+math.parse(this.state.ErrorOrder).toTex({parenthesis: 'keep',implicit: 'show'})+"\\)"}</MathJax>
                                </MathJaxContext>
                            }</h2>
                    </div>
                    <div>
                        <h2>Result : {this.state.Result.toFixed(6)}</h2>
                    </div>
                    <div>
                        <h2>True Result : {this.state.TrueResult.toFixed(6)}</h2>
                    </div>
                    <div>
                        <h2>Error : {this.state.Error.toFixed(6)}</h2>
                    </div>
                    <div>
                    </div>
                </div>
            </div>
        )
    }
}
export default Unit6;