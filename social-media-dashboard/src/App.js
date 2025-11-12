import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import PostFeed from './components/PostFeed';
import CreatePost from './components/CreatePost';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <CreatePost />
            <PostFeed />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;