import React,{useState,useEffect,useRef,useMemo} from 'react';
import '../css/dashboard.css';
import {Navigate,useNavigate} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import axios from 'axios';
import Mod from '../Components/Mod'


const Module=React.memo(()=> {
        const navigate=useNavigate();
        const routeChange = (path) =>{  
                navigate(path);
        }
        /*
        const [authenticated, setauthenticated] = useState(localStorage.getItem("authenticated"));
        useEffect(() => {
                const loggedInUser = localStorage.getItem("authenticated");
                if (loggedInUser) {
                        setauthenticated(loggedInUser);
                }
                if(!authenticated){
                        routeChange("/");
                }
        }, [authenticated]);
        */

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
                                //console.log(Project);
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
        const logout=((event)=>{
                event.preventDefault();
                localStorage.clear();
                //setauthenticated(false);
                routeChange("/");
        })
        
        //const [time,setTime]=useState({hours:"",minutes:"",seconds:""})

        /*
        const [hours, setHours] = useState();
        const [minutes, setMinutes] = useState();
        const [seconds, setSeconds] = useState();
        */
        //const [isRunning, setIsRunning] = useState(false);
        //const intervalRef = useRef(null);


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
        <button id="logout" onClick={logout}>Log Out</button><br></br><br></br><br></br><hr/>
        {data<0?
                <h2>No Modules assigned!</h2>:
                (<div>
                   <h2>Projects assigned to you! <br/></h2>
                   <div>{rows}</div>
                   
                   {/*<div>{bar()}</div>*/}
                 </div>
                )
        }
      </div>
    </div>
  )
})

export default Module