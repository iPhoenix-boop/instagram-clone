import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';
import PostCard from './PostCard';

function PostFeed() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            setLoading(true);
            setError(null);

            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);

        } catch (error) {
            console.error('Error loading posts:', error);
            setError('Failed to load posts. Please check your Supabase connection.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="text-center my-5 py-4">
                <div className="spinner-border text-primary mb-3" style={{ width: '3rem', height: '3rem' }} role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="text-white">Loading posts...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="social-card text-center py-5">
                <div className="card-body">
                    <i className="fas fa-exclamation-triangle display-1 text-warning mb-3"></i>
                    <h5 className="text-danger">Connection Error</h5>
                    <p className="text-muted">{error}</p>
                    <button className="btn btn-primary btn-social" onClick={loadPosts}>
                        <i className="fas fa-redo me-2"></i>
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div>
            {posts.length === 0 ? (
                <div className="social-card text-center py-5">
                    <div className="card-body">
                        <i className="fas fa-feather display-1 text-muted mb-3"></i>
                        <h5 className="text-dark">No posts yet</h5>
                        <p className="text-muted mb-4">Be the first to share something amazing!</p>
                        <button className="btn btn-primary btn-social" onClick={() => document.querySelector('textarea').focus()}>
                            <i className="fas fa-plus me-2"></i>
                            Create First Post
                        </button>
                    </div>
                </div>
            ) : (
                <div className="posts-container">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default PostFeed;