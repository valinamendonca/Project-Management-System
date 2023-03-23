import React,{useState,useEffect} from 'react'
import '../css/dashboard.css'
import {Link} from 'react-router-dom'

function Navbar(det) {
  
const data=det.details;
console.log(det.details);
const [imageSrc, setImageSrc] = useState(null);

var arrayBuffer=det.details.Image;
useEffect(()=>{
  const base64Image = btoa(
          new Uint8Array(arrayBuffer).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ''
          )
        );
        const imageUrl = `data:image/jpeg;base64,${base64Image}`;
        setImageSrc(imageUrl);
},[])

  return (
    <div className='navbar'>
    <div className='photo'><img src={imageSrc} width="120" height={150} alt="img"/></div>
    <h2>{data.Name}</h2>
    <ul>
        <li><Link to='#user_profile'>My Profile</Link></li>
        {data.project_manager?
        <li><Link to="/projects">Manage Projects</Link></li>
        :<li></li>}
        <li></li>
    </ul>
    </div>
  )
}

export default Navbar;