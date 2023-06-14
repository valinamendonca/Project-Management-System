import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import PageNotFound from './Pages/PageNotFound';
import Reset from './Pages/Reset';
import ChangePassword from './Pages/ChangePassword';
import Dashboard from './Pages/Dashboard';
import Module from './Pages/Module';
import Project from './Pages/Project';
import PrivateRoute from './Pages/PrivateRoute';
import Create from './Pages/Create';
import Employee from './Pages/Employee';
import Edit from './Pages/Edit';


function App() {
  const auth=()=>{
    if(localStorage.getItem("authenticated")!=null){
      //console.log(localStorage.getItem("authenticated"));
      return true;
    }
    return false;
  }
  //localStorage.clear()
  var authen=auth();
  return (
    <div className="App">
     <Router>
      <Routes>
        <Route exact path="/" element={<Login/>} />
        <Route path="/reset" element={<Reset/>} />
        <Route path="/changePassword" element={<ChangePassword/>} />
        <Route element={<PrivateRoute auth={authen}/>}>
          <Route exact path='/dashboard' element={<Dashboard/>}/>
          <Route exact path='/module' element={<Module/>}/>
          <Route path='/projects' element={<Project/>}/>
          <Route path='/create' element={<Create/>} />
          <Route path='/addEmployee' element={<Employee/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
        </Route>
        <Route path='*' element={<PageNotFound/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
