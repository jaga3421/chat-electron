import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';

import './App.scss';

import ChatHome from './pages/ChatHome';
import Login from './pages/Login';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<ChatHome />} />
      </Routes>
    </Router>
  );
}
