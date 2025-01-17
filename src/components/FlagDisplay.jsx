import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { typicalElements } from '../data/flags';

export const FlagDisplay = ({ country, code }) => {
  const { t } = useTranslation();
  const flagEmoji = typicalElements[country.toLowerCase()];

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    toast.success(t('copied'));
  };

  return (
    <Card className="overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 text-center"
      >
        <motion.div
          whileHover={{ scale: 1.2 }}
          className="text-6xl mb-4"
        >
          {flagEmoji}
        </motion.div>

        <div className="space-y-2">
          <h3 className="text-lg font-semibold">{country}</h3>
          <div className="flex items-center justify-center gap-2">
            <code className="bg-muted px-2 py-1 rounded">{code}</code>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCopy}
              className="h-8 w-8"
              aria-label={t('copyCode')}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </motion.div>
    </Card>
  );
};

export default FlagDisplay;