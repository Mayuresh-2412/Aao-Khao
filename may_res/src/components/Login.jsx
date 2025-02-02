// Login.js
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, X } from 'lucide-react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        try {
            const response = await axios.post('http://localhost:4598/api/logindet', {
                email: email,
                password: password
            });

            const userData = {
                email: email,
                authMethod: 'email'
            };
            localStorage.setItem('user', JSON.stringify(userData));
            
            alert('Login Successful! 😁');
            navigate('/');
        } catch (error) {
            setError(error.response?.data?.message || 'Login failed. Please try again.');
        }
    };

    const handleGoogleSignIn = useGoogleLogin({
        onSuccess: async (response) => {
            try {
                const userInfo = await axios.get(
                    'https://www.googleapis.com/oauth2/v3/userinfo',
                    {
                        headers: { Authorization: `Bearer ${response.access_token}` },
                    }
                );

                const userData = {
                    ...userInfo.data,
                    authMethod: 'google'
                };
                localStorage.setItem('user', JSON.stringify(userData));
                navigate('/');
            } catch (error) {
                console.error('Error fetching user info', error);
                setError('Google Sign-in Failed');
            }
        },
        onError: () => {
            setError('Google Sign-in Failed');
        },
    });

    return (
        <div className="login-container">
            <div className="login-box">
                <h1 className="login-title">Welcome Back</h1>
                <p className="login-subtitle">Please enter your details</p>

                {error && (
                    <div className="error-message">
                        <X size={20} />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="login-form">
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <div className="input-group">
                            <Mail size={20} />
                            <input
                                type="email"
                                id="email"
                                placeholder="Enter your email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="input-group">
                            <Lock size={20} />
                            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>

                    <div className="form-options">
                        <label className="remember-me">
                            <input type="checkbox" />
                            <span>Remember me</span>
                        </label>
                        <Link to="/forgot-password" className="forgot-password">
                            Forgot password?
                        </Link>
                    </div>

                    <button type="submit" className="login-button">
                        Sign In
                    </button>

                    <div className="divider">
                        <span>OR</span>
                    </div>

                    <button type="button" className="google-button" onClick={() => handleGoogleSignIn()}>
                        <img
                            src="https://www.google.com/images/branding/googleg/1x/googleg_standard_color_128dp.png"
                            alt="Google"
                            className="google-icon"
                        />
                        Sign in with Google
                    </button>
                </form>

                <p className="signup-prompt">
                    Don't have an account?{' '}
                    <Link to="/signup" className="signup-link">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
