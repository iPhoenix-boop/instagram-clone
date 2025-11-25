

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useApp } from '../../contexts/AppContext';
import { FaImage, FaTimes, FaSmile, FaMapMarkerAlt, FaUserTag } from 'react-icons/fa';

export default function CreatePost({ onPostCreated }) {
    const [content, setContent] = useState('');
    const [imagePreview, setImagePreview] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    const { addPost } = useApp();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => setImagePreview(e.target.result);
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim() && !imagePreview) return;
        setLoading(true);

        setTimeout(() => {
            const newPost = addPost({
                content: content.trim(),
                imageUrl: imagePreview || 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&h=500&fit=crop'
            });
            onPostCreated(newPost);
            setContent('');
            setImagePreview(null);
            setIsOpen(false);
            setLoading(false);
        }, 1500);
    };

    const sampleImages = [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=300&h=300&fit=crop',
        'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=300&h=300&fit=crop'
    ];

    const styles = {
        card: {
            cursor: 'pointer', border: '1px solid #dbdbdb', borderRadius: '12px',
            transition: 'all 0.3s ease', backgroundColor: 'white'
        },
        userAvatar: {
            width: '45px', height: '45px', borderRadius: '50%', marginRight: '12px',
            objectFit: 'cover', border: '2px solid #e1306c'
        },
        plusButton: {
            width: '35px', height: '35px', borderRadius: '50%', backgroundColor: '#0095f6',
            display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white',
            fontSize: '18px', fontWeight: 'bold'
        },
        modal: {
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '20px'
        },
        modalContent: {
            backgroundColor: 'white', borderRadius: '12px', width: '100%', maxWidth: '500px',
            maxHeight: '90vh', overflow: 'hidden', boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
        },
        actionButton: {
            cursor: 'pointer', padding: '10px 16px', border: '1px solid #dbdbdb', borderRadius: '8px',
            fontSize: '14px', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.3s ease'
        },
        sampleImage: {
            aspectRatio: '1', backgroundSize: 'cover', backgroundPosition: 'center', borderRadius: '8px',
            height: '70%', cursor: 'pointer', border: '2px solid transparent', transition: 'all 0.3s ease'
        }
    };

    return (
        <>
            <div className="card mb-4" onClick={() => setIsOpen(true)} style={styles.card}
                onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                }}
                onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = 'none';
                }}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <img src={user.avatar_url} alt={user.username} style={styles.userAvatar} />
                        <div style={{ flex: 1 }}>
                            <span style={{ color: '#8e8e8e', fontSize: '15px' }}>
                                What's on your mind, {user.username}?
                            </span>
                        </div>
                        <div style={styles.plusButton}>+</div>
                    </div>
                </div>
            </div>

            {isOpen && (
                <div style={styles.modal}>
                    <div style={styles.modalContent}>
                        <div className="d-flex justify-content-between align-items-center p-3 border-bottom">
                            <h5 className="mb-0 fw-bold">Create Post</h5>
                            <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', color: '#8e8e8e', cursor: 'pointer' }}>
                                <FaTimes />
                            </button>
                        </div>

                        <div className="d-flex align-items-center p-3 border-bottom">
                            <img src={user.avatar_url} alt={user.username} style={{ width: '40px', height: '40px', borderRadius: '50%', marginRight: '12px', objectFit: 'cover' }} />
                            <div>
                                <div style={{ fontWeight: '600', fontSize: '15px' }}>{user.username}</div>
                                <div style={{ fontSize: '13px', color: '#0095f6' }}>Public ▼</div>
                            </div>
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="p-3">
                                <textarea className="form-control" placeholder={`What's on your mind, ${user.username}?`}
                                    value={content} onChange={(e) => setContent(e.target.value)} rows="2"
                                    style={{ border: 'none', resize: 'none', fontSize: '16px', minHeight: '20px', padding: '0' }} />
                            </div>

                            {imagePreview && (
                                <div className="p-3 border-top">
                                    <div className="position-relative">
                                        <img src={imagePreview} alt="Preview" style={{ width: '70%', maxHeight: '200px', objectFit: 'cover', borderRadius: '8px' }} />
                                        <button type="button" onClick={() => setImagePreview(null)}
                                            style={{
                                                position: 'absolute', top: '10px', right: '10px', background: 'rgba(0,0,0,0.7)',
                                                border: 'none', borderRadius: '50%', width: '32px', height: '32px', color: 'white',
                                                display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer'
                                            }}>
                                            <FaTimes size={14} />
                                        </button>
                                    </div>
                                </div>
                            )}

                            {!imagePreview && (
                                <div className="p-3 border-top">
                                    <h6 className="mb-3">Choose a sample image:</h6>
                                    <div className="row g-2">
                                        {sampleImages.map((img, index) => (
                                            <div key={index} className="col-4">
                                                <div onClick={() => setImagePreview(img)} style={{ ...styles.sampleImage, backgroundImage: `url(${img})` }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.borderColor = '#0095f6';
                                                        e.currentTarget.style.transform = 'scale(1.05)';
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.borderColor = 'transparent';
                                                        e.currentTarget.style.transform = 'scale(1)';
                                                    }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div className="p-3 border-top">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <span style={{ fontWeight: '600', color: '#262626' }}>Add to your post</span>
                                </div>
                                <div className="d-flex gap-3">
                                    <label htmlFor="image-upload" style={styles.actionButton}
                                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                                        <FaImage style={{ color: '#45bd62' }} /> Photo
                                    </label>
                                    <input id="image-upload" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />

                                    {[
                                        { icon: <FaUserTag style={{ color: '#1877f2' }} />, label: 'Tag' },
                                        { icon: <FaSmile style={{ color: '#f7b928' }} />, label: 'Feeling' },
                                        { icon: <FaMapMarkerAlt style={{ color: '#f5533d' }} />, label: 'Location' }
                                    ].map((item, index) => (
                                        <button key={index} type="button" style={styles.actionButton}
                                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'}
                                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'white'}>
                                            {item.icon} {item.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-3 border-top">
                                <button type="submit" disabled={loading || (!content.trim() && !imagePreview)}
                                    className="btn btn-primary w-100" style={{
                                        backgroundColor: '#0095f6', border: 'none', fontSize: '15px', fontWeight: '600',
                                        padding: '12px', borderRadius: '8px', opacity: (loading || (!content.trim() && !imagePreview)) ? 0.7 : 1
                                    }}>
                                    {loading ? <><div className="spinner-border spinner-border-sm me-2" role="status" />Posting...</> : 'Post'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}