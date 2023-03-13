import React,{useState,useEffect} from 'react';
import '../css/dashboard.css';
import {Navigate,useNavigate} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import axios from 'axios';

function Dashboard() {
        const navigate=useNavigate();
        const routeChange = (path) =>{  
                navigate(path);
        }
        const [authenticated, setauthenticated] = useState(localStorage.getItem("authenticated"));
        useEffect(() => {
                const loggedInUser = localStorage.getItem("authenticated");
                if (loggedInUser) {
                        setauthenticated(loggedInUser);
                        //console.log(localStorage.getItem("id"));
                        
                }
                if(!authenticated){
                        routeChange("/");
                }
        }, [authenticated]);
        

        const [user,setUser]=useState({});
        const [project, setProject]=useState({});
        const [flag,setFlag]=useState();
        //fetch data
        const fetchData=async(req,res)=>{
                const id=localStorage.getItem("id");
                return axios.get("http://localhost:3001/dashboard?id="+id)
                .then((req,res)=>{
                        if(req.statusText==="No Projects Assigned!"){
                                const result1=req.data[0];
                                setUser(result1);
                                setFlag(false);
                        }
                        else{
                                const result1=req.data.result[0];
                                const Project=req.data.result1;
                                setUser(result1);
                                setProject(Project);
                                setFlag(true);
                        }
        });
                
        }        
        useEffect(()=>{
                fetchData();
        },[])
        
        //log out functionality
        const logout=(event)=>{
                event.preventDefault();
                localStorage.clear();
                setauthenticated(false);
                //routeChange("/");
        }
        
        let data=-1;
        let rows=0;
        if(flag){
                data=project?.length;
                rows=[];
                
                for(let i=0;i<data;i++){
                        const mod=(event)=>{
                                const data = event.target.dataset.myData;
                                localStorage.setItem("project_id",data);
                                console.log(data);
                                routeChange("/module");
                        }
                        //console.log(project);
                        rows.push(<div key={i} className='card'><div className='card-top'><b>{project[i].pid}</b><b>{project[i].name}</b><br/><br/><i>Created by: </i><b></b></div><div className='card-bottom'><button data-my-data={project[i].pid} onClick={(e)=>{mod(e)}}>Start</button></div></div>
                        )
                }
        }    
        return (
                        <div className='container'>
                                <Navbar details={user}/>
                                <div className='dashboard'>
                                <button id="logout" onClick={logout}>Log Out</button><br></br><br></br><br></br><hr/>
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