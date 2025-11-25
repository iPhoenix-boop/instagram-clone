
import React, { useState, useEffect, useRef } from 'react';
import { populateUserData } from '../../data/mockData';
import { useAuth } from '../../contexts/AuthContext';
import {
    FaHeart,
    FaRegHeart,
    FaComment,
    FaPaperPlane,
    FaMusic,
    FaPause,
    FaPlay,
    FaEllipsisH,
    FaVolumeUp,
    FaVolumeMute,
    FaTimes
} from 'react-icons/fa';

export default function Reels() {
    const [reels, setReels] = useState([]);
    const [currentReelIndex, setCurrentReelIndex] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [isMuted, setIsMuted] = useState(true);
    const [videoLoaded, setVideoLoaded] = useState({});
    const [showComments, setShowComments] = useState(false);
    const [comments, setComments] = useState({});
    const [newComment, setNewComment] = useState('');
    const [volume, setVolume] = useState(0.7);
    const videoRefs = useRef([]);
    const { user: currentUser } = useAuth();

    useEffect(() => {
        const data = populateUserData();
        setReels(data.reels);

        // Initialize comments for each reel
        const initialComments = {};
        data.reels.forEach(reel => {
            initialComments[reel.id] = [
                {
                    id: '1',
                    user: data.users[1],
                    content: 'This is amazing! 🔥',
                    created_at: new Date().toISOString()
                },
                {
                    id: '2',
                    user: data.users[2],
                    content: 'Love the content! 👏',
                    created_at: new Date().toISOString()
                }
            ];
        });
        setComments(initialComments);
    }, []);

    useEffect(() => {
        const currentVideo = videoRefs.current[currentReelIndex];
        if (currentVideo) {
            currentVideo.volume = isMuted ? 0 : volume;

            if (isPlaying) {
                const playPromise = currentVideo.play();
                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log('Video play failed:', error);
                        setIsPlaying(false);
                    });
                }
            } else {
                currentVideo.pause();
            }
        }
    }, [currentReelIndex, isPlaying, isMuted, volume]);

    const handleVideoLoad = (reelId) => {
        setVideoLoaded(prev => ({ ...prev, [reelId]: true }));
    };

    const handleVideoError = (reelId, index) => {
        console.log(`Video ${reelId} failed to load`);
        setVideoLoaded(prev => ({ ...prev, [reelId]: false }));
    };

    const handleLike = (reelId) => {
        setReels(prev => prev.map(reel =>
            reel.id === reelId
                ? {
                    ...reel,
                    likes: reel.is_liked ? reel.likes - 1 : reel.likes + 1,
                    is_liked: !reel.is_liked
                }
                : reel
        ));
    };

    const handleScroll = (e) => {
        const container = e.target;
        const reelHeight = container.clientHeight;
        const scrollTop = container.scrollTop;
        const newIndex = Math.round(scrollTop / reelHeight);

        if (newIndex !== currentReelIndex) {
            if (videoRefs.current[currentReelIndex]) {
                videoRefs.current[currentReelIndex].pause();
            }
            setCurrentReelIndex(newIndex);
            setIsPlaying(true);
            setShowComments(false);
        }
    };

    const handleVideoClick = () => {
        setIsPlaying(!isPlaying);
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        setIsMuted(newVolume === 0);
    };

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    const handleAddComment = (reelId, e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment = {
            id: Date.now().toString(),
            user: currentUser,
            content: newComment.trim(),
            created_at: new Date().toISOString()
        };

        setComments(prev => ({
            ...prev,
            [reelId]: [...(prev[reelId] || []), comment]
        }));

        setNewComment('');

        // Update reel comment count
        setReels(prev => prev.map(reel =>
            reel.id === reelId
                ? { ...reel, comments: reel.comments + 1 }
                : reel
        ));
    };

    const formatNumber = (num) => {
        if (num >= 1000000) {
            return (num / 1000000).toFixed(1) + 'M';
        } else if (num >= 1000) {
            return (num / 1000).toFixed(1) + 'K';
        }
        return num.toString();
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = (now - date) / (1000 * 60 * 60);

        if (diffInHours < 1) {
            return 'Just now';
        } else if (diffInHours < 24) {
            return `${Math.floor(diffInHours)}h ago`;
        } else {
            return `${Math.floor(diffInHours / 24)}d ago`;
        }
    };

    // Add keyboard controls
    useEffect(() => {
        const handleKeyPress = (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                setIsPlaying(!isPlaying);
            } else if (e.code === 'ArrowUp') {
                e.preventDefault();
                setCurrentReelIndex(prev => Math.max(0, prev - 1));
            } else if (e.code === 'ArrowDown') {
                e.preventDefault();
                setCurrentReelIndex(prev => Math.min(reels.length - 1, prev + 1));
            } else if (e.code === 'KeyM') {
                e.preventDefault();
                setIsMuted(!isMuted);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [isPlaying, isMuted, reels.length]);

    if (reels.length === 0) {
        return (
            <div className="container text-center" style={{ paddingTop: '50px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2 text-muted">Loading reels...</p>
            </div>
        );
    }

    const currentReel = reels[currentReelIndex];
    const currentComments = comments[currentReel?.id] || [];

    return (
        <div style={{
            height: 'calc(100vh - 120px)',
            overflow: 'hidden',
            backgroundColor: 'black',
            position: 'relative'
        }}>
            {/* Reels Container */}
            <div
                style={{
                    height: '100%',
                    overflowY: 'scroll',
                    scrollSnapType: 'y mandatory',
                    scrollBehavior: 'smooth'
                }}
                onScroll={handleScroll}
            >
                {reels.map((reel, index) => (
                    <div
                        key={reel.id}
                        style={{
                            height: '100%',
                            scrollSnapAlign: 'start',
                            position: 'relative',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                    >
                        {/* Video Container */}
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {/* Loading Spinner */}
                            {!videoLoaded[reel.id] && (
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 5
                                }}>
                                    <div className="spinner-border text-light" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            )}

                            {/* Video Element */}
                            <video
                                ref={el => videoRefs.current[index] = el}
                                src={reel.video_url}
                                autoPlay={index === currentReelIndex && isPlaying}
                                muted={isMuted}
                                loop
                                playsInline
                                preload="metadata"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover',
                                    opacity: videoLoaded[reel.id] ? 1 : 0,
                                    transition: 'opacity 0.3s ease'
                                }}
                                onClick={handleVideoClick}
                                onError={() => handleVideoError(reel.id, index)}
                                onLoadedData={() => handleVideoLoad(reel.id)}
                                onCanPlay={() => handleVideoLoad(reel.id)}
                            />

                            {/* Video Fallback */}
                            {!videoLoaded[reel.id] && (
                                <div style={{
                                    position: 'absolute',
                                    top: '50%',
                                    left: '50%',
                                    transform: 'translate(-50%, -50%)',
                                    color: 'white',
                                    textAlign: 'center',
                                    zIndex: 4
                                }}>
                                    <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🎥</div>
                                    <h4 style={{ marginBottom: '8px' }}>Loading Reel...</h4>
                                    <p style={{ fontSize: '14px', opacity: 0.8 }}>
                                        {reel.caption}
                                    </p>
                                </div>
                            )}

                            {/* Audio Controls */}
                            <div style={{
                                position: 'absolute',
                                top: '20px',
                                right: '80px',
                                zIndex: 20,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                background: 'rgba(0,0,0,0.5)',
                                padding: '8px 12px',
                                borderRadius: '20px',
                                backdropFilter: 'blur(10px)'
                            }}>
                                <button
                                    onClick={toggleMute}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'white',
                                        fontSize: '16px',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                                </button>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                    style={{
                                        width: '80px',
                                        cursor: 'pointer'
                                    }}
                                />
                            </div>

                            {/* Play/Pause Overlay */}
                            {!isPlaying && index === currentReelIndex && videoLoaded[reel.id] && (
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        bottom: 0,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: 'rgba(0,0,0,0.3)',
                                        cursor: 'pointer',
                                        zIndex: 10
                                    }}
                                    onClick={() => setIsPlaying(true)}
                                >
                                    <div style={{
                                        width: '80px',
                                        height: '80px',
                                        borderRadius: '50%',
                                        backgroundColor: 'rgba(255,255,255,0.2)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backdropFilter: 'blur(10px)'
                                    }}>
                                        <FaPlay size={32} color="white" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Reel Info Overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: '80px',
                            left: '15px',
                            right: '15px',
                            color: 'white',
                            zIndex: 10
                        }}>
                            {/* User Info */}
                            <div className="d-flex align-items-center mb-3">
                                <div style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    border: '2px solid white',
                                    padding: '2px',
                                    marginRight: '10px'
                                }}>
                                    <img
                                        src={reel.user.avatar_url}
                                        alt={reel.user.username}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            borderRadius: '50%',
                                            objectFit: 'cover'
                                        }}
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face';
                                        }}
                                    />
                                </div>
                                <span style={{ fontWeight: '600', fontSize: '15px', marginRight: '12px' }}>
                                    {reel.user.username}
                                </span>
                                <button className="btn btn-outline-light btn-sm" style={{
                                    fontSize: '13px',
                                    padding: '4px 12px',
                                    borderRadius: '6px'
                                }}>
                                    Follow
                                </button>
                            </div>

                            {/* Caption */}
                            <p style={{ fontSize: '14px', marginBottom: '8px', lineHeight: '1.4' }}>
                                {reel.caption}
                            </p>

                            {/* Music */}
                            <div className="d-flex align-items-center" style={{ fontSize: '13px', opacity: 0.9, marginBottom: '8px' }}>
                                <FaMusic className="me-2" />
                                <span>{reel.audio_track}</span>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={{
                            position: 'absolute',
                            right: '15px',
                            bottom: '120px',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            gap: '20px',
                            zIndex: 10
                        }}>
                            {/* Like Button */}
                            <div className="text-center">
                                <button
                                    onClick={() => handleLike(reel.id)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'white',
                                        fontSize: '28px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {reel.is_liked ? (
                                        <FaHeart color="#ed4956" />
                                    ) : (
                                        <FaRegHeart />
                                    )}
                                </button>
                                <div style={{ fontSize: '13px', marginTop: '4px', fontWeight: '600' }}>
                                    {formatNumber(reel.likes)}
                                </div>
                            </div>

                            {/* Comment Button */}
                            <div className="text-center">
                                <button
                                    onClick={() => setShowComments(true)}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'white',
                                        fontSize: '28px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <FaComment />
                                </button>
                                <div style={{ fontSize: '13px', marginTop: '4px', fontWeight: '600' }}>
                                    {formatNumber(reel.comments)}
                                </div>
                            </div>

                            {/* Share Button */}
                            <div className="text-center">
                                <button
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: 'white',
                                        fontSize: '28px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <FaPaperPlane />
                                </button>
                                <div style={{ fontSize: '13px', marginTop: '4px', fontWeight: '600' }}>
                                    Share
                                </div>
                            </div>

                            {/* More Button */}
                            <div style={{
                                width: '32px',
                                height: '32px',
                                borderRadius: '50%',
                                border: '1px solid rgba(255,255,255,0.5)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                cursor: 'pointer',
                                marginTop: '10px'
                            }}>
                                <FaEllipsisH color="white" />
                            </div>
                        </div>

                        {/* Progress Indicator */}
                        <div style={{
                            position: 'absolute',
                            top: '10px',
                            left: '15px',
                            right: '15px',
                            display: 'flex',
                            gap: '4px',
                            zIndex: 10
                        }}>
                            {reels.map((_, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        flex: 1,
                                        height: '2px',
                                        backgroundColor: idx === currentReelIndex ? '#ffffff' : 'rgba(255,255,255,0.3)',
                                        borderRadius: '1px',
                                        transition: 'background-color 0.3s ease'
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Comments Modal */}
            {showComments && (
                <div style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(0,0,0,0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 2000,
                    padding: '20px'
                }}>
                    <div style={{
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        width: '100%',
                        maxWidth: '500px',
                        height: '80vh',
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                        {/* Header */}
                        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                            <h5 className="mb-0 fw-bold">Comments</h5>
                            <button
                                onClick={() => setShowComments(false)}
                                style={{
                                    background: 'none',
                                    border: 'none',
                                    fontSize: '1.2rem',
                                    color: '#8e8e8e',
                                    cursor: 'pointer'
                                }}
                            >
                                <FaTimes />
                            </button>
                        </div>

                        {/* Comments List */}
                        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
                            {currentComments.length === 0 ? (
                                <div className="text-center text-muted" style={{ marginTop: '50px' }}>
                                    <p>No comments yet</p>
                                    <p>Be the first to comment!</p>
                                </div>
                            ) : (
                                currentComments.map(comment => (
                                    <div key={comment.id} className="mb-3 d-flex align-items-start">
                                        <img
                                            src={comment.user.avatar_url}
                                            alt={comment.user.username}
                                            style={{
                                                width: '32px',
                                                height: '32px',
                                                borderRadius: '50%',
                                                marginRight: '12px',
                                                objectFit: 'cover'
                                            }}
                                        />
                                        <div style={{ flex: 1 }}>
                                            <div className="d-flex align-items-center mb-1">
                                                <span style={{ fontWeight: '600', fontSize: '14px', marginRight: '8px' }}>
                                                    {comment.user.username}
                                                </span>
                                                <span style={{ fontSize: '12px', color: '#8e8e8e' }}>
                                                    {formatDate(comment.created_at)}
                                                </span>
                                            </div>
                                            <p style={{ fontSize: '14px', margin: 0, lineHeight: '1.4' }}>
                                                {comment.content}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Add Comment Form */}
                        <form
                            onSubmit={(e) => handleAddComment(currentReel.id, e)}
                            className="p-3 border-top"
                        >
                            <div className="d-flex align-items-center gap-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    style={{
                                        border: '1px solid #dbdbdb',
                                        borderRadius: '20px',
                                        padding: '8px 16px',
                                        fontSize: '14px'
                                    }}
                                />
                                <button
                                    type="submit"
                                    disabled={!newComment.trim()}
                                    style={{
                                        background: 'none',
                                        border: 'none',
                                        color: '#0095f6',
                                        fontWeight: '600',
                                        fontSize: '14px',
                                        opacity: newComment.trim() ? 1 : 0.5,
                                        cursor: newComment.trim() ? 'pointer' : 'default'
                                    }}
                                >
                                    Post
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Keyboard Controls Hint */}
            <div style={{
                position: 'absolute',
                bottom: '20px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '12px',
                textAlign: 'center',
                zIndex: 10
            }}>
                <div>Space: Play/Pause • ↑↓: Navigate • M: Mute/Unmute</div>
            </div>
        </div>
    );
}