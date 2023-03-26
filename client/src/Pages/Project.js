import React, { useEffect,useState } from 'react'
import '../css/dashboard.css'
import axios from "axios";
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import '../css/project.css'
import { Link } from 'react-router-dom';

function Project() {
  
  const [project,setProject]=useState({});

  //fetch data
  const fetchData=async(req,res)=>{
    const id=localStorage.getItem("id");
    return axios.get("http://localhost:3001/projects?id="+id)
    .then((req,res)=>{
          const Project=req.data.result2;
          //console.log(req.data);
          setProject(Project);
        })        
  }        
//console.log(project);
  useEffect(()=>{
    fetchData();
  },[])

    return (
      <div className='container'>
      <Navbar/>
      <div className='dashboard'>
        <Header/>
        {!project.length?<>
          <h1>No Projects created yet!</h1>
          <button>Create a Project</button></>
        :
        <>
          <h1 align='left'>Your Projects</h1>
          <Link id='create' style={{textDecoration:"none",color:"black",float: "left"}} to='/create'>Add Project</Link>
          <table className="prj" align='center'>
            <tbody>
              <tr><th>Project Id</th><th>Project Name</th><th>Edit</th><th>Delete</th></tr>
              {project.map(data=>(
                <tr key={data.pid}><td>{data.pid}</td><td>{data.name}</td><td><i className="fa fa-pencil"></i></td><td><i className="fa fa-trash-o"></i></td></tr>
              )

              )}
            </tbody>
          </table>
          
        </>
        }
      </div>
      </div>
    )
}

export default Project