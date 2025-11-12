



import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaHome, FaSearch, FaPlusSquare, FaVideo, FaUser } from 'react-icons/fa';

export default function BottomNav() {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) return null;

    const isActive = (path) => location.pathname === path;

    return (
        <nav style={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderTop: '1px solid #dbdbdb',
            padding: '12px 0',
            zIndex: 1000,
            backdropFilter: 'blur(10px)'
        }}>
            <div className="container">
                <div className="d-flex justify-content-around align-items-center">
                    <Link
                        to="/"
                        style={{
                            color: isActive('/') ? '#262626' : '#8e8e8e',
                            textDecoration: 'none',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            backgroundColor: isActive('/') ? '#f8f9fa' : 'transparent',
                            transition: 'all 0.3s ease'
                        }}
                        aria-label="Home"
                    >
                        <FaHome size={22} />
                    </Link>
                    <Link
                        to="/search"
                        style={{
                            color: isActive('/search') ? '#262626' : '#8e8e8e',
                            textDecoration: 'none',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            backgroundColor: isActive('/search') ? '#f8f9fa' : 'transparent',
                            transition: 'all 0.3s ease'
                        }}
                        aria-label="Search"
                    >
                        <FaSearch size={22} />
                    </Link>
                    <Link
                        to="/create-post"
                        style={{
                            color: isActive('/create-post') ? '#262626' : '#8e8e8e',
                            textDecoration: 'none',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            backgroundColor: isActive('/create-post') ? '#f8f9fa' : 'transparent',
                            transition: 'all 0.3s ease'
                        }}
                        aria-label="Create Post"
                    >
                        <FaPlusSquare size={22} />
                    </Link>
                    <Link
                        to="/reels"
                        style={{
                            color: isActive('/reels') ? '#262626' : '#8e8e8e',
                            textDecoration: 'none',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            backgroundColor: isActive('/reels') ? '#f8f9fa' : 'transparent',
                            transition: 'all 0.3s ease'
                        }}
                        aria-label="Reels"
                    >
                        <FaVideo size={22} />
                    </Link>
                    <Link
                        to="/profile"
                        style={{
                            color: isActive('/profile') ? '#262626' : '#8e8e8e',
                            textDecoration: 'none',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            backgroundColor: isActive('/profile') ? '#f8f9fa' : 'transparent',
                            transition: 'all 0.3s ease'
                        }}
                        aria-label="Profile"
                    >
                        <div style={{
                            width: '24px',
                            height: '24px',
                            borderRadius: '50%',
                            background: 'linear-gradient(45deg, #ffd200, #f7971e, #e44d26, #4facfe)',
                            padding: '1px',
                            cursor: 'pointer'
                        }}>
                            <img
                                src={user.avatar_url}
                                alt={`${user.username}'s profile`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '1.5px solid white'
                                }}
                            />
                        </div>
                    </Link>
                </div>
            </div>
        </nav>
    );
}