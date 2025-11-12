import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaInstagram, FaFacebook } from 'react-icons/fa';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await signIn(email, password);
            if (error) throw error;
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
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
                        <div className="alert alert-danger" style={{ fontSize: '14px' }}>
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
                        <input
                            type="password"
                            className="form-control mb-3"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                fontSize: '12px',
                                padding: '10px',
                                backgroundColor: '#fafafa',
                                border: '1px solid #dbdbdb'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-100"
                            style={{
                                backgroundColor: '#0095f6',
                                border: 'none',
                                fontSize: '14px',
                                fontWeight: '600',
                                padding: '8px'
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

                    <a href="#" style={{
                        fontSize: '12px',
                        color: '#00376b',
                        display: 'block',
                        marginTop: '15px',
                        textDecoration: 'none'
                    }}>
                        Forgot password?
                    </a>
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