import React,{useState,useRef} from 'react'
import ProgressBar from './ProgressBar';
import axios from 'axios';
import {Alert} from 'react-alert';



function Mod(props) {



        var i=props.i;
        var project=props.project;
        console.log(project);

        //console.log(i+"hi");

  /*      
const bar=(progress)=>{
        return (<ProgressBar bgcolor="blue" progress={progress} height={15}/>);
}
*/




let completedTimeComponents=(project[i].Completed_Time).match(/(\d{2}):(\d{2}):(\d{2})/);

const [hours, setHours] = useState(parseInt(completedTimeComponents[1]));
const [minutes, setMinutes] = useState(parseInt(completedTimeComponents[2]));
const [seconds, setSeconds] = useState(parseInt(completedTimeComponents[3]));
//const [time,setTime]=useState({hours:0,minutes:0,seconds:0})
const [isRunning, setIsRunning] = useState(false);
const intervalRef = useRef(null);


var mod_id=props.project[i].module_id;
        
        //console.log(mod_id);

const saveTime=()=>{
        if(isRunning ){
          //var Completed_Time=hours < 10 ? `0${hours}` : hours+":"+minutes < 10 ? `0${minutes}` : minutes+":"+seconds < 10 ? `0${seconds}` : seconds;
          //percent=calc();
          var second=seconds < 10 ? `0${seconds}` : seconds;
          var min=minutes < 10 ? `0${minutes}` : minutes;
          var hr=hours < 10 ? `0${hours}` : hours;
          var Completed_Time=hr+":"+min+":"+second;
          //console.log(comp);
          //console.log(second);
          //console.log(Completed_Time);
          const data={mod_id,Completed_Time}
          axios.post("http://localhost:3001/module?mod_id="+mod_id,{Completed_Time})
        }
}

let meh=(hours+":"+minutes+":"+seconds).match(/(\d{2}):(\d{2}):(\d{2})/);
console.log(meh);

let estTimeComponents=(project[i].est_Time).match(/(\d{2}):(\d{2}):(\d{2})/);
		//console.log((parseInt(estTimeComponents[1])));
let estTimeSeconds=(parseInt(estTimeComponents[1])*3600+parseInt(estTimeComponents[2])*60+parseInt(estTimeComponents[3]));
//let completedTimeComponents=(project[i].Completed_Time).match(/(\d{2}):(\d{2}):(\d{2})/);
console.log(completedTimeComponents);
let CompletedTimeSeconds=(parseInt(completedTimeComponents[1])*3600+parseInt(completedTimeComponents[2])*60+parseInt(completedTimeComponents[3]));


function startTimer() {
    //saveTime();
    console.log(estTimeSeconds);
    console.log(CompletedTimeSeconds);
        if (!isRunning) {
          //saveTime();
          
          /*
          if(estTimeSeconds<CompletedTimeSeconds){
            alert("Module Completed!");
            return;
          }
          */
          
          console.log("hi");
          //percent=calc();
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
              //console.log(seconds);
              return newSeconds;
            });
          }, 1000)
          
          //saveTime();
        
        }
        else{
          console.log("bye");
            saveTime();
                clearInterval(intervalRef.current);
                setIsRunning(false);
        }
      }

  return (
        
    <div><div className='card'><div className='card-top'>
        <b style={{fontSize:"20px"}}>{project[i].name}</b><br/><br/>
        <i>Estimated time: </i><b>{project[i].est_Time}</b><br/>
        <i>Completed Time: </i>{/*<b>{project[i].Completed_Time}</b><br/>*/}
        <b>
                        
    <span>{hours < 10 ? `0${hours}` : hours}</span>:
    <span>{minutes < 10 ? `0${minutes}` : minutes}</span>:
    <span>{seconds < 10 ? `0${seconds}` : seconds}</span>
  
  </b>
    <br/>
    <br/>{/*bar(percent)*/<ProgressBar i={i} project={project} bgcolor="blue" height={15}/>}</div>
    <div className='card-bottom'>
        <button onClick={()=>{startTimer(); /*saveTime()*/}}>{isRunning?<span>Stop</span>:<span>Start</span>}</button>
        </div></div></div>
  )
}

export default Mod;