import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../contexts/AppContext';
import { useAuth } from '../../contexts/AuthContext';

export default function Stories() {
    const { stories, addStory } = useApp();
    const { user } = useAuth();
    const [selectedStory, setSelectedStory] = useState(null);
    const [currentStoryIndex, setCurrentStoryIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const [isPlaying, setIsPlaying] = useState(true);
    const [showCamera, setShowCamera] = useState(false);
    const [mediaStream, setMediaStream] = useState(null);
    const videoRef = useRef(null);
    const cameraVideoRef = useRef(null);
    const progressInterval = useRef(null);
    const mediaRecorderRef = useRef(null);
    const recordedChunksRef = useRef([]);

    // Real usernames from mock data
    const realUsernames = {
        '1': 'johndoe',
        '2': 'sarahsmith',
        '3': 'mikejohnson',
        '4': 'emilywilson',
        '5': 'davidbrown',
        '6': 'lisachen',
        '7': 'alexrodriguez',
        '8': 'sophiamartinez'
    };

    // Default stories data with real usernames
    const defaultStories = [
        {
            id: 'story_1',
            userId: '2',
            username: realUsernames['2'],
            userAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
            mediaType: 'video',
            duration: 15,
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            views: [],
            caption: 'Morning coding session with coffee! ☕💻 #developerlife'
        },
        {
            id: 'story_2',
            userId: '3',
            username: realUsernames['3'],
            userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            mediaType: 'video',
            duration: 12,
            createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            views: [],
            caption: 'New personal best at the gym! 💪 #fitness'
        },
        {
            id: 'story_3',
            userId: '4',
            username: realUsernames['4'],
            userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            mediaUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=700&fit=crop',
            mediaType: 'image',
            duration: 5,
            createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            views: [],
            caption: 'Homemade pizza night! 🍕 #foodie'
        },
        {
            id: 'story_4',
            userId: '5',
            username: realUsernames['5'],
            userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            mediaType: 'video',
            duration: 10,
            createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            views: [],
            caption: 'Unboxing the latest tech! 📱 #tech'
        }
    ];

    // FIXED: Add unique prefixes to all stories to prevent duplicate keys
    const userStories = stories.filter(story => story.userId === user.id)
        .map(story => ({ ...story, id: `user_${story.id || story.userId}_${Date.now()}` }));

    const otherStories = stories.filter(story => story.userId !== user.id)
        .map(story => ({ ...story, id: `other_${story.id || story.userId}_${Date.now()}` }));

    const allStories = [
        ...defaultStories.map(story => ({ ...story, id: `default_${story.id}` })),
        ...otherStories,
        ...userStories
    ];

    // Real-time camera functions
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    width: { ideal: 1080 },
                    height: { ideal: 1920 },
                    facingMode: 'user'
                },
                audio: true
            });
            setMediaStream(stream);
            if (cameraVideoRef.current) {
                cameraVideoRef.current.srcObject = stream;
            }
            setShowCamera(true);
        } catch (error) {
            console.error('Error accessing camera:', error);
            alert('Unable to access camera. Please check permissions.');
        }
    };

    const stopCamera = () => {
        if (mediaStream) {
            mediaStream.getTracks().forEach(track => track.stop());
            setMediaStream(null);
        }
        setShowCamera(false);
        recordedChunksRef.current = [];
    };

    const startRecording = () => {
        if (!mediaStream) return;

        recordedChunksRef.current = [];
        const mediaRecorder = new MediaRecorder(mediaStream, {
            mimeType: 'video/webm;codecs=vp9'
        });

        mediaRecorderRef.current = mediaRecorder;

        mediaRecorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
                recordedChunksRef.current.push(event.data);
            }
        };

        mediaRecorder.onstop = () => {
            const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
            const url = URL.createObjectURL(blob);
            addStory(url, 'video', 15);
            stopCamera();
        };

        mediaRecorder.start();
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
            mediaRecorderRef.current.stop();
        }
    };

    const takePhoto = () => {
        if (!cameraVideoRef.current) return;

        const canvas = document.createElement('canvas');
        const video = cameraVideoRef.current;
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);

        canvas.toBlob((blob) => {
            const url = URL.createObjectURL(blob);
            addStory(url, 'image', 5);
            stopCamera();
        }, 'image/jpeg', 0.8);
    };

    const handleAddStory = () => {
        startCamera();
    };

    const formatTime = (createdAt) => {
        const created = new Date(createdAt);
        const now = new Date();
        const diffHours = (now - created) / (1000 * 60 * 60);
        if (diffHours < 1) return `${Math.floor(diffHours * 60)}m`;
        if (diffHours < 24) return `${Math.floor(diffHours)}h`;
        return '24h+';
    };

    const openStory = (story, index) => {
        setSelectedStory(story);
        setCurrentStoryIndex(index);
        setProgress(0);
        setIsPlaying(true);
    };

    const closeStory = () => {
        setSelectedStory(null);
        setCurrentStoryIndex(0);
        setProgress(0);
        setIsPlaying(true);
        if (progressInterval.current) clearInterval(progressInterval.current);
        if (videoRef.current) videoRef.current.pause();
    };

    const nextStory = () => {
        if (currentStoryIndex < allStories.length - 1) {
            setCurrentStoryIndex(prev => prev + 1);
            setSelectedStory(allStories[currentStoryIndex + 1]);
            setProgress(0);
            setIsPlaying(true);
        } else {
            closeStory();
        }
    };

    const previousStory = () => {
        if (currentStoryIndex > 0) {
            setCurrentStoryIndex(prev => prev - 1);
            setSelectedStory(allStories[currentStoryIndex - 1]);
            setProgress(0);
            setIsPlaying(true);
        }
    };

    const togglePlayPause = () => {
        if (selectedStory?.mediaType === 'video' && videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Progress bar animation
    useEffect(() => {
        if (selectedStory && isPlaying) {
            if (progressInterval.current) clearInterval(progressInterval.current);

            progressInterval.current = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        clearInterval(progressInterval.current);
                        nextStory();
                        return 0;
                    }
                    return prev + (100 / (selectedStory.duration * 10));
                });
            }, 100);
        } else {
            if (progressInterval.current) clearInterval(progressInterval.current);
        }

        return () => {
            if (progressInterval.current) clearInterval(progressInterval.current);
        };
    }, [selectedStory, isPlaying, currentStoryIndex]);

    // Handle video end
    useEffect(() => {
        if (selectedStory?.mediaType === 'video' && videoRef.current) {
            const handleVideoEnd = () => nextStory();
            videoRef.current.addEventListener('ended', handleVideoEnd);
            return () => {
                if (videoRef.current) videoRef.current.removeEventListener('ended', handleVideoEnd);
            };
        }
    }, [selectedStory]);

    const handleVideoClick = () => {
        if (selectedStory?.mediaType === 'video') togglePlayPause();
    };

    // Cleanup media streams
    useEffect(() => {
        return () => {
            if (mediaStream) mediaStream.getTracks().forEach(track => track.stop());
        };
    }, [mediaStream]);

    // Inline styles
    const styles = {
        storiesContainer: {
            background: 'white',
            border: '1px solid #dbdbdb',
            borderRadius: '8px',
            padding: '16px',
            marginBottom: '20px',
            overflowX: 'auto',
            WebkitOverflowScrolling: 'touch'
        },
        storiesScroll: {
            display: 'flex',
            gap: '16px',
            padding: '4px'
        },
        storyItem: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'pointer',
            minWidth: '66px',
            textDecoration: 'none'
        },
        storyAvatar: {
            width: '66px',
            height: '66px',
            borderRadius: '50%',
            padding: '2px',
            marginBottom: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)'
        },
        yourStoryAvatar: {
            background: '#e0e0e0',
            border: '2px solid #c7c7c7'
        },
        addStoryAvatar: {
            background: 'white',
            border: '2px dashed #dbdbdb'
        },
        avatarImage: {
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover',
            border: '2px solid white'
        },
        addIcon: {
            position: 'absolute',
            bottom: '0',
            right: '0',
            width: '20px',
            height: '20px',
            background: '#0095f6',
            borderRadius: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '16px',
            fontWeight: 'bold',
            border: '2px solid white'
        },
        storyUsername: {
            fontSize: '12px',
            color: '#262626',
            textAlign: 'center',
            maxWidth: '66px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            marginTop: '4px'
        },
        storyTime: {
            fontSize: '10px',
            color: '#8e8e8e',
            textAlign: 'center',
            marginTop: '2px'
        },
        // Camera Styles
        cameraOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        },
        cameraContent: {
            background: '#000',
            borderRadius: '20px',
            width: '100%',
            maxWidth: '400px',
            height: '80vh',
            maxHeight: '700px',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
        },
        cameraHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '15px',
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '20px 20px 0 0'
        },
        closeCameraBtn: {
            background: 'none',
            border: 'none',
            color: 'white',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '5px'
        },
        cameraTitle: {
            color: 'white',
            fontWeight: '600',
            fontSize: '16px'
        },
        cameraPreview: {
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            overflow: 'hidden'
        },
        cameraVideo: {
            width: '100%',
            height: '100%',
            objectFit: 'cover'
        },
        cameraControls: {
            display: 'flex',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: '20px',
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '0 0 20px 20px'
        },
        cameraControlBtn: {
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white'
        },
        cameraCaptureBtn: {
            background: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '70px',
            height: '70px',
            fontSize: '24px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: '#0095f6',
            border: '4px solid rgba(255, 255, 255, 0.3)'
        },
        // Story Viewer Styles
        storyViewerOverlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.9)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000
        },
        storyViewerContent: {
            position: 'relative',
            width: '100%',
            maxWidth: '400px',
            height: '80vh',
            maxHeight: '700px',
            background: '#000',
            borderRadius: '20px',
            overflow: 'hidden'
        },
        storyProgressBars: {
            display: 'flex',
            gap: '4px',
            padding: '15px',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            zIndex: 10
        },
        progressBarContainer: {
            flex: 1,
            height: '3px',
            background: 'rgba(255, 255, 255, 0.3)',
            borderRadius: '2px',
            overflow: 'hidden'
        },
        progressFill: {
            height: '100%',
            background: 'white',
            transition: 'width 0.1s linear'
        },
        storyHeader: {
            position: 'absolute',
            top: '30px',
            left: 0,
            right: 0,
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 15px',
            zIndex: 10
        },
        storyUserInfo: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            color: 'white'
        },
        userInfoImage: {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            border: '2px solid #0095f6'
        },
        storyTimeAgo: {
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.7)'
        },
        closeStoryBtn: {
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '30px',
            height: '30px',
            color: 'white',
            fontSize: '18px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        },
        storyMediaContainer: {
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative'
        },
        storyMedia: {
            width: '100%',
            height: '100%',
            objectFit: 'contain'
        },
        videoControlsOverlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.3)'
        },
        playPauseBtn: {
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '60px',
            height: '60px',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(10px)'
        },
        storyCaption: {
            position: 'absolute',
            bottom: '80px',
            left: 0,
            right: 0,
            padding: '15px',
            color: 'white',
            textAlign: 'center',
            background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.5))'
        },
        storyActions: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '15px',
            display: 'flex',
            gap: '10px',
            alignItems: 'center',
            background: 'rgba(0, 0, 0, 0.5)'
        },
        storyReplyInput: {
            flex: 1,
            padding: '10px 15px',
            border: 'none',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.9)',
            fontSize: '14px'
        },
        storyActionButtons: {
            display: 'flex',
            gap: '10px'
        },
        storyActionBtn: {
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            padding: '5px'
        },
        storyNavBtn: {
            position: 'absolute',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255, 255, 255, 0.2)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backdropFilter: 'blur(10px)'
        }
    };

    return (
        <>
            <div style={styles.storiesContainer}>
                <div style={styles.storiesScroll}>
                    {/* Add Story Circle */}
                    <div style={styles.storyItem} onClick={handleAddStory}>
                        <div style={{ ...styles.storyAvatar, ...styles.addStoryAvatar, position: 'relative' }}>
                            <img
                                src={user.avatar_url}
                                alt="Your story"
                                style={styles.avatarImage}
                            />
                            <div style={styles.addIcon}>+</div>
                        </div>
                        <div style={styles.storyUsername}>Your Story</div>
                    </div>

                    {/* Other Users' Stories */}
                    {allStories.slice(0, 6).map((story, index) => (
                        <div key={story.id} style={styles.storyItem} onClick={() => openStory(story, index)}>
                            <div style={styles.storyAvatar}>
                                <img
                                    src={story.userAvatar}
                                    alt={`${story.username}'s story`}
                                    style={styles.avatarImage}
                                />
                            </div>
                            <div style={styles.storyUsername}>
                                {story.username}
                            </div>
                            <div style={styles.storyTime}>{formatTime(story.createdAt)}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Camera Modal */}
            {showCamera && (
                <div style={styles.cameraOverlay} onClick={stopCamera}>
                    <div style={styles.cameraContent} onClick={(e) => e.stopPropagation()}>
                        <div style={styles.cameraHeader}>
                            <button style={styles.closeCameraBtn} onClick={stopCamera}>×</button>
                            <div style={styles.cameraTitle}>Create Story</div>
                        </div>

                        <div style={styles.cameraPreview}>
                            <video
                                ref={cameraVideoRef}
                                autoPlay
                                muted
                                playsInline
                                style={styles.cameraVideo}
                            />
                        </div>

                        <div style={styles.cameraControls}>
                            <button style={styles.cameraControlBtn}>
                                🔄
                            </button>

                            <button
                                style={styles.cameraCaptureBtn}
                                onMouseDown={startRecording}
                                onMouseUp={stopRecording}
                                onTouchStart={startRecording}
                                onTouchEnd={stopRecording}
                            >
                                ●
                            </button>

                            <button style={styles.cameraControlBtn} onClick={takePhoto}>
                                📸
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Story Viewer Modal */}
            {selectedStory && (
                <div style={styles.storyViewerOverlay} onClick={closeStory}>
                    <div style={styles.storyViewerContent} onClick={(e) => e.stopPropagation()}>
                        {/* Progress Bars */}
                        <div style={styles.storyProgressBars}>
                            {allStories.map((story, index) => (
                                <div key={`${story.id}_${index}_progress`} style={styles.progressBarContainer}>
                                    <div style={{
                                        ...styles.progressBarContainer,
                                        background: index < currentStoryIndex ? 'white' : 'rgba(255, 255, 255, 0.3)'
                                    }}>
                                        {index === currentStoryIndex && (
                                            <div
                                                style={{ ...styles.progressFill, width: `${progress}%` }}
                                            ></div>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Story Header */}
                        <div style={styles.storyHeader}>
                            <div style={styles.storyUserInfo}>
                                <img
                                    src={selectedStory.userAvatar}
                                    alt={selectedStory.username}
                                    style={styles.userInfoImage}
                                />
                                <span>{selectedStory.username}</span>
                                <span style={styles.storyTimeAgo}>{formatTime(selectedStory.createdAt)}</span>
                            </div>
                            <button style={styles.closeStoryBtn} onClick={closeStory}>×</button>
                        </div>

                        {/* Story Media */}
                        <div style={styles.storyMediaContainer} onClick={handleVideoClick}>
                            {selectedStory.mediaType === 'video' ? (
                                <video
                                    ref={videoRef}
                                    controls={false}
                                    autoPlay={isPlaying}
                                    muted
                                    style={styles.storyMedia}
                                    playsInline
                                >
                                    <source src={selectedStory.mediaUrl} type="video/mp4" />
                                </video>
                            ) : (
                                <img
                                    src={selectedStory.mediaUrl}
                                    alt="Story"
                                    style={styles.storyMedia}
                                />
                            )}

                            {/* Play/Pause Overlay for Videos */}
                            {selectedStory.mediaType === 'video' && (
                                <div style={styles.videoControlsOverlay}>
                                    <button
                                        style={styles.playPauseBtn}
                                        onClick={togglePlayPause}
                                    >
                                        {isPlaying ? '❚❚' : '▶'}
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Story Caption */}
                        {selectedStory.caption && (
                            <div style={styles.storyCaption}>
                                {selectedStory.caption}
                            </div>
                        )}

                        {/* Story Actions */}
                        <div style={styles.storyActions}>
                            <input
                                type="text"
                                placeholder="Send message"
                                style={styles.storyReplyInput}
                            />
                            <div style={styles.storyActionButtons}>
                                <button style={styles.storyActionBtn}>❤️</button>
                                <button style={styles.storyActionBtn}>💬</button>
                                <button style={styles.storyActionBtn}>📤</button>
                            </div>
                        </div>

                        {/* Navigation Arrows */}
                        <button
                            style={{ ...styles.storyNavBtn, left: '15px' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                previousStory();
                            }}
                            disabled={currentStoryIndex === 0}
                        >
                            ‹
                        </button>
                        <button
                            style={{ ...styles.storyNavBtn, right: '15px' }}
                            onClick={(e) => {
                                e.stopPropagation();
                                nextStory();
                            }}
                            disabled={currentStoryIndex === allStories.length - 1}
                        >
                            ›
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}





