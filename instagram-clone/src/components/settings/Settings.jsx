

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
// import { useTranslation } from 'react-i18next'; // REMOVED
import { FaChevronLeft, FaWhatsapp, FaEdit, FaComments, FaFacebook, FaRobot, FaGlobe, FaCheck } from 'react-icons/fa';

export default function Settings() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    // const { t, i18n } = useTranslation(); // REMOVED
    const [activeSection, setActiveSection] = useState('main');
    const [currentLanguage, setCurrentLanguage] = useState('en'); // Track language locally

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to logout?')) {
            signOut();
            navigate('/login');
        }
    };

    const handleLanguageChange = (languageCode) => {
        setCurrentLanguage(languageCode);
        setActiveSection('main');
    };

    const languages = [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
        { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
        { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' }
    ];

    const LanguageSettings = () => (
        <div>
            <div className="d-flex align-items-center mb-4">
                <button
                    onClick={() => setActiveSection('main')}
                    className="btn p-0 me-3"
                    style={{ background: 'none', border: 'none' }}
                    aria-label="Go back"
                >
                    <FaChevronLeft size={20} />
                </button>
                <h4 className="mb-0 fw-bold">Language</h4>
            </div>

            <div className="mb-4">
                <p className="text-muted mb-3">
                    Choose your preferred language for the app interface.
                </p>

                <div className="list-group">
                    {languages.map((language) => (
                        <button
                            key={language.code}
                            onClick={() => handleLanguageChange(language.code)}
                            className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center py-3"
                            style={{
                                backgroundColor: currentLanguage === language.code ? '#f8f9fa' : 'white'
                            }}
                        >
                            <div className="d-flex align-items-center">
                                <span className="me-3" style={{ fontSize: '1.5em' }}>
                                    {language.flag}
                                </span>
                                <div className="text-start">
                                    <div className="fw-bold">{language.name}</div>
                                    <small className="text-muted">{language.nativeName}</small>
                                </div>
                            </div>
                            {currentLanguage === language.code && (
                                <FaCheck className="text-primary" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-4 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                <small className="text-muted">
                    Changing language will update the app interface text.
                </small>
            </div>
        </div>
    );

    const MainSettings = () => (
        <div>
            <div className="d-flex align-items-center mb-4">
                <button
                    onClick={() => navigate('/profile')}
                    className="btn p-0 me-3"
                    style={{ background: 'none', border: 'none' }}
                    aria-label="Go back"
                >
                    <FaChevronLeft size={20} />
                </button>
                <h4 className="mb-0 fw-bold">Settings</h4>
            </div>

            {/* What you see section */}
            <div className="mb-4">
                <h6 className="text-muted mb-3">What you see</h6>
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>Favourites</span>
                        <div className="d-flex align-items-center">
                            <span className="text-muted me-2">0</span>
                            <span>›</span>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>Muted accounts</span>
                        <div className="d-flex align-items-center">
                            <span className="text-muted me-2">0</span>
                            <span>›</span>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>Content preferences</span>
                        <span>›</span>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>Like and share counts</span>
                        <span>›</span>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>Subscriptions</span>
                        <span>›</span>
                    </button>
                </div>
            </div>

            {/* Your app and media section */}
            <div className="mb-4">
                <h6 className="text-muted mb-3">Your app and media</h6>
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>Device permissions</span>
                        <span>›</span>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>Archiving and downloading</span>
                        <span>›</span>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>Accessibility</span>
                        <span>›</span>
                    </button>
                    <button
                        className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center"
                        onClick={() => setActiveSection('language')}
                    >
                        <div className="d-flex align-items-center">
                            <FaGlobe className="me-3 text-primary" />
                            <span>Language</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <small className="text-muted me-2">
                                {languages.find(lang => lang.code === currentLanguage)?.name}
                            </small>
                            <span>›</span>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>Data usage</span>
                        <span>›</span>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>App permissions</span>
                        <span>›</span>
                    </button>
                </div>
            </div>

            {/* Family Centre */}
            <div className="mb-4">
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <div>
                            <div className="fw-bold">Family Centre</div>
                            <small className="text-muted">Tools to help manage teen accounts</small>
                        </div>
                        <span>›</span>
                    </button>
                </div>
            </div>

            {/* Your insights and tools */}
            <div className="mb-4">
                <h6 className="text-muted mb-3">Your insights and tools</h6>
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <div>
                            <div>Your dashboard</div>
                            <small className="text-muted">View your insights and tools</small>
                        </div>
                        <span>›</span>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <div>
                            <div>Meta Verified</div>
                            <small className="text-muted">Not subscribed</small>
                        </div>
                        <span>›</span>
                    </button>
                </div>
            </div>

            {/* Your orders and fundraisers */}
            <div className="mb-4">
                <h6 className="text-muted mb-3">Your orders and fundraisers</h6>
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <div>
                            <div>Orders and payments</div>
                            <small className="text-muted">View your order history</small>
                        </div>
                        <span>›</span>
                    </button>
                </div>
            </div>

            {/* About section */}
            <div className="mb-4">
                <h6 className="text-muted mb-3">About</h6>
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0">
                        Help
                    </button>
                    <button className="list-group-item list-group-item-action border-0">
                        Privacy Center
                    </button>
                    <button className="list-group-item list-group-item-action border-0">
                        Account Status
                    </button>
                    <button className="list-group-item list-group-item-action border-0">
                        About this app
                    </button>
                </div>
            </div>

            {/* Also from Meta */}
            <div className="mb-4">
                <h6 className="text-muted mb-3">Also from Meta</h6>
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
                        <FaWhatsapp className="me-3 text-success" size={20} />
                        <div>
                            <div>WhatsApp</div>
                            <small className="text-muted">Simple. Reliable. Private.</small>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
                        <FaEdit className="me-3 text-primary" size={20} />
                        <div>
                            <div>Edits</div>
                            <small className="text-muted">Create and edit videos</small>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
                        <FaComments className="me-3 text-black" size={20} />
                        <div>
                            <div>Threads</div>
                            <small className="text-muted">Share with text</small>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
                        <FaFacebook className="me-3 text-primary" size={20} />
                        <div>
                            <div>Facebook</div>
                            <small className="text-muted">Connect with friends</small>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
                        <FaComments className="me-3 text-primary" size={20} />
                        <div>
                            <div>Messenger</div>
                            <small className="text-muted">Video and voice calls</small>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
                        <FaRobot className="me-3 text-primary" size={20} />
                        <div>
                            <div>Meta AI</div>
                            <small className="text-muted">Ask anything</small>
                        </div>
                    </button>
                </div>
            </div>

            {/* Login options */}
            <div className="mb-4">
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 text-primary">
                        Add account
                    </button>
                    <button
                        className="list-group-item list-group-item-action border-0"
                        onClick={handleLogout}
                    >
                        Log out
                    </button>
                    <button className="list-group-item list-group-item-action border-0">
                        Log out of all accounts
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="container" style={{ maxWidth: '600px', paddingTop: '20px' }}>
            {activeSection === 'main' && <MainSettings />}
            {activeSection === 'language' && <LanguageSettings />}
        </div>
    );
}