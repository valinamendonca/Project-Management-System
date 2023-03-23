import React,{useState,useEffect} from 'react';
import '../css/dashboard.css';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import Mod from '../Components/Mod'
import Header from '../Components/Header';


const Module=React.memo(()=> {        
        const [user,setUser]=useState({});
        const [project,setProject]=useState({});
        const [flag,setFlag]=useState();

        //fetch data
        const fetchData=async()=>{
                const id=localStorage.getItem("id");
                const project_id=localStorage.getItem("project_id");
                return axios.get("http://localhost:3001/module?id="+id+"&pid="+project_id)
                .then((req,res)=>{
                        if(req.statusText==="No Modules!"){
                                const result1=req.data[0];
                                setUser(result1);
                                setFlag(false);
                        }
                        else{
                                const result1=req.data.result[0];
                                const Project=req.data.result2;
                                setUser(result1);
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
                data=project?.length;
                rows=[];
                for(let i=0;i<data;i++){
                        rows.push(<Mod key={i} i={i} project={project}/>)
                }
        }  
  return (
    <div className='container'><Navbar details={user}/>
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