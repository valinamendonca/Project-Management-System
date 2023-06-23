import React,{useState,useEffect} from 'react';
import '../css/dashboard.css';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import Mod from '../Components/Mod'
import Header from '../Components/Header';


const Module=React.memo(()=> {        
        const [project,setProject]=useState({});
        const [flag,setFlag]=useState();

        //fetch data
        const fetchData=async()=>{
                const id=localStorage.getItem("id");
                const project_id=localStorage.getItem("project_id");
                const backendUrl =process.env.NODE_ENV === 'development'
                ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
                : process.env.REACT_APP_BACKEND_URL_PRODUCTION;
                return axios.get(`${backendUrl}/module?id=`+id+`&pid=`+project_id)
                .then((req,res)=>{
                        if(req.statusText==="No Modules!"){
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
                fetchData();
        },[])
        
        let data=-1;
        let rows=0;
        if(flag){
                data=project.result1?.length;
                rows=[];
                for(let i=0;i<data;i++){
                        rows.push(<Mod key={i} i={i} project={project}/>)
                }
        }  
  return (
    <div className='container'><Navbar/>
     <div className='dashboard'>
        <Header/>
        {data<0?
                <h2>No Modules assigned!</h2>:
                (
                <div>
                   <h2>Projects assigned to you! <br/></h2>
                   <div>{rows}</div>
                </div>
                )
        }
      </div>
    </div>
  )
})

export default Module