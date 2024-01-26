/* eslint-disable no-empty-pattern */
import ChatInputBox from './ChatInputBox';
import ChatMainHeader from './ChatMainHeader';
import ChatBubble from './ChatBubble';

type Props = {};

export default function ChatMainWindow({}: Props) {
  return (
    <div className="main-chat-area">
      {/* Chat header */}
      <ChatMainHeader
        avatarSrc="https://storage.googleapis.com/profile-avatars-vama-staging/338d7ad5-850b-4c30-8267-405882c8e6c6-low-res.png"
        name="John Doe"
        lastSeen="Last seen 5 minutes ago"
      />

      {/* Main Chats */}
      <div className="chat-content h-100 p-16 flex flex-col">
        <ChatBubble
          message="This is a sample Message"
          timestamp="12:40 AM"
          type="sent"
        />

        <ChatBubble
          message="This is a sample Message"
          timestamp="12:40 AM"
          type="received"
        />
      </div>

      {/* Chat input box */}
      <ChatInputBox placeholder="Message" />
    </div>
  );
}
