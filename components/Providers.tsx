'use client';

import { ThemeProvider } from 'next-themes';
import { Toaster } from 'sonner';
import { Provider } from 'react-redux';
import { store } from '@/redux/store';
import { WalletProvider } from '@/context/WalletContext';
import { AnimationProvider } from '@/hooks/useAnimationPreference';
import AnimationSettings from './AnimationSettings';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        enableSystem
        disableTransitionOnChange
      >
        <AnimationProvider>
          <WalletProvider>
            {children}
            <AnimationSettings />
            <Toaster
              position="bottom-right"
              toastOptions={{
                style: {
                  background: '#1e1e2a',
                  color: '#ffffff',
                  border: '1px solid #2a2a3a',
                  borderLeft: '4px solid #e11d48',
                  borderRadius: '8px',
                  padding: '16px',
                  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
                  fontFamily: 'Montserrat, sans-serif',
                },
                duration: 4000,
              }}
            />
          </WalletProvider>
        </AnimationProvider>
      </ThemeProvider>
    </Provider>
  );
} 