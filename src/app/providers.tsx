'use client';

import { ReactNode } from 'react';
import { ThemeProvider } from '@/components/theme-provider';

interface ProvidersProps {
    children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
    return (
        <ThemeProvider>
            {children}
        </ThemeProvider>
    );
}
