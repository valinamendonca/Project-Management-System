import React from 'react'
import '../css/admin.css'
import {Link} from 'react-router-dom'


function Navbar() {
  return (
    <div style={{backgroundColor: '#0C134F',color:'white'}} className='navbar'>
      <ul>
          <li><Link style={{color:'white'}} to='/adminDashboard'>Dashboard</Link></li>
          <li><Link style={{color:'white'}} to='/users'>User Management</Link></li>
      </ul>
        
    </div>
  )
}

export default Navbar