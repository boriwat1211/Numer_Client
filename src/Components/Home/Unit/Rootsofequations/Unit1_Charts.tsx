import React from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, LineChart, Line, Brush, ReferenceLine} from 'recharts';
import * as math from "mathjs"
import { floor } from "mathjs";
interface Result_Data
{
    name:String,
    Loop_Result:number,
    Error_Result:number,
    ResutlofEquation:number,
    XL:number,
    XR:number
}
interface length
{
    name:String,
    Result:number,
    ResultLine:number,
}
interface Istate
{
    Data:Array<Result_Data>,
}
interface Iprops
{
    Unit:String,
    loop_result:Array<number>,
    Loop_Error:Array<number>,
    L:Array<number>,
    R:Array<number>,
    Q:string
}
interface Istate
{
    Data:Array<Result_Data>,
    Data2:Array<length>
}
class Unit1Chart extends React.Component<Iprops,Istate>
{
    constructor(props:Iprops)
    {
        super(props)
        this.state =
        {
            Data:[],
            Data2:[],
        }
    }
    get_Data = () =>
    {
        if(this.props.Unit === "Bitsection"|| this.props.Unit === "FalsePosition")
        {
            if(this.props.loop_result.length > 0&&this.props.Loop_Error.length>0 && this.props.Loop_Error.length===this.props.loop_result.length && 
                this.props.L.length>0 && this.props.R.length >0 && this.props.L.length === this.props.R.length && this.props.L.length === this.props.loop_result.length)
            {
                if(this.props.Q.length>0)
                {
                    let Data2:Array<length> = []
                    for(let i:number=floor(this.props.loop_result[this.props.Loop_Error.length-1]-150);i<=(this.props.Loop_Error.length-1)+150;i+=1)
                    {
                        let Subdata:length = 
                        {
                            name:i.toString(),
                            Result:math.evaluate(this.props.Q,{x:i}),
                            ResultLine:0
                        }
                        Data2.push(Subdata);
                    }
                    this.setState({Data2:Data2})
                }
                let Data:Array<Result_Data> = []
                for(let i:number = 0;i<this.props.loop_result.length;i++)
                {
                    let SubData:Result_Data = 
                    {
                        name:i.toString(),
                        Loop_Result:this.props.loop_result[i],
                        Error_Result:this.props.Loop_Error[i],
                        ResutlofEquation:math.evaluate(this.props.Q,{x:this.props.loop_result[i]}),
                        XL:this.props.L[i],
                        XR:this.props.R[i]
                    }
                    Data.push(SubData)
                }
                this.setState({Data:Data})
            }
        }
        else
        {
            if(this.props.loop_result.length > 0&&this.props.Loop_Error.length>0 && this.props.Loop_Error.length===this.props.loop_result.length)
            {
                if(this.props.Q.length>0)
                {
                    let Data2:Array<length> = []
                    for(let i:number=floor(this.props.loop_result[this.props.Loop_Error.length-1]-150);i<=(this.props.Loop_Error.length-1)+150;i+=1)
                    {
                        let Subdata:length = 
                        {
                            name:i.toString(),
                            Result:math.evaluate(this.props.Q,{x:i}),
                            ResultLine:0
                        }
                        Data2.push(Subdata);
                    }
                    this.setState({Data2:Data2})
                }
                let Data:Array<Result_Data> = []
                for(let i:number = 0;i<this.props.loop_result.length;i++)
                {
                    let SubData:Result_Data = 
                    {
                        name:i.toString(),
                        Loop_Result:this.props.loop_result[i],
                        Error_Result:this.props.Loop_Error[i],
                        ResutlofEquation:math.evaluate(this.props.Q,{x:this.props.loop_result[i]}),
                        XL:this.props.L[i],
                        XR:this.props.R[i]
                    }
                    Data.push(SubData)
                }
                this.setState({Data:Data})
            }
        }
    }
    componentDidUpdate = () =>
    {
        if(this.props.loop_result.length>0)
        {
            if(this.state.Data.length!==this.props.loop_result.length)
            {

                this.setState({Data:[]},()=>this.get_Data())
            }
            else
            {
                if(this.state.Data[this.state.Data.length-1].Loop_Result !== this.props.loop_result[this.props.loop_result.length-1])
                {
                    this.setState({Data:[]},()=>this.get_Data())
                }
            }
        }
    }
    getGraph = () =>
    {
        let Grap:Array<any>=[]
        if(this.props.Unit === "Bitsection"|| this.props.Unit === "FalsePosition" )
        {
            if(this.props.L.length>0&&this.props.R.length>0&&this.props.L.length>0&&this.props.Loop_Error.length>0)
            {
                Grap.push(
                    <div key={1}>
                        <label>Length</label>
                        <ResponsiveContainer width={"80%"} height = {600}>
                            <LineChart 
                                data={this.state.Data2}
                                syncId="Length"
                                margin={{
                                    top: 30,
                                    right: 30,
                                    left: 30,
                                    bottom: 30
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <ReferenceLine x={floor(this.props.L[0]).toString()} stroke="red" label="XL" />
                                <ReferenceLine x={floor(this.props.R[0]).toString()} stroke="red" label="XR" />
                                <Line
                                    type="monotone"
                                    dataKey="Result"
                                    stroke="#FF5B5E"
                                    strokeWidth={5}
                                    activeDot={{ r: 5}} />
                                    <Line
                                    type="monotone"
                                    dataKey="ResultLine"
                                    stroke="#82ca9d"
                                    strokeWidth={5}                                
                                    activeDot={{ r: 5}} />
                                <Brush height={60} stroke={"#39b6ff"}/>
                            </LineChart>
                        </ResponsiveContainer>
                        {/* <label>Interlation</label>
                        <LineChart
                            width={1500}
                            height={500}
                            data={this.state.Data}
                            syncId="Result"
                            margin={{
                                top: 30,
                                right: 30,
                                left: 30,
                                bottom: 30
                            }}
                            >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="Loop_Result"
                                stroke="#82ca9d"
                                strokeWidth={5}
                                activeDot={{ r: 8 }} />
                            <Brush />
                        </LineChart> */}
                        <label>Interlation with XL and XR</label>
                        <ResponsiveContainer width={"80%"} height = {600}>
                            <LineChart
                                data={this.state.Data}
                                syncId="Result1"
                                margin={{
                                    top: 30,
                                    right: 30,
                                    left: 30,
                                    bottom: 30
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="XL"
                                    stroke="#FF5B5E"
                                    strokeWidth={5}
                                    activeDot={{ r: 5 }} />
                                <Line
                                    type="monotone"
                                    dataKey="Loop_Result"
                                    stroke="#82ca9d"
                                    strokeWidth={5}
                                    activeDot={{ r: 5 }} />
                                <Line
                                    type="monotone"
                                    dataKey="XR"
                                    stroke="#FF5B5E"
                                    strokeWidth={5}
                                    activeDot={{ r: 5 }} />
                                <Brush height={60} stroke={"#39b6ff"}/>
                            </LineChart>
                        </ResponsiveContainer>
                        <label>F(x)</label>
                        <ResponsiveContainer width={"80%"} height = {600}>
                            <LineChart
                                data={this.state.Data}
                                syncId="Result2"
                                margin={{
                                    top: 30,
                                    right: 30,
                                    left: 30,
                                    bottom: 30
                                }}
                                >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="ResutlofEquation"
                                    stroke="#82ca9d"
                                    strokeWidth={5}
                                    activeDot={{ r: 5 }} />
                                <Brush height={60} stroke={"#39b6ff"}/>
                            </LineChart>
                        </ResponsiveContainer>
                        <label>Error</label>
                        <ResponsiveContainer width={"80%"} height = {600}>
                            <LineChart
                                data={this.state.Data}
                                syncId="Result3"
                                margin={{
                                    top: 30,
                                    right: 30,
                                    left: 30,
                                    bottom: 30
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Line
                                    type="monotone"
                                    dataKey="Error_Result"
                                    stroke="#FF5B5E"
                                    strokeWidth={5}
                                    activeDot={{ r: 5 }} />
                                <Brush height={60} stroke={"#39b6ff"}/>
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                )
            }
            else
            {
                Grap.push()
            }
        }
        else
        {
            Grap.push(
                <div key={1}>
                    <label>Length</label>
                    <ResponsiveContainer width={"80%"} height = {600}>
                        <LineChart
                            data={this.state.Data2}
                            syncId="Length"
                            margin={{
                                top: 30,
                                right: 30,
                                left: 30,
                                bottom: 30
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="Result"
                                stroke="#FF5B5E"
                                strokeWidth={3}
                                activeDot={{ r: 5 }} />
                            <Line
                                type="monotone"
                                dataKey="ResultLine"
                                stroke="#82ca9d"
                                strokeWidth={3}
                                activeDot={{ r: 5 }} />
                            <Brush height={60} stroke={"#39b6ff"}/>
                        </LineChart>
                    </ResponsiveContainer>
                    <label>Interlation</label>
                    <ResponsiveContainer width={"80%"} height = {600}>
                        <LineChart
                            data={this.state.Data}
                            syncId="Result1"
                            margin={{
                                top: 30,
                                right: 30,
                                left: 30,
                                bottom: 30
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="Loop_Result"
                                stroke="#82ca9d"
                                strokeWidth={3}
                                activeDot={{ r: 5 }} />
                            <Brush height={60} stroke={"#39b6ff"}/>
                        </LineChart>
                    </ResponsiveContainer>
                    <label>F(x)</label>
                    <ResponsiveContainer width={"80%"} height = {600}>
                        <LineChart
                            data={this.state.Data}
                            syncId="Result2"
                            margin={{
                                top: 30,
                                right: 30,
                                left: 30,
                                bottom: 30
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="ResutlofEquation"
                                stroke="#82ca9d"
                                strokeWidth={3}
                                activeDot={{ r: 5 }} />
                            <Brush height={60} stroke={"#39b6ff"}/>
                        </LineChart>
                    </ResponsiveContainer>
                    <label>Error</label>
                    <ResponsiveContainer width={"80%"} height = {600}>
                        <LineChart
                            data={this.state.Data}
                            syncId="Result3"
                            margin={{
                                top: 30,
                                right: 30,
                                left: 30,
                                bottom: 30
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Line
                                type="monotone"
                                dataKey="Error_Result"
                                stroke="#FF5B5E"
                                strokeWidth={3}
                                activeDot={{ r: 5 }} />
                            <Brush height={60} stroke={"#39b6ff"}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            )
        }
        return Grap
    }
    render()
    {
        return(
            <div style={{}}>
                {this.getGraph()}
            </div>
        )
    }
}
export default Unit1Chart