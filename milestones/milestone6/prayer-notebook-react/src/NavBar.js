import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavBar = ({ onLogout, user }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();
        navigate('/login');
    };

    return (
        <nav className='navbar navbar-expand-lg navbar-dark bg-primary'>
            <div className='container-fluid'>
                <span className='navbar-brand'>🙏 Prayer Notebook</span>
                {user && <span className='navbar-text text-white ms-2' style={{ fontSize: '14px' }}>Welcome, {user.name}</span>}
                <button className='navbar-toggler' type='button' data-bs-toggle='collapse' data-bs-target='#navbarNav'>
                    <span className='navbar-toggler-icon'></span>
                </button>
                <div className='collapse navbar-collapse' id='navbarNav'>
                    <ul className='navbar-nav me-auto'>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/prayers'>All Prayers</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/prayers/new'>Add Prayer</Link>
                        </li>
                        <li className='nav-item'>
                            <Link className='nav-link' to='/answered'>Answered Prayers</Link>
                        </li>
                        <li className='nav-item'>
                                <Link className='nav-link' to='/categories'>Categories</Link>
                        </li>
                        <li className='nav-item'>
                                <Link className='nav-link' to='/search'>Search</Link>
                        </li>
                    </ul>
                    <ul className='navbar-nav ms-auto'>
                        <li className='nav-item'>
                            <button className='btn btn-outline-light btn-sm mt-1' onClick={handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;