import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../css/login.css';
import { Alert } from 'react-alert';
import axios from "axios";

const Register = ()=> {
  const navigate=useNavigate();
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }

const submitHandler=(event)=>{
  event.preventDefault();
  const uname=event.target.uname.value;
  const email=event.target.email.value;
  const pass=event.target.pass.value;
  const confirm=event.target.confirm.value;
  const data={uname,email,pass,confirm};
  if(data){
    axios.post("http://localhost:3001/reg",data)
    .then((req,res)=>{
      console.log(req);
      if(req.statusText==="Email Id already exists!")
        alert("Email Id Already Exists!")
      else if(req.statusText==="User already exists!!!")
        alert("User already exists!")
      else if(req.statusText==="Passwords do not match!!!")
        alert("Passwords do not match!")
      else{
        alert("Registration Successful!\nYou may Login!");
        routeChange()
      }
    })
    .catch(error=>{
      console.log(error);
    })
  }
}

  return (

    <div className='login-background'>
    <h1>Sign Up</h1>
    <form method='POST' onSubmit={submitHandler}>
      <br></br>
      <table align='center'>
        <tr><td><label>USERNAME </label></td><td><input name="uname" required/></td></tr><br></br>
        <tr><td><label>EMAIL </label></td><td><input name="email" required /></td></tr><br></br>
        <tr><td><label>PASSWORD </label></td><td><input name="pass" type="password" required/></td></tr><br></br>
        <tr><td><label>CONFIRM PASSWORD </label></td><td><input type="password" name="confirm" required/></td></tr>
      </table><br></br><br></br>
      <span><Link to="/"><u>Back to Login</u></Link></span><br></br><br></br>
      <button className='login-button' >Sign Up</button>
      </form>
    </div>
  )
}

export default Register;
