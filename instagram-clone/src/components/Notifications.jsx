import React, { useState } from 'react';
// import { useTranslation } from 'react-i18next'; // REMOVED

export default function Notifications() {
    // const { t } = useTranslation(); // REMOVED
    const [activeTab, setActiveTab] = useState('all');

    const notificationsData = [
        {
            id: '1', period: '7days',
            users: [{ username: 'navi__7', avatar_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face', verified: false }],
            message: `is on Instagram. chakri__0 follows them.`,
            timestamp: '2d', type: 'follow', hasFollowButton: true, is_read: false
        },
        {
            id: '2', period: '30days',
            users: [{ username: 'mr_sagar__', avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', verified: false }],
            message: `is on Instagram. puppy_pavan_07 follows them.`,
            timestamp: '1w', type: 'follow', hasFollowButton: true, is_read: false
        },
        {
            id: '3', period: '30days',
            users: [{ username: '_harijustin__', avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', verified: false }],
            message: `and others on Threads. See what they're saying.`,
            timestamp: '2w', type: 'threads', hasFollowButton: false, is_read: true
        }
    ];

    const last7Days = notificationsData.filter(n => n.period === '7days');
    const last30Days = notificationsData.filter(n => n.period === '30days');

    const formatUsernames = (users, message) => (
        <>
            <strong>{users[0].username}</strong> {message}
        </>
    );

    const styles = {
        container: { maxWidth: '600px', margin: '0 auto', padding: '20px 0' },
        header: {
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px',
            borderBottom: '1px solid #dbdbdb', backgroundColor: 'white'
        },
        markAllRead: {
            background: 'none', border: 'none', color: '#0095f6', fontSize: '14px',
            fontWeight: '600', cursor: 'pointer'
        },
        tabs: {
            display: 'flex', borderBottom: '1px solid #dbdbdb', backgroundColor: 'white'
        },
        tab: {
            flex: 1, background: 'none', border: 'none', padding: '16px', fontSize: '14px',
            fontWeight: '400', color: '#8e8e8e', cursor: 'pointer', transition: 'all 0.3s ease'
        },
        activeTab: {
            fontWeight: '600', color: '#262626', borderBottom: '2px solid #262626'
        },
        notificationItem: {
            display: 'flex', alignItems: 'center', padding: '16px', borderBottom: '1px solid #f0f0f0',
            backgroundColor: 'white', position: 'relative'
        },
        unreadItem: { backgroundColor: '#fafafa' },
        userAvatar: {
            width: '44px', height: '44px', borderRadius: '50%', marginRight: '12px',
            border: '2px solid #e1306c', padding: '2px'
        },
        avatarImage: { width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' },
        verified: {
            position: 'absolute', bottom: '-2px', right: '-2px', width: '14px', height: '14px',
            backgroundColor: '#0095f6', color: 'white', borderRadius: '50%', fontSize: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center'
        },
        notificationContent: { flex: 1 },
        timestamp: { fontSize: '12px', color: '#8e8e8e', marginTop: '4px' },
        followBtn: {
            background: '#0095f6', border: 'none', color: 'white', borderRadius: '8px',
            padding: '6px 16px', fontSize: '14px', fontWeight: '600', cursor: 'pointer'
        },
        unreadIndicator: {
            position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
            width: '8px', height: '8px', backgroundColor: '#0095f6', borderRadius: '50%'
        },
        sectionHeader: {
            padding: '16px', backgroundColor: '#fafafa', fontSize: '14px',
            fontWeight: '600', color: '#8e8e8e', borderBottom: '1px solid #dbdbdb'
        },
        emptyState: {
            textAlign: 'center', padding: '40px', color: '#8e8e8e'
        },
        emptyIcon: { fontSize: '48px', marginBottom: '16px' }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={{ margin: 0, fontSize: '20px' }}>Notifications</h2>
                <button style={styles.markAllRead}>Mark all as read</button>
            </div>

            <div style={styles.tabs}>
                {['all', 'unread'].map(tab => (
                    <button key={tab} onClick={() => setActiveTab(tab)}
                        style={{ ...styles.tab, ...(activeTab === tab ? styles.activeTab : {}) }}>
                        {tab === 'all' ? 'All' : 'Unread'}
                    </button>
                ))}
            </div>

            <div>
                {last7Days.length > 0 && (
                    <div>
                        <div style={styles.sectionHeader}>Last 7 days</div>
                        {last7Days.map(notification => (
                            <div key={notification.id} style={{ ...styles.notificationItem, ...(!notification.is_read ? styles.unreadItem : {}) }}>
                                <div style={{ position: 'relative' }}>
                                    <div style={styles.userAvatar}>
                                        <img src={notification.users[0].avatar_url} alt={notification.users[0].username} style={styles.avatarImage} />
                                    </div>
                                    {notification.users[0].verified && <div style={styles.verified}>✓</div>}
                                </div>
                                <div style={styles.notificationContent}>
                                    <div>{formatUsernames(notification.users, notification.message)}</div>
                                    <div style={styles.timestamp}>{notification.timestamp}</div>
                                </div>
                                {notification.hasFollowButton && <button style={styles.followBtn}>Follow</button>}
                                {!notification.is_read && <div style={styles.unreadIndicator} />}
                            </div>
                        ))}
                    </div>
                )}

                {last30Days.length > 0 && (
                    <div>
                        <div style={styles.sectionHeader}>Last 30 days</div>
                        {last30Days.map(notification => (
                            <div key={notification.id} style={{ ...styles.notificationItem, ...(!notification.is_read ? styles.unreadItem : {}) }}>
                                {notification.type !== 'threads' ? (
                                    <div style={{ position: 'relative' }}>
                                        <div style={styles.userAvatar}>
                                            <img src={notification.users[0].avatar_url} alt={notification.users[0].username} style={styles.avatarImage} />
                                        </div>
                                        {notification.users[0].verified && <div style={styles.verified}>✓</div>}
                                    </div>
                                ) : (
                                    <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                                        <div style={styles.userAvatar}>
                                            <img src={notification.users[0].avatar_url} alt={notification.users[0].username} style={styles.avatarImage} />
                                        </div>
                                        <div style={{ ...styles.userAvatar, marginLeft: '-8px', backgroundColor: '#f0f0f0', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: '600' }}>
                                            +8
                                        </div>
                                    </div>
                                )}
                                <div style={styles.notificationContent}>
                                    <div>{formatUsernames(notification.users, notification.message)}</div>
                                    <div style={styles.timestamp}>{notification.timestamp}</div>
                                </div>
                                {notification.hasFollowButton && <button style={styles.followBtn}>Follow</button>}
                                {!notification.is_read && <div style={styles.unreadIndicator} />}
                            </div>
                        ))}
                    </div>
                )}

                {notificationsData.length === 0 && (
                    <div style={styles.emptyState}>
                        <div style={styles.emptyIcon}>🔔</div>
                        <h3>No notifications</h3>
                        <p>When you get notifications, they'll appear here</p>
                    </div>
                )}
            </div>
        </div>
    );
}






