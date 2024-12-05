import React, { useState } from 'react';
import axios from 'axios';


const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', { username, password });
            onLoginSuccess(response.data.token); // Handle success (store token)
        } catch (error) {
            setError(error.response ? error.response.data : 'An error occurred');
        }
    };
     return (
        <div className="login-container">
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Username"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Password"
                        required
                    />
                    {error && <p className="error">{error}</p>}
                    <button type="submit">Login</button>
                </form>
                <div className="link">
                    <p>Don't have an account? <a href="/register">Register here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Login;
