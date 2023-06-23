import React,{useState,useRef} from 'react'
import ProgressBar from './ProgressBar';
import axios from 'axios';

function Mod(props) {
        var i=props.i;
        var project=props.project;
        //console.log(project);

let completedTimeComponents=(project.result1[i].Completed_Time).match(/(\d{2}):(\d{2}):(\d{2})/);

const [hours, setHours] = useState(parseInt(completedTimeComponents[1]));
const [minutes, setMinutes] = useState(parseInt(completedTimeComponents[2]));
const [seconds, setSeconds] = useState(parseInt(completedTimeComponents[3]));
const [isRunning, setIsRunning] = useState(false);
const intervalRef = useRef(null);


var mod_id=props.project.result1[i].module_id;
        
const saveTime=()=>{
        if(isRunning ){
          var second=seconds < 10 ? `0${seconds}` : seconds;
          var min=minutes < 10 ? `0${minutes}` : minutes;
          var hr=hours < 10 ? `0${hours}` : hours;
          var Completed_Time=hr+":"+min+":"+second;
          //const data={mod_id,Completed_Time}
          const backendUrl =process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
      : process.env.REACT_APP_BACKEND_URL_PRODUCTION;
          axios.post(`${backendUrl}/module?mod_id=`+mod_id,{Completed_Time})
        }
}

function startTimer() {
        if (!isRunning) {
          setIsRunning(true);
          intervalRef.current = setInterval(() => {
            setSeconds((seconds) => {
              const newSeconds = seconds + 1;
              if (newSeconds === 60) {
                setMinutes((minutes) => {
                  const newMinutes = minutes + 1;
                  if (newMinutes === 60) {
                    setHours((hours) => hours + 1);
                    setMinutes(0);
                  }
                  return newMinutes;
                });
                return 0;
              }
              return newSeconds;
            });
          }, 1000)        
        }
        else{
            saveTime();
            clearInterval(intervalRef.current);
            setIsRunning(false);
        }
      }

  return (
        
    <div><div className='card'><div className='card-top'>
        <b style={{fontSize:"20px"}}>{project.result1[i].name}</b><br/><br/>
        <i style={{fontSize:"16px"}}>Estimated time: </i><b>{project.result1[i].est_time}</b><br/>
        <i style={{fontSize:"16px"}}>Completed Time: </i>
        <b>
                        
    <span>{hours < 10 ? `0${hours}` : hours}</span>:
    <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
    <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
  
  </b>
    <br/>
    <br/>{<ProgressBar i={i} project={project} bgcolor="blue" height={15}/>}</div>
    <div className='card-bottom'>
        <button onClick={()=>{startTimer()}}>{isRunning?<span>Stop</span>:<span>Start</span>}</button>
        </div></div></div>
  )
}

export default Mod;