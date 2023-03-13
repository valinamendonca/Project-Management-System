import React,{useMemo, useState} from 'react'

const ProgressBar = (props) => {

	let bgcolor=props.bgcolor;
	let i=props.i;
	let project=props.project;
	//let percent=props.progress;

	const [prg,setPrg]=useState();
	
	const calc=()=>{
		let estTimeComponents=(project[i].est_Time).match(/(\d{2}):(\d{2}):(\d{2})/);
		//console.log((parseInt(estTimeComponents[1])));
		let estTimeSeconds=(parseInt(estTimeComponents[1])*3600+parseInt(estTimeComponents[2])*60+parseInt(estTimeComponents[3]));
		let completedTimeComponents=(project[i].Completed_Time).match(/(\d{2}):(\d{2}):(\d{2})/);
		console.log(completedTimeComponents);
		let CompletedTimeSeconds=(parseInt(completedTimeComponents[1])*3600+parseInt(completedTimeComponents[2])*60+parseInt(completedTimeComponents[3]));
		//console.log(estTimeSeconds-CompletedTimeSeconds);
		let percent=Math.floor(CompletedTimeSeconds*100/estTimeSeconds);
		//console.log(percent);
		//setTime({hours:parseInt(estTimeComponents[1]),minutes:parseInt(estTimeComponents[2]),seconds:parseInt(estTimeComponents[3])});
		//setTime({minutes:parseInt(estTimeComponents[2])})
		//setTime({seconds:parseInt(estTimeComponents[3])})
		//setPrg(percent)
		if(percent>100)
			return 100;
		return percent;
	}
	let percent=calc();

	const Parentdiv = {
		height: 15,
		width: '100%',
		backgroundColor: 'lightgrey',
		borderRadius: 40,
		/*margin: 50*/
	}
	
	const Childdiv = {
		height: '100%',
		width: `${percent}%`,
		backgroundColor: bgcolor,
	        borderRadius:40,
		textAlign: 'right',
		position:"relative"
	}
	
	const progresstext = {
		/*padding: 10,*/
		color: 'black',
		fontWeight: 700,
		fontSize:"14px",
		position: "absolute"
	}
	
	
	

	return (
	<div style={Parentdiv}>
		
	<div style={Childdiv}>
	<span style={progresstext}>{`${percent}%`}</span>
	</div>
	</div>
	)
}

export default ProgressBar;
