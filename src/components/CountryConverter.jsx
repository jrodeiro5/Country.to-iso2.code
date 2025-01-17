import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useCountryStore } from '../store/countryStore';
import { FlagDisplay } from './FlagDisplay';

const CountryConverter = () => {
  const { t } = useTranslation();
  const { selectedCountry, setSelectedCountry, addToHistory } = useCountryStore();
  const [input, setInput] = React.useState('');
  const [mode, setMode] = React.useState('countryToCode');

  const handleConvert = () => {
    const result = mode === 'countryToCode' 
      ? convertCountryToCode(input)
      : convertCodeToCountry(input);

    if (result) {
      setSelectedCountry(result);
      addToHistory({ input, result, mode, timestamp: new Date() });
      toast.success(t('conversionSuccess'));
    } else {
      toast.error(t('conversionError'));
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="container mx-auto px-4 py-8 max-w-md"
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-center gap-4 mb-6">
            <Button
              variant={mode === 'countryToCode' ? 'default' : 'outline'}
              onClick={() => setMode('countryToCode')}
            >
              {t('countryToCode')}
            </Button>
            <Button
              variant={mode === 'codeToCountry' ? 'default' : 'outline'}
              onClick={() => setMode('codeToCountry')}
            >
              {t('codeToCountry')}
            </Button>
          </div>

          <div className="space-y-4">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t(mode === 'countryToCode' ? 'enterCountry' : 'enterCode')}
              className="w-full"
            />
            <Button onClick={handleConvert} className="w-full">
              {t('convert')}
            </Button>
          </div>

          {selectedCountry && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-6"
            >
              <FlagDisplay
                country={mode === 'countryToCode' ? input : selectedCountry}
                code={mode === 'countryToCode' ? selectedCountry : input}
              />
            </motion.div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default CountryConverter;