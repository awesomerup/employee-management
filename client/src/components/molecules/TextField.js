import React from "react";
import { ErrorMessage, useField } from "formik";

const TextField = ({ label, ...props }) => {
    const [field, meta] = useField(props);
    return (
        <div>
            <label htmlFor={field.name} className="form-label">
                {label}
            </label>
            <input className={`form-control ${meta.touched && meta.error && "is-invalid"}`} {...field} {...props} autoComplete="off" />
            <ErrorMessage component="div" name={field.name} style={{ color: "red" }} />
        </div>
    );
};

export default TextField;
