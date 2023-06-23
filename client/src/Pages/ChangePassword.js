import React from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ChangePassword() {

  const navigate=useNavigate();
  const routeChange = (path) =>{  
    navigate(path);
  }

  const submitHandler=async(event)=>{
    event.preventDefault();
    const email=event.target.email.value;
    const pass=event.target.pass.value;
    const confirm=event.target.confirm.value;
    const backendUrl =process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
    : process.env.REACT_APP_BACKEND_URL_PRODUCTION;
    await axios.post(`${backendUrl}/changePassword`,{email,pass,confirm})
    .then((req,res)=>{
            if(req.statusText==="Different"){
              alert("Passwords do not match.");
            }
            else if(req.statusText==="Successful"){
              alert("Password Changed Successfully!");
              routeChange("/");
            }
            else{
              console.log("error");
            }
    })
    .catch(error=>{
      console.log(error);
    })
  }

  return (
    <div className='login-background'>
        <h1>Reset Your Password</h1><br></br>
        <form onSubmit={submitHandler}>
                <label>Email Id: <input name="email" />
                </label><br></br><br></br>
                <label>New Password: <input type="password" name="pass" />
                </label><br></br><br></br>
                <label>Confirm Password: <input name="confirm" type="password" />
                </label><br></br><br></br>
                <button className='login-button'>Change Password</button>
        </form>
    </div>
  )
}

export default ChangePassword;