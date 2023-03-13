import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css';
import Login from './Pages/Login'
import PageNotFound from './Pages/PageNotFound'
import Reset from './Pages/Reset'
import ChangePassword from './Pages/ChangePassword'
import Dashboard from './Pages/Dashboard'
import Module from './Pages/Module';
import Project from './Pages/Project'

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

function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
