import { useEffect } from 'react';
import {
  MemoryRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import NProgress from 'nprogress';
import store from './store';

import './App.scss';

import ChatHome from './pages/ChatHome';
import Login from './pages/Login';

function RouteProgress() {
  const location = useLocation();

  useEffect(() => {
    NProgress.start();
    NProgress.done();
  }, [location]);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/chatHome" element={<ChatHome />} />{' '}
    </Routes>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <RouteProgress />
      </Router>
    </Provider>
  );
}
