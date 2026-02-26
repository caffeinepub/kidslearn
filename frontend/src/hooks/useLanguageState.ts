import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Language } from '../data/languageData';

const STORAGE_KEY = 'selectedLanguage';

interface LanguageContextValue {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  language: 'english',
  setLanguage: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const stored = sessionStorage.getItem(STORAGE_KEY);
      if (stored === 'english' || stored === 'telugu' || stored === 'hindi' || stored === 'tamil') {
        return stored as Language;
      }
    } catch {
      // ignore
    }
    return 'english';
  });

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    try {
      sessionStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  }, []);

  return React.createElement(LanguageContext.Provider, { value: { language, setLanguage } }, children);
}

export function useLanguageState() {
  return useContext(LanguageContext);
}
