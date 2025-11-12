import React, { createContext, useContext, useState, useEffect } from 'react';
import { populateUserData } from '../data/mockData';

const NotificationContext = createContext();

export function useNotifications() {
    return useContext(NotificationContext);
}

export function NotificationProvider({ children }) {
    const [notifications, setNotifications] = useState([]);
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Load mock notifications
        const data = populateUserData();
        setNotifications(data.notifications);
        setUnreadCount(data.notifications.filter(n => !n.is_read).length);
    }, []);

    const markAsRead = (notificationId) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === notificationId
                    ? { ...notification, is_read: true }
                    : notification
            )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, is_read: true }))
        );
        setUnreadCount(0);
    };

    const addNotification = (notification) => {
        const newNotification = {
            ...notification,
            id: Date.now().toString(),
            created_at: new Date().toISOString(),
            is_read: false
        };
        setNotifications(prev => [newNotification, ...prev]);
        setUnreadCount(prev => prev + 1);
    };

    const value = {
        notifications,
        unreadCount,
        markAsRead,
        markAllAsRead,
        addNotification
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
}