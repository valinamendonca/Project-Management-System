import React,{useState,useEffect} from 'react'
import axios from 'axios'
import '../css/dashboard.css'
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import '../css/card.css'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {Navigate,useNavigate} from 'react-router-dom';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 650,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  maxHeight: '70vh',
  overflowY: 'auto',
  boxShadow: 24,
  p: 4,
};


function Create() {
  
  const navigate=useNavigate();
  const routeChange = (path) =>{
    navigate(path);
  }
        const [modalOpen, setModalOpen] = useState(false);
        const [employees, setEmployees] = useState([]);


  const openModal = () => {
    fetchEmp()
    .then(data => {
      setEmployees(data); 
      setModalOpen(true);
    })
    .catch(error => {
      console.log('Error fetching employees:', error);
    });
    
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const submitHandler=(event)=>{
          event.preventDefault();
          const pname=event.target.pname.value;
          const modname=event.target.modname.value?event.target.modname.value:null;
          const time=event.target.time.value?event.target.time.value:null;
          const empDiv = document.getElementById('emp');
          const employeeList = Array.from(empDiv.children).map((child) => child.getAttribute('key'));
          const prjData={pname,modname,time,employeeList};
          if(prjData){
                  const id=localStorage.getItem("id");
                  const backendUrl =process.env.NODE_ENV === 'development'
                  ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
                  : process.env.REACT_APP_BACKEND_URL_PRODUCTION;
                  axios.post(`${backendUrl}/createProject?id=`+id,prjData)
                  .then((req,res)=>{
                    if(req.data==="Success"){
                      routeChange("/projects");
                    }
                  })
                  .catch(error=>{
                    console.log(error);
                  })
          }
  }

  const fetchEmp=async ()=>{
    const backendUrl =process.env.NODE_ENV === 'development'
    ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
    : process.env.REACT_APP_BACKEND_URL_PRODUCTION;
    return axios.get(`${backendUrl}/empList`)
    .then(response => response.data)
    .catch(error => {
      console.log('Error fetching employees:', error);
      throw error;
    });
  }
              /*
              const image=(data)=>{
                const base64Image = btoa(
                  new Uint8Array(data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ''
                  )
                );
                const imageUrl = `data:image/jpeg;base64,${base64Image}`;
                //setImg(imageUrl)
                  }
                  */

        const handleAddEmployee = (employee) => {
          const empDiv = document.getElementById('emp');
          const existingEmployeeDiv = document.querySelector(`[key="${employee.eid}"]`);
          if (existingEmployeeDiv) {
            // Employee already added
            return;
          }
          const newEmployeeDiv = document.createElement('div');
          newEmployeeDiv.setAttribute('key', employee.eid);
          newEmployeeDiv.setAttribute('align', "center");
          newEmployeeDiv.className = 'card';
          // Add the employee details to the new div
          newEmployeeDiv.innerHTML = `
            <div align="center" key="${employee.eid}" className="card">
              <div style={{ width: "100%" }}></div>
              <div className="container-card">
                <h4><b>${employee.Name}</b></h4>
                <p>${employee.Designation}</p>
              </div>
            </div>
          `;
          const removeButton = document.createElement('button');
          removeButton.innerText = 'Remove Employee';
          removeButton.className = 'remove-button';
          removeButton.addEventListener('click', () => {
            empDiv.removeChild(newEmployeeDiv);
          });
          newEmployeeDiv.appendChild(removeButton);
          // Append the new div to the empDiv
          empDiv.appendChild(newEmployeeDiv);
        };
             


        return (
        <div className='container'>
                <Navbar/>
                <div align="left" className='dashboard'>
                        <Header/>
                        <div style={{paddingLeft:'20px'}}>
                                <h2>Enter the project details below:</h2>
                                <form onSubmit={submitHandler} className='create' style={{fontSize:"20px"}} method="POST">
                                        <label>Project Name:</label><input name="pname" required/>
                                        <br/><hr/>
                                        <span><b>Modules</b></span><br/>
                                        <span style={{fontSize:"16px"}}><i>(You can add more module/s later)</i></span><br/><br/>
                                        <label>Module Name:</label><input name="modname"/>
                                        <label>Estimated Time:</label><input name="time"/>
                                        <hr/>
                                        <span><b>Employees</b></span><br/>
                                        <span style={{fontSize:"16px"}}><i>(You can add more employee/s later)</i></span><br/><br/>
                                        <div id="emp" ></div>
                                        <button onClick={openModal} style={{backgroundColor:"grey", width:"200px",padding:"10px",borderRadius:"20px",display: "block", clear: "both"}} type="button">Add Employee</button>
                                        <button style={{marginLeft:"40%",display: "block", clear: "both"}} align="center" id="create">Create Project</button>
                                </form>
                        </div>
                </div>

                
                <Modal
        open={modalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Employees
          </Typography>
          
          {
          employees.map(employee => (
            <div align="center" key={employee.eid} className="card">
              <div style={{width:"100%"}}/>
              <div className="container-card">
                <h4><b>{employee.Name}</b></h4> 
                <p>{employee.Designation}</p> 
                <button onClick={() => handleAddEmployee(employee)} align="center" className="add" type="button">Add Employee</button>
              </div>
            </div>
          
          ))
          }         
        </Box>
      </Modal>
  </div>
  )
}

export default Create