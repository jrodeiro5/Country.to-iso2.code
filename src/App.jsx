import React from 'react';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { Toaster } from 'sonner';
import CountryConverter from './components/CountryConverter';
import { useTranslation } from 'react-i18next';
import './i18n/config';

const queryClient = new QueryClient();

function App() {
  const { i18n } = useTranslation();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`min-h-screen ${i18n.dir() === 'rtl' ? 'rtl' : 'ltr'}`}>
        <CountryConverter />
        <Toaster position="bottom-right" />
      </div>
    </QueryClientProvider>
  );
}

export default App;