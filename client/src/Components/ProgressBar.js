import React from 'react'

const ProgressBar = (props) => {
	//console.log(props.project.result1[0].est_time);
	let bgcolor=props.bgcolor;
	let i=props.i;
	let project=props.project;
	
	const calc=()=>{
		let estTimeComponents=(project.result1[i].est_time).match(/(\d{2}):(\d{2}):(\d{2})/);
		let estTimeSeconds=(parseInt(estTimeComponents[1])*3600+parseInt(estTimeComponents[2])*60+parseInt(estTimeComponents[3]));
		let completedTimeComponents=(project.result1[i].Completed_Time).match(/(\d{2}):(\d{2}):(\d{2})/);
		let CompletedTimeSeconds=(parseInt(completedTimeComponents[1])*3600+parseInt(completedTimeComponents[2])*60+parseInt(completedTimeComponents[3]));
		let percent=Math.floor(CompletedTimeSeconds*100/estTimeSeconds);
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
