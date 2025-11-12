import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
import { FaInstagram, FaPaperPlane, FaRegHeart } from 'react-icons/fa';

export default function Navbar() {
    const { user, signOut } = useAuth();
    const { unreadCount } = useNotifications();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    if (!user) return null;

    return (
        <nav style={{
            backgroundColor: 'white',
            borderBottom: '1px solid #dbdbdb',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '0 16px'
        }}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center py-2">
                    {/* Logo */}
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <div className="d-flex align-items-center">
                            <FaInstagram style={{
                                fontSize: '1.8rem',
                                color: '#262626',
                                marginRight: '10px',
                                background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }} />
                            <span style={{
                                fontSize: '1.2rem',
                                fontWeight: '600',
                                color: '#262626',
                                fontFamily: 'Instagram Sans, sans-serif'
                            }}>Instagram</span>
                        </div>
                    </Link>

                    {/* Navigation Icons - Heart (Notifications) first, then Messages */}
                    <div className="d-flex align-items-center gap-4">
                        <Link to="/notifications" style={{ color: '#262626', textDecoration: 'none', position: 'relative' }} aria-label="Notifications">
                            <FaRegHeart size={22} />
                            {unreadCount > 0 && (
                                <div style={{
                                    position: 'absolute',
                                    top: '-5px',
                                    right: '-5px',
                                    backgroundColor: '#ed4956',
                                    color: 'white',
                                    borderRadius: '50%',
                                    width: '18px',
                                    height: '18px',
                                    fontSize: '10px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: '600'
                                }}>
                                    {unreadCount}
                                </div>
                            )}
                        </Link>
                        <Link to="/messages" style={{ color: '#262626', textDecoration: 'none' }} aria-label="Messages">
                            <FaPaperPlane size={22} />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}