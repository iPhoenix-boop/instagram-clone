import React, { useState, useEffect, useCallback } from 'react';
import { populateUserData, currentUser } from '../../data/mockData';
import Post from './Post';
import CreatePost from './CreatePost';
import { useAuth } from '../../contexts/AuthContext';
import { useNotifications } from '../../contexts/NotificationContext';

export default function Feed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const { user: currentAuthUser } = useAuth();
    const { addNotification } = useNotifications();

    const POSTS_PER_PAGE = 4;

    useEffect(() => {
        loadInitialPosts();
    }, []);

    const loadInitialPosts = () => {
        setLoading(true);
        setTimeout(() => {
            const data = populateUserData();
            const initialPosts = data.posts.slice(0, POSTS_PER_PAGE);
            setPosts(initialPosts);
            setLoading(false);
            setHasMore(data.posts.length > POSTS_PER_PAGE);
        }, 1000);
    };

    const loadMorePosts = useCallback(() => {
        if (loadingMore || !hasMore) return;

        setLoadingMore(true);
        setTimeout(() => {
            const data = populateUserData();
            const startIndex = page * POSTS_PER_PAGE;
            const newPosts = data.posts.slice(startIndex, startIndex + POSTS_PER_PAGE);

            if (newPosts.length > 0) {
                setPosts(prev => [...prev, ...newPosts]);
                setPage(prev => prev + 1);
                setHasMore(startIndex + newPosts.length < data.posts.length);
            } else {
                setHasMore(false);
            }
            setLoadingMore(false);
        }, 800);
    }, [page, loadingMore, hasMore]);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerHeight + document.documentElement.scrollTop
                >= document.documentElement.offsetHeight - 100) {
                loadMorePosts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loadMorePosts]);

    const handlePostCreated = (newPost) => {
        const postWithUser = {
            ...newPost,
            user: currentAuthUser || currentUser,
            id: Date.now().toString(),
            created_at: new Date().toISOString(),
            likes: 0,
            comments: 0,
            shares: 0,
            is_liked: false,
            is_saved: false
        };
        setPosts(prev => [postWithUser, ...prev]);
    };

    const handleLike = (postId) => {
        setPosts(prev => prev.map(post =>
            post.id === postId
                ? {
                    ...post,
                    likes: post.is_liked ? post.likes - 1 : post.likes + 1,
                    is_liked: !post.is_liked
                }
                : post
        ));

        // Add notification for like
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
        setPosts(prev => prev.map(post =>
            post.id === postId
                ? { ...post, shares: post.shares + 1 }
                : post
        ));

        // Show share options
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
                // Fallback: copy to clipboard
                navigator.clipboard.writeText(shareUrl);
                alert('Post link copied to clipboard!');
            }
        }
    };

    const handleAddComment = (postId, comment) => {
        setPosts(prev => prev.map(post =>
            post.id === postId
                ? { ...post, comments: post.comments + 1 }
                : post
        ));

        // Add notification for comment
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
        setPosts(prev => prev.map(post =>
            post.id === postId
                ? { ...post, is_saved: !post.is_saved }
                : post
        ));
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
        <div className="container" style={{ maxWidth: '600px', paddingTop: '20px' }}>
            <CreatePost onPostCreated={handlePostCreated} />

            {posts.length === 0 ? (
                <div className="text-center py-5">
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>📷</div>
                    <h4>No Posts Yet</h4>
                    <p className="text-muted">Be the first to share something!</p>
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
                                <span className="visually-hidden">Loading more...</span>
                            </div>
                            <p className="text-muted mt-2">Loading more posts...</p>
                        </div>
                    )}

                    {!hasMore && posts.length > 0 && (
                        <div className="text-center my-4">
                            <p className="text-muted">You've seen all posts!</p>
                        </div>
                    )}
                </>
            )}
        </div>
    );
}