import React from 'react'

function Profile() {
  return (
    <>
        <div className='card shadow p-5'>
            <div className="d-flex justify-content-between">
                <h2>My Profile</h2>
                <button className='btn btn-outline-primary'><i className='fa-solid fa-check'></i></button>
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
                    <input type="text"  className='form-control' placeholder='Github Profile Link'/>
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