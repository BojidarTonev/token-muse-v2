'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '@/hooks/useAnimationPreference';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <AnimationProvider>
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </AnimationProvider>
      <Toaster position="bottom-right" duration={4000} />
    </Provider>
  );
} 