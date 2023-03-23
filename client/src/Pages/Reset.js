import React,{useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {Alert} from 'react-alert';

function Reset() {
  const [emailForm,showEmailForm]=useState(true);
  const [email,setEmail]=useState("");

  const navigate=useNavigate();
  const routeChange = (path) =>{  
    navigate(path);
  }

  function verifyEmail(event){
    event.preventDefault();
    const email=event.target.email.value;
    setEmail(email)
    axios.post("http://localhost:3001/emailSend",{email})
    .then((req,res)=>{
        if(req.statusText==="Email Found!"){
          alert("Otp is sent to your Email Address!")
          showEmailForm(false);
        }
        else{
          alert("Invalid Email! Please Enter Your Registered Email Id!")
        }
    })
    .catch(error=>{
      console.log(error);
    })
  }

  const submitHandler=async(event)=>{
    event.preventDefault();
    const otp=event.target.otp.value;
    await axios.post("http://localhost:3001/verifyOtp",{email,otp})
    .then((req,res)=>{
            if(req.statusText==="Expired!"){
              alert("Otp expired! Try Again.");
              routeChange("/");
            }
            else if(req.statusText==="Incorrect!"){
              alert("Entered Otp is Incorrect!");
              routeChange("/reset");
            }
            else if(req.statusText==="Otp Verified!"){
              routeChange("/changePassword");
            }
    })
    .catch(error=>{
      console.log(error);
    })
}

  return (
    <div className='login-background'>
        <h1>Reset Your Password</h1><br></br>
        { emailForm?
        <form onSubmit={verifyEmail}>
                <label>Enter your Email Id: <br></br><br></br>
                <input name="email" />
                </label><br></br><br></br>
                <button className='login-button'>Send OTP</button>
        </form>
        :
        <form onSubmit={submitHandler}>
        <label>Enter your OTP: <br></br><input name="otp"/>
        </label><br></br><br></br>
        <button className='login-button'>SUBMIT OTP</button>
        </form>
        }
    </div>
  )
}

export default Reset;