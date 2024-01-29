/* eslint-disable react/function-component-definition */
// ChatMainWindow.tsx
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import ChatBubble from './ChatBubble';
import ChatInputBox from './ChatInputBox';
import ChatMainHeader from './ChatMainHeader';

interface Props {}

const ChatMainWindow: React.FC<Props> = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messages.length > 0 && messages[messages.length - 1].type === 'sent') {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className="main-chat-area">
      {/* Chat header */}
      <ChatMainHeader
        avatarSrc="https://storage.googleapis.com/profile-avatars-vama-staging/338d7ad5-850b-4c30-8267-405882c8e6c6-low-res.png"
        name="John Doe"
        lastSeen="Last seen 5 minutes ago"
      />

      {/* Main Chats */}
      <div className="chat-content h-100 p-16 flex flex-col overflow-auto">
        {messages.map((message) => (
          <ChatBubble
            key={message.id}
            message={message.text}
            timestamp={message.timestamp}
            type={message.type}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat input box */}
      <ChatInputBox placeholder="Message" />
    </div>
  );
};

export default ChatMainWindow;
