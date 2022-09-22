import React, { useState } from 'react';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import TextField from "../../src/components/molecules/TextField";

const AddEmployee = () => {
    const Navigate = useNavigate();
    let fullname, mobile, email, password, empid;

    const [designation, setDesignation] = useState('')

    const validate = Yup.object({
        fullname: Yup.string().min(4, "must be greater than 4 characters").required("This field is required"),
        empid: Yup.string().min(8, "must be of 8 characters").max(8, "must be of 8 characters").required("This field is required"),
        mobile: Yup.string().min(10, "must be of 10 characters").max(10, "must be of 10 characters").required("This field is required"),
        email: Yup.string().email("This is not a valid email").required("This field is required"),
        pass: Yup.string().min(6, "must be greater than 6 characters").max(10, "must be less than 10 characters").required("This field is required"),
    })
    return (
        <Formik
            initialValues={{
                fullname: "",
                empid: "",
                mobile: "",
                email: "",
                pass: "",

            }}

            validationSchema={validate}
            onSubmit={(values) => {
                fetch('/api/register', {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        fullname: values.fullname,
                        email: values.email,
                        password: values.pass,
                        empid: values.empid,
                        mobile: values.mobile
                    })
                }).then(res => res.json())
                    .then(data => {
                        if (data.error) {
                            alert(data.error)
                        } else {
                            alert('Added succesfully')
                            Navigate('/employeelist')
                        }
                    }).catch(err => console.log(err))
            }}
        >
            <div className='container' style={{ width: "30%" }}>
                <h1 className="text-center mb-5 mt-5" style={{ color: "blue" }}>Add Employee</h1>
                <Form>
                    <div className="mb-3">
                        <TextField label="Name" name="fullname" type="text" />
                    </div>

                    <div className="mb-3">
                        <TextField label="Employee id" name="empid" type="text" />
                    </div>
                    <div className="mb-3">
                        <TextField label="Email Id" name="email" type="email" />
                    </div>
                    <div className="mb-3">
                        <TextField label="Mobile Number" name="mobile" type="number" />
                    </div>
                    <div className="mb-3">
                        <TextField label="Password" name="pass" type="password" />
                    </div>
                    <div className='row'>
                        <div className="col text-center">
                            <Button variant='contained' onClick={() => {
                                Navigate(-1)
                            }}>Back</Button>
                        </div>
                        <div className="col text-center">
                            <Button variant='contained' type='submit'>Submit</Button>
                        </div>
                    </div>
                </Form>
            </div>
        </Formik>
    );
}

export default AddEmployee;
