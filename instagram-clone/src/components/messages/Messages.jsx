


import React, { useState, useEffect, useRef } from 'react';
import './Messages.css';

const Messages = () => {
    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState({});
    const messagesEndRef = useRef(null);

    useEffect(() => {
        const mockConversations = [
            {
                id: '1',
                user: {
                    username: 'johndoe',
                    name: 'John Doe',
                    avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face',
                    verified: false,
                    active: true
                },
                lastMessage: 'Hey! Check out my new post!',
                timestamp: new Date(Date.now() - 2 * 60 * 1000),
                unread: true,
            },
            {
                id: '2',
                user: {
                    username: 'sarahsmith',
                    name: 'Sarah Smith',
                    avatar_url: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
                    verified: true,
                    active: false
                },
                lastMessage: 'Loved your story today!',
                timestamp: new Date(Date.now() - 15 * 60 * 1000),
                unread: false,
            },
            {
                id: '3',
                user: {
                    username: 'mikejohnson',
                    name: 'Mike Johnson',
                    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
                    verified: false,
                    active: true
                },
                lastMessage: 'Thanks for the follow back!',
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
                unread: false,
            }
        ];
        setConversations(mockConversations);

        // Initialize messages for each conversation
        const initialMessages = {
            '1': [
                { id: '1', text: 'Hey! Check out my new post!', sender: 'them', timestamp: new Date(Date.now() - 2 * 60 * 1000) },
                { id: '2', text: 'Looks amazing! 🔥', sender: 'me', timestamp: new Date(Date.now() - 1 * 60 * 1000) },
                { id: '3', text: 'Thanks! More coming soon 😊', sender: 'them', timestamp: new Date(Date.now() - 30 * 1000) }
            ],
            '2': [
                { id: '1', text: 'Loved your story today!', sender: 'them', timestamp: new Date(Date.now() - 15 * 60 * 1000) },
                { id: '2', text: 'Thank you! 🥰', sender: 'me', timestamp: new Date(Date.now() - 10 * 60 * 1000) }
            ],
            '3': [
                { id: '1', text: 'Thanks for the follow back!', sender: 'them', timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000) },
                { id: '2', text: 'No problem! Love your content 🙌', sender: 'me', timestamp: new Date(Date.now() - 50 * 60 * 1000) }
            ]
        };
        setMessages(initialMessages);
    }, []);

    // Auto-scroll to bottom when new messages are added
    useEffect(() => {
        scrollToBottom();
    }, [messages, selectedChat]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = (chatId) => {
        if (!newMessage.trim()) return;

        const newMsg = {
            id: Date.now().toString(),
            text: newMessage,
            sender: 'me',
            timestamp: new Date()
        };

        setMessages(prev => ({
            ...prev,
            [chatId]: [...(prev[chatId] || []), newMsg]
        }));

        // Update the last message in conversations
        setConversations(prev =>
            prev.map(conv =>
                conv.id === chatId
                    ? { ...conv, lastMessage: newMessage, timestamp: new Date() }
                    : conv
            )
        );

        setNewMessage('');
    };

    const handleKeyPress = (e, chatId) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(chatId);
        }
    };

    const formatTime = (date) => {
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));

        if (diffInMinutes < 1) return 'now';
        if (diffInMinutes < 60) return `${diffInMinutes}m`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
        return `${Math.floor(diffInMinutes / 1440)}d`;
    };

    const markAsRead = (chatId) => {
        setConversations(prev => prev.map(chat =>
            chat.id === chatId ? { ...chat, unread: false } : chat
        ));
    };

    const handleChatSelect = (conversation) => {
        setSelectedChat(conversation);
        markAsRead(conversation.id);
    };

    const handleFileUpload = (type) => {
        // Simulate file upload functionality
        alert(`Would open ${type} picker in real implementation`);
    };

    return (
        <div className="instagram-messages">
            <div className="messages-header">
                <div className="header-left">
                    {selectedChat && (
                        <button
                            className="back-btn"
                            onClick={() => setSelectedChat(null)}
                            aria-label="Back to conversations"
                        >
                            ‹
                        </button>
                    )}
                    <h2>{selectedChat ? selectedChat.user.username : 'iPhoenix'}</h2>
                </div>
                <div className="header-right">
                    {selectedChat ? (
                        <>
                            <button className="icon-btn" aria-label="Video call">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M17 10.5V7C17 4.243 14.757 2 12 2C9.243 2 7 4.243 7 7V10.5C5.343 10.5 4 11.843 4 13.5V18.5C4 20.157 5.343 21.5 7 21.5H17C18.657 21.5 20 20.157 20 18.5V13.5C20 11.843 18.657 10.5 17 10.5Z" fill="currentColor" />
                                    <path d="M12 16.5C11.448 16.5 11 16.052 11 15.5C11 14.948 11.448 14.5 12 14.5C12.552 14.5 13 14.948 13 15.5C13 16.052 12.552 16.5 12 16.5Z" fill="currentColor" />
                                </svg>
                            </button>
                            <button className="icon-btn" aria-label="Call">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M20 15.5C18.75 15.5 17.55 15.3 16.43 14.93C16.33 14.9 16.22 14.88 16.12 14.88C15.86 14.88 15.61 14.98 15.41 15.17L13.21 17.37C10.38 15.93 8.06 13.62 6.62 10.79L8.82 8.59C9.1 8.31 9.18 7.92 9.07 7.57C8.7 6.45 8.5 5.25 8.5 4C8.5 3.45 8.05 3 7.5 3H4C3.45 3 3 3.45 3 4C3 13.39 10.61 21 20 21C20.55 21 21 20.55 21 20V16.5C21 15.95 20.55 15.5 20 15.5Z" fill="currentColor" />
                                </svg>
                            </button>
                        </>
                    ) : (
                        <button className="icon-btn" aria-label="New message">
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="currentColor" />
                                <path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7Z" fill="currentColor" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>

            <div className="messages-content">
                {!selectedChat ? (
                    /* Conversations List View */
                    <div className="conversations-list">
                        <div className="conversations-header">
                            <h3>iPhoenix</h3>
                            <button className="icon-btn" aria-label="New message">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20Z" fill="currentColor" />
                                    <path d="M13 7H11V11H7V13H11V17H13V13H17V11H13V7Z" fill="currentColor" />
                                </svg>
                            </button>
                        </div>

                        <div className="search-bar">
                            <input
                                type="text"
                                placeholder="Search"
                                className="search-input"
                                aria-label="Search conversations"
                            />
                        </div>

                        {conversations.map(conversation => (
                            <div
                                key={conversation.id}
                                className={`conversation-item ${conversation.unread ? 'unread' : ''}`}
                                onClick={() => handleChatSelect(conversation)}
                            >
                                <div className="avatar-container">
                                    <div className={`user-avatar ${conversation.user.active ? 'active' : ''}`}>
                                        <img
                                            src={conversation.user.avatar_url}
                                            alt={conversation.user.username}
                                            className="avatar-image"
                                            onError={(e) => {
                                                e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face';
                                            }}
                                        />
                                    </div>
                                </div>
                                <div className="conversation-info">
                                    <div className="user-info">
                                        <span className="username">{conversation.user.username}</span>
                                        {conversation.user.verified && <span className="verified">✓</span>}
                                        <span className="time">{formatTime(conversation.timestamp)}</span>
                                    </div>
                                    <div className="last-message">
                                        <p>{conversation.lastMessage}</p>
                                        {conversation.unread && <div className="unread-dot"></div>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Chat View */
                    <div className="chat-area">
                        <div className="active-chat">
                            <div className="chat-header">
                                <div className="chat-header-left">
                                    <button
                                        className="back-btn"
                                        onClick={() => setSelectedChat(null)}
                                        aria-label="Back to conversations"
                                    >
                                        ‹
                                    </button>
                                    <div className="chat-user">
                                        <div className={`user-avatar ${selectedChat.user.active ? 'active' : ''}`}>
                                            <img
                                                src={selectedChat.user.avatar_url}
                                                alt={selectedChat.user.username}
                                                className="avatar-image"
                                                onError={(e) => {
                                                    e.target.src = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&h=150&fit=crop&crop=face';
                                                }}
                                            />
                                        </div>
                                        <div>
                                            <span className="username">{selectedChat.user.username}</span>
                                            {selectedChat.user.verified && <span className="verified">✓</span>}
                                            <div className="user-status">{selectedChat.user.active ? 'Active now' : formatTime(selectedChat.timestamp)}</div>
                                        </div>
                                    </div>
                                </div>
                                <button className="icon-btn" aria-label="Chat info">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z" fill="currentColor" />
                                        <path d="M11 7H13V9H11V7ZM11 11H13V17H11V11Z" fill="currentColor" />
                                    </svg>
                                </button>
                            </div>

                            <div className="messages-container">
                                <div className="messages-list">
                                    {(messages[selectedChat.id] || []).map(message => (
                                        <div key={message.id} className={`message-bubble ${message.sender}`}>
                                            <p>{message.text}</p>
                                            <span className="message-time">{formatTime(message.timestamp)}</span>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </div>

                            {/* Instagram-style Message Input Box */}
                            <div className="message-input-container">
                                <div className="message-input-wrapper">
                                    {/* Camera Icon */}
                                    <button
                                        className="input-icon camera-btn"
                                        onClick={() => handleFileUpload('camera')}
                                        aria-label="Take photo or video"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" fill="currentColor" />
                                            <path d="M20 4H16.83L15.59 2.65C15.22 2.24 14.68 2 14.12 2H9.88C9.32 2 8.78 2.24 8.41 2.65L7.17 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17Z" fill="currentColor" />
                                        </svg>
                                    </button>

                                    {/* Photo/Media Icon */}
                                    <button
                                        className="input-icon media-btn"
                                        onClick={() => handleFileUpload('media')}
                                        aria-label="Add photo or media"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M21 19V5C21 3.9 20.1 3 19 3H5C3.9 3 3 3.9 3 5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19ZM8.5 13.5L11 16.51L14.5 12L19 18H5L8.5 13.5Z" fill="currentColor" />
                                        </svg>
                                    </button>

                                    {/* PDF/Attachment Icon */}
                                    <button
                                        className="input-icon attachment-btn"
                                        onClick={() => handleFileUpload('attachment')}
                                        aria-label="Add attachment"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.5 6V17.5C16.5 19.71 14.71 21.5 12.5 21.5C10.29 21.5 8.5 19.71 8.5 17.5V5C8.5 3.62 9.62 2.5 11 2.5C12.38 2.5 13.5 3.62 13.5 5V15.5C13.5 16.05 13.05 16.5 12.5 16.5C11.95 16.5 11.5 16.05 11.5 15.5V6H10V15.5C10 16.88 11.12 18 12.5 18C13.88 18 15 16.88 15 15.5V5C15 2.79 13.21 1 11 1C8.79 1 7 2.79 7 5V17.5C7 20.54 9.46 23 12.5 23C15.54 23 18 20.54 18 17.5V6H16.5Z" fill="currentColor" />
                                        </svg>
                                    </button>

                                    {/* Message Input */}
                                    <input
                                        type="text"
                                        placeholder="Message..."
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={(e) => handleKeyPress(e, selectedChat.id)}
                                        className="message-input"
                                        aria-label="Type a message"
                                    />

                                    {/* Like/Heart Icon */}
                                    <button
                                        className="input-icon like-btn"
                                        aria-label="Send like"
                                    >
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M16.5 3C14.76 3 13.09 3.81 12 5.09C10.91 3.81 9.24 3 7.5 3C4.42 3 2 5.42 2 8.5C2 12.28 5.4 15.36 10.55 20.04L12 21.35L13.45 20.03C18.6 15.36 22 12.28 22 8.5C22 5.42 19.58 3 16.5 3ZM12.1 18.55L12 18.65L11.9 18.55C7.14 14.24 4 11.39 4 8.5C4 6.5 5.5 5 7.5 5C9.04 5 10.54 5.99 11.07 7.36H12.94C13.46 5.99 14.96 5 16.5 5C18.5 5 20 6.5 20 8.5C20 11.39 16.86 14.24 12.1 18.55Z" fill="currentColor" />
                                        </svg>
                                    </button>

                                    {/* Send Button - Only shows when there's text */}
                                    {newMessage.trim() && (
                                        <button
                                            className="input-icon send-btn active"
                                            onClick={() => sendMessage(selectedChat.id)}
                                            aria-label="Send message"
                                        >
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
                                            </svg>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;