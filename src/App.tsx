import React from 'react';
import './App.css';
import Data from './Components/Home/Data';
import Home from './Components/Home/Home';
import { Link, Navigate, Route, Routes } from 'react-router-dom';
import axios from "axios"
import { ProSidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import 'react-pro-sidebar/dist/css/styles.css';
import './Custom.scss'
import qs from 'qs'
interface ServerResponse_Header
{
  Header:Array<String>
}
interface ServerResponse_Token
{
  Token:String
}
interface IProps
{

}
interface IState
{
  Header:Array<String>,
  SubHeader:Array<any>,
  collapsed:any,
  Token:String
}

class App extends React.Component<IProps,IState>
{
  constructor(props:IProps)
  {
    super(props)
    this.state = {
      Header:[],
      SubHeader:[],
      collapsed:false,
      Token:""
    }
    this.get_Token()
  }
  get_Token = () =>
  {
    axios.post<ServerResponse_Token>("http://localhost:6060/GetToken",qs.stringify({'username': 'Helloworld'})).then((res)=>{
      this.setState({Token:res.data.Token},()=>this.get_header())
    })
  }
  get_header = () =>
  {
    axios.get<ServerResponse_Header>("http://localhost:6060/Header",{
      headers: {
          Authorization: 'Bearer ' + this.state.Token
        }
  }).then((res)=>{
      this.setState({Header:res.data.Header},()=>
      {
        for (let i : number = 0;i<this.state.Header.length;i++)
        {
            axios.get<ServerResponse_Header>("http://localhost:6060/Header/"+this.state.Header[i],{
              headers: {
                  Authorization: 'Bearer ' + this.state.Token 
                }
          }).then((res)=>
            {
              let test:Array<any> = this.state.SubHeader
              test.push(res.data.Header)
              this.setState({SubHeader:test})
            })
        }
      })
    })
  }
  get_Header_Menu = () =>
  {
    if(this.state.SubHeader.length===this.state.Header.length)
    {
      let result:Array<any> = []
      for (let i : number = 0;i<this.state.Header.length;i++)
      {
        result.push(
          <SubMenu title = {this.state.Header[i].toString()} key = {i.toString()}>
            {this.get_Subheader_Menu(i)}
          </SubMenu>
        )
      }
      return result
    }
  }
  get_Subheader_Menu = (num:number) =>
  {
    let result:Array<any> = []
    if(this.state.SubHeader.length===this.state.Header.length)
    {
      for (let i : number = 0;i<this.state.SubHeader[num].length;i++)
      {
        result.push(
          <MenuItem key={num.toString()+"_"+i.toString()}>{this.state.SubHeader[num][i]}
            <Link to={"/"+(this.state.Header[num]).toString()+"/"+this.state.SubHeader[num][i]}/>
          </MenuItem>
        )
      }
    }
    return (result)
  }
  render()
  {
    if(this.state.Token ==="")
    {
      return (
        <div>
          <h1>Loading</h1>
        </div>
      )
    }
    return(
      <div className='Main'>
        <div className='Left' onMouseOver={()=>{if(this.state.collapsed){this.setState({collapsed:false})}}}>
          <ProSidebar collapsed = {this.state.collapsed}>
            <Menu>
              <MenuItem key={"HOME"}>HOME
                <Link to = {"/"}/>
              </MenuItem>
              {this.get_Header_Menu()}
            </Menu>
          </ProSidebar>
        </div>
        <div className='Right' onMouseOver={()=>{if(!this.state.collapsed){this.setState({collapsed:true})}}}>
          <Routes>
            <Route path = ":Header/:SubHeader" element = {<Data Token = {this.state.Token}/>}></Route>
            <Route path = "/" element = {<Home/>}></Route>
            <Route
                  path="*"
                  element={<Navigate to="/" />}
              />
          </Routes>
        </div>
      </div>
    )
  }
}

export default App;
