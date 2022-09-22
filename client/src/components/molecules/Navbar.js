import React from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { setUser } from '../../redux-store/features/userSlice';

const Navbar = () => {
    const emp = useSelector(state => state.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: "#16213E" }}>
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">Employee HUB</NavLink>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            {emp === null ?
                                (
                                    <>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/">HOME</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/register">REGISTER</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink className="nav-link" to="/login">LOGIN</NavLink>
                                        </li>
                                    </>
                                )
                                :
                                (
                                    <>
                                        {emp.email === 'rup1999esh@gmail.com' ?
                                            <>
                                                <li className="nav-item me-4">
                                                    <NavLink className="nav-link" to={`/employee/${emp._id}/profile`} style={({ isActive }) => {
                                                        return {
                                                            color: isActive ? 'tomato' : 'white'
                                                        };
                                                    }}>PROFILE</NavLink>
                                                </li>
                                                <li className="nav-item me-4">
                                                    <NavLink className="nav-link" to='/employeelist' style={({ isActive }) => {
                                                        return {
                                                            color: isActive ? 'tomato' : 'white'
                                                        };
                                                    }}>EMPLOYEE LIST</NavLink>
                                                </li>

                                                <li className="nav-item dropdown me-4">
                                                    <a className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        MENU
                                                    </a>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <NavLink className="dropdown-item" to={`/employee/${emp._id}/finance`}>FINANCE</NavLink>
                                                        </li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li>
                                                            <NavLink className='dropdown-item' to={`/employee/${emp._id}/genie`}>RAISE GENIE</NavLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="nav-item me-4">
                                                    <button className='btn btn-danger' onClick={() => {
                                                        localStorage.clear();
                                                        dispatch(setUser(null))
                                                        navigate('/login')
                                                    }}>LOGOUT</button>
                                                </li>
                                            </>
                                            :
                                            <>
                                                <li className="nav-item me-4">
                                                    <NavLink className="nav-link" to={`/employee/${emp._id}/profile`} style={({ isActive }) => {
                                                        return {
                                                            color: isActive ? 'tomato' : 'white'
                                                        };
                                                    }}>PROFILE</NavLink>
                                                </li>

                                                <li className="nav-item dropdown me-4">
                                                    <a className="nav-link dropdown-toggle" href='/' role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                        MENU
                                                    </a>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <NavLink className="dropdown-item" to={`/employee/${emp._id}/finance`}>FINANCE</NavLink>
                                                        </li>
                                                        <li><hr className="dropdown-divider" /></li>
                                                        <li>
                                                            <NavLink className='dropdown-item' to={`/employee/${emp._id}/genie`}>RAISE GENIE</NavLink>
                                                        </li>
                                                    </ul>
                                                </li>
                                                <li className="nav-item me-4">
                                                    <button className='btn btn-danger' onClick={() => {
                                                        localStorage.clear();
                                                        dispatch(setUser(null))
                                                        navigate('/login')
                                                    }}>LOGOUT</button>
                                                </li>
                                            </>
                                        }

                                    </>
                                )
                            }
                        </ul>
                    </div>
                </div>
            </nav>
            <Outlet />
        </div>
    );
}

export default Navbar;

