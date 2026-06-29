jest.mock(
  '@react-native-async-storage/async-storage',
  () => require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

// Mock expo-barcode-scanner
jest.mock('expo-barcode-scanner', () => {
  const React = require('react');
  const { View } = require('react-native');
  return {
    BarCodeScanner: Object.assign(
      (props: any) => React.createElement(View, props),
      {
        requestPermissionsAsync: jest.fn().mockResolvedValue({ status: 'granted' }),
        Constants: {
          BarCodeType: {
            qr: 'qr',
          },
        },
      }
    ),
  };
});

// Mock ThemeContext to return a default theme for tests where ThemeProvider is missing
jest.mock('./src/theme/ThemeContext', () => {
  const React = require('react');
  return {
    ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
    useTheme: () => ({
      colors: {
        brand: {
          primary: '#2563EB',
          primaryDark: '#1D4ED8',
          accent: '#0EA5E9',
        },
        background: '#F8FAFC',
        surface: '#FFFFFF',
        border: '#E2E8F0',
        textPrimary: '#0F172A',
        textSecondary: '#475569',
        textMuted: '#94A3B8',
        error: '#DC2626',
        errorBg: '#FEE2E2',
        errorBorder: '#FECACA',
        warning: '#D97706',
        warningBg: '#FEF3C7',
        warningBorder: '#FDE68A',
        success: '#16A34A',
        info: '#1D4ED8',
        infoBg: '#EFF6FF',
      },
      navTheme: {
        dark: false,
        colors: {
          primary: '#2563EB',
          background: '#F8FAFC',
          card: '#FFFFFF',
          text: '#0F172A',
          border: '#E2E8F0',
          notification: '#2563EB',
        },
      },
      scheme: 'light',
    }),
  };
});

// Mock window event dispatch/listeners for compatibility in Node environment
const win = typeof window !== 'undefined' ? window : (global as any).window;
if (win) {
  if (typeof win.dispatchEvent !== 'function') {
    Object.defineProperty(win, 'dispatchEvent', {
      value: jest.fn(),
      writable: true
    });
  }
  if (typeof win.addEventListener !== 'function') {
    Object.defineProperty(win, 'addEventListener', {
      value: jest.fn(),
      writable: true
    });
  }
  if (typeof win.removeEventListener !== 'function') {
    Object.defineProperty(win, 'removeEventListener', {
      value: jest.fn(),
      writable: true
    });
  }
}
