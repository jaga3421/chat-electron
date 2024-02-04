import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import ChatSideBar from '../components/chat/ChatSideBar';
import ChatMainWindow from '../components/chat/ChatMainWindow';
import WebSocketConnection from '../utils/webSocket';
import { isTokenValid } from '../slices/authSlice';
import { RootState } from '../store/rootReducer';
import LogOut from '../components/LogOut';

export default function ChatHome() {
  const hasValidToken = useSelector(isTokenValid);
  const token = useSelector((state: RootState) => state.auth.token);

  const navigate = useNavigate();

  // If the token is not valid, redirect to the login page
  useEffect(() => {
    if (!hasValidToken) {
      navigate('/');
    } else if (token) {
      WebSocketConnection.connect();
    }
  }, [hasValidToken, navigate, token]);

  return (
    <div className="full-screen two-column">
      <LogOut />
      <ChatSideBar />
      <ChatMainWindow />
    </div>
  );
}
