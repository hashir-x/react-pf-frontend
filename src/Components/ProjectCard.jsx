import React from 'react'
import { Card, Col, Row } from 'react-bootstrap'
import Projecting from '../Assets/projecting.jpg'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ProjectCard() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
        <Card className='shadow mb-5 btn' onClick={handleShow}>
            <Card.Img variant="top" src={Projecting} />
            <Card.Body>
            <Card.Title>Project Title</Card.Title>
            </Card.Body>
        </Card>
        {/* modal*/}
        <Modal size='lg' show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Row>
                <Col>
                    <img style={{height:"200px"}} className='img-fluid' src={Projecting} alt="single project" />
                </Col>
                <Col>
                    <h2>Project Title</h2>
                    <p>Project Overview</p>
                    <p>Language used: <span className='ms-2 fw-bolder'>HTML,CSS,REACT</span></p>
                </Col>
            </Row>
            <div className="mt-3">
                <a href="" target='_blank' className='me-5 btn'><i className='fa-brands fa-github fa-2x'></i></a>
                <a href="" target='_blank' className='me-5 btn'><i className='fa-solid fa-link fa-2x'></i></a>
            </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default ProjectCard