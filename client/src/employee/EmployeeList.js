import React, { useEffect } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CancelIcon from '@mui/icons-material/Cancel';
import { setEmp, deleteEmp } from '../redux-store/features/deleteSlice';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

const EmployeeList = () => {
    const fullname = document.getElementById('fullname')
    const email = document.getElementById('email')
    const empid = document.getElementById('empid')
    const mobile = document.getElementById('mobile')

    const dispatch = useDispatch();

    const handleUpdate = (id) => {
        fetch(`/api/employee/${id}/update`, {
            method: "put",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            },
            body: JSON.stringify({
                fullname: fullname.value,
                email: fullname.value,
                empid: fullname.value,
                mobile: fullname.value,
            })
        }).then(res => res.json())
            .then(result => console.log(result))
            .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        handleUpdate()
    }

    useEffect(() => {
        fetch('/api/allemployee', {
            headers: {
                'Authorization': "Bearer " + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(data => dispatch(setEmp(data)))
    }, [])

    const employee = useSelector(state => state.update)

    const findEmp = (id) => {
        return employee.find(item => item._id === id)
    }

    const handleDelete = (id) => {
        fetch(`/api/employee/${id}/delete`, {
            method: 'delete',
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('jwt')
            }
        }).then(res => res.json())
            .then(data => dispatch(deleteEmp(data._id)))
    }
    return (
        <div className='mt-5'>
            <div className='emp-list'>
                <Button variant='contained' endIcon={<PersonAddIcon />}><Link to='/admin/addemployee' style={{ color: 'white', textDecoration: 'none' }}>Add New Employee</Link></Button>
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th scope="col">Employee Id</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employee.map(item => {
                            return (
                                <tr key={item._id}>
                                    <td>{item.empid}</td>
                                    <td>{item.fullname}</td>
                                    <td>{item.email}</td>
                                    <td>{item.mobile}</td>
                                    <td><i className="fa-solid fa-pen-to-square me-4" style={{ cursor: "pointer" }} onClick={() => {
                                        const popupForm = document.querySelector('.popup-body');
                                        popupForm.classList.remove('hide')
                                        findEmp(item._id)
                                    }}></i>
                                        <DeleteIcon style={{ cursor: "pointer" }} color='error' onClick={() => handleDelete(item._id)} /></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            <div className='popup-body hide'>
                <div className='popup'>
                    <div className='popup-form'>
                        <div className='close-icon'>
                            <CancelIcon onClick={() => {
                                const popupForm = document.querySelector('.popup-body')
                                popupForm.classList.add('hide')
                            }} />
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-3'>
                                <label className='form-label'>Name</label>
                                <input className='form-control' type="text" name='fullname' id='fullname' />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Email Id</label>
                                <input className='form-control' type="text" name='email' id='email' />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Employee Id</label>
                                <input className='form-control' type="text" name='empid' id='empid' />
                            </div>
                            <div className='mb-3'>
                                <label className='form-label'>Mobile number</label>
                                <input className='form-control' type="number" name='mobile' id='mobile' />
                            </div>
                            <div className="text-center">
                                <Button variant='contained' type='submit'>Submit</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeeList