




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaInstagram, FaFacebook, FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await signIn(email, password);
            if (error) {
                setError(error.message);
                return;
            }
            navigate('/');
        } catch (error) {
            setError('An unexpected error occurred. Please try again.');
            console.error('Login error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleForgotPassword = (e) => {
        e.preventDefault();
        // For demo purposes, just show an alert
        alert('Forgot password feature would be implemented here. In a real app, this would send a password reset email.');
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#fafafa'
        }}>
            <div style={{
                maxWidth: '350px',
                width: '100%',
                padding: '20px',
                textAlign: 'center'
            }}>
                {/* Login Card */}
                <div style={{
                    border: '1px solid #dbdbdb',
                    backgroundColor: 'white',
                    padding: '40px 20px',
                    borderRadius: '1px',
                    marginBottom: '10px'
                }}>
                    <FaInstagram style={{ fontSize: '3rem', marginBottom: '20px', color: '#262626' }} />

                    {error && (
                        <div style={{
                            backgroundColor: '#fee',
                            border: '1px solid #fcc',
                            color: '#c33',
                            padding: '10px',
                            borderRadius: '4px',
                            fontSize: '14px',
                            marginBottom: '15px'
                        }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{
                                fontSize: '12px',
                                padding: '10px',
                                backgroundColor: '#fafafa',
                                border: '1px solid #dbdbdb'
                            }}
                        />

                        {/* Password Input with Eye Toggle */}
                        <div style={{ position: 'relative', marginBottom: '15px' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className="form-control"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                style={{
                                    fontSize: '12px',
                                    padding: '10px 40px 10px 10px',
                                    backgroundColor: '#fafafa',
                                    border: '1px solid #dbdbdb',
                                    width: '100%'
                                }}
                            />
                            <button
                                type="button"
                                onClick={togglePasswordVisibility}
                                style={{
                                    position: 'absolute',
                                    right: '10px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    color: '#8e8e8e',
                                    cursor: 'pointer',
                                    padding: '5px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {showPassword ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                            </button>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-100"
                            style={{
                                backgroundColor: loading ? '#ccc' : '#0095f6',
                                border: 'none',
                                fontSize: '14px',
                                fontWeight: '600',
                                padding: '8px',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Logging in...' : 'Log In'}
                        </button>
                    </form>

                    <div style={{ margin: '15px 0', position: 'relative' }}>
                        <div style={{
                            height: '1px',
                            backgroundColor: '#dbdbdb',
                            position: 'relative'
                        }}>
                            <span style={{
                                position: 'absolute',
                                top: '-8px',
                                left: '50%',
                                transform: 'translateX(-50%)',
                                backgroundColor: 'white',
                                padding: '0 15px',
                                color: '#8e8e8e',
                                fontSize: '13px',
                                fontWeight: '600'
                            }}>
                                OR
                            </span>
                        </div>
                    </div>

                    <button className="btn btn-link p-0" style={{ color: '#385185', textDecoration: 'none' }}>
                        <FaFacebook style={{ marginRight: '8px' }} />
                        Log in with Facebook
                    </button>

                    <button
                        onClick={handleForgotPassword}
                        style={{
                            fontSize: '12px',
                            color: '#00376b',
                            display: 'block',
                            marginTop: '15px',
                            textDecoration: 'none',
                            border: 'none',
                            background: 'none',
                            cursor: 'pointer',
                            width: '100%'
                        }}
                    >
                        Forgot password?
                    </button>
                </div>

                {/* Sign up card */}
                <div style={{
                    border: '1px solid #dbdbdb',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '1px'
                }}>
                    <span style={{ fontSize: '14px', color: '#262626' }}>
                        Don't have an account?{' '}
                        <Link to="/signup" style={{ color: '#0095f6', textDecoration: 'none', fontWeight: '600' }}>
                            Sign up
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}


