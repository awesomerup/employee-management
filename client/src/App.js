import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './redux-store/features/userSlice';

import Navbar from './components/molecules/Navbar';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import Register from './components/pages/Register';
import Home from './components/pages/Home';
import Login from './components/pages/Login';
import NotFound404 from './components/pages/NotFound404';
import EmpProfile from './employee/EmpProfile';
import EmpFinacial from './employee/EmpFinacial';
import EmployeeList from './employee/EmployeeList';
import AddEmployee from './employee/AddEmployee';

const Routing = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const emp = JSON.parse(localStorage.getItem('emp'))

  useEffect(() => {
    if (emp) {
      dispatch(setUser(emp))
    } else {
      navigate('/')
    }
  }, [])
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/employee/:id/profile' element={<EmpProfile />} />
      <Route path='/employee/:id/finance' element={<EmpFinacial />} />
      <Route path='/employeelist' element={<EmployeeList />} />
      <Route path='/admin/addemployee' element={<AddEmployee />} />
      <Route path='*' element={<NotFound404 />} />
    </Routes>
  )
}

const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Routing />
    </BrowserRouter>
  );
}

export default App;
