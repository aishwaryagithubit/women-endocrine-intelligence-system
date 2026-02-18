import { create } from 'zustand';

type Language = 'en' | 'ne';

interface I18nStore {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  'welcome': { en: 'Welcome back', ne: 'स्वागत छ' },
  'dashboard': { en: 'Dashboard', ne: 'ड्यासबोर्ड' },
  'tracking': { en: 'Track Daily', ne: 'दैनिक ट्र्याकिंग' },
  'learning': { en: 'Learning Hub', ne: 'सिक्ने केन्द्र' },
  'chat': { en: 'AI Assistant', ne: 'AI सहायक' },
  'doctors': { en: 'Find Doctor', ne: 'डाक्टर खोज्नुहोस्' },
  'settings': { en: 'Settings', ne: 'सेटिङहरू' },
  'mood': { en: 'How are you feeling?', ne: 'तपाईंलाई कस्तो महसुस भइरहेको छ?' },
  'symptoms': { en: 'Symptoms', ne: 'लक्षणहरू' },
  'save': { en: 'Save Entry', ne: 'सुरक्षित गर्नुहोस्' },
  'cycle_day': { en: 'Cycle Day', ne: 'साइकल दिन' },
  'period_in': { en: 'Period in', ne: 'महिनावारी सुरु हुन' },
  'days': { en: 'days', ne: 'दिनहरू' },
  'today': { en: 'Today', ne: 'आज' },
  'log_symptoms': { en: 'Log Symptoms', ne: 'लक्षणहरू दर्ता गर्नुहोस्' },
  'menstruation': { en: 'Menstruation (Days 1–5)', ne: 'महिनावारी (दिन १–५)' },
  'follicular': { en: 'Follicular Phase (Days 1–13)', ne: 'फोलिक्युलर चरण (दिन १–१३)' },
  'ovulation': { en: 'Ovulation (Around Day 14)', ne: 'डिम्ब निष्कासन (दिन १४ को आसपास)' },
  'luteal': { en: 'Luteal Phase (Days 15–28)', ne: 'ल्युटियल चरण (दिन १५–२८)' },
  'menstruation_desc': { en: 'The uterine lining sheds, resulting in bleeding.', ne: 'पाठेघरको भित्री तह झर्ने प्रक्रिया, जसले गर्दा रक्तश्राव हुन्छ।' },
  'follicular_desc': { en: 'Hormones signal follicles to mature and lining thickens.', ne: 'हर्मोनले डिम्बाशयमा फोलिकल्सलाई परिपक्व बनाउँछ र पत्र बाक्लो हुन थाल्छ।' },
  'ovulation_desc': { en: 'A mature egg is released, the most fertile time.', ne: 'परिपक्व डिम्ब निष्कासन हुन्छ, यो सबैभन्दा उर्वर समय हो।' },
  'luteal_desc': { en: 'The body prepares for a potential pregnancy.', ne: 'शरीरले सम्भावित गर्भावस्थाको लागि तयारी गर्छ।' },
  'flow': { en: 'Flow', ne: 'बहाव' },
  'pain': { en: 'Pain Intensity', ne: 'दुखाइको तीव्रता' },
  'energy': { en: 'Energy Level', ne: 'ऊर्जा स्तर' },
  'sleep': { en: 'Sleep (hours)', ne: 'निद्रा (घण्टा)' },
  'stress': { en: 'Stress Level', ne: 'तनाव स्तर' },
  'chat_placeholder': { en: 'Ask about symptoms, cycle...', ne: 'लक्षण वा चक्रको बारेमा सोध्नुहोस्...' },
  'find_specialist': { en: 'Find a Specialist', ne: 'विशेषज्ञ खोज्नुहोस्' },
  'trusted_pros': { en: 'Trusted healthcare professionals in your area.', ne: 'तपाईंको क्षेत्रका विश्वसनीय स्वास्थ्य पेशेवरहरू।' },
  'book_appointment': { en: 'Book Appointment', ne: 'अपोइन्टमेन्ट बुक गर्नुहोस्' },
  'logout': { en: 'Logout', ne: 'बाहिरिनुहोस्' },
  'language': { en: 'Language', ne: 'भाषा' },
  'chat_title': { en: 'AI Health Assistant', ne: 'AI स्वास्थ्य सहायक' },
  'chat_subtitle': { en: 'Get instant answers to your health questions.', ne: 'तपाईंका स्वास्थ्य प्रश्नहरूको तुरुन्त जवाफ पाउनुहोस्।' },
  'chat_welcome': { en: "Hello! I'm Endora AI. Ask me anything about your cycle, symptoms, or sexual health. Note: I am an AI, not a doctor.", ne: "नमस्ते! म एन्डोरा AI हुँ। मलाई आफ्नो चक्र, लक्षण, वा यौन स्वास्थ्यको बारेमा केहि पनि सोध्नुहोस्। नोट: म एक AI हुँ, डाक्टर होइन।" },
  'chat_response_default': { en: "That's a common question. Irregular cycles can be caused by stress, diet, or hormonal changes. If this persists for more than 3 cycles, it might be worth consulting a specialist.", ne: "यो एक सामान्य प्रश्न हो। अनियमित चक्र तनाव, आहार, वा हर्मोनल परिवर्तनहरूको कारण हुन सक्छ। यदि यो ३ चक्र भन्दा बढी समयसम्म रहिरह्यो भने, विशेषज्ञसँग परामर्श लिनु राम्रो हुन सक्छ।" },
  'footer_rights': { en: '© 2026 Endora. All rights reserved.', ne: '© २०२६ एन्डोरा। सबै अधिकार सुरक्षित।' },
  'footer_privacy': { en: 'Privacy Policy', ne: 'गोपनीयता नीति' },
  'footer_terms': { en: 'Terms of Service', ne: 'सेवाका सर्तहरू' },
};

export const useI18n = create<I18nStore>((set, get) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  t: (key) => {
    const lang = get().language;
    return translations[key]?.[lang] || key;
  },
}));
