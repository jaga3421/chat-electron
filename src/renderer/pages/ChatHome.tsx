import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ChatSideBar from '../components/chat/ChatSideBar';
import ChatMainWindow from '../components/chat/ChatMainWindow';
import { RootState } from '../store/rootReducer';

export default function ChatHome() {
  const navigate = useNavigate();
  const authState = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (authState.token === null) {
      navigate('/');
    }
  }, [authState.token, navigate]);
  return (
    <div className="full-screen two-column">
      <ChatSideBar />
      <ChatMainWindow />
    </div>
  );
}
