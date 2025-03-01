'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Toaster } from 'sonner';
import { AnimationProvider } from '@/hooks/useAnimationPreference';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
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