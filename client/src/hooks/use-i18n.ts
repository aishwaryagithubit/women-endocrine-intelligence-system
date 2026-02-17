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
};

export const useI18n = create<I18nStore>((set, get) => ({
  language: 'en',
  setLanguage: (lang) => set({ language: lang }),
  t: (key) => {
    const lang = get().language;
    return translations[key]?.[lang] || key;
  },
}));
