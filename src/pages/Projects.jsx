import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import ProjectCard from '../Components/ProjectCard'
import { Col, Row } from 'react-bootstrap'
import { allProjectsAPI } from '../services/allApis'

function Projects() {

  const [searchKey,setSearchKey] = useState("")

  const [allProjects,setAllProjects] = useState([])

  const getAllProjects = async (token) => {
    const reqHeader = {
      "Content-Type":"application/json", "Authorization":`Bearer ${token}`
    }
    const result = await allProjectsAPI(searchKey,reqHeader)
    if(result.status===200){
      setAllProjects(result.data)
    }else{
      alert(result.response.data)
    }
  }

  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      const token = sessionStorage.getItem("token")
      getAllProjects(token)
    }
  },[])

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
            <input onChange={e=>setSearchKey(e.target.value)} placeholder='Search by Technologies'  className='form-control'/>
            <div style={{marginLeft:'-50px'}}>
              <i className='fa-solid fa-magnifying-glass'></i>
            </div>
          </div>
        </div>
        <div className='container-fluid'>
          <Row>
              {allProjects?.length>0?allProjects?.map(project=>(
                <Col sm={12} md={6} lg={4}>
                <ProjectCard project={project}/>
              </Col>
              )):null
              }
          </Row>
        </div>
      </div>
    </>
  )
}

export default Projects