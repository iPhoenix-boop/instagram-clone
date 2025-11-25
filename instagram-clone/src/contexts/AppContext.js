


// contexts/AppContext.js
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { useAuth } from './AuthContext';
import { populateUserData } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
    const { user } = useAuth();
    const [posts, setPosts] = useState([]);
    const [stories, setStories] = useState([]);
    const [savedPosts, setSavedPosts] = useState([]);
    const [allPosts, setAllPosts] = useState([]);

    // Default stories data - wrapped in useMemo to prevent recreation on every render
    const defaultStories = useMemo(() => [
        {
            id: 'story_1',
            userId: '2',
            username: 'sarahsmith',
            imageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
            mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
            mediaType: 'video',
            createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
            views: []
        },
        {
            id: 'story_2',
            userId: '3',
            username: 'mikejohnson',
            imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
            mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
            mediaType: 'video',
            createdAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
            views: []
        },
        {
            id: 'story_3',
            userId: '4',
            username: 'emilywilson',
            imageUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
            mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
            mediaType: 'video',
            createdAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
            views: []
        },
        {
            id: 'story_4',
            userId: '5',
            username: 'davidbrown',
            imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
            mediaUrl: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=400&h=700&fit=crop',
            mediaType: 'image',
            createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
            views: []
        },
        {
            id: 'story_5',
            userId: '6',
            username: 'lisachen',
            imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
            mediaUrl: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=700&fit=crop',
            mediaType: 'image',
            createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
            views: []
        }
    ], []); // Empty dependency array means this only gets created once

    // Load data from localStorage and mock data on mount
    useEffect(() => {
        if (user) {
            try {
                const savedPostsData = JSON.parse(localStorage.getItem(`savedPosts_${user.id}`)) || [];
                const userPostsData = JSON.parse(localStorage.getItem(`posts_${user.id}`)) || [];
                const storiesData = JSON.parse(localStorage.getItem(`stories_${user.id}`)) || [];

                // Clean saved posts - remove any with base64 images
                const cleanSavedPosts = savedPostsData.map(post => ({
                    ...post,
                    image_url: post.image_url && post.image_url.startsWith('data:')
                        ? 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&h=500&fit=crop'
                        : post.image_url
                }));

                // Clean user posts - remove any with base64 images
                const cleanUserPosts = userPostsData.map(post => ({
                    ...post,
                    image_url: post.image_url && post.image_url.startsWith('data:')
                        ? 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&h=500&fit=crop'
                        : post.image_url
                }));

                // Combine default stories with user stories
                const allStories = [...defaultStories, ...storiesData];

                setSavedPosts(cleanSavedPosts);
                setPosts(cleanUserPosts);
                setStories(allStories);

                // Combine mock posts with user posts
                const populatedMockPosts = populateUserData().posts;
                setAllPosts([...cleanUserPosts, ...populatedMockPosts]);
            } catch (error) {
                console.warn('Error loading data from localStorage:', error);
                // Initialize with empty data if loading fails
                setSavedPosts([]);
                setPosts([]);
                setStories(defaultStories);
                setAllPosts(populateUserData().posts);
            }
        }
    }, [user, defaultStories]); // Added defaultStories to dependencies

    // Save to localStorage whenever data changes - with error handling
    useEffect(() => {
        if (user) {
            try {
                // Only save essential data, not images
                const postsToSave = posts.map(post => ({
                    ...post,
                    // Don't save base64 images
                    image_url: post.image_url && post.image_url.startsWith('data:')
                        ? null
                        : post.image_url
                }));
                localStorage.setItem(`posts_${user.id}`, JSON.stringify(postsToSave));
            } catch (error) {
                console.warn('Error saving posts to localStorage:', error);
                // Clear localStorage if it's full
                localStorage.removeItem(`posts_${user.id}`);
            }
        }
    }, [posts, user]);

    useEffect(() => {
        if (user) {
            try {
                // Only save essential data for saved posts
                const savedToSave = savedPosts.map(post => ({
                    ...post,
                    // Don't save base64 images
                    image_url: post.image_url && post.image_url.startsWith('data:')
                        ? null
                        : post.image_url
                }));
                localStorage.setItem(`savedPosts_${user.id}`, JSON.stringify(savedToSave));
            } catch (error) {
                console.warn('Error saving saved posts to localStorage:', error);
                localStorage.removeItem(`savedPosts_${user.id}`);
            }
        }
    }, [savedPosts, user]);

    useEffect(() => {
        if (user) {
            try {
                // Only save user-created stories, not default ones
                const userStories = stories.filter(story => !defaultStories.some(defaultStory => defaultStory.id === story.id));
                localStorage.setItem(`stories_${user.id}`, JSON.stringify(userStories));
            } catch (error) {
                console.warn('Error saving stories to localStorage:', error);
                localStorage.removeItem(`stories_${user.id}`);
            }
        }
    }, [stories, user, defaultStories]); // Added defaultStories to dependencies

    // Update allPosts when posts change
    useEffect(() => {
        const populatedMockPosts = populateUserData().posts;
        setAllPosts([...posts, ...populatedMockPosts]);
    }, [posts]); // Removed unused populateUserData dependency

    // Auto-delete expired stories (24 hours) - only user stories
    useEffect(() => {
        const interval = setInterval(() => {
            setStories(prev => {
                const now = new Date().getTime();
                const validStories = prev.filter(story => {
                    // Keep default stories forever
                    if (defaultStories.some(defaultStory => defaultStory.id === story.id)) {
                        return true;
                    }
                    // Check user stories for expiration
                    const storyTime = new Date(story.createdAt).getTime();
                    return (now - storyTime) < 24 * 60 * 60 * 1000; // 24 hours
                });

                if (validStories.length !== prev.length) {
                    return validStories;
                }
                return prev;
            });
        }, 60000); // Check every minute

        return () => clearInterval(interval);
    }, [defaultStories]); // Added defaultStories to dependencies

    // Add a new story
    const addStory = (mediaUrl, mediaType = 'image') => {
        const newStory = {
            id: `user_story_${Date.now()}`,
            userId: user.id,
            username: user.username,
            imageUrl: user.avatar_url,
            mediaUrl,
            mediaType,
            createdAt: new Date().toISOString(),
            views: []
        };

        setStories(prev => [newStory, ...prev]);
        return newStory;
    };

    // Save a post
    const savePost = (post) => {
        const isAlreadySaved = savedPosts.some(saved => saved.id === post.id);

        if (!isAlreadySaved) {
            const savedPost = {
                ...post,
                savedAt: new Date().toISOString()
            };
            setSavedPosts(prev => [savedPost, ...prev]);
            return true;
        }
        return false;
    };

    // Unsave a post
    const unsavePost = (postId) => {
        setSavedPosts(prev => prev.filter(post => post.id !== postId));
    };

    // Check if post is saved
    const isPostSaved = (postId) => {
        return savedPosts.some(saved => saved.id === postId);
    };

    // Add a new post - PREVENT BASE64 STORAGE
    const addPost = (postData) => {
        // Convert base64 to URL to avoid localStorage issues
        const imageUrl = postData.imageUrl && postData.imageUrl.startsWith('data:')
            ? 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?w=500&h=500&fit=crop' // Fallback image
            : postData.imageUrl;

        const newPost = {
            id: Date.now().toString(),
            user_id: user.id,
            user: user,
            content: postData.content,
            image_url: imageUrl, // Use URL instead of base64
            created_at: new Date().toISOString(),
            likes: 0,
            comments: 0,
            shares: 0,
            is_liked: false,
            is_saved: false
        };

        setPosts(prev => [newPost, ...prev]);
        return newPost;
    };

    // Get user's posts for profile
    const getUserPosts = () => {
        return posts.filter(post => post.user_id === user.id);
    };

    // Like a post
    const likePost = (postId) => {
        setAllPosts(prev => prev.map(post =>
            post.id === postId
                ? {
                    ...post,
                    likes: post.is_liked ? post.likes - 1 : post.likes + 1,
                    is_liked: !post.is_liked
                }
                : post
        ));
    };

    // Add comment to post
    const addCommentToPost = (postId, comment) => {
        setAllPosts(prev => prev.map(post =>
            post.id === postId
                ? { ...post, comments: post.comments + 1 }
                : post
        ));
    };

    // Share a post
    const sharePost = (postId) => {
        setAllPosts(prev => prev.map(post =>
            post.id === postId
                ? { ...post, shares: post.shares + 1 }
                : post
        ));
    };

    const value = {
        posts: allPosts, // Return combined posts
        stories,
        savedPosts,
        addStory,
        addPost,
        savePost,
        unsavePost,
        isPostSaved,
        getUserPosts,
        likePost,
        addCommentToPost,
        sharePost
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};


