import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Navbar from '../Components/Navbar'

function Employee() {
  const [emp,setEmp]=useState({});
  const [img,setImg]=useState();
  const fetchData=async ()=>{
    const req = await axios.get("http://localhost:3001/empList");
    console.log(req.data);
    setEmp(req.data);
  }
  const image=(data)=>{
    const base64Image = btoa(
      new Uint8Array(data).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    const imageUrl = `data:image/jpeg;base64,${base64Image}`;
    setImg(imageUrl)
      }
  
  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div className='container'>
      <Navbar/>
        <div className='dashboard'>
                <Header/>
                {Array.isArray(emp)?emp.map(data=>(
                  <>
                  {image(data.Image.data)}
                  <div className='card'><div className='card-top'><div>{img}</div>{data.Name}</div><div className='card-bottom'>Add</div></div>
                  </>
                  ))
                :<></>
                }
                
                
        </div>
    </div>
  )
}

export default Employee