import React,{useState,useEffect} from 'react'
import '../css/dashboard.css'

function Navbar(det) {
  //const [image,setImage]=useState([]);
  
  /*
   const fetchData=async()=>{
      btoa(encodeURIComponent(det.details.Image))
      .then(res=>{
        return res;
      })
      
  }
  console.log(Buffer.from(det.details.Image).toString('base64'));

  
  const img= fetchData();
  //console.log(img);
  

  const response = det.details.Image;

  const buffer =  response.arrayBuffer();
const binaryString = Array.from(new Uint8Array(buffer), byte => String.fromCharCode(byte)).join("");
const theImage = btoa(binaryString);
console.log(theImage);


function _arrayBufferToBase64( buffer ) {
  var binary = '';
  var bytes = new Uint8Array( buffer );
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
      binary += String.fromCharCode( bytes[ i ] );
  }
  return window.btoa( binary );
}

const data=_arrayBufferToBase64( det.details.Image.data )
console.log(data);
console.log(det.details.Image.data);
*/
const data=det.details;
console.log(det.details);
  return (
    <div className='navbar'>
    <div className='photo'><img src=""></img></div>
    <h2>{data.Name}</h2>
    <ul>
        <li><a href='#user_profile'>My Profile</a></li>
        {data.project_manager?
        <li><a href="/projects">Manage Projects</a></li>
        :<li></li>}
        <li></li>
    </ul>
    </div>
  )
}

export default Navbar;