import React, { useContext, useEffect, useState } from 'react'
import AddProject from './AddProject'
import { deleteProjectAPI, userProjectAPI } from '../services/allApis'
import { addProjectResponseContext, editProjectResponseContext } from '../context/ContextShare'
import EditProject from './EditProject'

function MyProjects() {

    const {addProjectResponse,setAddProjectResponse} = useContext(addProjectResponseContext)

    const {editProjectResponse,setEditProjectResponse} = useContext(editProjectResponseContext)

    const [projects,setProjects] = useState([])

    const [token,setToken] = useState("")


    useEffect(()=>{
        if(sessionStorage.getItem("token")) {
            setToken(sessionStorage.getItem("token"))
        }
    },[])

    useEffect(()=> {
        if(token){
            getUserProjects()
        }
    },[token,addProjectResponse,editProjectResponse])


    const getUserProjects = async () => {
        const reqHeader = {
            "Content-Type":"application/json","Authorization":`Bearer ${token}`
        }
        const result = await userProjectAPI(reqHeader)
        if (result.status===200) {
            setProjects(result.data)
        }else{
            alert(result.response.data)
        }
    }

    const handleDelete = async (e,id) => {
        e.preventDefault()
        const reqHeader = {
            "Content-Type":"application/json","Authorization":`Bearer ${token}`
        }
        const result = await deleteProjectAPI(id,reqHeader)
        if(result.status===200){
            getUserProjects()
        }else{
            alert(result.response.data)
        }
    }


  return (
    <>
        <div className='card shadow p-3 mt-5'>
            <div className='d-flex'>
                <h3>My Projects</h3>
                <div className="ms-auto">
                    <AddProject/>
                </div>
            </div>
            <div className="mt-4">
                    {/* display user projects */}
                    { projects?.length>0?projects.map(project =>(
                        <div className="border d-flex align-items-center text-primary rounded p-2 mb-3">
                        <h4>{project.title}</h4>
                        <div className="icons ms-auto">
                            <EditProject displayData={project}/>
                            <a href={`${project.github}`} target='_blank' className='btn'><i className='fa-brands fa-github fa-2x'></i></a>
                            <button onClick={(e)=>handleDelete(project._id)} className='btn'><i className='fa-solid fa-trash fa-2x'></i></button>
                        </div>
                        </div>
                    ))
                    :
                    <p className='text-danger fs-3'>No Projects Uploaded</p>
                    }
                </div>
        </div>
    </>
  )
}

export default MyProjects