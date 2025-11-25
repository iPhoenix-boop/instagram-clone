


import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next'; // REMOVED
import { FaThLarge, FaRegBookmark, FaRegUser, FaCog, FaBookmark } from 'react-icons/fa';

export default function Profile() {
    const { user } = useAuth();
    const { getUserPosts, savedPosts } = useApp();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('posts');
    // const { t } = useTranslation(); // REMOVED
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const userPosts = getUserPosts();

    const suggestedUsers = [
        {
            id: 1,
            username: 'ravi_unukuru',
            name: 'Ravi Unukuru',
            avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            followedBy: 'harishreddyy__'
        },
        {
            id: 2,
            username: 'suresh_raina',
            name: 'Suresh Raina',
            avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
            followedBy: 'crazy_boy_naidu_143_an...'
        }
    ];

    // Fallback avatar in case the image fails to load
    const handleImageError = (e) => {
        e.target.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjBGMEYwIi8+CjxjaXJjbGUgY3g9Ijc1IiBjeT0iNjAiIHI9IjMwIiBmaWxsPSIjQ0VDRUNFIi8+CjxyZWN0IHg9IjQ1IiB5PSI5MCIgd2lkdGg9IjYwIiBoZWlnaHQ9IjYwIiByeD0iOCIgZmlsbD0iI0NFQ0VDRSIvPgo8L3N2Zz4K';
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const styles = {
        container: {
            maxWidth: '935px',
            margin: '0 auto',
            padding: isMobile ? '0' : '20px 0 0',
            backgroundColor: 'white'
        },
        profileHeader: {
            padding: isMobile ? '16px' : '0'
        },
        profileImage: {
            width: isMobile ? '80px' : '150px',
            height: isMobile ? '80px' : '150px',
            margin: isMobile ? '0 auto 16px' : '0 auto 20px',
            position: 'relative'
        },
        gradientBorder: {
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
            padding: isMobile ? '2px' : '4px'
        },
        profileImg: {
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            border: isMobile ? '2px solid white' : '4px solid white',
            backgroundColor: '#f0f0f0' // Fallback background
        },
        username: {
            fontWeight: '300',
            marginRight: isMobile ? '12px' : '20px',
            marginBottom: 0,
            fontSize: isMobile ? '20px' : '28px',
            fontFamily: 'Instagram Sans, sans-serif'
        },
        button: {
            borderRadius: '8px',
            fontSize: isMobile ? '12px' : '14px',
            fontWeight: '600',
            padding: isMobile ? '4px 12px' : '6px 16px',
            flex: isMobile ? 1 : 'none'
        },
        smallButton: {
            borderRadius: '8px',
            width: isMobile ? '32px' : '36px',
            height: isMobile ? '32px' : '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        },
        userCard: {
            border: '1px solid #dbdbdb',
            borderRadius: '8px',
            backgroundColor: 'white',
            padding: isMobile ? '8px' : '12px'
        },
        tabButton: {
            background: 'none',
            border: 'none',
            borderTop: '1px solid #262626',
            marginTop: '-1px',
            flex: 1,
            minHeight: '44px'
        },
        postGrid: {
            aspectRatio: '1',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: isMobile ? '2px' : '4px',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            backgroundColor: '#fafafa' // Fallback for post images
        },
        indicator: {
            position: 'absolute',
            top: isMobile ? '4px' : '8px',
            right: isMobile ? '4px' : '8px',
            background: 'rgba(0,0,0,0.7)',
            borderRadius: isMobile ? '2px' : '4px',
            padding: isMobile ? '1px 4px' : '2px 6px',
            fontSize: isMobile ? '8px' : '10px',
            color: 'white',
            fontWeight: '600'
        },
        savedIndicator: {
            position: 'absolute',
            top: isMobile ? '4px' : '8px',
            right: isMobile ? '4px' : '8px',
            background: 'rgba(0,0,0,0.7)',
            borderRadius: '50%',
            width: isMobile ? '20px' : '24px',
            height: isMobile ? '20px' : '24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        postOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.3s ease',
            borderRadius: isMobile ? '2px' : '4px'
        },
        statsContainer: {
            display: 'flex',
            gap: isMobile ? '20px' : '40px',
            justifyContent: isMobile ? 'space-around' : 'flex-start',
            marginBottom: isMobile ? '16px' : '20px',
            textAlign: isMobile ? 'center' : 'left'
        },
        statItem: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: isMobile ? 'center' : 'flex-start'
        },
        buttonGroup: {
            display: 'flex',
            gap: isMobile ? '4px' : '8px',
            width: isMobile ? '100%' : 'auto',
            marginBottom: isMobile ? '16px' : '0'
        },
        emptyState: {
            fontSize: isMobile ? '48px' : '64px',
            marginBottom: '16px'
        },
        discoverSection: {
            padding: isMobile ? '16px' : '0',
            marginBottom: isMobile ? '20px' : '32px',
            borderTop: isMobile ? '1px solid #dbdbdb' : 'none',
            borderBottom: isMobile ? '1px solid #dbdbdb' : 'none',
            backgroundColor: isMobile ? '#fafafa' : 'transparent'
        }
    };

    return (
        <div style={styles.container}>
            {/* Profile Header */}
            <div style={styles.profileHeader}>
                <div className={isMobile ? "" : "row"}>
                    <div className={isMobile ? "text-center mb-3" : "col-md-3 text-center"}>
                        <div style={styles.profileImage}>
                            <div style={styles.gradientBorder}>
                                <img
                                    src={user.avatar_url}
                                    alt={`${user.username}'s profile`}
                                    style={styles.profileImg}
                                    onError={handleImageError}
                                />
                            </div>
                        </div>
                    </div>

                    <div className={isMobile ? "" : "col-md-9"}>
                        {isMobile ? (
                            <>
                                <div className="d-flex align-items-center justify-content-between mb-3">
                                    <h2 style={styles.username}>{user.username}</h2>
                                    <button
                                        className="btn btn-outline-secondary btn-sm"
                                        style={styles.smallButton}
                                        onClick={() => navigate('/settings')}
                                    >
                                        <FaCog size={isMobile ? 12 : 14} />
                                    </button>
                                </div>

                                <div style={styles.statsContainer}>
                                    <div style={styles.statItem}>
                                        <span style={{ fontWeight: '600', fontSize: isMobile ? '14px' : '16px' }}>
                                            {userPosts.length}
                                        </span>
                                        <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#8e8e8e' }}>
                                            Posts
                                        </span>
                                    </div>
                                    <div style={styles.statItem}>
                                        <span style={{ fontWeight: '600', fontSize: isMobile ? '14px' : '16px' }}>
                                            {formatNumber(173)}
                                        </span>
                                        <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#8e8e8e' }}>
                                            Followers
                                        </span>
                                    </div>
                                    <div style={styles.statItem}>
                                        <span style={{ fontWeight: '600', fontSize: isMobile ? '14px' : '16px' }}>
                                            {formatNumber(94)}
                                        </span>
                                        <span style={{ fontSize: isMobile ? '12px' : '14px', color: '#8e8e8e' }}>
                                            Following
                                        </span>
                                    </div>
                                </div>

                                <div style={styles.buttonGroup}>
                                    <button className="btn btn-outline-secondary btn-sm" style={styles.button}>
                                        Edit Profile
                                    </button>
                                    <button className="btn btn-outline-secondary btn-sm" style={styles.button}>
                                        Share Profile
                                    </button>
                                </div>

                                <div className="mb-3">
                                    <h6 style={{
                                        fontWeight: '600',
                                        marginBottom: '4px',
                                        fontSize: isMobile ? '14px' : '16px'
                                    }}>
                                        {user.full_name}
                                    </h6>
                                    <p style={{
                                        margin: '4px 0',
                                        color: '#262626',
                                        lineHeight: '1.4',
                                        fontSize: isMobile ? '13px' : '14px'
                                    }}>
                                        {user.bio || '✨ Sleeps ritual'}
                                    </p>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="d-flex align-items-center mb-3">
                                    <h2 style={styles.username}>{user.username}</h2>
                                    <div className="d-flex gap-2">
                                        <button className="btn btn-outline-secondary btn-sm" style={styles.button}>
                                            Edit Profile
                                        </button>
                                        <button className="btn btn-outline-secondary btn-sm" style={styles.button}>
                                            Share Profile
                                        </button>
                                        <button
                                            className="btn btn-outline-secondary btn-sm"
                                            style={styles.smallButton}
                                            onClick={() => navigate('/settings')}
                                        >
                                            <FaCog size={14} />
                                        </button>
                                    </div>
                                </div>

                                <div className="d-flex gap-5 mb-3">
                                    <div>
                                        <span style={{ fontWeight: '600' }}>{userPosts.length}</span> Posts
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: '600' }}>{formatNumber(173)}</span> Followers
                                    </div>
                                    <div>
                                        <span style={{ fontWeight: '600' }}>{formatNumber(94)}</span> Following
                                    </div>
                                </div>

                                <div className="mb-4">
                                    <h6 style={{ fontWeight: '600', marginBottom: '4px' }}>{user.full_name}</h6>
                                    <p style={{
                                        margin: '4px 0',
                                        color: '#262626',
                                        lineHeight: '1.4',
                                        fontSize: '14px'
                                    }}>
                                        {user.bio || '✨ Sleeps ritual'}
                                    </p>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Discover People - Only show on desktop */}
            {!isMobile && (
                <div className="mb-5">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <h5 style={{ fontSize: '16px', fontWeight: '600', margin: 0, color: '#262626' }}>
                            Discover People
                        </h5>
                        <button style={{
                            background: 'none',
                            border: 'none',
                            color: '#0095f6',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}>
                            See All
                        </button>
                    </div>

                    <div className="row">
                        {suggestedUsers.map(suggestedUser => (
                            <div key={suggestedUser.id} className="col-6 mb-3">
                                <div className="d-flex align-items-center justify-content-between p-3" style={styles.userCard}>
                                    <div className="d-flex align-items-center">
                                        <img
                                            src={suggestedUser.avatar_url}
                                            alt={suggestedUser.username}
                                            style={{
                                                width: '44px',
                                                height: '44px',
                                                borderRadius: '50%',
                                                marginRight: '12px',
                                                objectFit: 'cover'
                                            }}
                                            onError={handleImageError}
                                        />
                                        <div>
                                            <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                                                {suggestedUser.username}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#8e8e8e', marginBottom: '2px' }}>
                                                {suggestedUser.name}
                                            </div>
                                            <div style={{ fontSize: '12px', color: '#8e8e8e' }}>
                                                Followed by {suggestedUser.followedBy}
                                            </div>
                                        </div>
                                    </div>
                                    <button style={{
                                        background: '#0095f6',
                                        border: 'none',
                                        color: 'white',
                                        borderRadius: '8px',
                                        padding: '6px 16px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}>
                                        Follow
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Profile Tabs */}
            <div className="border-top">
                <div className="d-flex justify-content-center">
                    {[
                        { key: 'posts', icon: <FaThLarge size={isMobile ? 16 : 18} />, label: 'POSTS' },
                        { key: 'saved', icon: <FaRegBookmark size={isMobile ? 16 : 18} />, label: 'SAVED' },
                        { key: 'tagged', icon: <FaRegUser size={isMobile ? 16 : 18} />, label: 'TAGGED' }
                    ].map(tab => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`btn d-flex align-items-center justify-content-center gap-2 py-3 ${isMobile ? 'px-2' : 'px-4'} ${activeTab === tab.key ? 'border-top border-dark' : 'text-muted'}`}
                            style={{
                                ...styles.tabButton,
                                borderTop: activeTab === tab.key ? '1px solid #262626' : 'none',
                                flex: 1
                            }}
                        >
                            {tab.icon}
                            {!isMobile && (
                                <span style={{ fontSize: '12px', fontWeight: '600' }}>{tab.label}</span>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            {/* Posts Grid */}
            <div className={`${isMobile ? 'g-1' : 'g-2'} mt-2`} style={{ padding: isMobile ? '0' : '0 12px' }}>
                <div className="row">
                    {activeTab === 'posts' && userPosts.map(post => (
                        <div key={post.id} className={isMobile ? "col-4 p-1" : "col-4"}>
                            <div className="position-relative">
                                <div
                                    style={{ ...styles.postGrid, backgroundImage: `url(${post.image_url})` }}
                                    onMouseEnter={(e) => {
                                        const overlay = e.currentTarget.querySelector('.post-overlay');
                                        if (overlay) overlay.style.opacity = '1';
                                    }}
                                    onMouseLeave={(e) => {
                                        const overlay = e.currentTarget.querySelector('.post-overlay');
                                        if (overlay) overlay.style.opacity = '0';
                                    }}
                                />
                                <div style={styles.indicator}>YOURS</div>
                                <div className="post-overlay" style={styles.postOverlay}>
                                    <div className="text-white text-center">
                                        <div style={{ fontSize: isMobile ? '12px' : '14px', fontWeight: '600' }}>
                                            {post.likes} ❤️
                                        </div>
                                        <div style={{ fontSize: isMobile ? '10px' : '12px' }}>
                                            {post.comments} 💬
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {activeTab === 'saved' && (savedPosts.length > 0 ? savedPosts.map(post => (
                        <div key={post.id} className={isMobile ? "col-4 p-1" : "col-4"}>
                            <div className="position-relative">
                                <div
                                    style={{ ...styles.postGrid, backgroundImage: `url(${post.image_url})` }}
                                    onMouseEnter={(e) => {
                                        const overlay = e.currentTarget.querySelector('.post-overlay');
                                        if (overlay) overlay.style.opacity = '1';
                                    }}
                                    onMouseLeave={(e) => {
                                        const overlay = e.currentTarget.querySelector('.post-overlay');
                                        if (overlay) overlay.style.opacity = '0';
                                    }}
                                />
                                <div style={styles.savedIndicator}>
                                    <FaBookmark size={isMobile ? 10 : 12} style={{ color: 'white' }} />
                                </div>
                                <div className="post-overlay" style={styles.postOverlay}>
                                    <div className="text-white text-center">
                                        <div style={{ fontSize: isMobile ? '12px' : '14px', fontWeight: '600' }}>
                                            {post.likes} ❤️
                                        </div>
                                        <div style={{ fontSize: isMobile ? '10px' : '12px' }}>
                                            {post.comments} 💬
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="col-12 text-center py-5">
                            <div style={styles.emptyState}>📚</div>
                            <h4 style={{ fontSize: isMobile ? '18px' : '24px', marginBottom: '8px' }}>
                                No Saved Posts
                            </h4>
                            <p className="text-muted" style={{ fontSize: isMobile ? '14px' : '16px' }}>
                                Save posts you love to see them here!
                            </p>
                            <button
                                className="btn btn-primary mt-3"
                                onClick={() => navigate('/')}
                                style={{
                                    backgroundColor: '#0095f6',
                                    border: 'none',
                                    borderRadius: '8px',
                                    padding: isMobile ? '8px 16px' : '10px 20px',
                                    fontWeight: '600',
                                    fontSize: isMobile ? '14px' : '16px'
                                }}
                            >
                                Explore Posts
                            </button>
                        </div>
                    ))}

                    {activeTab === 'tagged' && userPosts.slice(0, 6).map(post => (
                        <div key={post.id} className={isMobile ? "col-4 p-1" : "col-4"}>
                            <div className="position-relative">
                                <div
                                    style={{ ...styles.postGrid, backgroundImage: `url(${post.image_url})` }}
                                    onMouseEnter={(e) => {
                                        const overlay = e.currentTarget.querySelector('.post-overlay');
                                        if (overlay) overlay.style.opacity = '1';
                                    }}
                                    onMouseLeave={(e) => {
                                        const overlay = e.currentTarget.querySelector('.post-overlay');
                                        if (overlay) overlay.style.opacity = '0';
                                    }}
                                />
                                <div style={styles.indicator}>TAGGED</div>
                                <div className="post-overlay" style={styles.postOverlay}>
                                    <div className="text-white text-center">
                                        <div style={{ fontSize: isMobile ? '12px' : '14px', fontWeight: '600' }}>
                                            {post.likes} ❤️
                                        </div>
                                        <div style={{ fontSize: isMobile ? '10px' : '12px' }}>
                                            {post.comments} 💬
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}