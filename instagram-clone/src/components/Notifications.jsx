import React, { useState } from 'react';
import './Notifications.css';

export default function Notifications() {
    const [activeTab, setActiveTab] = useState('all');

    // Sample notifications data exactly matching your image
    const notificationsData = [
        {
            id: '1',
            period: '7days',
            users: [
                {
                    username: 'navi__7',
                    avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
                    verified: false
                }
            ],
            message: 'is on Instagram. chakri__0 follows them.',
            timestamp: '2d',
            type: 'follow',
            hasFollowButton: true,
            is_read: false
        },
        {
            id: '2',
            period: '30days',
            users: [
                {
                    username: 'mr_sagar__',
                    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                    verified: false
                }
            ],
            message: 'is on Instagram. puppy_pavan_07 follows them.',
            timestamp: '1w',
            type: 'follow',
            hasFollowButton: true,
            is_read: false
        },
        {
            id: '3',
            period: '30days',
            users: [
                {
                    username: '_harijustin__',
                    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
                    verified: false
                }
            ],
            message: 'and 8 others are on Threads, an Instagram app. See what they\'re saying.',
            timestamp: '2w',
            type: 'threads',
            hasFollowButton: false,
            is_read: true
        }
    ];

    // Group notifications by period
    const last7Days = notificationsData.filter(n => n.period === '7days');
    const last30Days = notificationsData.filter(n => n.period === '30days');

    const formatUsernames = (users, message) => {
        if (users.length === 1) {
            return (
                <>
                    <strong>{users[0].username}</strong> {message}
                </>
            );
        } else {
            return (
                <>
                    <strong>{users[0].username}</strong> {message}
                </>
            );
        }
    };

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'follow':
                return (
                    <div className="notification-icon follow">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#0095f6" />
                        </svg>
                    </div>
                );
            case 'threads':
                return (
                    <div className="notification-icon threads">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M18 2H6C4.9 2 4 2.9 4 4V22L8 18H18C19.1 18 20 17.1 20 16V4C20 2.9 19.1 2 18 2Z" fill="#000000" />
                        </svg>
                    </div>
                );
            default:
                return (
                    <div className="notification-icon default">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 22C13.1 22 14 21.1 14 20H10C10 21.1 10.9 22 12 22ZM18 16V11C18 7.93 16.37 5.36 13.5 4.68V4C13.5 3.17 12.83 2.5 12 2.5C11.17 2.5 10.5 3.17 10.5 4V4.68C7.64 5.36 6 7.92 6 11V16L4 18V19H20V18L18 16Z" fill="#ed4956" />
                        </svg>
                    </div>
                );
        }
    };

    return (
        <div className="instagram-notifications">
            {/* Header */}
            <div className="notifications-header">
                <h2>Notifications</h2>
                <button className="mark-all-read">
                    Mark all as read
                </button>
            </div>

            {/* Tabs */}
            <div className="notifications-tabs">
                <button
                    className={`tab ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    All
                </button>
                <button
                    className={`tab ${activeTab === 'unread' ? 'active' : ''}`}
                    onClick={() => setActiveTab('unread')}
                >
                    Unread
                </button>
            </div>

            {/* Notifications List */}
            <div className="notifications-list">
                {/* Last 7 Days Section */}
                {last7Days.length > 0 && (
                    <div className="notifications-section">
                        <div className="section-header">Last 7 days</div>
                        {last7Days.map(notification => (
                            <div
                                key={notification.id}
                                className={`notification-item ${notification.is_read ? '' : 'unread'}`}
                            >
                                {/* User Avatar */}
                                <div className="user-avatar-small">
                                    <img
                                        src={notification.users[0].avatar_url}
                                        alt={notification.users[0].username}
                                        className="avatar-image-small"
                                        onError={(e) => {
                                            e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face';
                                        }}
                                    />
                                    {notification.users[0].verified && (
                                        <div className="verified-small">✓</div>
                                    )}
                                </div>

                                {/* Notification Content */}
                                <div className="notification-content">
                                    <div className="notification-text">
                                        <div className="usernames">
                                            {formatUsernames(notification.users, notification.message)}
                                        </div>
                                        <div className="timestamp">{notification.timestamp}</div>
                                    </div>

                                    {/* Follow Button */}
                                    {notification.hasFollowButton && (
                                        <button className="follow-btn">
                                            Follow
                                        </button>
                                    )}
                                </div>

                                {/* Unread Indicator */}
                                {!notification.is_read && <div className="unread-indicator"></div>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Last 30 Days Section */}
                {last30Days.length > 0 && (
                    <div className="notifications-section">
                        <div className="section-header">Last 30 days</div>
                        {last30Days.map(notification => (
                            <div
                                key={notification.id}
                                className={`notification-item ${notification.is_read ? '' : 'unread'}`}
                            >
                                {/* User Avatar for single user notifications */}
                                {notification.type !== 'threads' ? (
                                    <div className="user-avatar-small">
                                        <img
                                            src={notification.users[0].avatar_url}
                                            alt={notification.users[0].username}
                                            className="avatar-image-small"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face';
                                            }}
                                        />
                                        {notification.users[0].verified && (
                                            <div className="verified-small">✓</div>
                                        )}
                                    </div>
                                ) : (
                                    /* Threads notification with multiple users */
                                    <div className="users-avatars">
                                        <div className="user-avatar-small">
                                            <img
                                                src={notification.users[0].avatar_url}
                                                alt={notification.users[0].username}
                                                className="avatar-image-small"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop&crop=face';
                                                }}
                                            />
                                        </div>
                                        <div className="more-users">+8</div>
                                    </div>
                                )}

                                {/* Notification Content */}
                                <div className="notification-content">
                                    <div className="notification-text">
                                        <div className="usernames">
                                            {formatUsernames(notification.users, notification.message)}
                                        </div>
                                        <div className="timestamp">{notification.timestamp}</div>
                                    </div>

                                    {/* Follow Button */}
                                    {notification.hasFollowButton && (
                                        <button className="follow-btn">
                                            Follow
                                        </button>
                                    )}
                                </div>

                                {/* Unread Indicator */}
                                {!notification.is_read && <div className="unread-indicator"></div>}
                            </div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {notificationsData.length === 0 && (
                    <div className="empty-notifications">
                        <div className="empty-icon">🔔</div>
                        <h3>No notifications yet</h3>
                        <p>When you get notifications, they'll show up here.</p>
                    </div>
                )}
            </div>
        </div>
    );
}