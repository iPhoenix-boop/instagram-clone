import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { currentUser } from '../../data/mockData';
// import { useTranslation } from 'react-i18next'; // REMOVED
import { FaHeart, FaRegHeart, FaRegComment, FaPaperPlane, FaEllipsisH, FaBookmark, FaRegBookmark, FaSmile } from 'react-icons/fa';

export default function Post({ post, onLike, onShare, onSave, onAddComment }) {
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');
    const [showShareOptions, setShowShareOptions] = useState(false);
    const { user: currentAuthUser } = useAuth();
    const { isPostSaved } = useApp();
    // const { t } = useTranslation(); // REMOVED

    const safeUser = post?.user || currentUser;
    const safePost = {
        id: post?.id || 'unknown',
        content: post?.content || 'No content available',
        image_url: post?.image_url || 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&h=500&fit=crop',
        created_at: post?.created_at || new Date().toISOString(),
        likes: post?.likes || 0,
        comments: post?.comments || 0,
        shares: post?.shares || 0,
        is_liked: post?.is_liked || false,
        is_saved: post?.is_saved || false,
        user: safeUser
    };

    const isSaved = isPostSaved(safePost.id);

    const handleAddComment = (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        const comment = {
            id: Date.now().toString(),
            user: currentAuthUser || currentUser,
            content: newComment.trim(),
            created_at: new Date().toISOString()
        };

        setComments(prev => [...prev, comment]);
        onAddComment(safePost.id, comment);
        setNewComment('');
    };

    const handleShareClick = () => {
        setShowShareOptions(true);
        onShare(safePost.id);
    };

    const handleSaveClick = () => onSave(safePost.id);
    const handleLikeClick = () => onLike(safePost.id);

    const formatDate = (dateString) => {
        try {
            const date = new Date(dateString);
            const now = new Date();
            const diffInHours = (now - date) / (1000 * 60 * 60);

            if (diffInHours < 1) return 'Just now';
            if (diffInHours < 24) return `${Math.floor(diffInHours)}h ago`;
            if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        } catch (error) {
            return 'Recently';
        }
    };

    const formatNumber = (num) => {
        if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
        if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
        return num.toString();
    };

    const styles = {
        card: {
            border: '1px solid #dbdbdb',
            borderRadius: '8px',
            backgroundColor: 'white',
            marginBottom: '1rem'
        },
        avatar: {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '2px solid #e1306c',
            padding: '2px',
            marginRight: '12px'
        },
        actionButton: {
            background: 'none',
            border: 'none',
            padding: 0,
            transition: 'transform 0.2s ease'
        },
        shareModal: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 2000
        },
        shareContent: {
            backgroundColor: 'white',
            borderRadius: '12px',
            padding: '20px',
            maxWidth: '400px',
            width: '90%'
        },
        shareOption: {
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#f0f0f0',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 8px',
            fontSize: '24px'
        },
        commentInput: {
            border: 'none',
            fontSize: '14px',
            padding: '8px 0',
            backgroundColor: 'transparent'
        }
    };

    return (
        <div className="card" style={styles.card}>
            <div className="d-flex justify-content-between align-items-center p-3">
                <div className="d-flex align-items-center">
                    <div style={styles.avatar}>
                        <img src={safeUser.avatar_url} alt={safeUser.username} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }}
                            onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face'} />
                    </div>
                    <div>
                        <div style={{ fontSize: '14px', fontWeight: '600' }}>{safeUser.username}</div>
                        <div style={{ fontSize: '12px', color: '#8e8e8e' }}>{formatDate(safePost.created_at)}</div>
                    </div>
                </div>
                <FaEllipsisH style={{ color: '#262626', cursor: 'pointer' }} />
            </div>

            {safePost.image_url && (
                <img src={safePost.image_url} alt="Post" style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                    onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&h=500&fit=crop'} />
            )}

            <div className="p-3">
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <div className="d-flex gap-3">
                        <button onClick={handleLikeClick} style={styles.actionButton}
                            onMouseDown={(e) => e.currentTarget.style.transform = 'scale(0.9)'}
                            onMouseUp={(e) => e.currentTarget.style.transform = 'scale(1)'}
                            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}>
                            {safePost.is_liked ? <FaHeart size={24} style={{ color: '#ed4956' }} /> : <FaRegHeart size={24} style={{ color: '#262626' }} />}
                        </button>
                        <button onClick={() => setShowComments(!showComments)} style={styles.actionButton}>
                            <FaRegComment size={24} style={{ color: '#262626' }} />
                        </button>
                        <button onClick={handleShareClick} style={styles.actionButton}>
                            <FaPaperPlane size={24} style={{ color: '#262626' }} />
                        </button>
                    </div>
                    <button onClick={handleSaveClick} style={styles.actionButton}>
                        {isSaved ? <FaBookmark size={24} style={{ color: '#262626' }} /> : <FaRegBookmark size={24} style={{ color: '#262626' }} />}
                    </button>
                </div>

                <div className="d-flex gap-3 mb-2" style={{ fontSize: '14px', fontWeight: '600' }}>
                    {safePost.likes > 0 && <span>{formatNumber(safePost.likes)} likes</span>}
                    {safePost.comments > 0 && <span>{formatNumber(safePost.comments)} comments</span>}
                    {safePost.shares > 0 && <span>{formatNumber(safePost.shares)} shares</span>}
                </div>

                {safePost.content && (
                    <div style={{ fontSize: '14px', marginBottom: '8px', lineHeight: '1.4' }}>
                        <span style={{ fontWeight: '600', marginRight: '6px' }}>{safeUser.username}</span>
                        {safePost.content}
                    </div>
                )}

                {(comments.length > 0 || safePost.comments > 0) && !showComments && (
                    <button onClick={() => setShowComments(true)} style={{ background: 'none', border: 'none', color: '#8e8e8e', fontSize: '14px', padding: 0, marginBottom: '8px' }}>
                        View all {comments.length + safePost.comments} comments
                    </button>
                )}

                {showComments && (
                    <div style={{ marginBottom: '12px', maxHeight: '200px', overflowY: 'auto' }}>
                        {comments.map(comment => (
                            <div key={comment.id} className="mb-2 d-flex align-items-start">
                                <span style={{ fontWeight: '600', fontSize: '14px', marginRight: '6px' }}>
                                    {comment.user?.username || 'User'}
                                </span>
                                <span style={{ fontSize: '14px', lineHeight: '1.4' }}>{comment.content}</span>
                            </div>
                        ))}
                    </div>
                )}

                {showShareOptions && (
                    <div style={styles.shareModal}>
                        <div style={styles.shareContent}>
                            <h5 className="mb-3">Share Post</h5>
                            <div className="row text-center">
                                {[
                                    { emoji: '📱', label: 'Message' },
                                    { emoji: '📧', label: 'Email' },
                                    { emoji: '🔗', label: 'Copy Link' }
                                ].map((option, index) => (
                                    <div key={index} className="col-4 mb-3">
                                        <div style={styles.shareOption}>{option.emoji}</div>
                                        <small>{option.label}</small>
                                    </div>
                                ))}
                            </div>
                            <div className="d-flex gap-2 mt-3">
                                <button onClick={() => setShowShareOptions(false)} className="btn btn-outline-secondary flex-fill">
                                    Cancel
                                </button>
                                <button onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.origin}/post/${safePost.id}`);
                                    alert('Link copied to clipboard!');
                                    setShowShareOptions(false);
                                }} className="btn btn-primary flex-fill">
                                    Copy Link
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                <form onSubmit={handleAddComment} className="d-flex align-items-center gap-2 mt-2 pt-2 border-top">
                    <button type="button" style={{ background: 'none', border: 'none', color: '#8e8e8e' }}>
                        <FaSmile size={20} />
                    </button>
                    <input type="text" className="form-control" placeholder="Add a comment..." value={newComment}
                        onChange={(e) => setNewComment(e.target.value)} style={styles.commentInput} />
                    <button type="submit" disabled={!newComment.trim()} style={{
                        background: 'none', border: 'none', color: '#0095f6', fontWeight: '600', fontSize: '14px',
                        opacity: newComment.trim() ? 1 : 0.5, cursor: newComment.trim() ? 'pointer' : 'default'
                    }}>
                        Post
                    </button>
                </form>
            </div>
        </div>
    );
}
