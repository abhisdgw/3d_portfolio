import React from 'react';
import { ChatMessage as ChatMessageType } from '../services/chatApi';

interface ChatMessageProps {
  message: ChatMessageType;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';
  
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div
      className={`chat-message ${isUser ? 'user-message' : 'assistant-message'}`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: isUser ? 'flex-end' : 'flex-start',
        marginBottom: '12px',
        animation: 'slideIn 0.3s ease-out'
      }}
    >
      <div
        style={{
          maxWidth: '80%',
          padding: '10px 14px',
          borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
          backgroundColor: isUser ? '#007bff' : '#f1f3f5',
          color: isUser ? '#ffffff' : '#212529',
          wordWrap: 'break-word',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
        }}
      >
        <p style={{ margin: 0, fontSize: '14px', lineHeight: '1.4' }}>
          {message.content}
        </p>
      </div>
      <span
        style={{
          fontSize: '11px',
          color: '#6c757d',
          marginTop: '4px',
          marginLeft: isUser ? '0' : '8px',
          marginRight: isUser ? '8px' : '0'
        }}
      >
        {formatTime(message.timestamp)}
      </span>
    </div>
  );
};

export default ChatMessage;
