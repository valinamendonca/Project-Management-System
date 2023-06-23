import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../css/dashboard.css'
import '../css/card.css'
import {Navigate,useNavigate} from 'react-router-dom';
import Navbar from '../Components/Navbar';
import Header from '../Components/Header';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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

      
function Edit() {
  const navigate=useNavigate();
  const routeChange = (path) =>{
                navigate(path);
        } 

        const [data,setData]=useState({
                project: [],
                employees: [],
                modules: [],
        });
        const [modal,setModal]=useState(false);
        const [employees, setEmployees] = useState([]);
        const [newModule,setNewModule]=useState(false);
        const [editModule, setEditModule]=useState(false);
        const [selectedModule, setSelectedModule] = useState(null);

        const { id } = useParams();

        //check if project name is changed
        const handleProjectNameChange = (event) => {
                setData({
                  ...data,
                  project: [{
                        ...data.project[0],
                        project_name: event.target.value
                      }],
                });
        };

        //modules
        //edit module
        const handleSubmit = (event) => {
          event.preventDefault(); // Prevents the default form submission behavior
          const updatedModule = {
            ...data.modules.find((module) => module.module_id === selectedModule.module_id),
            name: event.target.name.value,
            est_Time: event.target.est_Time.value,
            Completed_Time: event.target.Completed_Time.value,
            Completed: event.target.Completed.checked?1:0,
          };
          setData((prevData) => ({
            ...prevData,
            modules: prevData.modules.map((module) =>
              module.module_id === selectedModule.module_id ? updatedModule : module
            ),
          }));
          setSelectedModule(updatedModule);
          setEditModule(false);
        };

        const handleChange = (event) => {
          const { name, value, type, checked } = event.target;
          if (type === 'checkbox') {
            setSelectedModule((prevModule) => ({
              ...prevModule,
              [name]: checked ? 1 : 0, // Store 1 if checked, 0 if unchecked
            }));
          } else {
            setSelectedModule((prevModule) => ({
              ...prevModule,
              [name]: value,
            }));
          }
        };
        
        const handleModuleEdit=(moduleId)=>{
          const moduleData=data.modules.find((module) => module.module_id === moduleId);
          setSelectedModule(moduleData);
          setEditModule(true);
        }

        //module delete
        const handleModuleRemoval = (id) => {
          setData((prevData) => ({
                  ...prevData,
                  modules: prevData.modules.filter(mod => mod.module_id !== id)
                }));
        };  

        //add new module
        const moduleDetails=(e)=>{
          setNewModule(false);
          e.preventDefault();
          const mod={
            name: e.target.modName.value,
            est_Time: e.target.est_time.value,
            Completed_Time: e.target.completed_time.value?e.target.completed_time.value:"00:00",
            Completed: e.target.completion.checked?1:0
          }
          setData((prevData) => ({
            ...prevData,
            modules: [...prevData.modules, mod]
          }));
        }
        const handleEmployeeRemoval = (id) => {
                setData((prevData) => ({
                        ...prevData,
                        employees: prevData.employees.filter(emp => emp.eid !== id)
                      }));
        };
        const addModule=()=>{
          setNewModule(true);
        }



        //employee
        //modal for employees
        const openModal=()=>{
                fetchEmp()
                .then(data => {
                setEmployees(data); 
                setModal(true);
                })
                .catch(error => {
                console.log('Error fetching employees:', error);
                });
        }
        const closeModal=()=>{
                setModal(false);
                setNewModule(false);
                setEditModule(false);
                
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
            
        //add employee
        const handleAddEmployee = (employee) => {
                const existingEmployeeDiv = document.querySelector(`[key="${employee.eid}"]`);
                if (data.employees.some(emp => emp.eid === employee.eid) || existingEmployeeDiv) {
                  // Employee already added
                  return;
                }
                setData((prevData) => ({
                        ...prevData,
                        employees: [...prevData.employees, employee]
                      }));
              };

              
        //on saving overall changes
        const formHandler=async()=>{
          const backendUrl =process.env.NODE_ENV === 'development'
          ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
          : process.env.REACT_APP_BACKEND_URL_PRODUCTION;
          return axios.put(`${backendUrl}/editProjects`, data)
          .then(response => {
            //console.log(response);
            //routeChange("/projects");
            window.location.href = "/projects";
          })
          .catch(error => {
            // Handle error
            console.error('Error updating module:', error);
            // Handle error state or display an error message
          });
        }
        

        //fetch all data during page load 
        const fetchData=async (id)=>{
                // Fetch data from the database based on the provided ID
                try {
                  const backendUrl =process.env.NODE_ENV === 'development'
                  ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
                  : process.env.REACT_APP_BACKEND_URL_PRODUCTION;
                        const data = await axios.get(`${backendUrl}/editProject?id=` + id);
                        // Set the retrieved data as the initial form values
                        setData({
                                project: data.data.result[0],
                                employees: data.data.result1,
                                modules: data.data.result2,
                              });
                } catch (error) {
                        console.error('Error fetching data:', error);
                }
        }
        useEffect(() => {
                fetchData(id);
        }, [id]);


  return (
        <div className='container'>
                <Navbar/>
                <div align="left" className='dashboard'>
                        <Header/>
                        <div style={{paddingLeft:'20px'}}>
                                <form onSubmit={formHandler}>
                                        {data && data.project && data.project.length!==0?(<>
                                        <label style={{fontSize:"20px"}}><b>Project Name:</b><input style={{fontSize:"20px"}} onChange={(e) => handleProjectNameChange(e)} value={data.project?.project_name} name="pname" required/></label>
                                        <br/><hr/>
                                        <span><b>Modules</b></span><br/>
                                        <div id="modules" >
                                        {data.modules?.map(mod=>(
                                                <><div align="center" key={mod.module_id} className="card" style={{height:"275px"}}>
                                                <div style={{ width: "100%" }}></div>
                                                <div className="container-card">
                                                  <h4><b>{mod.name}</b></h4>
                                                  <p><b>Estimated Time: </b>{mod.est_Time}</p>
                                                  <p><b>Completed Time: </b>{mod.Completed_Time}</p>
                                                  <p>{mod.Completed===1?(<b style={{color:"blue"}}>Completed</b>):(<b style={{color:"red"}}>Not Completed</b>)}</p>
                                                  <button type='button' onClick={() => handleModuleEdit(mod.module_id)} className='edit-button'>Edit</button>
                                                  <button type='button' onClick={() => handleModuleRemoval(mod.module_id)} className='remove-button'>Remove</button>
                                                </div>
                                              </div></>
                                        ))}
                                        </div>
                                        <button onClick={addModule} style={{backgroundColor:"grey", width:"200px",padding:"10px",borderRadius:"20px",display: "block", clear: "both"}} type="button">Add Module</button>                                        
                                        <hr/>
                                        <span><b>Employees</b></span><br/>
                                        <div id="emp" >
                                        {data.employees?.map(emp=>(
                                                <><div align="center" key={emp.eid} className="card">
                                                <div style={{ width: "100%" }}></div>
                                                <div className="container-card">
                                                  <h4><b>{emp.Name}</b></h4>
                                                  <p>{emp.Designation}</p>
                                                  <button type='button' onClick={() => handleEmployeeRemoval(emp.eid)} className='remove-button'>Remove</button>
                                                </div>
                                              </div></>
                                        ))}
                                        </div>
                                        <button onClick={openModal} style={{backgroundColor:"grey", width:"200px",padding:"10px",borderRadius:"20px",display: "block", clear: "both"}} type="button">Add Employee</button>
                                        <button style={{backgroundColor:"blue",padding:"10px",borderRadius:"20px",marginLeft:"500px",fontSize:"20px",color:"white"}} type="submit">Save</button>
                                        </>):(<div>Loading</div>)}
                                        
                                </form>
                        </div>
                 </div>

        {/*employee modal*/}
        <Modal open={modal} onClose={closeModal} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Employees
          </Typography>
          {
          employees?.map(employee => (
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

      {/*new module modal*/}
      <Modal
        open={newModule}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Add a New Module
          </Typography>
          <br/>
          <form style={{fontSize:"20px"}} onSubmit={moduleDetails}>
            <label>Module Name: <input name='modName' required/></label><br/><br/>
            <label>Estimated Time: <input type='time' name='est_time' required/></label><br/><br/>
            <label>Completed Time: <input type='time' name='completed_time'/></label><br/><br/>
            <label>Module Completed: <input type='checkbox' name='completion'/></label><br/><br/>
            <button style={{backgroundColor: "blue", color:"white",borderRadius:"20px"}} type='submit' >Add</button>
          </form>  
        </Box>
      </Modal>

      {/*edit module modal*/}
      <Modal
        open={editModule}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Edit Module
          </Typography>
          { selectedModule && (
            <form style={{fontSize:"20px"}} onSubmit={handleSubmit}>
              <label>Module Name: <input name='name' onChange={(e)=>handleChange(e)} value={selectedModule.name} required/></label><br/><br/>
            <label>Estimated Time: <input type='time' value={selectedModule.est_Time} name='est_Time' onChange={handleChange} required/></label><br/><br/>
            <label>Completed Time: <input type='time' value={selectedModule.Completed_Time} onChange={handleChange} name='Completed_Time'/></label><br/><br/>
            <label>Module Completed: <input type='checkbox' checked={selectedModule.Completed === 1} name='Completed' onChange={handleChange} /></label><br/><br/>
            <button style={{backgroundColor: "blue", color:"white",borderRadius:"20px"}} type='submit' >Save</button>
            </form>
          )}
        </Box>
      </Modal>
    </div>
  )
}

export default Edit