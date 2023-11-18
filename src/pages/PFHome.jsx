import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import designIcon from '../Assets/designicon.png';
import HomeProjects from '../Components/HomeProjects';
import { Link } from 'react-router-dom';

function PFHome() {

  const [isLoggedIn,setLoggedIn] = useState(false)

  useEffect(()=>{
    if(localStorage.getItem("existingUser")){
      setLoggedIn(true)
    }else{
      setLoggedIn(false)
    }
  })

  return (
    <>
    {/* landing section */}
      <div className="container-fluid rounded" style={{widows:"100%",height:'100vh',backgroundColor:'#90ee90'}}>
        <Row className="align-items-center p-5">
          <Col sm={12} md={6}>
            <h1 style={{fontSize:"80px"}} className='text-light'><i className='fa-brands fa-stack-overflow fa-bounce'></i>Project Fair</h1>
            <p>One Stop Destination for all Software Development Projects. Where User can add and manage their projects. As wel as access all projects available in our website... What are you waiting for!!!</p>
            {isLoggedIn ?
              <Link to={'/dashboard'} style={{backgroundColor:'orange'}} className='btn'>Manage your projects<i className='fa-solid fa-right-long fa-beat ms-2'></i></Link>
              :
              <Link to={'/login'} style={{backgroundColor:'orange'}} className='btn'>Start to Explore<i className='fa-solid fa-right-long fa-beat ms-2'></i></Link>
            }
          </Col>
          <Col sm={12} md={6}>
            <img style={{marginTop:'100px'}} className='img-fluid w-75' src={designIcon} alt="project fair" />
          </Col>
        </Row>
      </div>
      {/* glimpse of all projects */}
      <div className="all-projects mt-5">
        <HomeProjects/>
      </div>
    </>
  )
}

export default PFHome