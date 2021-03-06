import React from "react"
import withRouter from "./Custom_HOC"
import Home from "./Home"
import Unit6 from "./Unit/DividedDifferences/Unit6"
import Unit5 from "./Unit/Integration/Unit5"
import Unit3 from "./Unit/Interpolation/Unit3"
import Unit4 from "./Unit/LeastSquare/Unit4"
import Unit2 from "./Unit/LinearAlgebra/Unit2"
import Unit1 from "./Unit/Rootsofequations/Unit1"
interface Iprops
{
    params:{
        Header:String,
        SubHeader:String
    }
    Token:String
}
interface Istate
{
    Header:String,
    SubHeader:String,
}
class MainSwitch extends React.Component<Iprops,Istate>
{
    constructor(props:Iprops)
    {
        super(props)
        this.state = 
        {
            Header:this.props.params.Header,
            SubHeader:this.props.params.SubHeader
        }
    }
    componentDidUpdate = () =>
    {
        if(this.state.Header!==this.props.params.Header || this.state.SubHeader!==this.props.params.SubHeader)
        {
            this.setState({Header:this.props.params.Header})
            this.setState({SubHeader:this.props.params.SubHeader})
        }
        return null;
    }
    render(){
        switch(this.state.Header)
        {
            case "Rootsofequations":
                return(
                    <div>
                        <Unit1 Token={this.props.Token}
                               Header={this.state.Header}
                               SubHeader={this.state.SubHeader}/>
                    </div>
                )
            case "LinearAlgebra":
                return(
                    <div>
                        <Unit2 Token={this.props.Token}
                               Header={this.state.Header}
                               SubHeader={this.state.SubHeader}/>
                    </div>
                )
            case "InterpolationTechniques":
                return(
                    <div>
                        <Unit3 Token={this.props.Token}
                               Header={this.state.Header}
                               SubHeader={this.state.SubHeader}/>
                    </div>
                )
            case "LeastSquaresRegression":
                return(
                    <div>
                        <Unit4 Token={this.props.Token}
                               Header={this.state.Header}
                               SubHeader={this.state.SubHeader}/>
                    </div>
                )
            case "Integration":
                return(
                    <div>
                        <Unit5 Token={this.props.Token}
                               Header={this.state.Header}
                               SubHeader={this.state.SubHeader} />
                    </div>
                )
            case "Differentiation":
                return(
                    <div>
                        <Unit6  Token={this.props.Token}
                                Header={this.state.Header}
                                SubHeader={this.state.SubHeader} />
                    </div>
                )
            default:
                return(
                    <Home></Home>
                )
        }
    }
}
export default  withRouter(MainSwitch)