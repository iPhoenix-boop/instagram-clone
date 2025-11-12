import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { FaChevronLeft, FaWhatsapp, FaEdit, FaComments, FaFacebook, FaRobot, FaGlobe, FaCheck } from 'react-icons/fa';

export default function Settings() {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();
    const [activeSection, setActiveSection] = useState('main');

    const handleLogout = () => {
        if (window.confirm('Are you sure you want to log out?')) {
            signOut();
            navigate('/login');
        }
    };

    const handleLanguageChange = (languageCode) => {
        i18n.changeLanguage(languageCode);
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
                <h4 className="mb-0 fw-bold">{t('settings.language')}</h4>
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
                                backgroundColor: i18n.language === language.code ? '#f8f9fa' : 'white'
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
                            {i18n.language === language.code && (
                                <FaCheck className="text-primary" />
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-4 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
                <small className="text-muted">
                    <strong>Note:</strong> Changing the language will update the app interface immediately.
                    Some user-generated content may remain in its original language.
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
                <h4 className="mb-0 fw-bold">{t('settings.title')}</h4>
            </div>

            {/* What you see section */}
            <div className="mb-4">
                <h6 className="text-muted mb-3">{t('settings.whatYouSee')}</h6>
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>{t('common.favourites')}</span>
                        <div className="d-flex align-items-center">
                            <span className="text-muted me-2">0</span>
                            <span>›</span>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>{t('common.muted')}</span>
                        <div className="d-flex align-items-center">
                            <span className="text-muted me-2">0</span>
                            <span>›</span>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>{t('common.contentPreferences')}</span>
                        <span>›</span>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>{t('common.likeShareCounts')}</span>
                        <span>›</span>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>{t('common.subscriptions')}</span>
                        <span>›</span>
                    </button>
                </div>
            </div>

            {/* Your app and media section */}
            <div className="mb-4">
                <h6 className="text-muted mb-3">{t('settings.yourAppMedia')}</h6>
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>{t('common.devicePermissions')}</span>
                        <span>›</span>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>{t('common.archivingDownloading')}</span>
                        <span>›</span>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>{t('common.accessibility')}</span>
                        <span>›</span>
                    </button>
                    <button
                        className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center"
                        onClick={() => setActiveSection('language')}
                    >
                        <div className="d-flex align-items-center">
                            <FaGlobe className="me-3 text-primary" />
                            <span>{t('settings.language')}</span>
                        </div>
                        <div className="d-flex align-items-center">
                            <small className="text-muted me-2">
                                {languages.find(lang => lang.code === i18n.language)?.name}
                            </small>
                            <span>›</span>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span className="text-muted">{t('common.dataUsage')}</span>
                        <span>›</span>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <span>{t('common.appPermissions')}</span>
                        <span>›</span>
                    </button>
                </div>
            </div>

            {/* Family Centre */}
            <div className="mb-4">
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <div>
                            <div className="fw-bold">{t('settings.familyCenter')}</div>
                            <small className="text-muted">Supervision for Teen Accounts</small>
                        </div>
                        <span>›</span>
                    </button>
                </div>
            </div>

            {/* Your insights and tools */}
            <div className="mb-4">
                <h6 className="text-muted mb-3">{t('settings.insightsTools')}</h6>
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <div>
                            <div>Your dashboard</div>
                            <small className="text-muted">Account type and tools</small>
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
                <h6 className="text-muted mb-3">{t('settings.ordersFundraisers')}</h6>
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
                        <div>
                            <div>Orders and payments</div>
                            <small className="text-muted">More info and support</small>
                        </div>
                        <span>›</span>
                    </button>
                </div>
            </div>

            {/* About section */}
            <div className="mb-4">
                <h6 className="text-muted mb-3">{t('settings.about')}</h6>
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0">
                        Help
                    </button>
                    <button className="list-group-item list-group-item-action border-0">
                        Privacy Centre
                    </button>
                    <button className="list-group-item list-group-item-action border-0">
                        Account Status
                    </button>
                    <button className="list-group-item list-group-item-action border-0">
                        About
                    </button>
                </div>
            </div>

            {/* Also from Meta */}
            <div className="mb-4">
                <h6 className="text-muted mb-3">{t('settings.alsoFromMeta')}</h6>
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
                        <FaWhatsapp className="me-3 text-success" size={20} />
                        <div>
                            <div>WhatsApp</div>
                            <small className="text-muted">Message privately with friends and family</small>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
                        <FaEdit className="me-3 text-primary" size={20} />
                        <div>
                            <div>Edits</div>
                            <small className="text-muted">Create videos with powerful editing tools</small>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
                        <FaComments className="me-3 text-black" size={20} />
                        <div>
                            <div>Threads</div>
                            <small className="text-muted">Share ideas and join conversations</small>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
                        <FaFacebook className="me-3 text-primary" size={20} />
                        <div>
                            <div>Facebook</div>
                            <small className="text-muted">Explore things that you love</small>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
                        <FaComments className="me-3 text-primary" size={20} />
                        <div>
                            <div>Messenger</div>
                            <small className="text-muted">Chat and share seamlessly with friends</small>
                        </div>
                    </button>
                    <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
                        <FaRobot className="me-3 text-primary" size={20} />
                        <div>
                            <div>Meta AI</div>
                            <small className="text-muted">Get answers, advice and generate images</small>
                        </div>
                    </button>
                </div>
            </div>

            {/* Login options */}
            <div className="mb-4">
                <div className="list-group">
                    <button className="list-group-item list-group-item-action border-0 text-primary">
                        {t('settings.addAccount')}
                    </button>
                    <button
                        className="list-group-item list-group-item-action border-0"
                        onClick={handleLogout}
                    >
                        {t('settings.logout')}
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








// import React, { useState } from 'react';
// import { useAuth } from '../../contexts/AuthContext';
// import { useNavigate } from 'react-router-dom';
// import { FaChevronLeft, FaWhatsapp, FaEdit, FaComments, FaFacebook, FaRobot, FaGlobe, FaCheck } from 'react-icons/fa';

// export default function Settings() {
//     const { user, signOut } = useAuth();
//     const navigate = useNavigate();
//     const [activeSection, setActiveSection] = useState('main');
//     const [currentLanguage, setCurrentLanguage] = useState('en');

//     const handleLogout = () => {
//         if (window.confirm('Are you sure you want to log out?')) {
//             signOut();
//             navigate('/login');
//         }
//     };

//     const handleLanguageChange = (languageCode) => {
//         setCurrentLanguage(languageCode);
//         setActiveSection('main');
//         // Show a message that language change is simulated
//         alert(`Language changed to ${languages.find(lang => lang.code === languageCode)?.name}. This is a demo feature.`);
//     };

//     const languages = [
//         { code: 'en', name: 'English', nativeName: 'English', flag: '🇺🇸' },
//         { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag: '🇮🇳' },
//         { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' }
//     ];

//     const LanguageSettings = () => (
//         <div>
//             <div className="d-flex align-items-center mb-4">
//                 <button
//                     onClick={() => setActiveSection('main')}
//                     className="btn p-0 me-3"
//                     style={{ background: 'none', border: 'none' }}
//                     aria-label="Go back"
//                 >
//                     <FaChevronLeft size={20} />
//                 </button>
//                 <h4 className="mb-0 fw-bold">Language and translations</h4>
//             </div>

//             <div className="mb-4">
//                 <p className="text-muted mb-3">
//                     Choose your preferred language for the app interface.
//                 </p>

//                 <div className="list-group">
//                     {languages.map((language) => (
//                         <button
//                             key={language.code}
//                             onClick={() => handleLanguageChange(language.code)}
//                             className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center py-3"
//                             style={{
//                                 backgroundColor: currentLanguage === language.code ? '#f8f9fa' : 'white'
//                             }}
//                         >
//                             <div className="d-flex align-items-center">
//                                 <span className="me-3" style={{ fontSize: '1.5em' }}>
//                                     {language.flag}
//                                 </span>
//                                 <div className="text-start">
//                                     <div className="fw-bold">{language.name}</div>
//                                     <small className="text-muted">{language.nativeName}</small>
//                                 </div>
//                             </div>
//                             {currentLanguage === language.code && (
//                                 <FaCheck className="text-primary" />
//                             )}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             <div className="mt-4 p-3 rounded" style={{ backgroundColor: '#f8f9fa' }}>
//                 <small className="text-muted">
//                     <strong>Note:</strong> Changing the language will update the app interface immediately.
//                     Some user-generated content may remain in its original language.
//                 </small>
//             </div>
//         </div>
//     );

//     const MainSettings = () => (
//         <div>
//             <div className="d-flex align-items-center mb-4">
//                 <button
//                     onClick={() => navigate('/profile')}
//                     className="btn p-0 me-3"
//                     style={{ background: 'none', border: 'none' }}
//                     aria-label="Go back"
//                 >
//                     <FaChevronLeft size={20} />
//                 </button>
//                 <h4 className="mb-0 fw-bold">Settings and activity</h4>
//             </div>

//             {/* What you see section */}
//             <div className="mb-4">
//                 <h6 className="text-muted mb-3">What you see</h6>
//                 <div className="list-group">
//                     <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
//                         <span>Favourites</span>
//                         <div className="d-flex align-items-center">
//                             <span className="text-muted me-2">0</span>
//                             <span>›</span>
//                         </div>
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
//                         <span>Muted</span>
//                         <div className="d-flex align-items-center">
//                             <span className="text-muted me-2">0</span>
//                             <span>›</span>
//                         </div>
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
//                         <span>Content preferences</span>
//                         <span>›</span>
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
//                         <span>Like and share counts</span>
//                         <span>›</span>
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
//                         <span>Subscriptions</span>
//                         <span>›</span>
//                     </button>
//                 </div>
//             </div>

//             {/* Your app and media section */}
//             <div className="mb-4">
//                 <h6 className="text-muted mb-3">Your app and media</h6>
//                 <div className="list-group">
//                     <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
//                         <span>Device permissions</span>
//                         <span>›</span>
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
//                         <span>Archiving and downloading</span>
//                         <span>›</span>
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
//                         <span>Accessibility</span>
//                         <span>›</span>
//                     </button>
//                     <button
//                         className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center"
//                         onClick={() => setActiveSection('language')}
//                     >
//                         <div className="d-flex align-items-center">
//                             <FaGlobe className="me-3 text-primary" />
//                             <span>Language and translations</span>
//                         </div>
//                         <div className="d-flex align-items-center">
//                             <small className="text-muted me-2">
//                                 {languages.find(lang => lang.code === currentLanguage)?.name}
//                             </small>
//                             <span>›</span>
//                         </div>
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
//                         <span className="text-muted">Data usage and media quality</span>
//                         <span>›</span>
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
//                         <span>App website permissions</span>
//                         <span>›</span>
//                     </button>
//                 </div>
//             </div>

//             {/* Family Centre */}
//             <div className="mb-4">
//                 <div className="list-group">
//                     <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
//                         <div>
//                             <div className="fw-bold">Family Centre</div>
//                             <small className="text-muted">Supervision for Teen Accounts</small>
//                         </div>
//                         <span>›</span>
//                     </button>
//                 </div>
//             </div>

//             {/* Your insights and tools */}
//             <div className="mb-4">
//                 <h6 className="text-muted mb-3">Your insights and tools</h6>
//                 <div className="list-group">
//                     <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
//                         <div>
//                             <div>Your dashboard</div>
//                             <small className="text-muted">Account type and tools</small>
//                         </div>
//                         <span>›</span>
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
//                         <div>
//                             <div>Meta Verified</div>
//                             <small className="text-muted">Not subscribed</small>
//                         </div>
//                         <span>›</span>
//                     </button>
//                 </div>
//             </div>

//             {/* Your orders and fundraisers */}
//             <div className="mb-4">
//                 <h6 className="text-muted mb-3">Your orders and fundraisers</h6>
//                 <div className="list-group">
//                     <button className="list-group-item list-group-item-action border-0 d-flex justify-content-between align-items-center">
//                         <div>
//                             <div>Orders and payments</div>
//                             <small className="text-muted">More info and support</small>
//                         </div>
//                         <span>›</span>
//                     </button>
//                 </div>
//             </div>

//             {/* About section */}
//             <div className="mb-4">
//                 <h6 className="text-muted mb-3">About</h6>
//                 <div className="list-group">
//                     <button className="list-group-item list-group-item-action border-0">
//                         Help
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0">
//                         Privacy Centre
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0">
//                         Account Status
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0">
//                         About
//                     </button>
//                 </div>
//             </div>

//             {/* Also from Meta */}
//             <div className="mb-4">
//                 <h6 className="text-muted mb-3">Also from Meta</h6>
//                 <div className="list-group">
//                     <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
//                         <FaWhatsapp className="me-3 text-success" size={20} />
//                         <div>
//                             <div>WhatsApp</div>
//                             <small className="text-muted">Message privately with friends and family</small>
//                         </div>
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
//                         <FaEdit className="me-3 text-primary" size={20} />
//                         <div>
//                             <div>Edits</div>
//                             <small className="text-muted">Create videos with powerful editing tools</small>
//                         </div>
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
//                         <FaComments className="me-3 text-black" size={20} />
//                         <div>
//                             <div>Threads</div>
//                             <small className="text-muted">Share ideas and join conversations</small>
//                         </div>
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
//                         <FaFacebook className="me-3 text-primary" size={20} />
//                         <div>
//                             <div>Facebook</div>
//                             <small className="text-muted">Explore things that you love</small>
//                         </div>
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
//                         <FaComments className="me-3 text-primary" size={20} />
//                         <div>
//                             <div>Messenger</div>
//                             <small className="text-muted">Chat and share seamlessly with friends</small>
//                         </div>
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0 d-flex align-items-center">
//                         <FaRobot className="me-3 text-primary" size={20} />
//                         <div>
//                             <div>Meta AI</div>
//                             <small className="text-muted">Get answers, advice and generate images</small>
//                         </div>
//                     </button>
//                 </div>
//             </div>

//             {/* Login options */}
//             <div className="mb-4">
//                 <div className="list-group">
//                     <button className="list-group-item list-group-item-action border-0 text-primary">
//                         Add account
//                     </button>
//                     <button
//                         className="list-group-item list-group-item-action border-0"
//                         onClick={handleLogout}
//                     >
//                         Log out
//                     </button>
//                     <button className="list-group-item list-group-item-action border-0">
//                         Log out of all accounts
//                     </button>
//                 </div>
//             </div>
//         </div>
//     );

//     return (
//         <div className="container" style={{ maxWidth: '600px', paddingTop: '20px' }}>
//             {activeSection === 'main' && <MainSettings />}
//             {activeSection === 'language' && <LanguageSettings />}
//         </div>
//     );
// }