import React from 'react';
import { useNavigate } from 'react-router-dom'

const EmpFinacial = () => {
    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault();

    }
    return (
        <div className='container' style={{ width: "37rem" }}>
            <h2 className='text-center mb-3 mt-5' >FINANCIAL INFORMATION</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Select Bank</label>
                    <select className="form-select" aria-label="Default select example">
                        <option defaultValue='Select your Bank'>Select your Bank</option>
                        <option value="1">SBI</option>
                        <option value="2">ICICI</option>
                        <option value="3">BANK OF BARODA</option>
                        <option value="3">AXIS BANK</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">IFSC CODE</label>
                    <input type="text" className="form-control" />
                </div>
                <div className="mb-3">
                    <label className="form-label">ACCOUNT NUMBER</label>
                    <input type="number" className="form-control" />
                </div>
                <div className='text-center'>
                    <button type='submit' className='btn btn-success'>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default EmpFinacial;
