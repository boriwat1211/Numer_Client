import React from 'react';
import { fireEvent, getAllByTestId, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import {Router} from 'react-router-dom';
import { BrowserRouter} from "react-router-dom";
import {createMemoryHistory} from 'history'
import App from './App';
import axios from "axios"
import * as math from 'mathjs'
let Token:any;

test('Get Token', async () =>{
  await axios.post("https://numerserver.herokuapp.com/login",{
    "email":"s6204062616251@email.kmutnb.ac.th",
    "password":"Aonboriwat01"
  }).then(res=>{ Token = res.data.accessToken ;expect(res).not.toBeNull()})
})

test('Get Header',async () =>{
  await axios.get("https://numerserver.herokuapp.com/Header",{
    headers:{
      Authorization: 'Bearer ' + Token 
    }
  }).then((res)=>{expect(res).not.toBeNull()})
})

test('Get SubHeader',async () =>{
  await axios.get("https://numerserver.herokuapp.com/SubHeader",{
    headers:{
      Authorization: 'Bearer ' + Token 
    }
  }).then((res)=>{expect(res).not.toBeNull()})
})

test('Is All Data Loaded', async () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:1500})
  expect(screen.getByText("home : Boriwat")).toBeInTheDocument();
});

test('Draw Menu Test',async () =>{
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
  
  await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:1500})
  expect(screen.getByPlaceholderText('Menu')).toBeInTheDocument();
})

test('Bad Path Test', async () => {
  const history = createMemoryHistory()
  history.push('/some/1')
  render(
    <Router location={history.location} navigator={history}>
        <App />
    </Router>
  );
  await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:1500})
  expect(screen.getByText("home : Boriwat")).toBeInTheDocument();
});

test('Home test',async () =>{
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:1500})
  await waitFor(()=>{expect(screen.getByText("HOME")).toBeInTheDocument()})
})

test('Biction test',async () =>{
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:1500})
  await waitFor(()=>{expect(screen.getByText(/bitsection/i)).toBeInTheDocument()},{timeout:5000})
  const history = createMemoryHistory()
  history.push('/Rootsofequations/Bitsection')
  render(
    <Router location={history.location} navigator={history}>
        <App />
    </Router>
  );
  await waitFor(()=>{expect(screen.getByText("Result : 3.741658")).toBeInTheDocument()},{timeout:5000})
},600000)

test('FalsePosition test',async () =>{
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:1500})
  await waitFor(()=>{expect(screen.getByText(/FalsePosition/i)).toBeInTheDocument()},{timeout:5000})
  const history = createMemoryHistory()
  history.push('/Rootsofequations/FalsePosition')
  render(
    <Router location={history.location} navigator={history}>
        <App />
    </Router>
  );
  //case 1
  await waitFor(()=>{expect(screen.getByText("Result : 0.023256")).toBeInTheDocument()},{timeout:5000})
  //case 2
  fireEvent.change(screen.getByTestId("Unit1-Select-Question") as HTMLInputElement,{target: {value: "(1/19)-x"}});
  await waitFor(()=>{expect((screen.getByTestId("Unit1-Select-Question") as HTMLInputElement).value).toEqual("(1/19)-x")},{timeout:5000})
  await waitFor(()=>{expect(screen.getByText("Result : 0.052632")).toBeInTheDocument()},{timeout:5000})
  //case 3 
  fireEvent.change(screen.getByTestId("Unit1-Select-Question") as HTMLInputElement,{target: {value: "e^(-x/4)*(2-x)-1"}});
  await waitFor(()=>{expect((screen.getByTestId("Unit1-Select-Question") as HTMLInputElement).value).toEqual("e^(-x/4)*(2-x)-1")},{timeout:5000})
  await waitFor(()=>{expect(screen.getByText("Result : 0.783596")).toBeInTheDocument()},{timeout:5000})
},60000)

test('NewtonRaphson test',async () =>{
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:1500})
  await waitFor(()=>{expect(screen.getByText(/NewtonRaphson/i)).toBeInTheDocument()},{timeout:5000})
  const history = createMemoryHistory()
  history.push('/Rootsofequations/NewtonRaphson')
  render(
    <Router location={history.location} navigator={history}>
        <App />
    </Router>
  );
  await waitFor(()=>{expect(screen.getByText("Result : 2.645751")).toBeInTheDocument()},{timeout:5000})
},60000)

test('OnePointIteration Test',async () =>{
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:15000})
  await waitFor(()=>{expect(screen.getByText(/OnePointIteration/i)).toBeInTheDocument()},{timeout:5000})
  const history = createMemoryHistory()
  history.push('/Rootsofequations/OnePointIteration')
  render(
    <Router location={history.location} navigator={history}>
        <App />
    </Router>
  );
  await waitFor(()=>{expect(screen.getByText("Result : 0.500000")).toBeInTheDocument()},{timeout:5000})
},60000)

test("Secant Test",async () =>{
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
  await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:1500})
  await waitFor(()=>{expect(screen.getByText(/Secant/i)).toBeInTheDocument()},{timeout:5000})
  const history = createMemoryHistory()
  history.push('/Rootsofequations/Secant')
  render(
    <Router location={history.location} navigator={history}>
        <App />
    </Router>
  );
  await waitFor(()=>{expect(screen.getByText("Result : 0.783596")).toBeInTheDocument()},{timeout:5000})
},60000)

// test("Cramer's Rule Test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText(/CramerRule/i)).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/LinearAlgebra/CramerRule')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   // get mathjaxData
//   // await waitFor(()=>{expect(screen.getAllByPlaceholderText("Unit2Result")[0].textContent).toEqual("(1/19)-x")})
//   await waitFor(()=>{expect(screen.getAllByPlaceholderText("Unit2Result")[0]).toBeInTheDocument()},{timeout:2000})
// })

// test("GaussElimination Test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText(/GaussElimination/i)).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/LinearAlgebra/GaussElimination')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   await waitFor(()=>{expect(screen.getAllByPlaceholderText("Unit2Result")[0]).toBeInTheDocument()},{timeout:2000})
// })

// test("GaussJordan Test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText(/GaussJordan/i)).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/LinearAlgebra/GaussJordan')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   await waitFor(()=>{expect(screen.getAllByPlaceholderText("Unit2Result")[0]).toBeInTheDocument()},{timeout:2000})
// })

// test("GaussSeidelIteration Test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText(/GaussSeidelIteration/i)).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/LinearAlgebra/GaussSeidelIteration')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   await waitFor(()=>{expect(screen.getAllByPlaceholderText("Unit2Result")[0]).toBeInTheDocument()},{timeout:2000})
// })

// test("JacobiIteration Test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText(/JacobiIteration/i)).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/LinearAlgebra/JacobiIteration')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   await waitFor(()=>{expect(screen.getAllByPlaceholderText("Unit2Result")[0]).toBeInTheDocument()},{timeout:2000})
// })

// test("Conjugategradient test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText(/Conjugategradient/i)).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/LinearAlgebra/Conjugategradient')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   await waitFor(()=>{expect(screen.getAllByPlaceholderText("Unit2Result")[0]).toBeInTheDocument()},{timeout:2000})
// })

// test("LUdecomposition test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText(/LUdecomposition/i)).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/LinearAlgebra/LUdecomposition')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   await waitFor(()=>{expect(screen.getAllByPlaceholderText("Unit2Result")[0]).toBeInTheDocument()},{timeout:2000})
// })

// test("NewtonDividedDifference test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText(/NewtonDividedDifference/i)).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/InterpolationTechniques/NewtonDividedDifference')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   //case1
//   await waitFor(()=>{expect(screen.getByText("Result : 9.686255")).toBeInTheDocument()},{timeout:2000})
//   //case2 
//   fireEvent.change(screen.getByTestId("Unit3-Select-Question") as HTMLInputElement,{target: {value: "[2,3,4]"}});
//   await waitFor(()=>{expect((screen.getByTestId("Unit3-Select-Question") as HTMLInputElement).value).toEqual("[2,3,4]")},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText("Result : -0.356900")).toBeInTheDocument()},{timeout:2000})
// })

// test("LagrangeInterpolation test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText(/LagrangeInterpolation/i)).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/InterpolationTechniques/LagrangeInterpolation')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   //case1
//   await waitFor(()=>{expect(screen.getByText("Result : 220.796875")).toBeInTheDocument()},{timeout:2000})
//   //case2
//   fireEvent.change(screen.getByTestId("Unit3-Select-Question") as HTMLInputElement,{target: {value: "[0,20000,40000,60000,80000]"}});
//   await waitFor(()=>{expect((screen.getByTestId("Unit3-Select-Question") as HTMLInputElement).value).toEqual("[0,20000,40000,60000,80000]")},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText("Result : 9.686255")).toBeInTheDocument()},{timeout:2000})
//   //case3
//   fireEvent.change(screen.getByTestId("Unit3-Select-Question") as HTMLInputElement,{target: {value: "[2,3,4]"}});
//   await waitFor(()=>{expect((screen.getByTestId("Unit3-Select-Question") as HTMLInputElement).value).toEqual("[2,3,4]")},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText("Result : -0.315260")).toBeInTheDocument()},{timeout:2000})

// })

// test("LinearRegression test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText("LinearRegression")).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/LeastSquaresRegression/LinearRegression')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   await waitFor(()=>{expect(screen.getByText("Result : 36.240000")).toBeInTheDocument()},{timeout:2000})
// })

// test("PolynomialRegression test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText(/PolynomialRegression/i)).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/LeastSquaresRegression/PolynomialRegression')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   await waitFor(()=>{expect(screen.getByText("Result : 0.674706")).toBeInTheDocument()},{timeout:2000})
// })

// test("MultipleLinearRegression test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText(/MultipleLinearRegression/i)).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/LeastSquaresRegression/MultipleLinearRegression')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   await waitFor(()=>{expect(screen.getByText("Result : -9.000000")).toBeInTheDocument()},{timeout:2000})
// })

// test("Trapzoidal test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText(/Trapzoidal/i)).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/Integration/Trapzoidal')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   await waitFor(()=>{expect(screen.getByText("Result : 357984.000000")).toBeInTheDocument()},{timeout:2000})
// })

// test("Simpson test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText(/Simpson/i)).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/Integration/Simpson')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   await waitFor(()=>{expect(screen.getByText("Result : 68.015625")).toBeInTheDocument()},{timeout:2000})
// })

// test("DividedDifference test",async () =>{
//   render(
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   )
//   await waitFor(()=>{expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument()},{timeout:2000})
//   await waitFor(()=>{expect(screen.getByText("DividedDifference")).toBeInTheDocument()},{timeout:2000})
//   const history = createMemoryHistory()
//   history.push('/Differentiation/DividedDifference')
//   render(
//     <Router location={history.location} navigator={history}>
//         <App />
//     </Router>
//   );
//   await waitFor(()=>{expect(screen.getByText("Result : 8.394719")).toBeInTheDocument()},{timeout:2000})
// })