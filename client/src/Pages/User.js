import React,{useState,useEffect} from 'react'
import Navbar from '../Admin/Navbar'
import Header from '../Admin/Header'
import {Navigate,useNavigate} from 'react-router-dom';
import axios from 'axios';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import '../css/admin.css'

const style = {
        align: "center",
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

function User() {
        const [users,setUsers]=useState();
        const [trash, setTrash] = useState(false);
        const [edit,setEdit]=useState(false);
        const [addNew,setAddNew]=useState(false);
        const [selectedId, setSelectedId] = useState('');
        const [selectedEmp,setSelectedEmp]=useState(null);
      
        const navigate=useNavigate();
        const routeChange = (path) =>{
                navigate(path);
        }

        //add new empoyee
        const openNew=()=>{
                setAddNew(true);
        }
        const handleNewUser=(event)=>{
                event.preventDefault();
                const name=event.target.Name.value;
                const dob=event.target.dob.value;
                const gender=event.target.gender.value;
                const email=event.target.email.value;
                const contact=event.target.Contact_no.value;
                const designation=event.target.Designation.value;
                const role=event.target.project_manager.value;
    
                const data = {
                        name: name,
                        dob: dob,
                        gender: gender,
                        email: email,
                        contact: contact,
                        designation: designation,
                        role: role                      
                }; 
                const backendUrl =process.env.NODE_ENV === 'development'
                ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
                : process.env.REACT_APP_BACKEND_URL_PRODUCTION;
                return axios.post(`${backendUrl}/addUser`, data)
                .then(response => {
                        console.log(response);
                        closeModal();
                        window.location.reload();
                        //routeChange("/projects");
                })
                .catch(error => {
                        // Handle error
                        console.error('Error adding employee:', error);
                        // Handle error state or display an error message
                }); 
        }

        //edit employee
        const openEdit=(id)=>{
                const data=users.find((ele) => ele.eid === id);
                setSelectedEmp(data);
                setEdit(true);
        }
        const handleChange = (event) => {
                const { name, value, type, checked } = event.target;
                if (type === 'checkbox') {
                        setSelectedEmp((prevModule) => ({
                        ...prevModule,
                        [name]: checked ? 1 : 0, // Store 1 if checked, 0 if unchecked
                        }));
                } 
                else if(type=="text"){
                        setSelectedEmp((prevModule) => ({
                        ...prevModule,
                        [name]: value,
                        }));
                }
                else if (type === 'select-one') { // Handle select element
                        if(value=="employee"){
                                setSelectedEmp((prevModule) => ({
                                ...prevModule,
                                [name]: 0,
                                }))
                        }
                        else{
                                setSelectedEmp((prevModule) => ({
                                ...prevModule,
                                [name]: 1,
                                }))
                        }
                }
                else{
                        setSelectedEmp((prevModule) => ({
                                ...prevModule,
                                [name]: value,
                        }));   
                }
        };
        //handle edit save
        const handleSubmit = (event) => {
                event.preventDefault(); // Prevents the default form submission behavior
                console.log(selectedEmp);
                const backendUrl =process.env.NODE_ENV === 'development'
                ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
                : process.env.REACT_APP_BACKEND_URL_PRODUCTION;
                return axios.put(`${backendUrl}/editUser`, selectedEmp)
                .then(response => {
                        closeModal();
                        window.location.reload();
                })
                .catch(error => {
                console.error('Error updating User:', error);
                // Handle error state or display an error message
                });
        };
        

        //for removing employee
        const openModal = (id) => {
                setSelectedId(id);
                setTrash(true);
        };
        const closeModal = () => {
                setSelectedId('');
                setTrash(false);
                setEdit(false);
                setAddNew(false);
        };

        //delete Employee
        const deleteEmp=(eid)=>{
                const backendUrl =process.env.NODE_ENV === 'development'
                ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
                : process.env.REACT_APP_BACKEND_URL_PRODUCTION;
                axios.delete(`${backendUrl}/deleteEmp?id=`+eid)
                .then((req,res) => {
                  if(req.data=="Deleted"){
                    closeModal();
                    window.location.reload();
                  }
                })
                .catch((error) => {
                  console.error(`Error deleting employee with ID ${eid}`, error);
                });  
              }

        //fetch data
        const fetchData=async()=>{
                const backendUrl =process.env.NODE_ENV === 'development'
                ? process.env.REACT_APP_BACKEND_URL_DEVELOPMENT
                : process.env.REACT_APP_BACKEND_URL_PRODUCTION;
                return axios.get(`${backendUrl}/users`)
                .then((req,res)=>{
                        if(req.statusText==="None"){
                                setUsers(false);
                        }
                        else{
                                setUsers(req.data);
                                //console.log(users);
                        }
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
        <div>
                <button onClick={openNew} style={{backgroundColor:"grey",color:"white",padding:"10px",borderRadius:"10px"}}>Add User</button><br/>
                {users?(<>
                <table style={{width:"100%",fontSize:"16px"}}>
                        <thead><tr><th>Name</th><th>Email</th><th>Designation</th><th>Contact No.</th><th>Project Manager</th><th colSpan={2}>Actions</th></tr></thead>
                        <tbody>
                        {users.map((ele)=>(
                                <tr key={ele.eid}><td>{ele.Name}</td><td>{ele.email}</td><td>{ele.Designation}</td><td>{ele.Contact_no}</td><td>{ele.project_manager==1?"Yes":"No"}</td><td><i className="fa fa-pencil" onClick={()=>openEdit(ele.eid)}></i></td><td><i className="fa fa-trash-o" onClick={()=>openModal(ele.eid)}></i></td></tr>
                        ))}
                        </tbody>
                </table>
                </>):(<><br/>No users</>)}
        </div>
       </div>
       </div>
       {/*trash*/}
       <Modal 
        open={trash}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Are you sure you want to delete this Employee permanently?
          </Typography><br/>
          <button onClick={()=>deleteEmp(selectedId)} type="button">Yes</button>
          <button type='button' onClick={closeModal}>Cancel</button>
        </Box>
      </Modal>

      {/*edit user modal*/}
      <Modal
        open={edit}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Employee Details<br/><br/>
          </Typography>
          { selectedEmp && (
            <form style={{fontSize:"20px"}} onSubmit={handleSubmit}>
                <label>Name: <input name='Name' onChange={handleChange} value={selectedEmp.Name} required/></label><br/><br/>
            <label>Email: <input type='email' value={selectedEmp.email} name='email' onChange={handleChange} required/></label><br/><br/>
            <label>Designation: <input type='text' value={selectedEmp.Designation} onChange={handleChange} name='Designation' required/></label><br/><br/>
            <label>Contact: <input type='text' value={selectedEmp.Contact_no} pattern='[0-9]{10}' name='Contact_no' onChange={handleChange} required/></label><br/><br/>
            <label>Role: <select onChange={handleChange} name='project_manager' value={selectedEmp.project_manager==1?"project_manager":"employee"} required><option value='employee'>Employee</option><option value='project_manager'>Project Manager</option></select></label><br/><br/>
            <button style={{backgroundColor: "blue", color:"white",borderRadius:"20px"}} type='submit' >Save</button>
            </form>
          )}
        </Box>
      </Modal>

            {/*add user modal*/}
            <Modal
        open={addNew}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h4" component="h2">
            Add new Employee<br/><br/>
          </Typography>
            <form style={{fontSize:"20px"}} onSubmit={handleNewUser}>
                <label>Name: <input name='Name' required/></label><br/><br/>
                <label>Date Of Birth: <input type='date' name='dob' required/></label><span style={{marginRight: "70px"}}></span>
                <label>Gender: <input type='radio' name='gender' value="Male" required/>Male<input type='radio' name='gender' value="Female" required/>Female</label><br/><br/>
                <label>Email: <input type='email' name='email' required/></label><span style={{marginRight: "50px"}}></span>
                <label>Contact: <input type='text' size="10" pattern='[0-9]{10}' name='Contact_no' required/></label><br/><br/>
                <label>Designation: <input type='text' size={15} name='Designation' required/></label><span style={{marginRight: "50px"}}></span>
                <label>Role: <select name='project_manager' defaultValue="employee" required><option value='employee'>Employee</option><option value='project_manager'>Project Manager</option></select></label><br/><br/><br/>
                <button style={{marginLeft:"200px",backgroundColor: "blue", color:"white",borderRadius:"20px"}} type='submit' >Save</button>
            </form>
        </Box>
      </Modal>

       </>
     )
}

export default User