


import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import { I18nextProvider } from 'react-i18next';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AppProvider } from './contexts/AppContext';
import { NotificationProvider } from './contexts/NotificationContext';
// import i18n from './i18n/i18n';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import Navbar from './components/layout/Navbar';
import BottomNav from './components/layout/BottomNav';
import Feed from './components/feed/Feed';
import Reels from './components/reels/Reels';
import Profile from './components/profile/Profile';
import Search from './components/search/Search';
import Messages from './components/messages/Messages';
import Notifications from './components/Notifications';
import Settings from './components/settings/Settings';
import CreatePost from './components/feed/CreatePost';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fafafa'
      }}>
        <div>Loading authentication...</div>
      </div>
    );
  }

  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: '#fafafa'
      }}>
        <div>Loading authentication...</div>
      </div>
    );
  }

  return !user ? children : <Navigate to="/" />;
};

const CreatePostPage = () => (
  <div className="container py-4">
    <div className="row justify-content-center">
      <div className="col-md-8 col-lg-6">
        <CreatePost onPostCreated={(post) => console.log('New post:', post)} />
      </div>
    </div>
  </div>
);

function App() {
  return (
    // <I18nextProvider i18n={i18n}>
    <AuthProvider>
      <AppProvider>
        <NotificationProvider>
          <Router>
            <div style={{ backgroundColor: '#fafafa', minHeight: '100vh', paddingBottom: '60px' }}>
              <Navbar />
              <Routes>
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
                <Route path="/signup" element={<PublicRoute><Signup /></PublicRoute>} />
                <Route path="/" element={<ProtectedRoute><Feed /></ProtectedRoute>} />
                <Route path="/reels" element={<ProtectedRoute><Reels /></ProtectedRoute>} />
                <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                <Route path="/search" element={<ProtectedRoute><Search /></ProtectedRoute>} />
                <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
                <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/create-post" element={<ProtectedRoute><CreatePostPage /></ProtectedRoute>} />
              </Routes>
              <BottomNav />
            </div>
          </Router>
        </NotificationProvider>
      </AppProvider>
    </AuthProvider>
    // </I18nextProvider>
  );
}

export default App;

