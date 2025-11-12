import React, { useState } from 'react';
import { supabase } from '../supabase';

function CreatePost() {
    const [content, setContent] = useState('');
    const [isPosting, setIsPosting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) return;

        setIsPosting(true);

        try {
            const { data, error } = await supabase
                .from('posts')
                .insert([{
                    content: content.trim(),
                    user_id: 'demo-user-' + Math.random().toString(36).substr(2, 9)
                }])
                .select();

            if (error) throw error;

            console.log('Post created successfully!', data);
            setContent('');
            // Refresh the page to show new post
            setTimeout(() => window.location.reload(), 500);

        } catch (error) {
            console.error('Error creating post:', error);
            alert('Failed to create post. Check console for details.');
        } finally {
            setIsPosting(false);
        }
    };

    return (
        <div className="social-card mb-4">
            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    <div className="user-avatar me-3">
                        <i className="fas fa-user"></i>
                    </div>
                    <div>
                        <h6 className="mb-0 fw-bold">Demo User</h6>
                        <small className="text-muted">What's on your mind?</small>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <textarea
                            className="form-control"
                            rows="4"
                            placeholder="Share your thoughts, ideas, or experiences..."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            disabled={isPosting}
                            style={{ resize: 'none' }}
                        />
                    </div>

                    <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex gap-2">
                            <button type="button" className="btn btn-outline-secondary btn-sm" disabled={isPosting}>
                                <i className="fas fa-image text-primary"></i>
                            </button>
                            <button type="button" className="btn btn-outline-secondary btn-sm" disabled={isPosting}>
                                <i className="fas fa-video text-success"></i>
                            </button>
                            <button type="button" className="btn btn-outline-secondary btn-sm" disabled={isPosting}>
                                <i className="fas fa-map-marker-alt text-danger"></i>
                            </button>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary btn-social"
                            disabled={!content.trim() || isPosting}
                        >
                            {isPosting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status"></span>
                                    Posting...
                                </>
                            ) : (
                                <>
                                    <i className="fas fa-paper-plane me-2"></i>
                                    Post
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default CreatePost;