import React, { createContext, useState, useContext, ReactNode } from 'react';
import { DefaultTheme, DarkTheme, Theme } from '@react-navigation/native';

type ThemeType = 'light' | 'dark' | 'custom';

interface ThemeContextType {
  theme: Theme;
  themeType: ThemeType;
  setThemeType: (type: ThemeType) => void;
  customTheme: Theme | null;
  setCustomTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: DefaultTheme,
  themeType: 'light',
  setThemeType: () => {},
  customTheme: null,
  setCustomTheme: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [themeType, setThemeType] = useState<ThemeType>('light');
  const [customTheme, setCustomTheme] = useState<Theme | null>(null);

  const getTheme = (): Theme => {
    switch (themeType) {
      case 'dark':
        return DarkTheme;
      case 'custom':
        return customTheme || DefaultTheme;
      case 'light':
      default:
        return DefaultTheme;
    }
  };

  return (
    <ThemeContext.Provider 
      value={{ 
        theme: getTheme(),
        themeType,
        setThemeType,
        customTheme,
        setCustomTheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext); 