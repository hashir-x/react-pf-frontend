import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from './ProjectCard'
import { Link } from 'react-router-dom'

function HomeProjects({allProjects}) {
  return (
    <>
        <h1 className='text-center mb-5'> Explore Our Projects</h1>
        <marquee scrollamount={20}>
            <Row>
                {allProjects?.length>0?allProjects.map(project =>(
                    <Col sm={12} md={6} lg={4}>
                    <ProjectCard project={project}/>
                </Col>
                )):null
                }
            </Row>
        </marquee>
        <div className='text-center'>
            <Link to={'/projects'}>View More Projects</Link>
        </div>
    </>
  )
}

export default HomeProjects