import React, { useState } from 'react';
import { supabase } from '../supabase';

function PostCard({ post }) {
    const [likes, setLikes] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [showComments, setShowComments] = useState(false);
    const [newComment, setNewComment] = useState('');

    const handleLike = async () => {
        if (isLiked) return;

        try {
            const { error } = await supabase
                .from('likes')
                .insert([{
                    post_id: post.id,
                    user_id: 'demo-user-' + Math.random().toString(36).substr(2, 9)
                }]);

            if (error) throw error;

            setLikes(likes + 1);
            setIsLiked(true);

        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) return;

        try {
            const { error } = await supabase
                .from('comments')
                .insert([{
                    post_id: post.id,
                    user_id: 'demo-user',
                    content: newComment.trim()
                }]);

            if (error) throw error;

            setComments([...comments, {
                id: Date.now(),
                content: newComment.trim(),
                user_id: 'demo-user',
                created_at: new Date().toISOString()
            }]);

            setNewComment('');

        } catch (error) {
            console.error('Error adding comment:', error);
        }
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
            return date.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        }
    };

    const userColors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#43e97b'];
    const userColor = userColors[post.user_id?.length % userColors.length] || '#667eea';

    return (
        <div className="social-card mb-4">
            <div className="card-body">
                {/* Post Header */}
                <div className="d-flex align-items-center mb-3">
                    <div
                        className="user-avatar me-3"
                        style={{ background: `linear-gradient(45deg, ${userColor}, ${userColor}99)` }}
                    >
                        <i className="fas fa-user"></i>
                    </div>
                    <div className="flex-grow-1">
                        <h6 className="mb-0 fw-bold text-dark">User {post.user_id?.slice(-6)}</h6>
                        <small className="text-muted">@{post.user_id?.slice(-8)}</small>
                    </div>
                    <small className="text-muted">
                        <i className="fas fa-clock me-1"></i>
                        {formatDate(post.created_at)}
                    </small>
                </div>

                {/* Post Content */}
                <p className="card-text text-dark mb-3" style={{ lineHeight: '1.6' }}>
                    {post.content}
                </p>

                {/* Post Image (if any) */}
                {post.image_url && (
                    <div className="mb-3">
                        <img
                            src={post.image_url}
                            alt="Post"
                            className="img-fluid rounded"
                            style={{ maxHeight: '300px', objectFit: 'cover', width: '100%' }}
                        />
                    </div>
                )}

                {/* Engagement Stats */}
                <div className="d-flex justify-content-between text-muted small mb-3 px-2">
                    <span>{likes} likes</span>
                    <span>{comments.length} comments</span>
                    <span>0 shares</span>
                </div>

                {/* Action Buttons */}
                <div className="d-flex justify-content-between border-top border-bottom py-2">
                    <button
                        className={`btn btn-sm ${isLiked ? 'btn-danger' : 'btn-outline-danger'} flex-fill me-1`}
                        onClick={handleLike}
                        style={{ borderRadius: '20px' }}
                    >
                        <i className={`fas fa-heart ${isLiked ? '' : 'far'} me-1`}></i>
                        {isLiked ? 'Liked' : 'Like'}
                    </button>

                    <button
                        className="btn btn-outline-primary btn-sm flex-fill mx-1"
                        onClick={() => setShowComments(!showComments)}
                        style={{ borderRadius: '20px' }}
                    >
                        <i className="far fa-comment me-1"></i>
                        Comment
                    </button>

                    <button className="btn btn-outline-success btn-sm flex-fill ms-1" style={{ borderRadius: '20px' }}>
                        <i className="far fa-share-square me-1"></i>
                        Share
                    </button>
                </div>

                {/* Comments Section */}
                {showComments && (
                    <div className="mt-3">
                        {/* Add Comment */}
                        <form onSubmit={handleAddComment} className="d-flex gap-2 mb-3">
                            <input
                                type="text"
                                className="form-control form-control-sm"
                                placeholder="Write a comment..."
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                style={{ borderRadius: '20px' }}
                            />
                            <button
                                type="submit"
                                className="btn btn-primary btn-sm"
                                disabled={!newComment.trim()}
                                style={{ borderRadius: '20px', minWidth: '80px' }}
                            >
                                Post
                            </button>
                        </form>

                        {/* Comments List */}
                        {comments.map(comment => (
                            <div key={comment.id} className="d-flex align-items-start mb-2">
                                <div
                                    className="user-avatar me-2"
                                    style={{
                                        width: '32px',
                                        height: '32px',
                                        fontSize: '12px',
                                        background: `linear-gradient(45deg, ${userColor}, ${userColor}99)`
                                    }}
                                >
                                    <i className="fas fa-user"></i>
                                </div>
                                <div className="flex-grow-1">
                                    <div className="bg-light rounded p-2">
                                        <small className="fw-bold text-dark">Demo User</small>
                                        <p className="mb-1 text-dark small">{comment.content}</p>
                                    </div>
                                    <small className="text-muted">{formatDate(comment.created_at)}</small>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default PostCard;