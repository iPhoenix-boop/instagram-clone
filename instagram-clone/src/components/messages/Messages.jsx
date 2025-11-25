


import React, { useState, useEffect, useRef } from 'react';
import { FaHeart, FaRegHeart, FaPaperPlane, FaCamera, FaImage, FaPaperclip, FaSmile, FaVideo, FaPhone, FaEllipsisV, FaCheck, FaCircle, FaEdit, FaSearch, FaArrowLeft } from 'react-icons/fa';

export default function Messages() {
    const [conversations, setConversations] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    const [newMessage, setNewMessage] = useState('');
    const [messages, setMessages] = useState({});
    const [isTyping, setIsTyping] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null);

    // Check if device is mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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
                lastMessage: "Hey! Check out my new post!",
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
                lastMessage: "Loved your story today!",
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
                lastMessage: "Thanks for the follow back!",
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
                unread: false,
            }
        ];
        setConversations(mockConversations);

        const initialMessages = {
            '1': [
                {
                    id: '1',
                    text: "Hey! Check out my new post!",
                    sender: 'them',
                    timestamp: new Date(Date.now() - 2 * 60 * 1000),
                    type: 'text'
                },
                {
                    id: '2',
                    text: "Looks amazing! 🔥",
                    sender: 'me',
                    timestamp: new Date(Date.now() - 1 * 60 * 1000),
                    type: 'text'
                },
                {
                    id: '3',
                    text: "Thanks! More coming soon 😊",
                    sender: 'them',
                    timestamp: new Date(Date.now() - 30 * 1000),
                    type: 'text'
                }
            ],
            '2': [
                {
                    id: '1',
                    text: "Loved your story today!",
                    sender: 'them',
                    timestamp: new Date(Date.now() - 15 * 60 * 1000),
                    type: 'text'
                },
                {
                    id: '2',
                    text: "Thank you! 🥰",
                    sender: 'me',
                    timestamp: new Date(Date.now() - 10 * 60 * 1000),
                    type: 'text'
                }
            ],
            '3': [
                {
                    id: '1',
                    text: "Thanks for the follow back!",
                    sender: 'them',
                    timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
                    type: 'text'
                },
                {
                    id: '2',
                    text: "No problem! Love your content 🙌",
                    sender: 'me',
                    timestamp: new Date(Date.now() - 50 * 60 * 1000),
                    type: 'text'
                }
            ]
        };
        setMessages(initialMessages);
    }, []);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, selectedChat]);

    // Filter conversations based on search query
    const filteredConversations = conversations.filter(conv =>
        conv.user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sendMessage = (chatId, messageType = 'text', content = null) => {
        let newMsg;

        if (messageType === 'text') {
            if (!newMessage.trim()) return;
            newMsg = {
                id: Date.now().toString(),
                text: newMessage,
                sender: 'me',
                timestamp: new Date(),
                type: 'text'
            };
            setNewMessage('');
        } else if (messageType === 'image') {
            newMsg = {
                id: Date.now().toString(),
                imageUrl: content,
                sender: 'me',
                timestamp: new Date(),
                type: 'image'
            };
        } else if (messageType === 'like') {
            newMsg = {
                id: Date.now().toString(),
                type: 'like',
                sender: 'me',
                timestamp: new Date()
            };
        }

        setMessages(prev => ({
            ...prev,
            [chatId]: [...(prev[chatId] || []), newMsg]
        }));

        if (messageType === 'text') {
            setConversations(prev => prev.map(conv =>
                conv.id === chatId ? { ...conv, lastMessage: newMessage, timestamp: new Date() } : conv
            ));
        }

        // Simulate typing and reply
        if (messageType === 'text') {
            setIsTyping(true);
            setTimeout(() => {
                const autoReply = {
                    id: Date.now().toString() + '_reply',
                    text: "That's awesome! 😊",
                    sender: 'them',
                    timestamp: new Date(),
                    type: 'text'
                };
                setMessages(prev => ({
                    ...prev,
                    [chatId]: [...(prev[chatId] || []), autoReply]
                }));
                setIsTyping(false);
            }, 2000);
        }
    };

    const handleKeyPress = (e, chatId) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(chatId, 'text');
        }
    };

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                sendMessage(selectedChat.id, 'image', e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const sendLike = (chatId) => {
        sendMessage(chatId, 'like');
    };

    const formatTime = (date) => {
        const now = new Date();
        const diffInMinutes = Math.floor((now - date) / (1000 * 60));
        if (diffInMinutes < 1) return 'now';
        if (diffInMinutes < 60) return `${diffInMinutes}m`;
        if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h`;
        return `${Math.floor(diffInMinutes / 1440)}d`;
    };

    const formatMessageTime = (date) => {
        return new Date(date).toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
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

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    const clearSearch = () => {
        setSearchQuery('');
    };

    const handleBackClick = () => {
        setSelectedChat(null);
    };

    // Responsive styles
    const styles = {
        container: {
            maxWidth: '600px',
            margin: '0 auto',
            height: isMobile ? '100vh' : 'calc(100vh - 120px)',
            backgroundColor: 'white',
            border: isMobile ? 'none' : '1px solid #dbdbdb',
            overflow: 'hidden'
        },
        header: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: isMobile ? '12px 16px' : '16px',
            borderBottom: '1px solid #dbdbdb',
            backgroundColor: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            minHeight: '60px',
            boxSizing: 'border-box'
        },
        backBtn: {
            background: 'none',
            border: 'none',
            fontSize: isMobile ? '18px' : '20px',
            cursor: 'pointer',
            padding: isMobile ? '8px 12px 8px 0' : '8px',
            color: '#262626',
            display: 'flex',
            alignItems: 'center'
        },
        iconBtn: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: isMobile ? '8px' : '8px',
            color: '#262626',
            fontSize: isMobile ? '16px' : '18px',
            minWidth: '40px',
            minHeight: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        searchContainer: {
            padding: isMobile ? '12px 16px' : '16px',
            position: 'relative',
            backgroundColor: 'white'
        },
        searchInput: {
            width: '100%',
            padding: isMobile ? '12px 16px 12px 40px' : '12px 16px 12px 40px',
            border: '1px solid #dbdbdb',
            borderRadius: '20px',
            fontSize: isMobile ? '14px' : '14px',
            outline: 'none',
            backgroundColor: '#fafafa',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box',
            WebkitAppearance: 'none',
        },
        searchIcon: {
            position: 'absolute',
            left: isMobile ? '28px' : '28px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#8e8e8e',
            fontSize: '14px',
            pointerEvents: 'none'
        },
        clearButton: {
            position: 'absolute',
            right: isMobile ? '28px' : '28px',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'none',
            border: 'none',
            color: '#8e8e8e',
            cursor: 'pointer',
            padding: '4px',
            fontSize: '14px',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        conversationItem: {
            display: 'flex',
            alignItems: 'center',
            padding: isMobile ? '14px 16px' : '16px',
            cursor: 'pointer',
            borderBottom: '1px solid #f0f0f0',
            transition: 'background-color 0.3s ease',
            minHeight: '72px',
            boxSizing: 'border-box'
        },
        userAvatar: {
            width: isMobile ? '50px' : '56px',
            height: isMobile ? '50px' : '56px',
            borderRadius: '50%',
            marginRight: isMobile ? '12px' : '12px',
            border: '2px solid #e1306c',
            padding: '2px',
            position: 'relative',
            flexShrink: 0
        },
        avatarImage: {
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            objectFit: 'cover'
        },
        activeDot: {
            position: 'absolute',
            bottom: '2px',
            right: '2px',
            width: isMobile ? '10px' : '12px',
            height: isMobile ? '10px' : '12px',
            backgroundColor: '#4CAF50',
            border: '2px solid white',
            borderRadius: '50%'
        },
        messageBubble: {
            maxWidth: isMobile ? '85%' : '70%',
            padding: isMobile ? '10px 14px' : '12px 16px',
            borderRadius: '18px',
            marginBottom: '8px',
            position: 'relative',
            wordWrap: 'break-word',
            wordBreak: 'break-word'
        },
        myMessage: {
            backgroundColor: '#0095f6',
            color: 'white',
            marginLeft: 'auto',
            borderBottomRightRadius: '4px'
        },
        theirMessage: {
            backgroundColor: '#f0f0f0',
            color: '#262626',
            borderBottomLeftRadius: '4px'
        },
        messageTime: {
            fontSize: isMobile ? '10px' : '11px',
            opacity: 0.7,
            marginTop: '4px',
            textAlign: 'right'
        },
        imageMessage: {
            maxWidth: isMobile ? '200px' : '250px',
            maxHeight: '300px',
            borderRadius: '12px',
            margin: '4px 0',
            objectFit: 'cover'
        },
        likeMessage: {
            padding: isMobile ? '6px 10px' : '8px 12px',
            borderRadius: '18px',
            backgroundColor: '#f0f0f0',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: isMobile ? '13px' : '14px',
            color: '#262626'
        },
        inputContainer: {
            display: 'flex',
            alignItems: 'center',
            padding: isMobile ? '12px 16px' : '16px',
            borderTop: '1px solid #dbdbdb',
            backgroundColor: 'white',
            position: 'sticky',
            bottom: 0,
            gap: isMobile ? '6px' : '8px',
            minHeight: '60px',
            boxSizing: 'border-box'
        },
        messageInput: {
            flex: 1,
            border: 'none',
            outline: 'none',
            padding: isMobile ? '10px 14px' : '12px 16px',
            fontSize: isMobile ? '16px' : '14px',
            backgroundColor: 'transparent',
            resize: 'none',
            maxHeight: '100px',
            borderRadius: '20px',
            backgroundColor: '#fafafa',
            minHeight: '40px'
        },
        inputIcon: {
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: isMobile ? '8px' : '8px',
            color: '#8e8e8e',
            fontSize: isMobile ? '18px' : '20px',
            transition: 'color 0.2s ease',
            minWidth: '40px',
            minHeight: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: '50%'
        },
        activeInputIcon: {
            color: '#0095f6'
        },
        chatHeader: {
            display: 'flex',
            alignItems: 'center',
            gap: isMobile ? '10px' : '12px',
            padding: isMobile ? '12px 16px' : '12px 16px',
            borderBottom: '1px solid #dbdbdb',
            backgroundColor: 'white',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            minHeight: '60px',
            boxSizing: 'border-box'
        },
        typingIndicator: {
            padding: isMobile ? '6px 16px' : '8px 16px',
            color: '#8e8e8e',
            fontSize: isMobile ? '11px' : '12px',
            fontStyle: 'italic'
        },
        noResults: {
            textAlign: 'center',
            padding: isMobile ? '40px 20px' : '40px 20px',
            color: '#8e8e8e',
            fontSize: '14px'
        },
        messagesContainer: {
            flex: 1,
            padding: isMobile ? '12px 16px' : '16px',
            overflowY: 'auto',
            backgroundColor: '#fafafa',
            WebkitOverflowScrolling: 'touch'
        },
        conversationsContainer: {
            height: 'calc(100% - 73px)',
            overflowY: 'auto',
            WebkitOverflowScrolling: 'touch'
        }
    };

    return (
        <div style={styles.container}>
            {/* Hidden file input for image uploads */}
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageUpload}
                accept="image/*"
                style={{ display: 'none' }}
            />

            <div style={styles.header}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {selectedChat && (
                        <button onClick={handleBackClick} style={styles.backBtn}>
                            {isMobile ? <FaArrowLeft /> : '‹'}
                        </button>
                    )}
                    <h2 style={{
                        margin: 0,
                        fontSize: isMobile ? '16px' : '18px',
                        fontWeight: '600'
                    }}>
                        {selectedChat ? selectedChat.user.username : 'iPhoenix'}
                    </h2>
                </div>
                <div style={{ display: 'flex', gap: isMobile ? '8px' : '12px' }}>
                    {selectedChat ? (
                        <>
                            <button style={styles.iconBtn} title="Video call">
                                <FaVideo />
                            </button>
                            <button style={styles.iconBtn} title="Voice call">
                                <FaPhone />
                            </button>
                            <button style={styles.iconBtn} title="Chat info">
                                <FaEllipsisV />
                            </button>
                        </>
                    ) : (
                        <button style={styles.iconBtn} title="New message">
                            <FaEdit />
                        </button>
                    )}
                </div>
            </div>

            {!selectedChat ? (
                // Conversations List
                <div style={styles.conversationsContainer}>
                    {/* Responsive Search Bar */}
                    <div style={styles.searchContainer}>
                        <FaSearch style={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            style={styles.searchInput}
                        />
                        {searchQuery && (
                            <button onClick={clearSearch} style={styles.clearButton}>
                                ✕
                            </button>
                        )}
                    </div>

                    {filteredConversations.length > 0 ? filteredConversations.map(conv => (
                        <div
                            key={conv.id}
                            style={styles.conversationItem}
                            onClick={() => handleChatSelect(conv)}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fafafa'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <div style={{ position: 'relative' }}>
                                <div style={styles.userAvatar}>
                                    <img
                                        src={conv.user.avatar_url}
                                        alt={conv.user.username}
                                        style={styles.avatarImage}
                                    />
                                </div>
                                {conv.user.active && <div style={styles.activeDot} />}
                            </div>
                            <div style={{ flex: 1, minWidth: 0 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                                    <strong style={{
                                        fontSize: isMobile ? '14px' : '14px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis'
                                    }}>
                                        {conv.user.username}
                                    </strong>
                                    {conv.user.verified && <FaCheck style={{ color: '#0095f6', fontSize: '12px', flexShrink: 0 }} />}
                                    <span style={{
                                        fontSize: isMobile ? '11px' : '12px',
                                        color: '#8e8e8e',
                                        marginLeft: 'auto',
                                        flexShrink: 0
                                    }}>
                                        {formatTime(conv.timestamp)}
                                    </span>
                                </div>
                                <p style={{
                                    margin: 0,
                                    color: '#8e8e8e',
                                    fontSize: isMobile ? '13px' : '14px',
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis'
                                }}>
                                    {conv.lastMessage}
                                </p>
                            </div>
                            {conv.unread && (
                                <FaCircle style={{ color: '#0095f6', fontSize: '8px', flexShrink: 0 }} />
                            )}
                        </div>
                    )) : searchQuery ? (
                        <div style={styles.noResults}>
                            No conversations found for "{searchQuery}"
                        </div>
                    ) : (
                        <div style={{ textAlign: 'center', padding: '40px', color: '#8e8e8e' }}>
                            <div style={{ fontSize: isMobile ? '40px' : '48px', marginBottom: '16px' }}>💬</div>
                            <h3 style={{ fontSize: isMobile ? '16px' : '18px' }}>No conversations yet</h3>
                            <p style={{ fontSize: isMobile ? '14px' : '16px' }}>When you start conversations, they'll appear here.</p>
                        </div>
                    )}
                </div>
            ) : (
                // Chat View
                <div style={{ display: 'flex', flexDirection: 'column', height: 'calc(100% - 73px)' }}>
                    {/* Chat Header */}
                    <div style={styles.chatHeader}>
                        <div style={{ position: 'relative' }}>
                            <div style={styles.userAvatar}>
                                <img
                                    src={selectedChat.user.avatar_url}
                                    alt={selectedChat.user.username}
                                    style={styles.avatarImage}
                                />
                            </div>
                            {selectedChat.user.active && <div style={styles.activeDot} />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{
                                fontSize: isMobile ? '14px' : '14px',
                                fontWeight: '600',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis'
                            }}>
                                {selectedChat.user.username}
                                {selectedChat.user.verified && <FaCheck style={{ color: '#0095f6', fontSize: '12px', marginLeft: '4px' }} />}
                            </div>
                            <div style={{ fontSize: isMobile ? '11px' : '12px', color: '#8e8e8e' }}>
                                {selectedChat.user.active ? 'Active now' : formatTime(selectedChat.timestamp)}
                            </div>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div style={styles.messagesContainer}>
                        {(messages[selectedChat.id] || []).map(msg => (
                            <div key={msg.id}>
                                {msg.type === 'text' && (
                                    <div style={{ ...styles.messageBubble, ...(msg.sender === 'me' ? styles.myMessage : styles.theirMessage) }}>
                                        <p style={{ margin: 0, lineHeight: '1.4' }}>{msg.text}</p>
                                        <div style={styles.messageTime}>
                                            {formatMessageTime(msg.timestamp)}
                                        </div>
                                    </div>
                                )}

                                {msg.type === 'image' && (
                                    <div style={{ ...styles.messageBubble, ...(msg.sender === 'me' ? styles.myMessage : styles.theirMessage), padding: '8px' }}>
                                        <img
                                            src={msg.imageUrl}
                                            alt="Shared content"
                                            style={styles.imageMessage}
                                        />
                                        <div style={styles.messageTime}>
                                            {formatMessageTime(msg.timestamp)}
                                        </div>
                                    </div>
                                )}

                                {msg.type === 'like' && (
                                    <div style={{ ...styles.messageBubble, ...(msg.sender === 'me' ? styles.myMessage : styles.theirMessage) }}>
                                        <div style={styles.likeMessage}>
                                            <FaHeart style={{ color: '#ed4956' }} />
                                            <span>Liked a message</span>
                                        </div>
                                        <div style={styles.messageTime}>
                                            {formatMessageTime(msg.timestamp)}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {isTyping && (
                            <div style={styles.typingIndicator}>
                                {selectedChat.user.username} is typing...
                            </div>
                        )}

                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div style={styles.inputContainer}>
                        <button
                            onClick={triggerFileInput}
                            style={styles.inputIcon}
                            title="Add photo or media"
                        >
                            <FaImage />
                        </button>

                        <button
                            onClick={triggerFileInput}
                            style={styles.inputIcon}
                            title="Take photo or video"
                        >
                            <FaCamera />
                        </button>

                        <textarea
                            placeholder="Message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            onKeyPress={(e) => handleKeyPress(e, selectedChat.id)}
                            style={styles.messageInput}
                            rows="1"
                        />

                        {newMessage.trim() ? (
                            <button
                                onClick={() => sendMessage(selectedChat.id, 'text')}
                                style={{ ...styles.inputIcon, ...styles.activeInputIcon }}
                                title="Send"
                            >
                                <FaPaperPlane />
                            </button>
                        ) : (
                            <button
                                onClick={() => sendLike(selectedChat.id)}
                                style={{ ...styles.inputIcon, color: '#ed4956' }}
                                title="Send like"
                            >
                                <FaHeart />
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
