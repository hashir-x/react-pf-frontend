import React from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

function Header({insideDashboard}) {
  return (
    <>
        <Navbar style={{backgroundColor:'#90ee90',zIndex:'1'}} className="w-100 position-fixed top-0 ">
        <Container>
          <Navbar.Brand>
            <Link style={{textDecoration:"none",color:'#fff',fontSize:"40px"}} to={'/'}><i className='fa-brands fa-stack-overflow fa-bounce'></i> Project Fair</Link>
          </Navbar.Brand>
          {
            insideDashboard && 
            <div style={{textDecoration:"none"}} className='btn btn-link ms-auto fs-4 text-light fw-bold d-flex align-items-center'>Logout <i className='fa-solid fa-right-from-bracket fs-5 fa-beat ms-1'></i></div>
          }
        </Container>
        </Navbar>
    </>
  )
}

export default Header