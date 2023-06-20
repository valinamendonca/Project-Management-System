import React, { useEffect,useState } from 'react'
import '../css/dashboard.css'
import axios from "axios";
import Navbar from '../Components/Navbar'
import Header from '../Components/Header'
import '../css/project.css'
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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


function Project() {
  
  const [modalOpen, setModalOpen] = useState(false);
  const [project,setProject]=useState({});
  const [selectedId, setSelectedId] = useState('');

  const openModal = (id) => {
    setSelectedId(id);
      setModalOpen(true);
  };

  const closeModal = () => {
    setSelectedId('');
    setModalOpen(false);
  };


  //fetch data
  const fetchData=async(req,res)=>{
    const id=localStorage.getItem("id");
    return axios.get("http://localhost:3001/projects?id="+id)
    .then((req,res)=>{
          const Project=req.data.result2;
          setProject(Project);
        })        
  }        
//console.log(project);
  useEffect(()=>{
    fetchData();
  },[])

  const deleteProject=(project_id)=>{
    axios.delete("http://localhost:3001/deleteProject?id="+project_id)
    .then((req,res) => {
      if(req.data=="Deleted"){
        closeModal();
        window.location.reload();
      }
    })
    .catch((error) => {
      console.error(`Error deleting project with ID ${project_id}`, error);
    });  
  }

    return (
      <div className='container'>
      <Navbar/>
      <div className='dashboard'>
        <Header/>
        <div style={{paddingLeft:'10px'}}>
        {!project.length?<>
          <h1>No Projects created yet!</h1>
          <button>Create a Project</button></>
        :
        <>
          <h1 align='left'>Your Projects</h1>
          <Link id='create' style={{textDecoration:"none",color:"black",float: "left"}} to='/create'>Add Project</Link>
          <table className="prj" align='center'>
            <tbody>
              <tr><th>Project Id</th><th>Project Name</th><th colSpan={2}>Actions</th></tr>
              {project.map(data=>(
                <tr key={data.project_id}><td>{data.project_id}</td><td>{data.project_name}</td><td ><Link to={`/edit/${data.project_id}`}><i  className="fa fa-pencil"></i></Link></td><td><i className="fa fa-trash-o" onClick={()=>openModal(data.project_id)}></i></td></tr>
              )

              )}
            </tbody>
          </table>
          
        </>
        }
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
            Are you sure you want to delete this project?
          </Typography><br/>
          <button onClick={()=>deleteProject(selectedId)} type="button">Yes</button>
          <button type='button' onClick={closeModal}>Cancel</button>
        </Box>
      </Modal>
      </div>
    )
}

export default Project