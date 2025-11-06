import React, { useState } from 'react';
import { IoSend } from 'react-icons/io5';
import './Chat.css';

const Chat = () => {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        {
            id: 1,
            text: 'Hello! Welcome to Aditi Textile. How can I help you today?',
            sender: 'support',
            time: '10:30 AM'
        }
    ]);

    const handleSend = (e) => {
        e.preventDefault();
        if (message.trim()) {
            const newMessage = {
                id: messages.length + 1,
                text: message,
                sender: 'user',
                time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
            };
            setMessages([...messages, newMessage]);
            setMessage('');

            // Mock auto-reply
            setTimeout(() => {
                const reply = {
                    id: messages.length + 2,
                    text: 'Thank you for your message. Our team will get back to you shortly!',
                    sender: 'support',
                    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
                };
                setMessages((prev) => [...prev, reply]);
            }, 1000);
        }
    };

    return (
        <div className="chat-page">
            <div className="chat-header">
                <div className="support-avatar">AT</div>
                <div className="support-info">
                    <h3>Aditi Textile Support</h3>
                    <p className="status online">Online</p>
                </div>
            </div>

            <div className="chat-messages">
                {messages.map((msg) => (
                    <div key={msg.id} className={`message ${msg.sender}`}>
                        <div className="message-bubble">
                            <p>{msg.text}</p>
                            <span className="message-time">{msg.time}</span>
                        </div>
                    </div>
                ))}
            </div>

            <form className="chat-input-container" onSubmit={handleSend}>
                <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="chat-input"
                />
                <button type="submit" className="send-btn">
                    <IoSend size={20} />
                </button>
            </form>
        </div>
    );
};

export default Chat;
