import React, { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { loginAPI, registerAPI } from '../services/allApis';

function Auth({register}) {

  const navigate = useNavigate()

  const [userData,setUserData] = useState({
    username:"",email:"",password:""
  })

  const handleRegister = async(e)=>{
    e.preventDefault()
    const {username,email,password} = userData
    if(!username || !email || !password){
      alert("Please fill the form")
    }else{
      // api call
      const res = await registerAPI(userData)
      if (res.status===200) {
        alert(`${res.data.username} has successfully registered.`)
        // reset state
        setUserData({
          username:"",email:"",password:""
        })
        navigate("/login")
      }else{
        alert(res.response.data)
      }
    }
  }

  const handleLogin = async (e)=>{
    e.preventDefault()
    const {email,password} = userData
    if(!email || !password){
      alert("Please fill the form")
    }else{
      // api call
      const res = await loginAPI({email,password})
      if (res.status===200) {
        // save res
        localStorage.setItem("existingUser",JSON.stringify(res.data.existingUser))
        localStorage.setItem("Role",res.data.role)
        sessionStorage.setItem("token",res.data.token)
        // reset state
        setUserData({
          email:"",password:""
        })
        navigate("/")
      }else{
        alert(res.response.data)
      }
    }
  }

  const registerForm = register ? true:false

  return (
    <>
      <div style={{width:"100%",height:'100vh'}} className='d-flex justify-content-center align-items-center'>
        <div className="container w-75">
          <Link className='d-flex align-items-center' to={'/'} style={{textDecoration:'none'}}>
            <h5><i className='fa-solid fa-arrow-left me-2'></i>Back to Home</h5>
          </Link>
          <div className="card shadow p-5 bg-success">
            <div className='row align-items-center'>
              <div className='col-lg-6'>
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTVfppVFnUEMBFbMPBqPHEHwSHeX37XGCqHZA&usqp=CAU" alt="" className='rounded-start w-100'/>
              </div>
              <div className='col-lg-6'>
                <div className="d-flex flex-column">
                  <div className="d-flex mt-2 text-light">
                    <i className='fa-brands fa-stack-overflow fa-bounce fa-3x me-1'></i>
                    <span className='h1 fw-bolder mb-0'>Project Fair</span>
                  </div>
                  <h5 className='fw-normal mt-4 pb-3 text-light'>
                    {
                      registerForm? 'Sign up to your account' : 'Sign in to your account'
                    }
                  </h5>
                  <Form className='text-light w-100'>
                  { registerForm &&
                  <Form.Group className="mb-3" controlId="formBasicUsername">
                  <Form.Control type="text" value={userData.username} placeholder="Enter your name" onChange={(e)=>setUserData({...userData,username:e.target.value})}/>
                  </Form.Group>
                  }
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Control type="email" value={userData.email} placeholder="Enter your Email ID" onChange={(e)=>setUserData({...userData,email:e.target.value})}/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control type="password" value={userData.password} placeholder="Enter password" onChange={(e)=>setUserData({...userData,password:e.target.value})}/>
                  </Form.Group>
                  {
                    registerForm ?
                    <div>
                      <Button onClick={handleRegister} variant='light' type='submit' size='lg'>Register</Button>
                      <p className='mt-3 text-light'>Already have an account ? <Link className='btn-link text-warning' to={'/login'}>Login Here</Link></p>
                    </div>
                    :
                    <div>
                      <Button onClick={handleLogin} variant='light' type='submit' size='lg'>Login</Button>
                      <p className='mt-3 text-light'>Already have an account ? <Link className='btn-link text-warning' to={'/register'}>Register Here</Link></p>
                    </div>
                  }
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Auth