import { Avatar, Stack } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { setUser } from '../redux-store/features/userSlice';

const EmpProfile = () => {
    const [pic, setPic] = useState("")
    const [url, setUrl] = useState("")
    const params = useParams()
    const dispatch = useDispatch()
    const emp = useSelector(state => state.user)

    useEffect(() => {
        fetch(`/api/employee/${params.id}`, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(data => dispatch(setUser(data.employee)))
            .catch(err => console.log(err))
    }, [])

    useEffect(() => {
        if (url) {
            fetch(`/api/employee/${emp._id}/setphoto`, {
                method: 'put',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    id: emp._id,
                    photo: url
                })
            }).then(res => res.json())
                .then(result => dispatch(setUser(result)))
                .catch(err => console.log(err))
        }
    }, [url])

    const postData = () => {
        const data = new FormData();
        data.append('file', pic);
        data.append('upload_preset', 'insta_clone');
        data.append('cloud_name', 'dyuwui1999');
        fetch('https://api.cloudinary.com/v1_1/dyuwui1999/image/upload', {
            method: "post",
            body: data
        }).then(res => res.json())
            .then(data => setUrl(data.url))
            .catch(err => console.log(err));
    }

    const handleMobile = (e) => {
        e.preventDefault();
        const mobileForm = document.getElementById('mobile')
        const mobile = e.target[0].value
        fetch(`/api/employee/${emp._id}/setmobile`, {
            method: 'put',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                id: emp._id,
                mobile: mobile
            })
        }).then(res => res.json())
            .then(result => dispatch(setUser(result)))
            .catch(err => console.log(err))

        mobileForm.reset()
    }

    const handlePhoto = (e) => {
        e.preventDefault()
        const photoForm = document.getElementById('photo')
        photoForm.reset()
    }
    return (
        <>
            {emp ?
                <div style={{ marginTop: '5rem' }}>
                    <div className='text-center mb-4'>
                        <Avatar src={emp.photo} alt='profile' sx={{ width: 150, height: 150 }} style={{ margin: '0 auto' }} />
                        <h5>{`${emp.fullname}`} <EditIcon className='edit' color='primary' fontSize='small' onClick={() => {
                            const popup = document.querySelector('.profile-pic-form')
                            popup.classList.remove('hide')
                        }} /></h5>
                    </div>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th scope="col">Employee Id</th>
                                <th scope="col">Email</th>
                                <th scope="col">Mobile No.</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr >
                                <td>{emp.empid}</td>
                                <td>{emp.email}</td>
                                <td>{emp.mobile} <EditIcon className='edit' color='primary' fontSize='small' onClick={() => {
                                    const popup = document.querySelector('.profile-mobile-form')
                                    popup.classList.remove('hide')
                                }} /></td>
                            </tr>
                        </tbody>
                    </table>
                    <div className='profile-mobile-form hide'>
                        <div className='form-container'>
                            <section>
                                <div className='close-icon'>
                                    <CancelIcon onClick={() => {
                                        const popup = document.querySelector('.profile-mobile-form')
                                        popup.classList.add('hide')
                                    }} />
                                </div>
                                <h6 className='text-center mb-3'>UPDATE MOBILE NUMBER</h6>
                                <form onSubmit={handleMobile} id='mobile'>
                                    <div className='mb-3'>
                                        <input className='form-control' type="number" placeholder='Enter your mobile no.' />
                                    </div>
                                    <div className='mb-3 text-center'>
                                        <button className='btn btn-info' type='submit' onClick={() => {
                                            const popup = document.querySelector('.profile-mobile-form')
                                            popup.classList.add('hide')
                                        }}>Submit</button>
                                    </div>
                                </form>

                            </section>
                        </div>
                    </div>
                    <div className='profile-pic-form hide'>
                        <div className='form-container'>
                            <section>
                                <div className='close-icon'>
                                    <CancelIcon onClick={() => {
                                        const popup = document.querySelector('.profile-pic-form')
                                        popup.classList.add('hide')
                                    }} />
                                </div>
                                <h6 className='text-center mb-3'>UPDATE PROFILE PHOTO</h6>
                                <form onSubmit={handlePhoto} id='photo'>
                                    <div className='mb-3'>
                                        <input className='form-control' type="file" onChange={e => setPic(e.target.files[0])} />
                                    </div>
                                    <div className='mb-3 text-center'>
                                        <button className='btn btn-info' type='submit' onClick={() => {
                                            const popup = document.querySelector('.profile-pic-form')
                                            popup.classList.add('hide')
                                            postData()
                                        }}>Submit</button>
                                    </div>
                                </form>

                            </section>
                        </div>
                    </div>
                </div> : <h1>Loading.....</h1>}

        </>
    )
}

export default EmpProfile