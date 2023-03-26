import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
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
                        //console.log(result1);
                        setUser(result1);
                });        
        }        
        
        useEffect(()=>{
                fetchData();
        },[])

        const submitHandler=(event)=>{
                event.preventDefault();
                const pname=event.target.pname.value;
                const modname=event.target.modname.value;
                const time=event.target.time.value;
                const prjData={pname,modname,time};
                if(prjData){
                        console.log(prjData);
                }

        }
        return (
        <div className='container'>
                <Navbar details={user}/>
                <div align="left" className='dashboard'>
                        <Header/>
                        <h2>Enter the project details below:</h2>
                        <form onSubmit={submitHandler} className='create' style={{fontSize:"20px"}} method="POST">
                                <label>Project Name:</label><input name="pname" required/>
                                <br/><hr/>
                                <span><b>Modules</b></span><br/>
                                <span style={{fontSize:"16px"}}><i>(You can add more module/s later)</i></span><br/><br/>
                                <label>Module Name:</label><input name="modname"/>
                                <label>Estimated Time:</label><input name="time"/>
                                <hr/>
                                <span><b>Employees</b></span><br/>
                                <span style={{fontSize:"16px"}}><i>(You can add more employee/s later)</i></span><br/><br/>
                                <Link to="/addEmployee">Add Employee</Link><br/><br/>
                                <button align="center" id="create">Create Project</button>
                        </form>
                </div>
        </div>
        )
}

export default Create