import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';
import logo from '../images/logo.jpg';
import AuthContext from './AuthContext';
import DisplayStatus from './DisplayStatus';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
    const { setAuthStatus } = useContext(AuthContext);

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
            const response = await fetch('https://jsonplaceholder.typicode.com/users');
            const users = await response.json();
            const validUser = users.find(user => 
                user.username === username && user.email === password
            );

            if (validUser) {
                setMessage('Login successful! Redirecting...');
                setAuthStatus({ username, isAuthenticated: true });
                setTimeout(() => navigate('/course-view'), 2000);
            } else {
                setMessage('Invalid username or password!');
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
                <button type="submit" className="main-button">Login</button>

                <DisplayStatus type={message.includes('successful') ? "success" : "error"} message={message} />
                <a href="#" className="forgot-password">Forgot Password?</a>
                <br />
                <a href="/signup">Don't have an account? Sign Up</a>
                </section>
            </main>

        </div>
    );
}

export default Login;
