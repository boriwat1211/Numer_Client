import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { ChangeEvent } from "react";
import * as math from 'mathjs'
import { Cal_LagrangeInterpolation, Cal_NewtonDividedDifference } from "./Unit3_code";
interface NewtonDividedDifference
{

}
interface LagrangeInterpolation
{

}
interface Polynomial
{
    
}
interface Cutom_list
{
    NewtonDividedDifference:NewtonDividedDifference,
    LagrangeInterpolation:LagrangeInterpolation,
    PolynomialInterpolation:Polynomial
}
interface ServerResponse_Data
{
    Name:String,
    Context:String,
    Question:Array<string>
    Question1:Array<String>
    Question2:Array<String>
    Point:Array<String>
}
interface Iprops
{
    Header:String,
    SubHeader:String
    Token:String
}
interface Istate
{
    Data:{
        Name:String,
        Context:String,
        Question:Array<string>
        Question1:Array<String>,
        Question2:Array<String>,
        Point:Array<String>
    },
    Header:String,
    SubHeader:String,
    Result:Number,
    Custom_Para:boolean,
    Current_Question:string,
    Cerrent_Question1:string,
    Cerrent_Question2:string,
    Custom_Para_list:Cutom_list,
    Check_code:boolean,
    Point:string
}
class Unit3 extends React.Component<Iprops,Istate>
{
    constructor(props:Iprops)
    {
        super(props);
        const custom_param:Cutom_list = {
            NewtonDividedDifference:
            {

            },
            LagrangeInterpolation:
            {

            },
            PolynomialInterpolation:
            {

            }
        }
        this.state=
        {
            Data:{
                Name:" ",
                Context:" ",
                Question:[],
                Question1:[],
                Question2:[],
                Point:[]
            },
            Header:this.props.Header,
            SubHeader:this.props.SubHeader,
            Result:0,
            Custom_Para:false,
            Current_Question:"",
            Cerrent_Question1:"",
            Cerrent_Question2:"",
            Custom_Para_list:custom_param,
            Check_code:false,
            Point:""
        }
        this.get_Data()
    }
    Get_Result = () =>
    {
        let Result:any,Loop_Result:any,Loop_Error:any;
        switch (this.state.SubHeader)
        {
            case "NewtonDividedDifference":
                let LinearInterpolation:Cal_NewtonDividedDifference = new Cal_NewtonDividedDifference(this.state.Cerrent_Question1,this.state.Cerrent_Question2,this.state.Current_Question,this.state.Point)
                Result = LinearInterpolation.Result()
                this.setState({Result:Result})
                break;
            case "LagrangeInterpolation":
                let LagrangeInterpolation:Cal_LagrangeInterpolation = new Cal_LagrangeInterpolation(this.state.Cerrent_Question1,this.state.Cerrent_Question2,this.state.Current_Question,this.state.Point)
                Result = LagrangeInterpolation.Result()
                this.setState({Result:Result})
                break;
            case "PolynomialInterpolation":
                break;
        }
    }
    get_Data = () =>
    {   
        axios.get<ServerResponse_Data>("http://localhost:6061/Data/"+this.state.SubHeader,{
            headers:{
                Authorization: 'Bearer ' + this.props.Token 
            }
        }).then((res)=>{
            let Data : any = {
                Name:res.data.Name,
                Context:res.data.Context,
                Question:res.data.Question,
                Question1:res.data.Question1,
                Question2:res.data.Question2,
                Point:res.data.Point
            }
            this.setState({Data:Data},()=>{this.setState({Cerrent_Question1:this.state.Data.Question1[0].toString().replace(/\r/g,"")},()=>{
                this.setState({Cerrent_Question2:this.state.Data.Question2[0].toString().replace(/\r/g,"")},()=>{
                    this.setState({Point:this.state.Data.Point[0].toString().replace(/\r/g,"")},()=>{
                    this.setState({Current_Question:this.state.Data.Question[0].toString().replace(/\r/g,"")},()=>this.Get_Result())
                })})
            })})
        }) 
    }
    reset_para = () =>
    {
        const custom_param:Cutom_list = {
            NewtonDividedDifference:
            {
     
            },
            LagrangeInterpolation:
            {

            },
            PolynomialInterpolation:
            {

            }
        }
        this.setState({Custom_Para:false,Cerrent_Question1:"",Cerrent_Question2:"",Result:0,Custom_Para_list:custom_param},()=>this.get_Data())
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
        if(e.target.name === "Question1")
        {
            this.setState({Cerrent_Question1:e.target.value.toString()})
        }
        else if(e.target.name === "Question2")
        {
            this.setState({Cerrent_Question2:e.target.value.toString()})
        }
        else if(e.target.name === "Question")
        {
            this.setState({Current_Question:e.target.value.toString()})
        }
        else if(e.target.name === "Point")
        {
            this.setState({Point:e.target.value.toString()})
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
            if(this.state.Cerrent_Question1 !=="" && this.state.Cerrent_Question2 !=="")
            {
                switch (this.state.SubHeader)
                {
                    case "NewtonDividedDifference":
                        if(Object.values(this.state.Custom_Para_list.NewtonDividedDifference).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.Get_Result()
                        }
                        break;
                    case "LagrangeInterpolation":
                        if(Object.values(this.state.Custom_Para_list.LagrangeInterpolation).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.Get_Result()
                        }
                        break;
                    case "PolynomialInterpolation":
                        if(Object.values(this.state.Custom_Para_list.PolynomialInterpolation).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.Get_Result()
                        }
                        break;
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

        }
        this.setState({Custom_Para_list:para})
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
        this.setState({Cerrent_Question1:this.state.Data.Question1[i].toString().replace(/\r/g,"")},()=>this.setState({Cerrent_Question2:this.state.Data.Question2[i].toString().replace(/\r/g,"")},()=>{this.setState({Point:this.state.Data.Point[i].toString().replace(/\r/g,"")},()=>{
            this.setState({Current_Question:this.state.Data.Question[i].toString().replace(/\r/g,"")},()=>this.Get_Result())
        })}))
    }
    get_custom_param = () =>
    {
        let result:Array<any> = [] 
        for(let i:number = 0;i<Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list]).length;i++)
        {
            switch (this.state.SubHeader)
            {
                case "NewtonDividedDifference":
                    result.push(
                        <label key={i.toString()}>
                            {Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}:{" "}
                            <input 
                                key={i.toString()}
                                disabled = {(!this.state.Custom_Para)}
                                type="number" 
                                value={this.state.Custom_Para_list.NewtonDividedDifference[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof NewtonDividedDifference]}
                                name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                onChange={this.handelCustom}
                            >
                            </input>
                        </label>
                    )
                    break;
                case "LagrangeInterpolation":
                    result.push(
                        <label key={i.toString()}>
                            {Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}:{" "}
                            <input 
                                key={i.toString()}
                                disabled = {(!this.state.Custom_Para)}
                                type="number" 
                                value={this.state.Custom_Para_list.LagrangeInterpolation[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof LagrangeInterpolation]}
                                name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                onChange={this.handelCustom}
                            >
                            </input>
                        </label>
                    )
                    break;
                case "PolynomialInterpolation":
                    result.push(
                        <label key={i.toString()}>
                            {Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}:{" "}
                            <input 
                                key={i.toString()}
                                disabled = {(!this.state.Custom_Para)}
                                type="number" 
                                value={this.state.Custom_Para_list.PolynomialInterpolation[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof Polynomial]}
                                name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                onChange={this.handelCustom}
                            >
                            </input>
                        </label>
                    )
                    break;
            }
        }
        return result
    }
    showEquation1 = () =>
    {
        if(this.state.Cerrent_Question1!=="")
        {
            try{
                return(
                    <MathJax dynamic inline>{"\\("+math.parse(this.state.Cerrent_Question1.toString().replace(/\r/g,"")).toTex({parenthesis: 'keep',implicit: 'show'})+"\\)"}</MathJax>
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
        if(this.state.Cerrent_Question2!=="")
        {
            try{
                return(
                    <MathJax dynamic inline>{"\\("+math.parse(this.state.Cerrent_Question2.toString().replace(/\r/g,"")).toTex({parenthesis: 'keep',implicit: 'show'})+"\\)"}</MathJax>
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
                            <select value={this.state.Cerrent_Question1} onChange={this.set_Current_Question}>
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
                                value={this.state.Cerrent_Question1}
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
                                value={this.state.Cerrent_Question2}
                                onChange={this.handelQuestion}
                            >
                            </input>
                        </label>
                    </div>
                    <div>
                    <label>
                            X_CAL :{" "}
                            <input 
                                disabled = {(!this.state.Custom_Para)}
                                type="text" 
                                name="Question"
                                value={this.state.Current_Question}
                                onChange={this.handelQuestion}
                            >
                            </input>
                        </label>
                    </div>
                    <div>
                    <label>
                            Point :{" "}
                            <input 
                                disabled = {(!this.state.Custom_Para)}
                                type="text" 
                                name="Point"
                                value={this.state.Point}
                                onChange={this.handelQuestion}
                            >
                            </input>
                        </label>
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
                        <h2>X_CAL : {this.state.Current_Question}</h2>
                    </div>
                    <div>
                        <h2>Point : {this.state.Point.toString()}</h2>
                    </div>
                    <div>
                        <h2>Result : {this.state.Result}</h2>
                    </div>
                    {/* <div>
                        <Charts loop_result_R={this.state.LoopResult} Unit={this.state.Header} loop_result_L={[]} Loop_Error_L={[]} Loop_Error_R={this.state.LoopError}/>
                    </div> */}
                </div>
            </div>
        )
    }
}
export default Unit3 