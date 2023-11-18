import React from 'react'
import { Row, Col } from 'react-bootstrap'
import ProjectCard from './ProjectCard'
import { Link } from 'react-router-dom'

function HomeProjects() {
  return (
    <>
        <h1 className='text-center mb-5'> Explore Our Projects</h1>
        <marquee scrollamount={20}>
            <Row>
                <Col sm={12} md={6} lg={4}>
                    <ProjectCard/>
                </Col>
                <Col sm={12} md={6} lg={4}>
                    <ProjectCard/>
                </Col>
                <Col sm={12} md={6} lg={4}>
                    <ProjectCard/>
                </Col>
            </Row>
        </marquee>
        <div className='text-center'>
            <Link to={'/projects'}>View More Projects</Link>
        </div>
    </>
  )
}

export default HomeProjects