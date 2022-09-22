import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux-store/features/userSlice';
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../molecules/TextField";

const Login = () => {
    let email, password;
    const Navigate = useNavigate()
    const dispatch = useDispatch();

    const validate = Yup.object({
        email: Yup.string().email("This is not a valid email").required("This field is required"),
        pass: Yup.string().min(6, "must be greater than 6 characters").max(10, "must be less than 10 characters").required("This field is required"),
    })
    return (
        <Formik

            initialValues={{
                email: '',
                pass: ''
            }}

            validationSchema={validate}

            onSubmit={values => {
                fetch('/api/login', {
                    method: 'post',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: values.email,
                        password: values.pass
                    })
                }).then(res => res.json())
                    .then(data => {
                        if (data.error) {
                            alert(data.error)
                        } else {
                            localStorage.setItem('jwt', data.token)
                            localStorage.setItem('emp', JSON.stringify(data.employee))
                            dispatch(setUser(data.employee))
                            Navigate(`/employee/${data.employee._id}/profile`)
                        }
                    }).catch(err => console.log(err))
            }}
        >
            <div className='container' style={{ width: "30rem" }}>
                <h2 className='text-center mb-3 mt-5' >LOGIN</h2>
                <Form>
                    <div className="mb-3">
                        <TextField label='Email id' type='email' name='email' />
                    </div>
                    <div className="mb-3">
                        <TextField label='Password' type='password' name='pass' />
                    </div>
                    <div className='text-center'>
                        <Button variant='contained' color='info' type='submit'>login</Button>
                    </div>
                </Form>
            </div>
        </Formik>
    );
}

export default Login;
