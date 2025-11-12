import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Simple translations - we'll start with Settings
const resources = {
    en: {
        translation: {
            // Settings
            "settings.title": "Settings and activity",
            "settings.language": "Language and translations",
            "settings.follow": "Follow",
            "settings.post": "Post",
            "settings.posts": "Posts",
            "settings.followers": "Followers",
            "settings.following": "Following",
            "settings.editProfile": "Edit Profile",
            "settings.logout": "Log out",
            "settings.addAccount": "Add account",
            "settings.whatYouSee": "What you see",
            "settings.yourAppMedia": "Your app and media",
            "settings.familyCenter": "Family Centre",
            "settings.insightsTools": "Your insights and tools",
            "settings.ordersFundraisers": "Your orders and fundraisers",
            "settings.about": "About",
            "settings.alsoFromMeta": "Also from Meta",

            // Common
            "common.loading": "Loading...",
            "common.save": "Save",
            "common.cancel": "Cancel",
            "common.close": "Close",
            "common.retry": "Retry",
            "common.favourites": "Favourites",
            "common.muted": "Muted",
            "common.contentPreferences": "Content preferences",
            "common.likeShareCounts": "Like and share counts",
            "common.subscriptions": "Subscriptions",
            "common.devicePermissions": "Device permissions",
            "common.archivingDownloading": "Archiving and downloading",
            "common.accessibility": "Accessibility",
            "common.dataUsage": "Data usage and media quality",
            "common.appPermissions": "App website permissions"
        }
    },
    hi: {
        translation: {
            // Settings
            "settings.title": "सेटिंग्स और गतिविधि",
            "settings.language": "भाषा और अनुवाद",
            "settings.follow": "फॉलो करें",
            "settings.post": "पोस्ट",
            "settings.posts": "पोस्ट",
            "settings.followers": "फॉलोअर्स",
            "settings.following": "फॉलोइंग",
            "settings.editProfile": "प्रोफाइल एडिट करें",
            "settings.logout": "लॉग आउट",
            "settings.addAccount": "अकाउंट जोड़ें",
            "settings.whatYouSee": "आप क्या देखते हैं",
            "settings.yourAppMedia": "आपका ऐप और मीडिया",
            "settings.familyCenter": "फैमिली सेंटर",
            "settings.insightsTools": "आपकी अंतर्दृष्टि और टूल्स",
            "settings.ordersFundraisers": "आपके ऑर्डर और फंडरेज़र",
            "settings.about": "के बारे में",
            "settings.alsoFromMeta": "मेटा से भी",

            // Common
            "common.loading": "लोड हो रहा है...",
            "common.save": "सेव",
            "common.cancel": "कैंसल",
            "common.close": "बंद करें",
            "common.retry": "पुनः प्रयास करें",
            "common.favourites": "पसंदीदा",
            "common.muted": "म्यूट किए गए",
            "common.contentPreferences": "कंटेंट प्रिफरेंस",
            "common.likeShareCounts": "लाइक और शेयर काउंट",
            "common.subscriptions": "सब्सक्रिप्शन",
            "common.devicePermissions": "डिवाइस परमिशन",
            "common.archivingDownloading": "आर्काइविंग और डाउनलोडिंग",
            "common.accessibility": "एक्सेसिबिलिटी",
            "common.dataUsage": "डेटा यूज़ और मीडिया क्वालिटी",
            "common.appPermissions": "ऐप वेबसाइट परमिशन"
        }
    },
    te: {
        translation: {
            // Settings
            "settings.title": "సెట్టింగ్లు మరియు కార్యాచరణ",
            "settings.language": "భాష మరియు అనువాదాలు",
            "settings.follow": "ఫాలో అవ్వండి",
            "settings.post": "పోస్ట్",
            "settings.posts": "పోస్ట్లు",
            "settings.followers": "ఫాలోవర్లు",
            "settings.following": "ఫాలోయింగ్",
            "settings.editProfile": "ప్రొఫైల్ ఎడిట్ చేయండి",
            "settings.logout": "లాగ్అవుట్",
            "settings.addAccount": "ఖాతా జోడించండి",
            "settings.whatYouSee": "మీరు ఏమి చూస్తారు",
            "settings.yourAppMedia": "మీ యాప్ మరియు మీడియా",
            "settings.familyCenter": "ఫ్యామిలీ సెంటర్",
            "settings.insightsTools": "మీ ఇన్సైట్స్ మరియు టూల్స్",
            "settings.ordersFundraisers": "మీ ఆర్డర్లు మరియు ఫండ్రైజర్లు",
            "settings.about": "గురించి",
            "settings.alsoFromMeta": "మెటా నుండి కూడా",

            // Common
            "common.loading": "లోడ్ అవుతోంది...",
            "common.save": "సేవ్ చేయండి",
            "common.cancel": "రద్దు చేయండి",
            "common.close": "క్లోజ్ చేయండి",
            "common.retry": "మళ్లీ ప్రయత్నించండి",
            "common.favourites": "ఫేవరెట్లు",
            "common.muted": "మ్యూట్ చేయబడింది",
            "common.contentPreferences": "కంటెంట్ ప్రిఫరెన్సెస్",
            "common.likeShareCounts": "లైక్ మరియు షేర్ కౌంట్లు",
            "common.subscriptions": "సబ్స్క్రిప్షన్లు",
            "common.devicePermissions": "డివైస్ అనుమతులు",
            "common.archivingDownloading": "ఆర్కైవింగ్ మరియు డౌన్లోడింగ్",
            "common.accessibility": "యాక్సెసిబిలిటీ",
            "common.dataUsage": "డేటా వినియోగం మరియు మీడియా నాణ్యత",
            "common.appPermissions": "యాప్ వెబ్సైట్ అనుమతులు"
        }
    }
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: 'en',
        debug: false,
        interpolation: {
            escapeValue: false,
        },
        detection: {
            order: ['localStorage', 'navigator'],
            caches: ['localStorage'],
        },
    });

export default i18n;






// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import LanguageDetector from 'i18next-browser-languagedetector';

// // Simple translations - we'll start with Settings
// const resources = {
//     en: {
//         translation: {
//             // Settings
//             "settings.title": "Settings and activity",
//             "settings.language": "Language and translations",
//             "settings.follow": "Follow",
//             "settings.post": "Post",
//             "settings.posts": "Posts",
//             "settings.followers": "Followers",
//             "settings.following": "Following",
//             "settings.editProfile": "Edit Profile",
//             "settings.logout": "Log out",
//             "settings.addAccount": "Add account",
//             "settings.whatYouSee": "What you see",
//             "settings.yourAppMedia": "Your app and media",
//             "settings.familyCenter": "Family Centre",
//             "settings.insightsTools": "Your insights and tools",
//             "settings.ordersFundraisers": "Your orders and fundraisers",
//             "settings.about": "About",
//             "settings.alsoFromMeta": "Also from Meta",

//             // Common
//             "common.loading": "Loading...",
//             "common.save": "Save",
//             "common.cancel": "Cancel",
//             "common.close": "Close",
//             "common.retry": "Retry",
//             "common.favourites": "Favourites",
//             "common.muted": "Muted",
//             "common.contentPreferences": "Content preferences",
//             "common.likeShareCounts": "Like and share counts",
//             "common.subscriptions": "Subscriptions",
//             "common.devicePermissions": "Device permissions",
//             "common.archivingDownloading": "Archiving and downloading",
//             "common.accessibility": "Accessibility",
//             "common.dataUsage": "Data usage and media quality",
//             "common.appPermissions": "App website permissions"
//         }
//     },
//     hi: {
//         translation: {
//             // Settings
//             "settings.title": "सेटिंग्स और गतिविधि",
//             "settings.language": "भाषा और अनुवाद",
//             "settings.follow": "फॉलो करें",
//             "settings.post": "पोस्ट",
//             "settings.posts": "पोस्ट",
//             "settings.followers": "फॉलोअर्स",
//             "settings.following": "फॉलोइंग",
//             "settings.editProfile": "प्रोफाइल एडिट करें",
//             "settings.logout": "लॉग आउट",
//             "settings.addAccount": "अकाउंट जोड़ें",
//             "settings.whatYouSee": "आप क्या देखते हैं",
//             "settings.yourAppMedia": "आपका ऐप और मीडिया",
//             "settings.familyCenter": "फैमिली सेंटर",
//             "settings.insightsTools": "आपकी अंतर्दृष्टि और टूल्स",
//             "settings.ordersFundraisers": "आपके ऑर्डर और फंडरेज़र",
//             "settings.about": "के बारे में",
//             "settings.alsoFromMeta": "मेटा से भी",

//             // Common
//             "common.loading": "लोड हो रहा है...",
//             "common.save": "सेव",
//             "common.cancel": "कैंसल",
//             "common.close": "बंद करें",
//             "common.retry": "पुनः प्रयास करें",
//             "common.favourites": "पसंदीदा",
//             "common.muted": "म्यूट किए गए",
//             "common.contentPreferences": "कंटेंट प्रिफरेंस",
//             "common.likeShareCounts": "लाइक और शेयर काउंट",
//             "common.subscriptions": "सब्सक्रिप्शन",
//             "common.devicePermissions": "डिवाइस परमिशन",
//             "common.archivingDownloading": "आर्काइविंग और डाउनलोडिंग",
//             "common.accessibility": "एक्सेसिबिलिटी",
//             "common.dataUsage": "डेटा यूज़ और मीडिया क्वालिटी",
//             "common.appPermissions": "ऐप वेबसाइट परमिशन"
//         }
//     },
//     te: {
//         translation: {
//             // Settings
//             "settings.title": "సెట్టింగ్లు మరియు కార్యాచరణ",
//             "settings.language": "భాష మరియు అనువాదాలు",
//             "settings.follow": "ఫాలో అవ్వండి",
//             "settings.post": "పోస్ట్",
//             "settings.posts": "పోస్ట్లు",
//             "settings.followers": "ఫాలోవర్లు",
//             "settings.following": "ఫాలోయింగ్",
//             "settings.editProfile": "ప్రొఫైల్ ఎడిట్ చేయండి",
//             "settings.logout": "లాగ్అవుట్",
//             "settings.addAccount": "ఖాతా జోడించండి",
//             "settings.whatYouSee": "మీరు ఏమి చూస్తారు",
//             "settings.yourAppMedia": "మీ యాప్ మరియు మీడియా",
//             "settings.familyCenter": "ఫ్యామిలీ సెంటర్",
//             "settings.insightsTools": "మీ ఇన్సైట్స్ మరియు టూల్స్",
//             "settings.ordersFundraisers": "మీ ఆర్డర్లు మరియు ఫండ్రైజర్లు",
//             "settings.about": "గురించి",
//             "settings.alsoFromMeta": "మెటా నుండి కూడా",

//             // Common
//             "common.loading": "లోడ్ అవుతోంది...",
//             "common.save": "సేవ్ చేయండి",
//             "common.cancel": "రద్దు చేయండి",
//             "common.close": "క్లోజ్ చేయండి",
//             "common.retry": "మళ్లీ ప్రయత్నించండి",
//             "common.favourites": "ఫేవరెట్లు",
//             "common.muted": "మ్యూట్ చేయబడింది",
//             "common.contentPreferences": "కంటెంట్ ప్రిఫరెన్సెస్",
//             "common.likeShareCounts": "లైక్ మరియు షేర్ కౌంట్లు",
//             "common.subscriptions": "సబ్స్క్రిప్షన్లు",
//             "common.devicePermissions": "డివైస్ అనుమతులు",
//             "common.archivingDownloading": "ఆర్కైవింగ్ మరియు డౌన్లోడింగ్",
//             "common.accessibility": "యాక్సెసిబిలిటీ",
//             "common.dataUsage": "డేటా వినియోగం మరియు మీడియా నాణ్యత",
//             "common.appPermissions": "యాప్ వెబ్సైట్ అనుమతులు"
//         }
//     }
// };

// i18n
//     .use(LanguageDetector)
//     .use(initReactI18next)
//     .init({
//         resources,
//         fallbackLng: 'en',
//         debug: false,
//         interpolation: {
//             escapeValue: false,
//         },
//         detection: {
//             order: ['localStorage', 'navigator'],
//             caches: ['localStorage'],
//         },
//     });

// export default i18n;