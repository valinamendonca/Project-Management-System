import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../css/dashboard.css'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'

function Create() {
        const [user,setUser]=useState({});

        //fetch data
        const fetchData=async(req,res)=>{
                const id=localStorage.getItem("id");
                return axios.get("http://localhost:3001/userData?id="+id)
                .then((req,res)=>{
                        const result1=req.data[0];
                        console.log(result1);
                        setUser(result1);
                //console.log("ok");
                });        
        }        
        
        useEffect(()=>{
                fetchData();
        },[])

        return (
        <div className='container'>
                <Navbar details={user}/>
                <div align="left" className='dashboard'>
                        <Header/>
                        <h2>Enter the project details below:</h2>
                        <form style={{fontSize:"20px"}} method="POST">
                                <label>Project Name:</label><input name="pname"/>
                        </form>
                </div>
        </div>
        )
}

export default Create