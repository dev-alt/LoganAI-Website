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
    const [theme, setTheme] = React.useState<Theme>(
        () => (localStorage?.getItem(storageKey) as Theme) || defaultTheme
    );

    // Handle transitions
    React.useEffect(() => {
        if (disableTransitionOnChange) {
            document.documentElement.classList.add('disable-transitions');
            return () => {
                document.documentElement.classList.remove('disable-transitions');
            };
        }
    }, [disableTransitionOnChange]);

    React.useEffect(() => {
        const root = window.document.documentElement;
        root.removeAttribute(attribute);

        let currentTheme = theme;

        // Handle system theme if enabled
        if (currentTheme === 'system' && enableSystem) {
            const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
                ? 'dark'
                : 'light';
            currentTheme = systemTheme;
        }

        // Set the attribute with the current theme
        root.setAttribute(attribute, currentTheme);
    }, [theme, attribute, enableSystem]);

    // Watch for system theme changes
    React.useEffect(() => {
        if (!enableSystem) return;

        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

        const handleChange = () => {
            if (theme === 'system') {
                const root = window.document.documentElement;
                const systemTheme = mediaQuery.matches ? 'dark' : 'light';
                root.setAttribute(attribute, systemTheme);
            }
        };

        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, [theme, attribute, enableSystem]);

    const value = React.useMemo<ThemeProviderState>(
        () => ({
            theme,
            setTheme: (newTheme: Theme) => {
                // Only allow system theme if enableSystem is true
                if (newTheme === 'system' && !enableSystem) {
                    newTheme = 'dark';
                }
                localStorage?.setItem(storageKey, newTheme);
                setTheme(newTheme);
            },
        }),
        [theme, enableSystem, storageKey]
    );

    return (
        <ThemeProviderContext.Provider {...props} value={value}>
            {children}
        </ThemeProviderContext.Provider>
    );
}

// Custom hook to use theme
export const useTheme = () => {
    const context = React.useContext(ThemeProviderContext);

    if (context === undefined) {
        throw new Error('useTheme must be used within a ThemeProvider');
    }

    return context;
};
