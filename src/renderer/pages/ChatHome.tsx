import ChatMainWindow from '../components/chat/ChatMainWindow';
import ChatSideBar from '../components/chat/ChatSideBar';

export default function ChatHome() {
  return (
    <div className="full-screen two-column">
      <ChatSideBar />
      <ChatMainWindow />
    </div>
  );
}
