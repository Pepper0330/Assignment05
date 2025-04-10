import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import AuthContext from './AuthContext';
import DisplayStatus from './DisplayStatus';
import Courses from './CoursePage.js';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setAuthStatus } = useContext(AuthContext);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(data => setUsers(data));
    }, []);

    const handleLogin = async (e) => {
        e.preventDefault();
        
        if (username === '' || password === '') {
            setMessage('Username and password cannot be empty.');
            return;
        }
    
        if (password.length < 8) {
            setMessage('Password must be at least 8 characters.');
            return;
        }
    
        try {
            const {success, message} = await fetch("http://127.0.0.1:5000/login", {
                method: "POST",
                headers: {
                    'Content-type':'application/json'
                },
                body: JSON.stringify({'username':username, 'password':password}),
            });

            setMessage(message);
    
            if (success) {
                setAuthStatus({ username, isAuthenticated: true });
                setTimeout(() => navigate('/homepage'), 2000);

            }
        } catch (error) {
            setMessage('Failed to fetch user data!');
        }
    };
    

    return (
        <div className="login-container">
            <main>
                <h2>LMS Login</h2>
                <form onSubmit={handleLogin} className="login-form">
                    <label htmlFor="username">Username:</label>
                    <input 
                        type="text" 
                        id="username" 
                        className="login-input"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required 
                    />

                    <label htmlFor="password">Password:</label>
                    <input 
                        type="password" 
                        id="password" 
                        className="login-input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required 
                    />
                </form>

                <section>
                    <button type="button" className="main-button" onClick={handleLogin}>Login</button> {/* Updated to handle login manually */}

                    <DisplayStatus type={message.includes('successful') ? "success" : "error"} message={message} />
                    <a href="#" className="forgot-password">Forgot Password?</a>
                    <br></br>
                    <a href="/signup">Don't have an account? Sign Up</a>
                    <br />
                </section>
            </main>
        </div>
    );
}

export default Login;
