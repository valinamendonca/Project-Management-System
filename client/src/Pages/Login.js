import React, {useState,useEffect} from 'react';
import {Link,Navigate,useNavigate} from 'react-router-dom';
import '../css/login.css'
import axios from "axios";


const Login=()=> {
  
  const navigate=useNavigate();
  const routeChange = (path) =>{  
    navigate(path);
  }

useEffect(()=>{
  if(localStorage.getItem("authenticated")!=null){
    if(localStorage.getItem("id")==="admin"){
      routeChange("/adminDashboard");
    }
    else{
      routeChange("/dashboard")
    }
  }
},[])

  const submitHandler=(event)=>{
      event.preventDefault();
      const email=event.target.email.value;
      const pass=event.target.pass.value;
      const user_data={email,pass};
      if(user_data){
        const backendUrl =process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
      : process.env.REACT_APP_BACKEND_URL_PRODUCTION;
        axios.post(`${backendUrl}/login`,user_data)
        .then((req,res)=>{
          if(req.statusText==="Logged in successfully!!!"){
            localStorage.setItem("id",email)
            localStorage.setItem("authenticated",true);
            routeChange("/dashboard");
            window.location.reload(false)
          }
          else if(req.statusText=="Admin"){
            localStorage.setItem("id","admin")
            localStorage.setItem("authenticated",true);
            routeChange("/adminDashboard");
          }
          else if(req.statusText==="Wrong credentials!")
            alert("Wrong credentials!")
          else{
            alert("Username does not exist!");
          }
        })
        .catch(error=>{
          console.log(error);
        })
      }
    }
     

  return (
    <>
        <div className='login-background'>
                <form method='POST' onSubmit={submitHandler}>  <h1>Log In</h1><br></br>
                  <table align='center'><tbody>
                    <tr>
                      <td><label>EMAIL: </label></td><td><input name="email" required/></td>
                    </tr>
                    <tr>
                      <td><label>PASSWORD: </label></td><td><input name="pass" type="password" required/></td>
                    </tr>
                  </tbody></table><br></br>
                  <span className='left'><input type="checkbox"/> Remember Me</span>
                  <Link className='right' to="/reset">Forgot Password?</Link><br></br><br></br>
                  <button className="login-button" >LOGIN</button><br></br><br></br>
                  {/*<span >New User? <Link to="/register"><u>Sign up</u></Link></span>*/}
                </form>
        </div>
    </>
  )
}

export default Login;