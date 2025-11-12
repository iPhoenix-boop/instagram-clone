import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { populateUserData } from '../../data/mockData';
import { FaSearch, FaUser, FaImage, FaHashtag, FaTimes, FaHeart } from 'react-icons/fa';

export default function Search() {
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');
    const [activeTab, setActiveTab] = useState('top');
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [recentSearches, setRecentSearches] = useState([]);

    // Get data from mockData
    const data = populateUserData();
    const { users, posts } = data;

    useEffect(() => {
        // Get search query from navigation state
        if (location.state?.query) {
            setSearchQuery(location.state.query);
        }

        // Load recent searches from localStorage
        const savedSearches = localStorage.getItem('recent_searches');
        if (savedSearches) {
            setRecentSearches(JSON.parse(savedSearches));
        }
    }, [location]);

    useEffect(() => {
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();

            // Filter users
            const usersResult = users.filter(user =>
                user.username.toLowerCase().includes(query) ||
                user.full_name.toLowerCase().includes(query)
            );
            setFilteredUsers(usersResult);

            // Filter posts
            const postsResult = posts.filter(post =>
                post.content.toLowerCase().includes(query)
            );
            setFilteredPosts(postsResult);

            // Save to recent searches
            if (query && !recentSearches.includes(query)) {
                const newSearches = [query, ...recentSearches.slice(0, 4)];
                setRecentSearches(newSearches);
                localStorage.setItem('recent_searches', JSON.stringify(newSearches));
            }
        } else {
            setFilteredUsers([]);
            setFilteredPosts([]);
        }
    }, [searchQuery, users, posts, recentSearches]);

    const clearSearch = () => {
        setSearchQuery('');
    };

    const clearRecentSearches = () => {
        setRecentSearches([]);
        localStorage.removeItem('recent_searches');
    };

    const removeRecentSearch = (searchToRemove) => {
        const newSearches = recentSearches.filter(s => s !== searchToRemove);
        setRecentSearches(newSearches);
        localStorage.setItem('recent_searches', JSON.stringify(newSearches));
    };

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    return (
        <div className="container" style={{ maxWidth: '600px', paddingTop: '20px' }}>
            {/* Search Header */}
            <div className="mb-4">
                <div style={{ position: 'relative' }}>
                    <FaSearch style={{
                        position: 'absolute',
                        left: '15px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        color: '#8e8e8e',
                        fontSize: '16px'
                    }} />
                    <input
                        type="text"
                        placeholder="Search"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '14px 45px 14px 45px',
                            backgroundColor: '#fafafa',
                            border: '1px solid #dbdbdb',
                            borderRadius: '10px',
                            fontSize: '16px',
                            outline: 'none',
                            transition: 'all 0.3s ease'
                        }}
                        onFocus={(e) => {
                            e.target.style.backgroundColor = 'white';
                            e.target.style.borderColor = '#0095f6';
                            e.target.style.boxShadow = '0 0 0 2px rgba(0,149,246,0.2)';
                        }}
                        onBlur={(e) => {
                            e.target.style.backgroundColor = '#fafafa';
                            e.target.style.borderColor = '#dbdbdb';
                            e.target.style.boxShadow = 'none';
                        }}
                    />
                    {searchQuery && (
                        <button
                            onClick={clearSearch}
                            style={{
                                position: 'absolute',
                                right: '15px',
                                top: '50%',
                                transform: 'translateY(-50%)',
                                background: 'none',
                                border: 'none',
                                color: '#8e8e8e',
                                cursor: 'pointer'
                            }}
                        >
                            <FaTimes />
                        </button>
                    )}
                </div>
            </div>

            {/* Search Results */}
            {searchQuery ? (
                <div>
                    {/* Tabs */}
                    <div className="d-flex border-bottom mb-4">
                        <button
                            onClick={() => setActiveTab('top')}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '12px 0',
                                marginRight: '24px',
                                color: activeTab === 'top' ? '#262626' : '#8e8e8e',
                                borderBottom: activeTab === 'top' ? '2px solid #262626' : 'none',
                                fontWeight: activeTab === 'top' ? '600' : '400',
                                fontSize: '14px'
                            }}
                        >
                            Top
                        </button>
                        <button
                            onClick={() => setActiveTab('accounts')}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '12px 0',
                                marginRight: '24px',
                                color: activeTab === 'accounts' ? '#262626' : '#8e8e8e',
                                borderBottom: activeTab === 'accounts' ? '2px solid #262626' : 'none',
                                fontWeight: activeTab === 'accounts' ? '600' : '400',
                                fontSize: '14px'
                            }}
                        >
                            Accounts
                        </button>
                        <button
                            onClick={() => setActiveTab('tags')}
                            style={{
                                background: 'none',
                                border: 'none',
                                padding: '12px 0',
                                color: activeTab === 'tags' ? '#262626' : '#8e8e8e',
                                borderBottom: activeTab === 'tags' ? '2px solid #262626' : 'none',
                                fontWeight: activeTab === 'tags' ? '600' : '400',
                                fontSize: '14px'
                            }}
                        >
                            Tags
                        </button>
                    </div>

                    {/* Accounts Results */}
                    {(activeTab === 'top' || activeTab === 'accounts') && filteredUsers.length > 0 && (
                        <div className="mb-4">
                            <h6 className="mb-3" style={{ color: '#262626', fontSize: '16px' }}>Accounts</h6>
                            {filteredUsers.map(user => (
                                <div key={user.id} className="d-flex align-items-center mb-3 p-3" style={{
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    transition: 'background-color 0.3s ease'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                >
                                    <div style={{
                                        width: '50px',
                                        height: '50px',
                                        borderRadius: '50%',
                                        border: '2px solid #e1306c',
                                        padding: '2px',
                                        marginRight: '14px'
                                    }}>
                                        <img
                                            src={user.avatar_url}
                                            alt={user.username}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                borderRadius: '50%',
                                                objectFit: 'cover'
                                            }}
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
                                    <button className="btn btn-outline-primary btn-sm" style={{
                                        borderRadius: '8px',
                                        fontSize: '13px',
                                        padding: '6px 14px',
                                        fontWeight: '600'
                                    }}>
                                        Follow
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Posts Results */}
                    {(activeTab === 'top' || activeTab === 'tags') && filteredPosts.length > 0 && (
                        <div>
                            <h6 className="mb-3" style={{ color: '#262626', fontSize: '16px' }}>
                                {activeTab === 'tags' ? 'Tags' : 'Posts'}
                            </h6>
                            <div className="row">
                                {filteredPosts.map(post => (
                                    <div key={post.id} className="col-4 mb-3">
                                        <div style={{
                                            aspectRatio: '1',
                                            backgroundColor: '#fafafa',
                                            border: '1px solid #dbdbdb',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            position: 'relative',
                                            borderRadius: '4px',
                                            overflow: 'hidden'
                                        }}>
                                            <img
                                                src={post.image_url}
                                                alt="Post"
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    objectFit: 'cover'
                                                }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                top: '8px',
                                                right: '8px',
                                                background: 'rgba(0,0,0,0.7)',
                                                color: 'white',
                                                padding: '4px 8px',
                                                borderRadius: '12px',
                                                fontSize: '11px',
                                                fontWeight: '600',
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '4px'
                                            }}>
                                                <FaHeart />
                                                {formatNumber(post.likes)}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* No Results */}
                    {filteredUsers.length === 0 && filteredPosts.length === 0 && (
                        <div className="text-center py-5">
                            <FaSearch size={48} color="#8e8e8e" className="mb-3" />
                            <h5 style={{ color: '#262626', marginBottom: '8px' }}>No results found</h5>
                            <p className="text-muted">Try searching for something else</p>
                        </div>
                    )}
                </div>
            ) : (
                /* Recent Searches/Default State */
                <div>
                    {/* Recent Searches */}
                    {recentSearches.length > 0 && (
                        <div className="mb-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h6 style={{ color: '#262626', fontSize: '16px', margin: 0 }}>Recent</h6>
                                <button
                                    onClick={clearRecentSearches}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#0095f6',
                                        fontSize: '14px',
                                        fontWeight: '600',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Clear all
                                </button>
                            </div>
                            {recentSearches.map((search, index) => (
                                <div key={index} className="d-flex align-items-center justify-content-between p-3" style={{
                                    cursor: 'pointer',
                                    borderRadius: '8px',
                                    transition: 'background-color 0.3s ease'
                                }}
                                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                    onClick={() => setSearchQuery(search)}
                                >
                                    <div className="d-flex align-items-center">
                                        <FaSearch style={{ color: '#8e8e8e', marginRight: '12px' }} />
                                        <span style={{ fontSize: '14px', color: '#262626' }}>{search}</span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            removeRecentSearch(search);
                                        }}
                                        style={{
                                            background: 'none',
                                            border: 'none',
                                            color: '#8e8e8e',
                                            cursor: 'pointer'
                                        }}
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Suggested */}
                    <div>
                        <h6 className="mb-3" style={{ color: '#262626', fontSize: '16px' }}>
                            {recentSearches.length > 0 ? 'Suggested' : 'Explore'}
                        </h6>
                        {users.slice(0, 5).map(user => (
                            <div key={user.id} className="d-flex align-items-center mb-3 p-3" style={{
                                cursor: 'pointer',
                                borderRadius: '8px',
                                transition: 'background-color 0.3s ease'
                            }}
                                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                                onClick={() => setSearchQuery(user.username)}
                            >
                                <div style={{
                                    width: '44px',
                                    height: '44px',
                                    borderRadius: '50%',
                                    marginRight: '12px',
                                    overflow: 'hidden'
                                }}>
                                    <img
                                        src={user.avatar_url}
                                        alt={user.username}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover'
                                        }}
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

                    {/* Trending Tags */}
                    <div className="mt-4">
                        <h6 className="mb-3" style={{ color: '#262626', fontSize: '16px' }}>Trending</h6>
                        <div className="row">
                            {['#travel', '#photography', '#food', '#fitness', '#art', '#tech'].map((tag, index) => (
                                <div key={index} className="col-6 mb-2">
                                    <div className="d-flex align-items-center p-2" style={{
                                        cursor: 'pointer',
                                        borderRadius: '6px',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
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