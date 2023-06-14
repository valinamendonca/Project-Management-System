import React,{useState,useEffect} from 'react'
import '../css/dashboard.css'
import {Link} from 'react-router-dom'
import axios from 'axios';

function Navbar(det) {
  
const [imageSrc, setImageSrc] = useState(null);
const [user,setUser]=useState({});


//fetch data
const fetchData=async(req,res)=>{
  const id=localStorage.getItem("id");
  return axios.get("http://localhost:3001/userData?id="+id)
  .then((req,res)=>{
          const result=req.data[0];
          setUser(result);
          //console.log(result);
          return result;
  });        
}


//var arrayBuffer=user.Image;
useEffect(()=>{
  fetchData()
  .then(data=>{
    //console.log(data.Image.data);
  const base64Image = btoa(
          new Uint8Array(data.Image.data).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;
        setImageSrc(imageUrl)
          })
},[])


var id=localStorage.getItem("id");
  return (
<<<<<<< Updated upstream
    <div className='navbar'>
    <div className='photo'><img src={imageSrc} width="120" height={150} alt="img"/></div>
    <h2>{user.Name}</h2>
    <ul>
        <li><Link to='#user_profile'>My Profile</Link></li>
        <li><Link to='/dashboard'>Dashboard</Link></li>
        {user.project_manager?
        <li><Link to={`/projects?id=${id}`}>Manage Projects</Link></li>
        :<li></li>}
    </ul>
=======
    <div style={{backgroundColor: '#0C134F',color:'white'}} className='navbar'>
      <div className='photo'><img src={imageSrc} width="120" height={150} alt="img"/></div>
      <h2>{user.Name}</h2>
      <ul>
          <li><Link style={{color:'white'}} to='#user_profile'>My Profile</Link></li>
          <li><Link style={{color:'white'}} to='/dashboard'>Dashboard</Link></li>
          {user.project_manager?
          <li><Link style={{color:'white'}} to={`/projects?id=${id}`}>Manage Projects</Link></li>
          :<li></li>}
      </ul>
        
>>>>>>> Stashed changes
    </div>
  )
}

export default Navbar;