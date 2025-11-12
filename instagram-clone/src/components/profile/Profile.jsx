import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { populateUserData } from '../../data/mockData';
import { FaThLarge, FaRegBookmark, FaRegUser, FaCog, FaShare } from 'react-icons/fa';

export default function Profile() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [userPosts, setUserPosts] = useState([]);
    const [activeTab, setActiveTab] = useState('posts');

    useEffect(() => {
        const data = populateUserData();
        const userPosts = data.posts.filter(post => post.user_id === user.id).slice(0, 13);
        setUserPosts(userPosts);
    }, [user]);

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

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

    return (
        <div className="container" style={{ maxWidth: '935px', paddingTop: '20px' }}>
            {/* Profile Header */}
            <div className="row mb-4">
                <div className="col-md-3 text-center">
                    <div style={{
                        width: '150px',
                        height: '150px',
                        margin: '0 auto 20px',
                        position: 'relative'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            borderRadius: '50%',
                            background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)',
                            padding: '4px'
                        }}>
                            <img
                                src={user.avatar_url}
                                alt={`${user.username}'s profile`}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    border: '4px solid white'
                                }}
                            />
                        </div>
                    </div>
                </div>

                <div className="col-md-9">
                    <div className="d-flex align-items-center mb-3">
                        <h2 style={{
                            fontWeight: '300',
                            marginRight: '20px',
                            marginBottom: 0,
                            fontSize: '28px',
                            fontFamily: 'Instagram Sans, sans-serif'
                        }}>
                            {user.username}
                        </h2>
                        <div className="d-flex gap-2">
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                style={{
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    padding: '6px 16px'
                                }}
                            >
                                Edit profile
                            </button>
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                style={{
                                    borderRadius: '8px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                    padding: '6px 16px'
                                }}
                            >
                                Share profile
                            </button>
                            <button
                                className="btn btn-outline-secondary btn-sm"
                                style={{
                                    borderRadius: '8px',
                                    width: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                                onClick={() => navigate('/settings')}
                                aria-label="Settings"
                            >
                                <FaCog size={14} />
                            </button>
                        </div>
                    </div>

                    <div className="d-flex gap-5 mb-3">
                        <div>
                            <span style={{ fontWeight: '600' }}>{userPosts.length}</span> posts
                        </div>
                        <div>
                            <span style={{ fontWeight: '600' }}>{formatNumber(173)}</span> followers
                        </div>
                        <div>
                            <span style={{ fontWeight: '600' }}>{formatNumber(94)}</span> following
                        </div>
                    </div>

                    <div className="mb-4">
                        <h6 style={{
                            fontWeight: '600',
                            marginBottom: '4px',
                            fontFamily: 'Instagram Sans, sans-serif'
                        }}>
                            {user.full_name}
                        </h6>
                        <p style={{
                            margin: '4px 0',
                            color: '#262626',
                            lineHeight: '1.4',
                            fontSize: '14px'
                        }}>
                            {user.bio || "Sleeps like it's a ritual"}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stories Highlights */}
            <div className="mb-5">
                <div className="d-flex justify-content-between align-items-center mb-3">
                    <h5 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        margin: 0,
                        color: '#262626'
                    }}>
                        Discover people
                    </h5>
                    <button
                        style={{
                            background: 'none',
                            border: 'none',
                            color: '#0095f6',
                            fontSize: '14px',
                            fontWeight: '600',
                            cursor: 'pointer'
                        }}
                    >
                        See All
                    </button>
                </div>

                <div className="row">
                    {suggestedUsers.map(suggestedUser => (
                        <div key={suggestedUser.id} className="col-6 mb-3">
                            <div className="d-flex align-items-center justify-content-between p-3"
                                style={{
                                    border: '1px solid #dbdbdb',
                                    borderRadius: '8px',
                                    backgroundColor: 'white'
                                }}>
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
                                    />
                                    <div>
                                        <div style={{
                                            fontSize: '14px',
                                            fontWeight: '600',
                                            marginBottom: '2px'
                                        }}>
                                            {suggestedUser.username}
                                        </div>
                                        <div style={{
                                            fontSize: '12px',
                                            color: '#8e8e8e',
                                            marginBottom: '2px'
                                        }}>
                                            {suggestedUser.name}
                                        </div>
                                        <div style={{
                                            fontSize: '12px',
                                            color: '#8e8e8e'
                                        }}>
                                            Followed by {suggestedUser.followedBy}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    style={{
                                        background: '#0095f6',
                                        border: 'none',
                                        color: 'white',
                                        borderRadius: '8px',
                                        padding: '6px 16px',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Follow
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Profile Tabs */}
            <div className="border-top">
                <div className="d-flex justify-content-center">
                    <button
                        onClick={() => setActiveTab('posts')}
                        className={`btn d-flex align-items-center gap-2 py-3 px-4 ${activeTab === 'posts' ? 'border-top border-dark' : 'text-muted'
                            }`}
                        style={{
                            background: 'none',
                            border: 'none',
                            borderTop: activeTab === 'posts' ? '1px solid #262626' : 'none',
                            marginTop: '-1px'
                        }}
                    >
                        <FaThLarge />
                        <span style={{ fontSize: '12px', fontWeight: '600' }}>POSTS</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('saved')}
                        className={`btn d-flex align-items-center gap-2 py-3 px-4 ${activeTab === 'saved' ? 'border-top border-dark' : 'text-muted'
                            }`}
                        style={{
                            background: 'none',
                            border: 'none',
                            borderTop: activeTab === 'saved' ? '1px solid #262626' : 'none',
                            marginTop: '-1px'
                        }}
                    >
                        <FaRegBookmark />
                        <span style={{ fontSize: '12px', fontWeight: '600' }}>SAVED</span>
                    </button>
                    <button
                        onClick={() => setActiveTab('tagged')}
                        className={`btn d-flex align-items-center gap-2 py-3 px-4 ${activeTab === 'tagged' ? 'border-top border-dark' : 'text-muted'
                            }`}
                        style={{
                            background: 'none',
                            border: 'none',
                            borderTop: activeTab === 'tagged' ? '1px solid #262626' : 'none',
                            marginTop: '-1px'
                        }}
                    >
                        <FaRegUser />
                        <span style={{ fontSize: '12px', fontWeight: '600' }}>TAGGED</span>
                    </button>
                </div>
            </div>

            {/* Posts Grid */}
            <div className="row g-2 mt-2">
                {userPosts.map(post => (
                    <div key={post.id} className="col-4">
                        <div style={{
                            aspectRatio: '1',
                            backgroundImage: `url(${post.image_url})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            borderRadius: '4px',
                            cursor: 'pointer'
                        }} />
                    </div>
                ))}
            </div>
        </div>
    );
}