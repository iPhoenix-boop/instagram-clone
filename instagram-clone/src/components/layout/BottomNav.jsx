

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FaHome, FaSearch, FaPlusSquare, FaVideo, FaUser } from 'react-icons/fa';

export default function BottomNav() {
    const { user } = useAuth();
    const location = useLocation();

    if (!user) return null;

    const isActive = (path) => location.pathname === path;

    const styles = {
        nav: {
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderTop: '1px solid #dbdbdb',
            padding: '12px 0',
            zIndex: 1000
        },
        navItem: {
            color: '#8e8e8e',
            textDecoration: 'none',
            padding: '8px 16px',
            borderRadius: '8px',
            backgroundColor: 'transparent',
            transition: 'all 0.3s ease'
        },
        activeNavItem: {
            color: '#262626',
            backgroundColor: '#f8f9fa'
        },
        userAvatar: {
            width: '24px',
            height: '24px',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #ffd200, #f7971e, #e44d26, #4facfe)',
            padding: '1px',
            cursor: 'pointer'
        },
        avatarImg: {
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '1.5px solid white'
        }
    };

    return (
        <nav style={styles.nav}>
            <div className="container">
                <div className="d-flex justify-content-around align-items-center">
                    {[
                        { path: '/', icon: <FaHome size={22} />, label: 'Home' },
                        { path: '/search', icon: <FaSearch size={22} />, label: 'Search' },
                        { path: '/create-post', icon: <FaPlusSquare size={22} />, label: 'Create Post' },
                        { path: '/reels', icon: <FaVideo size={22} />, label: 'Reels' },
                        {
                            path: '/profile', icon: <div style={styles.userAvatar}>
                                <img src={user.avatar_url} alt={`${user.username}'s profile`} style={styles.avatarImg} />
                            </div>, label: 'Profile'
                        }
                    ].map((item, index) => (
                        <Link
                            key={index}
                            to={item.path}
                            style={{
                                ...styles.navItem,
                                ...(isActive(item.path) ? styles.activeNavItem : {})
                            }}
                            aria-label={item.label}
                        >
                            {item.icon}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
}