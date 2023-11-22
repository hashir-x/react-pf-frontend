import React, { useEffect, useState } from 'react'
import { updateProfileAPI } from '../services/allApis'

function Profile() {

    const [userProfile,setUserProfile] = useState({
        _id:JSON.parse(localStorage.getItem("existingUser"))._id,
        username:JSON.parse(localStorage.getItem("existingUser")).username,
        email:JSON.parse(localStorage.getItem("existingUser")).email,
        password:JSON.parse(localStorage.getItem("existingUser")).password,
        github:"",
        linkedin:"",
        profileImage:""
    })

    const [preview,setPreview] = useState("")

    useEffect(()=>{
        if(userProfile.profileImage){
            setPreview(URL.createObjectURL(useProfile.profileImage))
        }else{
            setPreview("")
        }
    },[useProfile.profileImage])

    const handleUpdate = async (e) => {
        e.preventDefault()
        const {_id,username,email,password,github,linkedin,profileImage} = userProfile
        if(!_id || !username || !email || !password || !github || !linkedin){
            alert("Please fill the form completely")
        }else{
            const reqBody = new FormData()
            reqBody.append("username",username)
            reqBody.append("email",email)
            reqBody.append("password",password)
            reqBody.append("github",github)
            reqBody.append("linkedin",linkedin)
            reqBody.append("profileImage",profileImage)
            const token = sessionStorage.getItem("token")
            if(preview){
                const reqHeader = {
                    "Content-Type":"multipart/form-data","Authorization":`Bearer ${token}`
                }
                const result = await updateProfileAPI(reqBody,reqHeader)
                if(result.status === 200){
                    alert("profile updated")
                    setUserProfile({
                        _id:result.data._id,username:result.data.username,email:result.data.email,password:result.data.password,github:result.data.github,linkedin:result.data.linkedin,profileImage:""
                    })
                }else{
                    alert(result)
                }
            }else{
                const reqHeader = {
                    "Content-Type":"application/json","Authorization":`Bearer ${token}`
                }
            }
        }
    }

  return (
    <>
        <div className='card shadow p-5'>
            <div className="d-flex justify-content-between">
                <h2>My Profile</h2>
                <button onClick={handleUpdate} className='btn btn-outline-primary'><i className='fa-solid fa-check'></i></button>
            </div>
            <div className='row justify-content-center mt-3'>
                {/* profile picture */}
                <label htmlFor="profile" className='mb-5 text-center'>
                    <input id='profile' type="file" style={{display:'none'}}/>
                    <img className='rounded-circle' height={'200px'}  width={'200px'} src="https://static.vecteezy.com/system/resources/thumbnails/019/900/322/small/happy-young-cute-illustration-face-profile-png.png" alt="profile picture" />
                </label>
                <div className='mb-3'>
                    <input type="text"  className='form-control' placeholder='Username'/>
                </div>
                <div className='mb-3'>
                    <input type="text" onChange={e=>setUserProfile} value={useProfile.github}  className='form-control' placeholder='Github Profile Link'/>
                </div>
                <div className='mb-3'>
                    <input type="text"  className='form-control' placeholder='LinkedIn Profile Link'/>
                </div>
            </div>
        </div>
    </>
  )
}

export default Profile