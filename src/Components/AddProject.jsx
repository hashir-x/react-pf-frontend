import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { addProjectApi } from '../services/allApis';
import { addProjectResponseContext } from '../context/ContextShare';

function AddProject() {

  const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)

  const [projectDetails,setProjectDetails] = useState({
    title:"",languages:"",github:"",website:"",overview:"",image:"",userId:""
  })

  const [preview,setPreview] = useState("")

  const [token,setToken] = useState("")

  useEffect(()=>{
    if(localStorage.getItem("existingUser") && sessionStorage.getItem("token")){
      setProjectDetails({...projectDetails,userId:JSON.parse(localStorage.getItem("existingUser"))._id})
      setToken(sessionStorage.getItem("token"))
    }
  },[])

  useEffect(()=>{
    if (projectDetails.image) {
      setPreview(URL.createObjectURL(projectDetails.image))
    }
  },[projectDetails.image])

//  modal
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setPreview("")
    setProjectDetails({
      title:"",languages:"",github:"",website:"",overview:"",image:"",userId:""
    })
  }
  const handleShow = () => setShow(true);

  const handleSave = async (e) => {
    e.preventDefault()
    const {title,languages,github,website,overview,image,userId} = projectDetails
    if(!title || !languages || !github || !website || !overview || !image || !userId){
      alert("Please fill the form completely")
    }else{
      const reqBody = new FormData()
      reqBody.append("title",title)
      reqBody.append("languages",languages)
      reqBody.append("github",github)
      reqBody.append("website",website)
      reqBody.append("overview",overview)
      reqBody.append("projectImage",image)
      reqBody.append("userId",userId)
      const reqHeader = {
        "Content-Type":"multipart/form-data", "Authorization":`Bearer ${token}`
      } 
      const result = await addProjectApi(reqBody,reqHeader)
      if(result.status===200){
        alert(`Project ${result.data.title} added successfully`)
        setProjectDetails({
          title:"",languages:"",github:"",website:"",overview:"",image:"",userId:""
        })
        setAddProjectResponse(result.data)
        handleClose()
      }else{
        alert(result.response.data)
      }
    }
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Project
      </Button>

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
                <input id='projectPic' onChange={(e)=>setProjectDetails({...projectDetails,image:e.target.files[0]})} type="file" style={{display:'none'}}/>
                <img className='img-fluid' height={'100%'}  width={'200px'} src={preview ? preview : "https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png"} alt="project picture" />
              </label>
            </div>
            <div className="col-lg-6">
              <input type="text" value={projectDetails.title} onChange={e=>setProjectDetails({...projectDetails,title:e.target.value})}  className='form-control mb-3' placeholder='Project Name'/>
              <input type="text" value={projectDetails.languages} onChange={e=>setProjectDetails({...projectDetails,languages:e.target.value})} className='form-control mb-3' placeholder='Language Used' />
              <input type="text" value={projectDetails.github} onChange={e=>setProjectDetails({...projectDetails,github:e.target.value})} className='form-control mb-3' placeholder='Website Link' />
              <input type="text" value={projectDetails.website} onChange={e=>setProjectDetails({...projectDetails,website:e.target.value})} className='form-control mb-3' placeholder='Github Link' />
            </div>
          </div>
          <input type="text" value={projectDetails.overview} onChange={e=>setProjectDetails({...projectDetails,overview:e.target.value})} className='form-control' placeholder='project Overview' />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AddProject