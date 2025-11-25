import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';
// import { useTranslation } from 'react-i18next'; // REMOVED
import { FaInstagram, FaPaperPlane, FaRegHeart } from 'react-icons/fa';

export default function Navbar() {
    const { user } = useAuth();
    const { unreadCount } = useNotifications();
    // const { t } = useTranslation(); // REMOVED

    if (!user) return null;

    const styles = {
        nav: {
            backgroundColor: 'white',
            borderBottom: '1px solid #dbdbdb',
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            padding: '0 16px'
        },
        logo: {
            fontSize: '1.8rem',
            background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
        },
        logoText: {
            fontSize: '1.2rem',
            fontWeight: '600',
            color: '#262626',
            fontFamily: 'Instagram Sans, sans-serif'
        },
        notificationBadge: {
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
        }
    };

    return (
        <nav style={styles.nav}>
            <div className="container">
                <div className="d-flex justify-content-between align-items-center py-2">
                    <Link to="/" style={{ textDecoration: 'none' }}>
                        <div className="d-flex align-items-center">
                            <FaInstagram style={styles.logo} />
                            <span style={styles.logoText}>Instagram</span>
                        </div>
                    </Link>

                    <div className="d-flex align-items-center gap-4">
                        <Link to="/notifications" style={{ color: '#262626', textDecoration: 'none', position: 'relative' }}>
                            <FaRegHeart size={22} />
                            {unreadCount > 0 && <div style={styles.notificationBadge}>{unreadCount}</div>}
                        </Link>
                        <Link to="/messages" style={{ color: '#262626', textDecoration: 'none' }}>
                            <FaPaperPlane size={22} />
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}




