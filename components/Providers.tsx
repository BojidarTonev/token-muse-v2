'use client';

import { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { Toaster } from 'sonner';

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      {children}
      <Toaster position="bottom-right" duration={4000} />
    </Provider>
  );
} 