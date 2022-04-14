import React from "react";
import { XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Area, AreaChart, LineChart, Line, Brush} from 'recharts';
interface Result_Data
{
    name:String,
    Loop_Result:number,
    Error_Result:number,
}
interface Iprops
{
    Unit:String,
    loop_result:Array<Array<number>>,
    Loop_Error:Array<Array<number>>,
}
interface Istate
{
    Data:Array<Result_Data>
}
class Unit2Chart extends React.Component<Iprops,Istate>
{
    constructor(props:Iprops)
    {
        super(props)
        this.state =
        {
            Data:[]
        }
    }
    get_Data = () =>
    {
        console.log(this.props.loop_result.length,this.props.Loop_Error.length)
        if(this.props.loop_result.length > 0&&this.props.Loop_Error.length>0 && this.props.Loop_Error.length===this.props.loop_result.length)
        {
            console.log(this.props.loop_result.length,this.props.Loop_Error.length)
            let Data:Array<Result_Data> = []
            for(let i:number = 0;i<this.props.loop_result.length;i++)
            {
                let SubData:Result_Data = 
                {
                    name:i.toString(),
                    Loop_Result:this.props.loop_result[i][0],
                    Error_Result:this.props.Loop_Error[i][0],
                }
                for(let j:number=0;j<this.props.loop_result[i].length;j++)
                {
                    let name1:string = "Loop_Result"+(j+1).toString();
                    let name2:string = "Error_Result"+(j+1).toString();
                    SubData = Object.assign(SubData,{[name1]:this.props.loop_result[i][j]})
                    SubData = Object.assign(SubData,{[name2]:this.props.Loop_Error[i][j]})
                }
                Data.push(SubData);
            }
            this.setState({Data:Data});
        }
    }
    componentDidUpdate = () =>
    {
        if(this.props.loop_result.length>0&&this.props.loop_result.length===this.props.Loop_Error.length)
        {
            if(this.state.Data.length!==this.props.loop_result.length)
            {

                this.setState({Data:[]},()=>this.get_Data())
            }
            else
            {
                if(this.state.Data[this.state.Data.length-1].Loop_Result !== this.props.loop_result[this.props.loop_result.length-1][0])
                {
                    this.setState({Data:[]},()=>this.get_Data())
                }
            }
        }
        else
        {
            
        }
    }
    getGraph = () =>
    {
        let Grap:Array<any>=[]
        Grap.push(
            <div key={1}>
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
                        {this.getResultGraph()}
                        <Brush height={60} stroke={"pink"}/>
                    </LineChart>
                </ResponsiveContainer>
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
                        {this.getErrorGraph()}
                        <Brush height={60} stroke={"pink"}/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        )
        return Grap
    }
    getResultGraph = () =>
    {
        if(this.state.Data.length>0&&this.props.loop_result.length>0)
        {
            let Grap:Array<any>=[];
            for(let i:number=1;i<=this.props.loop_result[0].length;i++)
            {
                Grap.push(<Line
                    key={i.toString()}
                    type="monotone"
                    dataKey={"Loop_Result"+i.toString()}
                    stroke="#82ca9d"
                    strokeWidth={3}
                    activeDot={{ r: 5 }} />);
            }
            return Grap;
        }
    }
    getErrorGraph = () =>
    {
        if(this.state.Data.length>0&&this.props.loop_result.length>0)
        {
            let Grap:Array<any>=[];
            for(let i:number=1;i<=this.props.loop_result[0].length;i++)
            {
                Grap.push(<Line
                    key={i.toString()}
                    type="monotone"
                    dataKey={"Error_Result"+i.toString()}
                    stroke="#FF5B5E"
                    strokeWidth={3}
                    activeDot={{ r: 5 }} />);
            }
            return Grap;
        }
    }
    render()
    {
        return(
            <div style={{ width: '100%' ,backgroundColor:"wheat"}}>
                {this.getGraph()}
            </div>
        )
    }
}
export default Unit2Chart