import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login'
import PageNotFound from './Pages/PageNotFound'
import Reset from './Pages/Reset'
import ChangePassword from './Pages/ChangePassword'
import Dashboard from './Pages/Dashboard'
import Module from './Pages/Module';
import Project from './Pages/Project'
import PrivateRoute from './Pages/PrivateRoute';

/*
const router=createBrowserRouter([
  {
  path : '/',
  element:<Login/>
  },
/*
  {
    path : '/register',
    element:<Register/>
  },
  */
 /*
  {
    path : '/reset',
    element:<Reset/>
  },
  {
    path : '/changePassword',
    element:<ChangePassword/>
  },
  {
    path:'/dashboard',
    element:<Dashboard/>
  },
  {
    path:'/module',
    element:<Module/>
  },
  {
    path:'/projects',
    element:<Project/>
  },
  {
    // * matches with any random text or url 
    path:'*',
    element:<PageNotFound/>
  }
])
*/
function App() {
  const isAuthenticated = true;
  const auth=()=>{
    console.log(localStorage.getItem("authenticated"));
    if(localStorage.getItem("authenticated")!=null){
      console.log(localStorage.getItem("authenticated"));
      console.log(localStorage.getItem("id"));
      return true;
    }
    return false;
    //console.log(i);
  }
  //localStorage.clear()
  var authen=auth();
  //localStorage.clear();
  //console.log("hello");
  return (
    <div className="App">
     {/* <RouterProvider router={router}></RouterProvider>*/}

     <Router>
      <Routes>
        {/* <PrivateRoute path="/" component={Dashboard} isAuthenticated={isAuthenticated}/>*/}
        
        <Route exact path="/" element={<Login/>} />
        <Route path="/reset" element={<Reset/>} />
        <Route path="/changePassword" element={<ChangePassword/>} />
        <Route element={<PrivateRoute auth={authen}/>}>
          <Route exact path='/dashboard' element={<Dashboard/>}/>
          <Route exact path='/module' element={<Module/>}/>
        </Route>
        <Route path='*' element={<PageNotFound/>}/>
        
      </Routes>
    </Router>
    </div>
  );
}

export default App;
