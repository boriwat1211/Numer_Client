import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
interface Error_Data
{
    name:String,
    Error:Number
}
interface Iprops
{
    loop_result:Array<Number>,
}
interface Istate
{
    Data:Array<Error_Data>
}
class Charts extends React.Component<Iprops,Istate>
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
        if(this.props.loop_result.length > 0)
        {
            let Data:Array<Error_Data> = []
            for(let i = 0;i<this.props.loop_result.length;i++)
            {
                let SubData:Error_Data = 
                {
                    name:i.toString(),
                    Error:this.props.loop_result[i]
                }
                Data.push(SubData)
            }
            this.setState({Data:Data})
        }
    }
    componentDidUpdate = () =>
    {
        if(this.props.loop_result.length>0)
        {
            if(this.state.Data.length!==this.props.loop_result.length)
            {

                this.get_Data()
            }
            else
            {
                if(this.state.Data[this.state.Data.length-1].Error !== this.props.loop_result[this.props.loop_result.length-1])
                {
                    this.get_Data()
                }
            }
        }   
    }
    render()
    {
        return(
            <div style={{backgroundColor:"#60FFB0"}}>
                <LineChart
                    width={1000}
                    height={500}
                    data={this.state.Data}
                    margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                    type="monotone"
                    dataKey="Error"
                    stroke="#FF5B5E"
                    activeDot={{ r: 8 }}
                    />
                </LineChart>
            </div>
        )
    }
}
export default Charts