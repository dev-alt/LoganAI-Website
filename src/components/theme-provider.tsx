'use client';

import * as React from 'react';

export type Theme = 'dark' | 'light' | 'system';

export interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
    attribute?: string;
    enableSystem?: boolean;
    disableTransitionOnChange?: boolean;
}

interface ThemeProviderState {
    theme: Theme;
    setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
    theme: 'system',
    setTheme: () => null,
};

const ThemeProviderContext = React.createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
                                  children,
                                  defaultTheme = 'system',
                                  storageKey = 'ui-theme',
                                  attribute = 'class',
                                  enableSystem = true,
                                  disableTransitionOnChange = true,
                                  ...props
                              }: ThemeProviderProps) {
    const [mounted, setMounted] = React.useState(false);
    const [theme, setTheme] = React.useState<Theme>(defaultTheme);

    // Get initial theme from localStorage when component mounts
    React.useEffect(() => {
        const savedTheme = localStorage?.getItem(storageKey) as Theme;
        if (savedTheme) {
            setTheme(savedTheme);
        }
        setMounted(true);
    }, [storageKey]);

    // Handle transitions
    React.useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        if (disableTransitionOnChange) {
            root.classList.add('disable-transitions');

            return () => {
                root.classList.remove('disable-transitions');
            };
        }
    }, [disableTransitionOnChange, mounted]);


    // Handle theme changes
    React.useEffect(() => {
        if (!mounted) return;

        const root = window.document.documentElement;
        root.removeAttribute(attribute);

        let currentTheme = theme;

        if (currentTheme === 'system' && enableSystem) {
            currentTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
        }

        root.classList.remove('light', 'dark');
        root.classList.add(currentTheme);
        root.setAttribute(attribute, currentTheme);
    }, [theme, attribute, enableSystem, mounted]);


    // Watch for system theme changes
    React.useEffect(() => {
        if (!mounted || !enableSystem) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = () => {
            if (theme === 'system') {
                const root = window.document.documentElement;
                const systemTheme = mediaQuery.matches ? 'dark' : 'light';
                root.classList.remove('light', 'dark');
                root.classList.add(systemTheme);
                root.setAttribute(attribute, systemTheme);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme, attribute, enableSystem, mounted]);

    const value = React.useMemo(
        () => ({
            theme,
            setTheme: (newTheme: Theme) => {
                if (enableSystem || newTheme !== 'system') {
                    localStorage?.setItem(storageKey, newTheme);
                    setTheme(newTheme);
                }
            },
        }),
        [theme, enableSystem, storageKey]
    );

    // Prevent hydration issues
    if (!mounted) {
        return null;
    }

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = React.useContext(ThemeProviderContext);
    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }
    return context;
};
