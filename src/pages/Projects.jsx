import React, { useEffect } from 'react'
import Header from '../Components/Header'
import ProjectCard from '../Components/ProjectCard'
import { Col, Row } from 'react-bootstrap'

function Projects() {

  // useEffect(()=>{
  //   const role = localStorage.getItem("Role")
  //   if(role !== 'user'){
  //     alert("Operation denied. Please login")
  //   }
  // },[])

  return (
    <>
      {/* navbar */}
      <Header/>
      {/* all projects */}
      <div className='text-center' style={{marginTop:"100px"}}>
        <h1 className='mb-4 mt-5'>All Projects</h1>
        {/* search */}
        <div className='d-flex w-100 justify-content-center w-100'>
          <div className='d-flex mb-5 align-items-center border rounded w-50'>
            <input placeholder='Search by Technologies'  className='form-control'/>
            <div style={{marginLeft:'-50px'}}>
              <i className='fa-solid fa-magnifying-glass'></i>
            </div>
          </div>
        </div>
        <div className='container-fluid'>
          <Row>
              <Col sm={12} md={6} lg={4}>
                <ProjectCard/>
              </Col>
          </Row>
        </div>
      </div>
    </>
  )
}

export default Projects