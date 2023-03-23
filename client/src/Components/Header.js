import React from 'react'
import {Navigate,useNavigate} from 'react-router-dom';

function Header() {
        const navigate=useNavigate();
        const routeChange = (path) =>{
                navigate(path);
        }
        //log out functionality
        const logout=(event)=>{
                event.preventDefault();
                localStorage.clear();
                routeChange("/");
        }
  return (
    <div className='head'><button id="logout" onClick={logout}>Log Out</button><br></br><br></br><br></br><hr/></div>
  )
}

export default Header