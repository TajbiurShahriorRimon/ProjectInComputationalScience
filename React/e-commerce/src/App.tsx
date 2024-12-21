import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Header';
import UserRegistration from './components/Forms/UserRegistration';
import {BrowserRouter as Router,Outlet,Route, Routes} from "react-router-dom";
import RegOption from './components/RegOption';
import MainRoutes from './Routes';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
    <div>
      {/* <Header name="asif" bck="red" pad={30}/>
      <Header name="rimon" bck="yellow" pad={50}/>
      
      <Header name="rifat" bck="red" pad={10}/>
      <h1>This is my react project</h1> */}
      
      {/*<UserRegistration></UserRegistration>*/}
      <Router >
      <MainRoutes></MainRoutes>
      <Outlet/>
      </Router>
    </div>
  )
  
}

export default App;
