import axios from "axios";
import React, { ChangeEvent } from "react";
import withRouter from "./Custom_HOC";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { xonokai } from 'react-syntax-highlighter/dist/esm/styles/prism';
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
interface  NewtonRaphson
{
    Diff_Question:string,
    X0:string
}
interface OnePointIteration
{
    X0:string
}
interface ServerResponse_Data
{
    Name:String,
    Context:String,
    Code:String,
    Code_Run:String
    Question:Array<String>
}
interface Iprops
{
    params:{
        Header:String,
        SubHeader:String
    }
}
interface Cutom_list
{
    Bitsection: Bitsection
    FalsePosition: FalsePosition
    NewtonRaphson: NewtonRaphson
    OnePointIteration: OnePointIteration
}
interface Istate
{
    Data:{
        Name:String,
        Context:String,
        Code:String,
        Question:Array<String>
    },
    Header:String,
    SubHeader:String,
    Cal:any,
    Result:Number,
    Custom_Para:boolean,
    Cerrent_Question:string
    Custom_Para_list:Cutom_list
}
class Data extends React.Component<Iprops,Istate>
{
    constructor(props:Iprops)
    {
        super(props)
        const custom_param:Cutom_list = {
            Bitsection:
            {
                XL:"",
                XR:""
            },
            FalsePosition:
            {
                XL:"",
                XR:""
            },
            NewtonRaphson:
            {
                Diff_Question:"",
                X0:""
            },
            OnePointIteration:
            {
                X0:""
            }
        }
        this.state=
        {
            Data:{
                Name:" ",
                Context:" ",
                Code:" ",
                Question:[]
            },
            Header:this.props.params.Header,
            SubHeader:this.props.params.SubHeader,
            Cal:null,
            Result:0,
            Custom_Para:false,
            Cerrent_Question:"",
            Custom_Para_list:custom_param
        }    
        this.get_Data()    
    }
    get_Data = () =>
    {
        axios.get<ServerResponse_Data>("http://localhost:6060/Data/"+this.state.Header+"/"+this.state.SubHeader).then((res)=>{
            let Data : any = {
                Name:res.data.Name,
                Context:res.data.Context,
                Code:res.data.Code,
                Question:res.data.Question
            }
            this.setState({Data:Data},()=>{
                const code:string = `({Lab1(question,XL = 1,XR = 100,X0 = 0.1,diff_question = '2*x'){
                    ${this.state.Data.Code}
                return Main(question,XL,XR,X0,diff_question)}
                })`
                let result:any = eval(code)
                // this.setState({Cal:result},()=>this.setState({Result:this.state.Cal.Lab1()},()=>{this.setState({Cerrent_Question:this.state.Data.Question[0].toString()})}))
                this.setState({Cal:result},()=>this.setState({Cerrent_Question:this.state.Data.Question[0].toString()},()=>this.setState({Result:this.state.Cal.Lab1(this.state.Cerrent_Question)})))
            })
        })
    }
    reset_para = () =>
    {
        const custom_param:Cutom_list = {
            Bitsection:
            {
                XL:"",
                XR:""
            },
            FalsePosition:
            {
                XL:"",
                XR:""
            },
            NewtonRaphson:
            {
                Diff_Question:"",
                X0:""
            },
            OnePointIteration:
            {
                X0:""
            }
        }
        this.setState({Custom_Para:false,Cerrent_Question:"",Result:0,Custom_Para_list:custom_param},()=>this.get_Data())
    }
    componentDidUpdate = () =>
    {
        if(this.state.Header!==this.props.params.Header || this.state.SubHeader!==this.props.params.SubHeader)
        {
            this.setState({Header:this.props.params.Header})
            this.setState({SubHeader:this.props.params.SubHeader},()=>this.reset_para())
        }
        return null;
    }
    handelCheckbox = (e:ChangeEvent<HTMLInputElement>)=>
    {
        this.setState({Custom_Para:e.target.checked})
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
                            this.setState({Result:this.state.Cal.Lab1(this.state.Cerrent_Question,parseFloat(this.state.Custom_Para_list.Bitsection.XL),parseFloat(this.state.Custom_Para_list.Bitsection.XR),0,"")})
                        }
                        break
                    case "FalsePosition" :
                        if(Object.values(this.state.Custom_Para_list.FalsePosition).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.setState({Result:this.state.Cal.Lab1(this.state.Cerrent_Question,parseFloat(this.state.Custom_Para_list.FalsePosition.XL),parseFloat(this.state.Custom_Para_list.FalsePosition.XR),0,"")})
                        }
                        break
                    case "NewtonRaphson" :
                        if(Object.values(this.state.Custom_Para_list.NewtonRaphson).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.setState({Result:this.state.Cal.Lab1(this.state.Cerrent_Question,0,0,parseFloat(this.state.Custom_Para_list.NewtonRaphson.X0),this.state.Custom_Para_list.NewtonRaphson.Diff_Question)})
                        }
                        break
                    case "OnePointIteration":
                        if(Object.values(this.state.Custom_Para_list.OnePointIteration).includes(""))
                        {
                            alert("Enter all inputs!!")
                        }
                        else
                        {
                            this.setState({Result:this.state.Cal.Lab1(this.state.Cerrent_Question,0,0,parseFloat(this.state.Custom_Para_list.OnePointIteration.X0),"")})
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
        }
        this.setState({Custom_Para_list:para})
    }
    get_Select_Question = () =>
    {
        let result:Array<any> = []
        if(this.state.Data.Question.length !== 0)
        {   
            for(let i = 0;i<this.state.Data.Question.length;i++)
            {
                result.push(<option key={i.toString()} value={this.state.Data.Question[i].toString()}>{this.state.Data.Question[i].toString()}</option>)
            }
        }
        return result
    }
    set_Current_Question = (e:ChangeEvent<HTMLSelectElement>) =>
    {
        this.setState({Cerrent_Question:e.target.value},()=>this.setState({Result:this.state.Cal.Lab1(this.state.Cerrent_Question)}))
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
                            <input 
                                key={i.toString()}
                                disabled = {(!this.state.Custom_Para)}
                                type="number" 
                                value={this.state.Custom_Para_list.Bitsection[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof Bitsection]}
                                name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                onChange={this.handelCustom}
                            >
                            </input>
                        </label>
                    )
                    break
                case "FalsePosition" :
                    result.push(
                        <label key={i.toString()}>
                            {Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}:{" "}
                            <input 
                                key={i.toString()}
                                disabled = {(!this.state.Custom_Para)}
                                type="number" 
                                value={this.state.Custom_Para_list.FalsePosition[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof FalsePosition]}
                                name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                onChange={this.handelCustom}
                            >
                            </input>
                        </label>
                    )
                    break
                case "NewtonRaphson" :
                    if(Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]==="Diff_Question")
                    {
                        result.push(
                            <label key={i.toString()}>
                                {Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}:{" "}
                                <input 
                                    key={i.toString()}
                                    disabled = {(!this.state.Custom_Para)}
                                    type="text" 
                                    value={this.state.Custom_Para_list.NewtonRaphson[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof NewtonRaphson]}
                                    name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                    onChange={this.handelCustom}
                                >
                                </input>
                            </label>
                        )
                    }
                    else
                    {
                        result.push(
                            <label key={i.toString()}>
                                {Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}:{" "}
                                <input 
                                    key={i.toString()}
                                    disabled = {(!this.state.Custom_Para)}
                                    type="number" 
                                    value={this.state.Custom_Para_list.NewtonRaphson[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof NewtonRaphson]}
                                    name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                    onChange={this.handelCustom}
                                >
                                </input>
                            </label>
                        )
                    }
                    break
                case "OnePointIteration":
                    result.push(
                        <label key={i.toString()}>
                            {Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}:{" "}
                            <input 
                                key={i.toString()}
                                disabled = {(!this.state.Custom_Para)}
                                type="number" 
                                value={this.state.Custom_Para_list.OnePointIteration[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof OnePointIteration]}
                                name={Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i]}
                                onChange={this.handelCustom}
                            >
                            </input>
                        </label>
                    )
                    break
            }
        }
        return result
    }
    render()
    {
        return(
            <div>
                <h1>{this.state.Data.Name}</h1>
                <h2>{this.state.Data.Context}</h2>
                <SyntaxHighlighter language="javascript" style={xonokai}>
                    {this.state.Data.Code}
                </SyntaxHighlighter>
                <div style={{backgroundColor:"lightcoral"}}>
                    <div>
                        <label>
                            Select Question :
                            <select value={this.state.Cerrent_Question} onChange={this.set_Current_Question}>
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
                    <div>
                        <h2>Current Question : {this.state.Cerrent_Question}</h2>
                    </div>
                    <div>
                        <h2>Result : {this.state.Result}</h2>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Data);