
// Enhanced mock data for Instagram clone
export const mockUsers = [
    {
        id: '1',
        username: 'johndoe',
        full_name: 'John Doe',
        avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        bio: 'Photographer & Traveler 🌍 | Capturing moments around the world',
        followers: 12543,
        following: 356,
        posts: 45,
        is_following: true
    },
    {
        id: '2',
        username: 'sarahsmith',
        full_name: 'Sarah Smith',
        avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
        bio: 'Digital Creator 🎨 | Coffee lover ☕ | Living life in pixels',
        followers: 8921,
        following: 412,
        posts: 23,
        is_following: true
    },
    {
        id: '3',
        username: 'mikejohnson',
        full_name: 'Mike Johnson',
        avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        bio: 'Fitness Coach 💪 | Healthy lifestyle | Personal trainer',
        followers: 21500,
        following: 289,
        posts: 67,
        is_following: false
    },
    {
        id: '4',
        username: 'emilywilson',
        full_name: 'Emily Wilson',
        avatar_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        bio: 'Food Blogger 🍕 | Recipe developer | Food photographer',
        followers: 15670,
        following: 523,
        posts: 34,
        is_following: false
    },
    {
        id: '5',
        username: 'davidbrown',
        full_name: 'David Brown',
        avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
        bio: 'Tech Enthusiast 💻 | Gadget reviewer | Early adopter',
        followers: 8920,
        following: 198,
        posts: 28,
        is_following: true
    },
    {
        id: '6',
        username: 'lisachen',
        full_name: 'Lisa Chen',
        avatar_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
        bio: 'Artist 🎨 | Illustrator | Digital art creator',
        followers: 23400,
        following: 156,
        posts: 89,
        is_following: false
    },
    {
        id: '7',
        username: 'alexrodriguez',
        full_name: 'Alex Rodriguez',
        avatar_url: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
        bio: 'Adventure Seeker 🏔️ | Mountain lover | Outdoor enthusiast',
        followers: 18900,
        following: 345,
        posts: 56,
        is_following: true
    },
    {
        id: '8',
        username: 'sophiamartinez',
        full_name: 'Sophia Martinez',
        avatar_url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face',
        bio: 'Fashion Blogger 👗 | Style inspiration | Trend setter',
        followers: 31200,
        following: 478,
        posts: 124,
        is_following: false
    }
];

export const mockPosts = [
    {
        id: '1',
        user_id: '1',
        content: 'Beautiful sunset at the beach today! 🌅 The colors were absolutely breathtaking. #sunset #beach #vacation #travel',
        image_url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&h=500&fit=crop',
        created_at: '2024-01-15T10:30:00Z',
        likes: 2450,
        comments: 134,
        shares: 89,
        is_liked: false,
        is_saved: false,
        user: null
    },
    {
        id: '2',
        user_id: '2',
        content: 'Morning coffee and coding session ☕💻 Working on a new project today! #developerlife #coding #coffee #programming',
        image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=500&h=500&fit=crop',
        created_at: '2024-01-15T08:15:00Z',
        likes: 1890,
        comments: 89,
        shares: 45,
        is_liked: true,
        is_saved: true,
        user: null
    },
    {
        id: '3',
        user_id: '3',
        content: 'New personal best at the gym today! 💪 225lbs bench press! So proud of the progress. #fitness #workout #gains #gym',
        image_url: 'https://images.unsplash.com/photo-1534367507877-0edd93bd013b?w=500&h=500&fit=crop',
        created_at: '2024-01-14T18:45:00Z',
        likes: 3120,
        comments: 245,
        shares: 167,
        is_liked: false,
        is_saved: false,
        user: null
    },
    {
        id: '4',
        user_id: '4',
        content: 'Homemade pizza night! 🍕 Made from scratch with fresh ingredients. What are your favorite toppings? #pizza #food #cooking #homemade',
        image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=500&h=500&fit=crop',
        created_at: '2024-01-14T20:30:00Z',
        likes: 4210,
        comments: 367,
        shares: 234,
        is_liked: false,
        is_saved: true,
        user: null
    },
    {
        id: '5',
        user_id: '5',
        content: 'Just unboxed the latest smartphone! The camera quality is incredible. Full review coming soon! 📱 #tech #gadgets #unboxing',
        image_url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop',
        created_at: '2024-01-14T14:20:00Z',
        likes: 1780,
        comments: 129,
        shares: 78,
        is_liked: true,
        is_saved: false,
        user: null
    },
    {
        id: '6',
        user_id: '6',
        content: 'New digital painting I just finished! Inspired by cyberpunk aesthetics. What do you think? 🎨 #art #digitalart #cyberpunk',
        image_url: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=500&h=500&fit=crop',
        created_at: '2024-01-13T16:45:00Z',
        likes: 3560,
        comments: 278,
        shares: 156,
        is_liked: false,
        is_saved: false,
        user: null
    },
    {
        id: '7',
        user_id: '7',
        content: 'Hiking adventure in the mountains today! The view from the top was absolutely worth it. 🏔️ #hiking #adventure #mountains',
        image_url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500&h=500&fit=crop',
        created_at: '2024-01-13T12:30:00Z',
        likes: 2890,
        comments: 167,
        shares: 89,
        is_liked: true,
        is_saved: true,
        user: null
    },
    {
        id: '8',
        user_id: '8',
        content: 'Spring fashion collection preview! Loving these pastel colors for the new season. 👗 #fashion #style #springfashion',
        image_url: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=500&h=500&fit=crop',
        created_at: '2024-01-12T17:20:00Z',
        likes: 5120,
        comments: 423,
        shares: 267,
        is_liked: false,
        is_saved: false,
        user: null
    },
    {
        id: '9',
        user_id: '1',
        content: 'City lights at night always fascinate me. There\'s something magical about urban landscapes after dark. 🌃 #city #night #urban',
        image_url: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&h=500&fit=crop',
        created_at: '2024-01-12T21:15:00Z',
        likes: 1980,
        comments: 156,
        shares: 67,
        is_liked: false,
        is_saved: false,
        user: null
    },
    {
        id: '10',
        user_id: '3',
        content: 'Meal prep Sunday! Healthy eating for the week ahead. 🥗 #mealprep #healthylifestyle #fitnessfood',
        image_url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=500&h=500&fit=crop',
        created_at: '2024-01-12T11:45:00Z',
        likes: 2340,
        comments: 189,
        shares: 98,
        is_liked: true,
        is_saved: true,
        user: null
    },
    {
        id: '11',
        user_id: '4',
        content: 'Freshly baked cookies! Nothing beats the smell of cookies straight from the oven. 🍪 #baking #cookies #dessert',
        image_url: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?w=500&h=500&fit=crop',
        created_at: '2024-01-11T19:30:00Z',
        likes: 3670,
        comments: 278,
        shares: 145,
        is_liked: false,
        is_saved: false,
        user: null
    },
    {
        id: '12',
        user_id: '2',
        content: 'Late night coding session with some lo-fi beats. Perfect atmosphere for productivity. 🎵 #coding #developer #programming',
        image_url: 'https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=500&fit=crop',
        created_at: '2024-01-11T23:45:00Z',
        likes: 1560,
        comments: 89,
        shares: 34,
        is_liked: true,
        is_saved: false,
        user: null
    }
];

export const mockReels = [
    {
        id: '1',
        user_id: '1',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        caption: 'Neon lights vibes in downtown! 🌟 The city never sleeps. #nightlife #city #neon #urban',
        likes: 12000,
        comments: 489,
        views: 150000,
        is_liked: false,
        audio_track: 'Night Drive - Synthwave',
        user: null
    },
    {
        id: '2',
        user_id: '2',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        caption: 'Spring is here! 🌸 Cherry blossoms are blooming everywhere. So peaceful! #nature #flowers #spring #blossom',
        likes: 8900,
        comments: 345,
        views: 120000,
        is_liked: true,
        audio_track: 'Spring Morning - Acoustic',
        user: null
    },
    {
        id: '3',
        user_id: '3',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        caption: 'Skating Sunday! 🛹 Perfect weather for some tricks at the park. #skateboard #weekend #sports',
        likes: 15600,
        comments: 678,
        views: 250000,
        is_liked: false,
        audio_track: 'Urban Beats - Hip Hop',
        user: null
    },
    {
        id: '4',
        user_id: '4',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        caption: 'Cooking up something delicious! 🍳 Secret family recipe coming your way! #cooking #food #recipe',
        likes: 21000,
        comments: 934,
        views: 320000,
        is_liked: false,
        audio_track: 'Kitchen Jazz - Bossa Nova',
        user: null
    },
    {
        id: '5',
        user_id: '5',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        caption: 'Tech unboxing time! 📦 First impressions of the new flagship phone. #tech #gadgets #unboxing',
        likes: 9800,
        comments: 456,
        views: 180000,
        is_liked: true,
        audio_track: 'Digital Dreams - Electronic',
        user: null
    },
    {
        id: '6',
        user_id: '6',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        caption: 'Time-lapse of my latest painting! 🎨 From blank canvas to finished piece. #art #painting #timelapse',
        likes: 18700,
        comments: 723,
        views: 280000,
        is_liked: false,
        audio_track: 'Creative Flow - Ambient',
        user: null
    },
    {
        id: '7',
        user_id: '7',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        caption: 'Ocean waves crashing against the rocks. So therapeutic! 🌊 #ocean #waves #nature #peaceful',
        likes: 23400,
        comments: 867,
        views: 420000,
        is_liked: false,
        audio_track: 'Ocean Waves - Nature Sounds',
        user: null
    },
    {
        id: '8',
        user_id: '8',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        caption: 'Spring fashion lookbook! Loving these new arrivals. 👗 #fashion #model #style',
        likes: 18900,
        comments: 645,
        views: 380000,
        is_liked: true,
        audio_track: 'Runway Groove - Funk',
        user: null
    },
    {
        id: '9',
        user_id: '1',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        caption: 'Incredible volcanic eruption captured during my trip! 🌋 #volcano #nature #adventure',
        likes: 31200,
        comments: 1234,
        views: 560000,
        is_liked: false,
        audio_track: 'Epic Adventure - Orchestral',
        user: null
    },
    {
        id: '10',
        user_id: '3',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
        caption: 'Gym motivation! Push through the limits. 💪 #gym #workout #fitness',
        likes: 15600,
        comments: 567,
        views: 290000,
        is_liked: true,
        audio_track: 'Workout Energy - EDM',
        user: null
    },
    // Additional reels
    {
        id: '11',
        user_id: '4',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
        caption: 'Morning yoga session to start the day right! 🧘‍♀️ #yoga #wellness #morningroutine',
        likes: 14200,
        comments: 423,
        views: 210000,
        is_liked: false,
        audio_track: 'Morning Zen - Meditation',
        user: null
    },
    {
        id: '12',
        user_id: '5',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerMeltdowns.mp4',
        caption: 'Exploring hidden cafes in the city! ☕ #coffee #cafe #explore',
        likes: 9800,
        comments: 312,
        views: 165000,
        is_liked: true,
        audio_track: 'Coffee Shop - LoFi',
        user: null
    },
    {
        id: '13',
        user_id: '6',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        caption: 'Digital art process from sketch to final render ✨ #digitalart #process #art',
        likes: 22300,
        comments: 789,
        views: 340000,
        is_liked: false,
        audio_track: 'Digital Creation - Chill',
        user: null
    },
    {
        id: '14',
        user_id: '7',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        caption: 'Mountain biking through forest trails! 🌲 #mtb #adventure #outdoors',
        likes: 18700,
        comments: 534,
        views: 275000,
        is_liked: true,
        audio_track: 'Trail Mix - Indie Rock',
        user: null
    },
    {
        id: '15',
        user_id: '8',
        video_url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
        caption: 'Vintage fashion finds from local markets! 🎩 #vintage #fashion #thrifting',
        likes: 15600,
        comments: 467,
        views: 198000,
        is_liked: false,
        audio_track: 'Retro Vibes - Disco',
        user: null
    }
];

export const mockMessages = [
    {
        id: '1',
        conversation_id: '1',
        sender_id: '2',
        content: 'Hey! How are you doing?',
        created_at: '2024-01-15T10:30:00Z',
        is_read: true
    },
    {
        id: '2',
        conversation_id: '1',
        sender_id: 'current',
        content: 'I\'m good! Just working on some projects. How about you?',
        created_at: '2024-01-15T10:32:00Z',
        is_read: true
    },
    {
        id: '3',
        conversation_id: '1',
        sender_id: '2',
        content: 'Same here! Working on that React app we discussed.',
        created_at: '2024-01-15T10:35:00Z',
        is_read: true
    },
    {
        id: '4',
        conversation_id: '2',
        sender_id: '3',
        content: 'Loved your recent workout post! What\'s your routine?',
        created_at: '2024-01-15T09:15:00Z',
        is_read: true
    },
    {
        id: '5',
        conversation_id: '3',
        sender_id: '4',
        content: 'That pizza looked amazing! Can you share the recipe?',
        created_at: '2024-01-15T08:45:00Z',
        is_read: false
    }
];

export const mockConversations = [
    {
        id: '1',
        participant_ids: ['current', '2'],
        last_message: 'Same here! Working on that React app we discussed.',
        last_message_time: '2024-01-15T10:35:00Z',
        unread_count: 0,
        user: null
    },
    {
        id: '2',
        participant_ids: ['current', '3'],
        last_message: 'Loved your recent workout post! What\'s your routine?',
        last_message_time: '2024-01-15T09:15:00Z',
        unread_count: 0,
        user: null
    },
    {
        id: '3',
        participant_ids: ['current', '4'],
        last_message: 'That pizza looked amazing! Can you share the recipe?',
        last_message_time: '2024-01-15T08:45:00Z',
        unread_count: 1,
        user: null
    },
    {
        id: '4',
        participant_ids: ['current', '5'],
        last_message: 'The new phone looks great! How\'s the battery life?',
        last_message_time: '2024-01-14T16:20:00Z',
        unread_count: 0,
        user: null
    }
];

export const mockNotifications = [
    {
        id: '1',
        type: 'like',
        user_id: '2',
        post_id: '1',
        content: 'liked your post',
        created_at: '2024-01-15T11:00:00Z',
        is_read: false,
        user: null
    },
    {
        id: '2',
        type: 'comment',
        user_id: '3',
        post_id: '1',
        content: 'commented: "Amazing shot!"',
        created_at: '2024-01-15T10:45:00Z',
        is_read: false,
        user: null
    },
    {
        id: '3',
        type: 'follow',
        user_id: '4',
        content: 'started following you',
        created_at: '2024-01-15T09:30:00Z',
        is_read: true,
        user: null
    },
    {
        id: '4',
        type: 'like',
        user_id: '5',
        post_id: '2',
        content: 'liked your post',
        created_at: '2024-01-15T08:15:00Z',
        is_read: true,
        user: null
    }
];

// Current user data - Updated username to iphoenix
export const currentUser = {
    id: 'current',
    username: 'iphoenix',
    full_name: 'Phoenix',
    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
    bio: 'Welcome to my Instagram clone! 👋 Sharing my journey and moments here.',
    followers: 1342,
    following: 587,
    posts: 23
};

// Helper function to populate user data safely
export const populateUserData = () => {
    // Populate posts with user data safely
    const postsWithUsers = mockPosts.map(post => {
        const user = mockUsers.find(user => user.id === post.user_id);
        return {
            ...post,
            user: user || currentUser
        };
    });

    // Populate reels with user data safely
    const reelsWithUsers = mockReels.map(reel => {
        const user = mockUsers.find(user => user.id === reel.user_id);
        return {
            ...reel,
            user: user || currentUser
        };
    });

    // Populate conversations with user data
    const conversationsWithUsers = mockConversations.map(conversation => {
        const otherUserId = conversation.participant_ids.find(id => id !== 'current');
        const user = mockUsers.find(user => user.id === otherUserId);
        return {
            ...conversation,
            user: user || currentUser
        };
    });

    // Populate notifications with user data
    const notificationsWithUsers = mockNotifications.map(notification => {
        const user = mockUsers.find(user => user.id === notification.user_id);
        return {
            ...notification,
            user: user || currentUser
        };
    });

    return {
        posts: postsWithUsers,
        reels: reelsWithUsers,
        messages: mockMessages,
        conversations: conversationsWithUsers,
        notifications: notificationsWithUsers,
        users: mockUsers,
        currentUser
    };
};

// Theme context data
export const defaultTheme = {
    mode: 'light',
    colors: {
        primary: '#0095f6',
        background: '#ffffff',
        surface: '#fafafa',
        text: '#262626',
        textSecondary: '#8e8e8e',
        border: '#dbdbdb',
        error: '#ed4956',
        success: '#28a745'
    }
};

export const darkTheme = {
    mode: 'dark',
    colors: {
        primary: '#0095f6',
        background: '#000000',
        surface: '#121212',
        text: '#ffffff',
        textSecondary: '#a8a8a8',
        border: '#363636',
        error: '#ed4956',
        success: '#28a745'
    }
};