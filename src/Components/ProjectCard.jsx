import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Projecting from '../Assets/projecting.jpg'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { BASEURL } from '../services/baseUrl';

function ProjectCard({project}) {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
        {project &&
          <Card className='shadow mb-5 btn' onClick={handleShow}>
            <Card.Img variant="top" src={Project?.projectImage?`${BASEURL}/uploads/${project.projectImage}`:ProjectImg} />
            <Card.Body>
            <Card.Title>{project.title}</Card.Title>
            </Card.Body>
        </Card>}
        {/* modal*/}
        <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <img style={{height:"200px"}} className='img-fluid' src={Project?.projectImage?`${BASEURL}/uploads/${project.projectImage}`:ProjectImg} alt="single project" />
                </Col>
                <Col>
                    <h2>{project.title}</h2>
                    <p>{project.overview}</p>
                    <p>Language used: <span className='ms-2 fw-bolder'>{project.languages}</span></p>
                </Col>
            </Row>
            <div className="mt-3">
                <a href={project.github} target='_blank' className='me-5 btn'><i className='fa-brands fa-github fa-2x'></i></a>
                <a href={project.website} target='_blank' className='me-5 btn'><i className='fa-solid fa-link fa-2x'></i></a>
            </div>
        </Modal.Body>
        </Modal>
    </>
  )
}

export default ProjectCard