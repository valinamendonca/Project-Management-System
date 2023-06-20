import React,{useEffect,useState} from 'react'
import {Navigate,useNavigate,Link} from 'react-router-dom';
import Navbar from '../Admin/Navbar'
import Header from '../Admin/Header'
import axios from 'axios';

function Admin() {
  const navigate=useNavigate();
  const routeChange = (path) =>{
          navigate(path);
  }

  const [data,setData]=useState([]);

  //fetch data
  const fetchData=async()=>{
    return axios.get("http://localhost:3001/stats")
    .then((req,res)=>{
            console.log(req.data);
            setData(req.data);
    });  
  }        

  useEffect(()=>{
    if(localStorage.getItem("authenticated")==null){
            routeChange("/")
    }
    fetchData();
  },[])

  return (
    <>
     <Header/>
    <div className='admin-container'>
    <Navbar/>
    <div className="main" style={{backgroundColor:"white"}}>
      <div className='status'>
        <Link to="/users"><div className='totalEmp' ><i class="fas fa-users stat-icon"></i><span>Total Employees:</span><br/> {data.employeeCount}</div></Link>
        <div className='totalProj' ><i class="fas fa-tasks stat-icon"></i><br/>Total Projects:<br/> {data.totalProjects}</div>
        <div className='complete' ><i class="fas fa-check-circle stat-icon"></i><br/>Completed Projects:<br/> {data.completedProjects}</div>
        <div className='ongoing' ><i class="fas fa-spinner stat-icon"></i><br/>Ongoing Projects: <br/>{data.ongoingProjects}</div>
      </div>
    </div>
    </div>
    </>
  )
}

export default Admin