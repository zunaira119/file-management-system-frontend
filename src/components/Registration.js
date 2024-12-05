import React, { useState } from 'react';
import axios from 'axios';

const Registration = ({ onRegisterSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('/register', { email, username, password });
            onRegisterSuccess(response.data.token); // Handle success (store token or redirect)
        } catch (error) {
            setError(error.response ? error.response.data.message : 'An error occurred');
        }
    };

    return (
        <div className="register-container">
            <div className="form-container">
                <h2>Register</h2>
                <form onSubmit={handleRegister}>
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
                    <button type="submit">Register</button>
                </form>
                <div className="link">
                    <p>Already have an account? <a href="/login">Login here</a></p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
