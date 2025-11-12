import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaInstagram } from 'react-icons/fa';

export default function Signup() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        fullName: '',
        username: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const { signUp } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { error } = await signUp(formData.email, formData.password, {
                username: formData.username,
                fullName: formData.fullName
            });
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
                <div style={{
                    border: '1px solid #dbdbdb',
                    backgroundColor: 'white',
                    padding: '40px 20px',
                    borderRadius: '1px',
                    marginBottom: '10px'
                }}>
                    <FaInstagram style={{ fontSize: '3rem', marginBottom: '20px', color: '#262626' }} />

                    <p style={{ color: '#8e8e8e', fontSize: '17px', fontWeight: '600', marginBottom: '20px' }}>
                        Sign up to see photos and videos from your friends.
                    </p>

                    {error && (
                        <div className="alert alert-danger" style={{ fontSize: '14px' }}>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            name="email"
                            className="form-control mb-2"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            style={{ fontSize: '12px', padding: '10px', backgroundColor: '#fafafa', border: '1px solid #dbdbdb' }}
                        />
                        <input
                            type="text"
                            name="fullName"
                            className="form-control mb-2"
                            placeholder="Full Name"
                            value={formData.fullName}
                            onChange={handleChange}
                            required
                            style={{ fontSize: '12px', padding: '10px', backgroundColor: '#fafafa', border: '1px solid #dbdbdb' }}
                        />
                        <input
                            type="text"
                            name="username"
                            className="form-control mb-2"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                            required
                            style={{ fontSize: '12px', padding: '10px', backgroundColor: '#fafafa', border: '1px solid #dbdbdb' }}
                        />
                        <input
                            type="password"
                            name="password"
                            className="form-control mb-3"
                            placeholder="Password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                            style={{ fontSize: '12px', padding: '10px', backgroundColor: '#fafafa', border: '1px solid #dbdbdb' }}
                        />
                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-100"
                            style={{ backgroundColor: '#0095f6', border: 'none', fontSize: '14px', fontWeight: '600', padding: '8px' }}
                        >
                            {loading ? 'Signing up...' : 'Sign Up'}
                        </button>
                    </form>
                </div>

                <div style={{
                    border: '1px solid #dbdbdb',
                    backgroundColor: 'white',
                    padding: '20px',
                    borderRadius: '1px'
                }}>
                    <span style={{ fontSize: '14px', color: '#262626' }}>
                        Have an account?{' '}
                        <Link to="/login" style={{ color: '#0095f6', textDecoration: 'none', fontWeight: '600' }}>
                            Log in
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}