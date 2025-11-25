
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { useNotifications } from '../../contexts/NotificationContext';
// import { useTranslation } from 'react-i18next'; // REMOVED
import Post from './Post';
import CreatePost from './CreatePost';
import Stories from '../stories/Stories';

export default function Feed() {
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const { user: currentAuthUser } = useAuth();
    const { posts, addPost, likePost, sharePost, addCommentToPost, savePost, unsavePost } = useApp();
    const { addNotification } = useNotifications();
    // const { t } = useTranslation(); // REMOVED

    useEffect(() => {
        setTimeout(() => setLoading(false), 1000);
    }, []);

    const loadMorePosts = useCallback(() => {
        if (loadingMore || !hasMore) return;
        setLoadingMore(true);
        setTimeout(() => setLoadingMore(false), 800);
    }, [loadingMore, hasMore]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
                loadMorePosts();
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMorePosts]);

    const handlePostCreated = (newPost) => {
        addPost({
            content: newPost.content,
            imageUrl: newPost.imageUrl
        });
    };

    const handleLike = (postId) => {
        likePost(postId);
        const post = posts.find(p => p.id === postId);
        if (post && !post.is_liked) {
            addNotification({
                type: 'like',
                user_id: currentAuthUser.id,
                post_id: postId,
                content: 'liked your post'
            });
        }
    };

    const handleShare = (postId) => {
        sharePost(postId);
        const post = posts.find(p => p.id === postId);
        if (post) {
            const shareUrl = `${window.location.origin}/post/${postId}`;
            if (navigator.share) {
                navigator.share({
                    title: `Check out this post by ${post.user.username}`,
                    text: post.content,
                    url: shareUrl,
                });
            } else {
                navigator.clipboard.writeText(shareUrl);
                alert('Post link copied to clipboard!');
            }
        }
    };

    const handleAddComment = (postId, comment) => {
        addCommentToPost(postId, comment);
        const post = posts.find(p => p.id === postId);
        if (post) {
            addNotification({
                type: 'comment',
                user_id: currentAuthUser.id,
                post_id: postId,
                content: `commented: "${comment.content.substring(0, 30)}..."`
            });
        }
    };

    const handleSave = (postId) => {
        const post = posts.find(p => p.id === postId);
        if (post) {
            post.is_saved ? unsavePost(postId) : savePost(post);
        }
    };

    const styles = {
        container: {
            maxWidth: '600px',
            paddingTop: '20px'
        },
        emptyState: {
            fontSize: '4rem',
            marginBottom: '20px'
        }
    };

    if (loading) {
        return (
            <div className="container" style={{ paddingTop: '20px' }}>
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-2 text-muted">Loading posts...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="container" style={styles.container}>
            <Stories />
            <CreatePost onPostCreated={handlePostCreated} />

            {posts.length === 0 ? (
                <div className="text-center py-5">
                    <div style={styles.emptyState}>📷</div>
                    <h4>No Posts Yet</h4>
                    <p className="text-muted">Be the first to share a post!</p>
                </div>
            ) : (
                <>
                    {posts.map(post => (
                        <Post
                            key={post.id}
                            post={post}
                            onLike={handleLike}
                            onShare={handleShare}
                            onSave={handleSave}
                            onAddComment={handleAddComment}
                        />
                    ))}

                    {loadingMore && (
                        <div className="text-center my-4">
                            <div className="spinner-border spinner-border-sm" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                            <p className="text-muted mt-2">Loading more posts...</p>
                        </div>
                    )}

                    {!hasMore && posts.length > 0 && (
                        <div className="text-center my-4">
                            <p className="text-muted">You've seen all posts</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}