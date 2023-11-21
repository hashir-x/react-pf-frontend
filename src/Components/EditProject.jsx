import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import { editProjectAPI } from '../services/allApis';
import { useContext } from 'react';
import { editProjectResponseContext } from '../context/ContextShare';

function EditProject({displayData}) {

  const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)

  const [project,setProject] = useState({
    id:displayData._id,title:displayData.title,languages:displayData.languages,github:displayData.github,website:displayData.website,overview:displayData.overview,projectImage:""
  })

  const [preview,setPreview] = useState("")

  useEffect(()=>{
    if(project.projectImage){
      setPreview(URL.createObjectURL(project.projectImage))
    }else{
      setPreview("")
    }
  },[project.projectImage])

    const [show, setShow] = useState(false);

    const handleClose = () => {
      setShow(false);
      setPreview("")
      setProject({
        id:displayData._id,title:displayData.title,languages:displayData.languages,github:displayData.github,website:displayData.website,overview:displayData.overview,projectImage:""
      })
    }
    const handleShow = () => setShow(true);

    const handleUpdate = async (e) => {
      e.preventDefault()
      const {id,title,languages,github,website,overview,projectImage} = project
      if(!title || !languages || !github || !website || !overview){
        alert("Please fill the form completely")
      }else{
        const token = sessionStorage.getItem("token")
        const reqBody = new FormData()
        reqBody.append("title",title)
        reqBody.append("languages",languages)
        reqBody.append("github",github)
        reqBody.append("website",website)
        reqBody.append("overview",overview)
        projectImage?reqBody.append("projectImage",projectImage):reqBody.append("projectImage",displayData.projectImage)
        if(projectImage){
          const reqHeader = {
            "Content-Type":"multipart/form-data","Authorization":`Bearer ${token}`
          }
          const result = await editProjectAPI(id,reqBody,reqHeader)
          if(result.status===200){
            // modal closed, reset state
            handleClose()
            // share response with my project
            setEditProjectResponse(result.data)
          }else{
            alert(result.response.data)
          }
        }else{
          const reqHeader = {
            "Content-Type":"application/json","Authorization":`Bearer ${token}`
          }
          const result = await editProjectAPI(id,reqBody,reqHeader)
          if(result.status===200){
            // modal closed, reset state
            handleClose()
            // share response with my project
            setEditProjectResponse(result.data)
          }else{
            alert(result.response.data)
          }
        }
      }
    }

  return (
    <>
        <button onClick={handleShow} className='btn'><i className='fa-solid fa-pen-to-square fa-2x'></i></button>
        <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size='lg'
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='row '>
            <div className="col-lg-6">
              <label htmlFor="projectPic" className='mb-5 text-center'>
                <input id='projectPic'  type="file" style={{display:'none'}} onChange={e=>setProject({...project,projectImage:e.target.files[0]})}/>
                <img className='img-fluid' height={'100%'}  width={'200px'} src={preview?preview:`${BASEURL}/uploads/${displayData.projectImage}`} alt="project picture" />
              </label>
            </div>
            <div className="col-lg-6">
              <input type="text" onChange={e=>setProject({...project,title:e.target.value})} value={project.title?project.title:displayData.title}  className='form-control mb-3' placeholder='Project Name'/>
              <input type="text" onChange={e=>setProject({...project,languages:e.target.value})} value={project.languages?project.languages:displayData.languages} className='form-control mb-3' placeholder='Language Used' />
              <input type="text" onChange={e=>setProject({...project,github:e.target.value})} value={project.github?project.github:displayData.github} className='form-control mb-3' placeholder='Website Link' />
              <input type="text" onChange={e=>setProject({...project,website:e.target.value})} value={project.website?project.website:displayData.website} className='form-control mb-3' placeholder='Github Link' />
            </div>
          </div>
          <input type="text" onChange={e=>setProject({...project,overview:e.target.value})} value={project.overview?project.overview:displayData.overview} className='form-control' placeholder='project Overview' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleUpdate} variant="primary">Update</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default EditProject