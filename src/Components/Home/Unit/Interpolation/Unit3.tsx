import axios from "axios";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import React, { ChangeEvent } from "react";
import * as math from 'mathjs'
import { Cal_LagrangeInterpolation, Cal_NewtonDividedDifference } from "./Unit3_code";




//MUI///
import Select, { SelectChangeEvent } from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Button, FormControl, Table } from "@mui/material";
import TextField from '@mui/material/TextField';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

//-----//



interface NewtonDividedDifference
{

}
interface LagrangeInterpolation
{

}
interface SplineInterpolation
{

}
interface Cutom_list
{
    NewtonDividedDifference:NewtonDividedDifference,
    LagrangeInterpolation:LagrangeInterpolation,
    SplineInterpolation:SplineInterpolation
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
    Cerrent_Question1:Array<number>,
    Cerrent_Question2:Array<number>,
    Custom_Para_list:Cutom_list,
    Check_code:boolean,
    Point:string,
    dimensionX:number,
    PointChecker:Array<boolean>
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
            SplineInterpolation:
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
            Cerrent_Question1:[],
            Cerrent_Question2:[],
            Custom_Para_list:custom_param,
            Check_code:false,
            Point:"",
            dimensionX:0,
            PointChecker:[]
        }
        this.get_Data()
    }
    Get_Result = () =>
    {
        let Result:any;
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
            case "SplineInterpolation":
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
            this.setState({Data:Data},()=>{this.setState({Cerrent_Question1:JSON.parse(this.state.Data.Question1[0].toString().replace(/\r/g,""))},()=>{
                this.setState({Cerrent_Question2:JSON.parse(this.state.Data.Question2[0].toString().replace(/\r/g,""))},()=>{
                    this.setState({Point:JSON.parse(this.state.Data.Point[0].toString().replace(/\r/g,"")).toString()},()=>{
                    this.setState({Current_Question:this.state.Data.Question[0].toString().replace(/\r/g,"")},()=>{
                        this.setState({dimensionX:this.state.Cerrent_Question1.length},()=>{
                            const data = new Array((this.state.dimensionX)).fill(false);
                            for(const i of JSON.parse("["+this.state.Point+"]"))
                            {
                                data[parseInt(i)-1] = true;
                            }
                            this.setState({PointChecker:data},()=>this.Get_Result())
                        })
                    })
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
            SplineInterpolation:
            {

            }
        }
        this.setState({Custom_Para:false,Cerrent_Question1:[],Cerrent_Question2:[],Result:0,Custom_Para_list:custom_param,PointChecker:[]},()=>this.get_Data())
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
        let X:RegExp = new RegExp("X[0-9]+");
        let Y:RegExp = new RegExp("Y[0-9]+")
        let float_C:RegExp = new RegExp("^-?[0-9]*\\.?[0-9]*$");
        let minus:RegExp = new RegExp("^[0-9]*\\.?[0-9]*-$");
        let addfloat:RegExp = new RegExp("^-?[0-9]*\\.?[0-9]*\\+");
        if(X.test(e.target.name))
        {
            let temp:Array<number> = this.state.Cerrent_Question1;
            if(e.target.value===""||e.target.value==="-")
            {
                temp[parseInt(e.target.name.split("X")[1])] = 0;
            }
            else if(minus.test(e.target.value))
            {
                temp[parseInt(e.target.name.split("X")[1])] = parseFloat("-"+e.target.value);
            }
            else if(addfloat.test(e.target.value))
            {
                let value:string=parseFloat((parseFloat(e.target.value)+0.1).toString()).toPrecision(15);
                temp[parseInt(e.target.name.split("X")[1])] = parseFloat(value);
            }
            else if(float_C.test(e.target.value))
            {
                temp[parseInt(e.target.name.split("X")[1])] = parseFloat(e.target.value);
            }
            this.setState({Cerrent_Question1:temp})
        }
        else if(Y.test(e.target.name))
        {
            let temp:Array<number> = this.state.Cerrent_Question2;
            if(e.target.value===""||e.target.value==="-")
            {
                temp[parseInt(e.target.name.split("Y")[1])] = 0;
            }
            else if(minus.test(e.target.value))
            {
                temp[parseInt(e.target.name.split("Y")[1])] = parseFloat("-"+e.target.value);
            }
            else if(addfloat.test(e.target.value))
            {
                let value:string=parseFloat((parseFloat(e.target.value)+0.1).toString()).toPrecision(15);
                temp[parseInt(e.target.name.split("Y")[1])] = parseFloat(value);
            }
            else if(float_C.test(e.target.value))
            {
                temp[parseInt(e.target.name.split("Y")[1])] = parseFloat(e.target.value);
            }
            this.setState({Cerrent_Question2:temp})
        }
        else if(e.target.name === "dimensionX")
        { 
            if (e.target.value==="")
            {
                this.setState({dimensionX:0},()=>{this.resetdimension()});
            }
            else if(e.target.value!=="0")
            {
                this.setState({dimensionX:parseInt(e.target.value)},()=>{this.resetdimension()})
            }
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
    resetdimension = ()=>
    {
        if(this.state.dimensionX>0)
        {
            this.setState({Cerrent_Question1:new Array(this.state.dimensionX).fill(0)},()=>this.setState({Cerrent_Question2:new Array(this.state.dimensionX).fill(0)},()=>
            {   
                this.setState({PointChecker:new Array(this.state.dimensionX).fill(false)})
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
                        if(Object.values(this.state.Custom_Para_list.SplineInterpolation).includes(""))
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
                // result.push(<option key={i.toString()} value={this.state.Data.Question1[i].toString().replace(/\r/g,"")}>{this.state.Data.Question1[i].toString()}</option>)
                result.push(
                    <MenuItem key={i.toString()} value={this.state.Data.Question1[i].toString().replace(/\r/g,"")}>
                            <MathJaxContext>
                                <MathJax dynamic inline >{"\\("+math.parse(this.state.Data.Question1[i].toString().replace(/\r/g,"")).toTex({parenthesis: 'keep',implicit: 'show'})+"\\)"}</MathJax>
                            </MathJaxContext>
                    </MenuItem>
                )
            }
        }
        return result
    }
    set_Current_Question = (e:SelectChangeEvent) =>
    {
        let i:number = 0;
        for( i =0;i<this.state.Data.Question1.length;i++)
        {
            if(e.target.value===this.state.Data.Question1[i].toString().replace(/\r/g,""))
            {
                break
            }
        }
        this.setState({Cerrent_Question1:JSON.parse(this.state.Data.Question1[i].toString().replace(/\r/g,""))},()=>this.setState({Cerrent_Question2:JSON.parse(this.state.Data.Question2[i].toString().replace(/\r/g,""))},()=>{this.setState({Point:JSON.parse(this.state.Data.Point[i].toString().replace(/\r/g,"")).toString()},()=>{
            this.setState({Current_Question:this.state.Data.Question[i].toString().replace(/\r/g,"")},()=>{
                this.setState({dimensionX:JSON.parse(this.state.Data.Question1[i].toString()).length},()=>{
                    const data = new Array((this.state.dimensionX)).fill(false);
                    for(const i of JSON.parse("["+this.state.Point+"]"))
                    {
                        data[parseInt(i)-1] = true;
                    }
                    this.setState({PointChecker:data},()=>this.Get_Result());
                })})
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
                                value={this.state.Custom_Para_list.SplineInterpolation[Object.keys(this.state.Custom_Para_list[this.state.SubHeader as keyof Cutom_list])[i] as keyof SplineInterpolation]}
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
        if(this.state.Cerrent_Question1.toString()!=="")
        {
            try{
                return(
                    <MathJax dynamic inline>{"\\("+math.parse(JSON.stringify(this.state.Cerrent_Question1)).toTex({parenthesis: 'keep',implicit: 'show'})+"\\)"}</MathJax>
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
                    <MathJax dynamic inline>{"\\("+math.parse(JSON.stringify(this.state.Cerrent_Question2)).toTex({parenthesis: 'keep',implicit: 'show'})+"\\)"}</MathJax>
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
    onCheckPoint = (event: React.ChangeEvent<HTMLInputElement>) =>
    {
        let data = this.state.PointChecker;
        data[parseInt(event.target.name)] = event.target.checked;
        this.setState({PointChecker:data},()=>
        {
            let result = "";
            for(let i = 0;i<this.state.PointChecker.length;i++)
            {
                if(this.state.PointChecker[i])
                {
                    result+=(i+1).toString();
                    result+=",";
                }
            }
            this.setState({Point:result.slice(0,-1)})
        });  
    }
    getTable =()=>
    {
        let result:Array<any> = [];
        if( this.state.PointChecker.length === this.state.dimensionX && this.state.PointChecker.length >0 && this.state.dimensionX>0 && this.state.Cerrent_Question1.length === this.state.dimensionX && this.state.Cerrent_Question2.length === this.state.dimensionX)
        {
            for(let i:number = 0;i<this.state.dimensionX;i++)
            {
                result.push(
                    <TableRow key={i.toString()}>
                        <TableCell key={i.toString()} align="center">
                            {i+1}
                            <Checkbox
                                key={i.toString()}
                                disabled = {!this.state.Custom_Para}
                                name={`${i}`}
                                checked = {this.state.PointChecker[i]}
                                onChange ={this.onCheckPoint}
                            />
                        </TableCell>
                        <TableCell>
                            <TextField 
                                fullWidth
                                disabled = {(!this.state.Custom_Para)}
                                type = "text"
                                key={`${i}`}
                                name={`X${i}`}
                                value={this.state.Cerrent_Question1[i]}
                                onChange={this.handelQuestion}
                            >
                            </TextField>
                        </TableCell>
                        <TableCell>
                            <TextField 
                                fullWidth
                                disabled = {(!this.state.Custom_Para)}
                                type = "text" 
                                key={`${i}`}
                                name={`Y${i}`}
                                value={this.state.Cerrent_Question2[i]}
                                onChange={this.handelQuestion}
                            >
                            </TextField>
                        </TableCell>
                    </TableRow>
                )
            }
        }
        return result;
    }
    render()
    {
        return(
            <div>
                <h1>{this.state.Data.Name}</h1>
                <h2>{this.state.Data.Context}</h2>
                <div>
                    {/* <div>
                        <label>
                            Select Question :
                            <select value={this.state.Cerrent_Question1} onChange={this.set_Current_Question}>
                                {this.get_Select_Question()}
                            </select>
                        </label>
                    </div> */}
                    <div>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 400 }}>
                            <InputLabel id="Select-Question-Unit2">Question</InputLabel>
                            <Select
                                disabled = {this.state.Custom_Para}
                                labelId="Select-Question-Unit2"
                                id="Select-Qusetion-Unit2-Value"
                                value={JSON.stringify(this.state.Cerrent_Question1)==="[]"? "":JSON.stringify(this.state.Cerrent_Question1)}
                                onChange={this.set_Current_Question}
                                inputProps={
                                    {
                                        "data-testid":"Unit3-Select-Question"
                                    }
                                }
                            >
                                {this.get_Select_Question()}
                            </Select>
                        </FormControl>
                    </div>
                    <div>
                        {/* <label>
                            <input 
                                type="checkbox" 
                                name="CustomCheack"
                                title="Custom"
                                checked={this.state.Custom_Para} 
                                onChange={this.handelCheckbox}
                            >
                            </input>
                            Custom!
                        </label> */}
                        <FormGroup>
                            <FormControlLabel control={<Checkbox  checked={this.state.Custom_Para} onChange={this.handelCheckbox}/>} label="Custom Question"/>
                        </FormGroup>
                    </div>
                    <div>
                        <TextField
                            label="Number"
                            variant="outlined" 
                            margin="normal"
                            disabled = {(!this.state.Custom_Para)}
                            type = "text"
                            name="dimensionX"
                            value={this.state.dimensionX}
                            onChange={this.handelQuestion}
                            >
                        </TextField>
                    </div>
                    <div>
                        <Table sx={{minWidth:"10vw" , maxWidth:"80vw",borderStyle:"solid",borderWidth:"2px",borderColor:"#0083ff" }} aria-label ="simple table">
                            <TableHead sx={{backgroundColor:"#0083ff"}}>
                                <TableRow>
                                    <TableCell align="center" sx={{color:"white",fontSize:"20px"}}>#</TableCell>
                                    <TableCell align="center" sx={{color:"white",fontSize:"20px"}}>X</TableCell>
                                    <TableCell align="center" sx={{color:"white",fontSize:"20px"}}>Y</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.getTable()}
                            </TableBody>
                        </Table>
                    </div>
                    {/* <div>
                        <label>
                            X :{" "}
                            <input 
                                disabled = {(!this.state.Custom_Para)}
                                type="text" 
                                name="Question1"
                                value={this.state.Cerrent_Question1.toString()}
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
                                value={this.state.Cerrent_Question2.toString()}
                                onChange={this.handelQuestion}
                            >
                            </input>
                        </label>
                    </div> */}
                    <div>
                        {/* <label>
                            X_CAL :{" "}
                            <TextField 
                                label="XCal" 
                                variant="outlined" 
                                margin="normal"
                                disabled = {(!this.state.Custom_Para)}
                                type="text" 
                                name="Question"
                                value={this.state.Current_Question}
                                onChange={this.handelQuestion}
                            >
                            </TextField>
                        </label> */}
                    </div>
                    <div>
                        {/* <label>
                            Point :{" "}
                            <TextField
                                label="Point" 
                                variant="outlined" 
                                margin="normal"
                                disabled = {(!this.state.Custom_Para)}
                                type="text" 
                                name="Point"
                                value={this.state.Point}
                                onChange={this.handelQuestion}
                            >
                            </TextField>
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
                        <h2>Point : {this.state.Point}</h2>
                    </div>
                    <div>
                        <h2>Result : {this.state.Result.toFixed(6)}</h2>
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