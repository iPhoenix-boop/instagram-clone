import React from 'react';

function Header() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{
            background: 'linear-gradient(45deg, #667eea, #764ba2)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
        }}>
            <div className="container">
                <span className="navbar-brand mb-0 h1">
                    <i className="fas fa-users me-2"></i>
                    SocialConnect
                </span>

                <div className="navbar-nav flex-row align-items-center">
                    <div className="nav-item me-3">
                        <span className="text-white">
                            <i className="fas fa-user me-1"></i>
                            Demo User
                        </span>
                    </div>
                    <button className="btn btn-outline-light btn-social me-2">
                        <i className="fas fa-sign-in-alt me-1"></i>
                        Login
                    </button>
                    <button className="btn btn-light btn-social">
                        <i className="fas fa-user-plus me-1"></i>
                        Sign Up
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Header;