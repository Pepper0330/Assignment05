import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignUp.css';
import logo from '../images/logo.jpg';

function RegForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        
        // Clear previous messages
        setMessage('');

        // Validation Regex
        const usernameRegex = /^[A-Za-z][A-Za-z0-9_-]{2,19}$/;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-_=+[\]{}|;:'",.<>?/`~])[^\s]{8,}$/;
        const emailRegex = /^\S+@\S+\.(com|net|io)$/;

        // Validation Errors Array
        const errors = [];

        // Validate Username
        if (!usernameRegex.test(username)) {
            errors.push('Invalid username. Must start with a letter, 3-20 characters, can include numbers, underscore, and hyphen.');
        }

        // Validate Password
        if (!passwordRegex.test(password)) {
            errors.push('Invalid password. Must be at least 8 characters, include uppercase, lowercase, number, special character(s), and no spaces.');
        }

        // Confirm Password Match
        if (password !== confirmPassword) {
            errors.push('Passwords do not match');
        }

        // Validate Email
        if (!emailRegex.test(email)) {
            errors.push('Invalid email. Must be a valid .com, .net, or .io email.');
        }

        // Handle Errors or Successful Signup
        if (errors.length > 0) {
            setMessage(errors.map(err => `• ${err}`).join('<br>'));
        } else {
            try {
                const response = await fetch('http://127.0.0.1:5000/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: username,
                        password: password,
                        email: email
                    }),
                });
                
                const data = await response.json();
                
                if (data.success) {
                    setMessage('Signup successful! Redirecting to login...');
                    setTimeout(() => navigate('/login'), 2000);
                } else {
                    setMessage(`• ${data.message}`);
                }
            } catch (error) {
                setMessage('• Server error. Please try again later.');
            }
        }
    };

    return (
        <div className="login-container">
            <header>
                <img src={logo} alt="LMS Logo" style={{width: '100px', height: '100px'}} />
                <h1>LMS - Learning Management System</h1>
            </header>
            
            <nav>
                <a href="/">Homepage</a>
            </nav>
            
            <main>
                <h2>Sign Up</h2>
                <form onSubmit={handleSignup} className="login-form">
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
                    
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        className="login-input"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required 
                    />
                    
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="email" 
                        id="email" 
                        className="login-input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required 
                    />
                </form>
                
                <bottomform>
                    <button 
                        type="submit" 
                        className="main-button"
                        onClick={handleSignup}
                    >
                        Sign Up
                    </button>

                    {message && (
                        <div 
                            style={{
                                margin: '20px', 
                                padding: '10px', 
                                border: '2px solid #333', 
                                background: '#f9f9f9',
                                color: message.includes('successful') ? 'black' : 'black'
                            }}
                            dangerouslySetInnerHTML={{ __html: message }}
                        />
                    )}
                    
                    <br />
                    <a href="/login" classname="LoginHere">Already have an account? Login here</a>
                </bottomform>
            </main>
            
            <footer>
                <p>&copy; 2025 LMS. All rights reserved.</p>
            </footer>
        </div>
    );
}

export default RegForm;
