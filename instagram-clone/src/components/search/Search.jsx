import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { populateUserData } from '../../data/mockData';
import { FaSearch, FaTimes, FaHashtag, FaHeart } from 'react-icons/fa';

export default function Search() {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('top');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    // ✅ FIXED: Use useMemo to prevent data from changing on every render
    const { users, posts } = useMemo(() => populateUserData(), []);

    // Set initial search query from location (only once)
    useEffect(() => {
        if (location.state?.query) {
            setSearchQuery(location.state.query);
        }
    }, [location.state?.query]); // Only depend on the specific value

    // ✅ FIXED: Simple search with no dependencies that change
    useEffect(() => {
        if (!searchQuery.trim()) {
            setFilteredUsers([]);
            setFilteredPosts([]);
            return;
        }

        const query = searchQuery.toLowerCase();

        const filteredUsersResult = users.filter(user =>
            user.username.toLowerCase().includes(query) ||
            user.full_name.toLowerCase().includes(query)
        );

        const filteredPostsResult = posts.filter(post =>
            post.content.toLowerCase().includes(query)
        );

        setFilteredUsers(filteredUsersResult);
        setFilteredPosts(filteredPostsResult);
    }, [searchQuery]); // ✅ Only depend on searchQuery

    const clearSearch = () => setSearchQuery('');

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const styles = {
        container: { maxWidth: '600px', paddingTop: '20px' },
        searchInput: {
            width: '100%', padding: '14px 45px 14px 45px', backgroundColor: '#fafafa',
            border: '1px solid #dbdbdb', borderRadius: '10px', fontSize: '16px', outline: 'none',
        },
        searchIcon: {
            position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)',
            color: '#8e8e8e', fontSize: '16px'
        },
        clearButton: {
            position: 'absolute', right: '15px', top: '50%', transform: 'translateY(-50%)',
            background: 'none', border: 'none', color: '#8e8e8e', cursor: 'pointer'
        },
        tab: {
            background: 'none', border: 'none', padding: '12px 0', marginRight: '24px',
            color: '#8e8e8e', borderBottom: 'none', fontWeight: '400', fontSize: '14px'
        },
        activeTab: {
            color: '#262626', borderBottom: '2px solid #262626', fontWeight: '600'
        },
        userCard: {
            cursor: 'pointer', borderRadius: '8px', transition: 'background-color 0.3s ease'
        },
        avatar: {
            width: '50px', height: '50px', borderRadius: '50%', border: '2px solid #e1306c',
            padding: '2px', marginRight: '14px'
        },
        postThumb: {
            aspectRatio: '1', backgroundColor: '#fafafa', border: '1px solid #dbdbdb',
            display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
            position: 'relative', borderRadius: '4px', overflow: 'hidden'
        },
        likeBadge: {
            position: 'absolute', top: '8px', right: '8px', background: 'rgba(0,0,0,0.7)',
            color: 'white', padding: '4px 8px', borderRadius: '12px', fontSize: '11px',
            fontWeight: '600', display: 'flex', alignItems: 'center', gap: '4px'
        }
    };

    return (
        <div className="container" style={styles.container}>
            <div className="mb-4">
                <div style={{ position: 'relative' }}>
                    <FaSearch style={styles.searchIcon} />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={styles.searchInput}
                    />
                    {searchQuery && (
                        <button onClick={clearSearch} style={styles.clearButton}>
                            <FaTimes />
                        </button>
                    )}
                </div>
            </div>

            {searchQuery ? (
                <div>
                    <div className="d-flex border-bottom mb-4">
                        {['top', 'accounts', 'tags'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    ...styles.tab,
                                    ...(activeTab === tab ? styles.activeTab : {})
                                }}
                            >
                                {tab === 'top' ? 'Top' : tab === 'accounts' ? 'Accounts' : 'Tags'}
                            </button>
                        ))}
                    </div>

                    {(activeTab === 'top' || activeTab === 'accounts') && filteredUsers.length > 0 && (
                        <div className="mb-4">
                            <h6 className="mb-3" style={{ color: '#262626', fontSize: '16px' }}>Accounts</h6>
                            {filteredUsers.map(user => (
                                <div
                                    key={user.id}
                                    className="d-flex align-items-center mb-3 p-3"
                                    style={styles.userCard}
                                >
                                    <div style={styles.avatar}>
                                        <img
                                            src={user.avatar_url}
                                            alt={user.username}
                                            style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                                        />
                                    </div>
                                    <div className="flex-grow-1">
                                        <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                                            {user.username}
                                        </div>
                                        <div style={{ fontSize: '14px', color: '#8e8e8e', marginBottom: '4px' }}>
                                            {user.full_name}
                                        </div>
                                        <div style={{ fontSize: '12px', color: '#8e8e8e' }}>
                                            {formatNumber(user.followers)} followers • {user.posts} posts
                                        </div>
                                    </div>
                                    <button className="btn btn-outline-primary btn-sm" style={{ borderRadius: '8px', fontSize: '13px', padding: '6px 14px', fontWeight: '600' }}>
                                        Follow
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {(activeTab === 'top' || activeTab === 'tags') && filteredPosts.length > 0 && (
                        <div>
                            <h6 className="mb-3" style={{ color: '#262626', fontSize: '16px' }}>Posts</h6>
                            <div className="row">
                                {filteredPosts.map(post => (
                                    <div key={post.id} className="col-4 mb-3">
                                        <div style={styles.postThumb}>
                                            <img
                                                src={post.image_url}
                                                alt="Post"
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <div style={styles.likeBadge}>
                                                <FaHeart /> {formatNumber(post.likes)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {filteredUsers.length === 0 && filteredPosts.length === 0 && (
                        <div className="text-center py-5">
                            <FaSearch size={48} color="#8e8e8e" className="mb-3" />
                            <h5 style={{ color: '#262626', marginBottom: '8px' }}>No results found</h5>
                            <p className="text-muted">Try searching for something else</p>
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <div>
                        <h6 className="mb-3" style={{ color: '#262626', fontSize: '16px' }}>
                            Explore
                        </h6>
                        {users.slice(0, 5).map(user => (
                            <div
                                key={user.id}
                                className="d-flex align-items-center mb-3 p-3"
                                style={styles.userCard}
                                onClick={() => setSearchQuery(user.username)}
                            >
                                <div style={{ width: '44px', height: '44px', borderRadius: '50%', marginRight: '12px', overflow: 'hidden' }}>
                                    <img
                                        src={user.avatar_url}
                                        alt={user.username}
                                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                    />
                                </div>
                                <div>
                                    <div style={{ fontSize: '14px', fontWeight: '600', marginBottom: '2px' }}>
                                        {user.username}
                                    </div>
                                    <div style={{ fontSize: '14px', color: '#8e8e8e' }}>
                                        {user.full_name}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-4">
                        <h6 className="mb-3" style={{ color: '#262626', fontSize: '16px' }}>Trending</h6>
                        <div className="row">
                            {['#travel', '#photography', '#food', '#fitness', '#art', '#tech'].map((tag, index) => (
                                <div key={index} className="col-6 mb-2">
                                    <div
                                        className="d-flex align-items-center p-2"
                                        style={styles.userCard}
                                        onClick={() => setSearchQuery(tag)}
                                    >
                                        <FaHashtag style={{ color: '#0095f6', marginRight: '8px' }} />
                                        <span style={{ fontSize: '14px', color: '#262626' }}>{tag}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



