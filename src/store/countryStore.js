import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCountryStore = create(
  persist(
    (set) => ({
      selectedCountry: null,
      conversionHistory: [],
      language: 'en',
      darkMode: false,
      
      setSelectedCountry: (country) => 
        set({ selectedCountry: country }),
      
      addToHistory: (conversion) => 
        set((state) => ({
          conversionHistory: [conversion, ...state.conversionHistory].slice(0, 10)
        })),
      
      setLanguage: (lang) => 
        set({ language: lang }),
      
      toggleDarkMode: () => 
        set((state) => ({ darkMode: !state.darkMode })),
      
      clearHistory: () => 
        set({ conversionHistory: [] })
    }),
    {
      name: 'country-converter-storage'
    }
  )
);

export default useCountryStore;