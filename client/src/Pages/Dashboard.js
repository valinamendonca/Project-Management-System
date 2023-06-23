import React,{useState,useEffect} from 'react';
import '../css/dashboard.css';
import {Navigate,useNavigate} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import Header from '../Components/Header';

function Dashboard() {
        const navigate=useNavigate();
        const routeChange = (path) =>{
                navigate(path);
        }

        const [project, setProject]=useState({});
        const [flag,setFlag]=useState();

        //fetch data
        const fetchData=async(req,res)=>{
                const id=localStorage.getItem("id");
                const backendUrl =process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
      : process.env.REACT_APP_BACKEND_URL_PRODUCTION;
                return axios.get(`${backendUrl}/dashboard?id=`+id)
                .then((req,res)=>{
                        if(req.statusText==="No Projects Assigned!"){
                                setFlag(false);
                        }
                        else{
                                const Project=req.data;
                                setProject(Project);
                                setFlag(true);
                        }
                });        
        }        

        useEffect(()=>{
                        if(localStorage.getItem("authenticated")==null){
                          routeChange("/")
                        }
                fetchData();
        },[])
        
        let data=-1;
        let rows=0;
        if(flag){
                data=project.result1?.length;
                rows=[];
                for(let i=0;i<data;i++){
                        const mod=(event)=>{
                                const data = event.target.dataset.myData;
                                localStorage.setItem("project_id",data);
                                routeChange("/module");
                        }
                        rows.push(
                                <div style={{backgroundColor:'white'}} key={i} className='card'>
                                        <div className='card-top'>
                                                <b>{project.result1[i].project_id}</b><b>{project.result1[i].project_name}</b><br/><br/>
                                                <i style={{fontSize:"16px"}}>Created by: </i><b>{project.result[0].Name}</b>
                                        </div>
                                        <div className='card-bottom'>
                                                <button data-my-data={project.result1[i].project_id} onClick={(e)=>{mod(e)}}>Start</button>
                                        </div>
                                </div>
                        )
                }
        }    
        return (
                        <div className='container'>
                                <Navbar/>
                                <div style={{backgroundColor:'white'}} className='dashboard'>
                                <Header/>
                                {data<0?
                                        <h2>No Projects assigned!</h2>:
                                        (<div>
                                        <h2>Projects assigned to you! <br/></h2>
                                        <div>{rows}</div>
                                        </div>
                                        )
                                }
                                
                                </div>
                        </div>
                )
}

export default Dashboard;