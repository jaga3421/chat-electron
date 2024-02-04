/* eslint-disable camelcase */
/* eslint-disable react/function-component-definition */
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/rootReducer';
import ChatBubble from './ChatBubble';
import ChatInputBox from './ChatInputBox';
import ChatMainHeader from './ChatMainHeader';
import empty from '../../assets/homeMessage.svg';

interface Props {}

// To show the SVG image, when no active channels are selected
const EmptyState: React.FC = () => (
  <div
    className="chat-content h-100 p-16 flex center-this overflow-auto"
    style={{ width: 'calc(100% - 360px)' }}
  >
    <div className="empty align-center">
      <img src={empty} alt="empty" style={{ width: '200px' }} />
      <h3>Start a conversation</h3>
      <p>Click on a contact to start chatting</p>
    </div>
  </div>
);

/* The main chat window with the header, messages and input box
  populated from the active channel
*/
const ChatContent: React.FC<{ messages: any[]; activeChannel: any }> = ({
  messages,
  activeChannel,
}) => {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(scrollToBottom, [messages]);

  const { avatar, first_name, last_name } =
    activeChannel.metadata.direct.other_account;
  const { online, last_seen } = activeChannel.metadata.direct.online_status;

  return (
    <div className="main-chat-area">
      <ChatMainHeader
        avatarSrc={avatar}
        name={`${first_name} ${last_name}`}
        lastSeen={online ? 'online' : last_seen}
      />
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
      <ChatInputBox placeholder="Message" channelID={activeChannel.id} />
    </div>
  );
};

// The main chat window component
const ChatMainWindow: React.FC<Props> = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const channels = useSelector((state: RootState) => state.channels.channels);

  const activeChannel = channels.find((channel) => channel.isselected);

  return activeChannel ? (
    <ChatContent messages={messages} activeChannel={activeChannel} />
  ) : (
    <EmptyState />
  );
};

export default ChatMainWindow;
