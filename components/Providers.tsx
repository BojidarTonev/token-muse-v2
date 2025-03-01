'use client';

import { ReactNode, useId } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Toaster } from 'sonner';
import { AnimatePresence } from 'framer-motion';
import { AnimationProvider } from '@/hooks/useAnimationPreference';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  // Generate a stable ID for the key
  const contentId = useId();
  
  return (
    <Provider store={store}>
      <AnimationProvider>
        {/* Remove AnimatePresence from wrapping the entire app */}
        {children}
      </AnimationProvider>
      <Toaster position="bottom-right" duration={4000} />
    </Provider>
  );
} 