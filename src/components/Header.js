import React, { use } from 'react';
import logo from '../images/logo.jpg';
import "./Header.css";
import linkTitle  from '../App';
import { useNavigate } from 'react-router-dom';

function Header() {
    let navigate = useNavigate();

    const handleNavigate = (name) => {
        navigate(name);
    };

    return (
        <div>
            <header>
                <img src={logo} alt="LMS Logo" style={{width: 100, height: 100}} />
                <h1>LMS - Learning Management System</h1>
            </header>
            <nav>
                <button onClick={() => handleNavigate("/")}>Home</button>
                <button onClick={() => handleNavigate("/courses")}>Course Page</button>
                <button onClick={() => handleNavigate("/login")}>Login</button>
            </nav>
        </div>
    );
}

export default Header;