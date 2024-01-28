import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; //
import store from './store';

import './App.scss';

import ChatHome from './pages/ChatHome';
import Login from './pages/Login';

export default function App() {
  return (
    <Provider store={store}>
      {' '}
      {/* wrap your application with the Provider component */}
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/chatHome" element={<ChatHome />} />{' '}
          {/* change the path to /chatHome */}
        </Routes>
      </Router>
    </Provider>
  );
}
