import { DefaultTheme, MD3DarkTheme } from 'react-native-paper';

// Light theme
export const lightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#6200EE', // Vibrant purple
    background: '#FFFFFF', // White background
    surface: '#F5F5F5', // Light gray surface
    accent: '#e4f7f3', // Teal
    text: '#000000', // Black text
    placeholder: '#757575', // Grey placeholder text
    disabled: '#D3D3D3', // Disabled light gray
    onSurface: '#000000', // Black text on surface
  },
};

// Dark theme
export const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: '#1E88E5', // Light blue for primary elements
    background: '#0A2540', // Dark blue background
    surface: '#1565C0', // Slightly lighter blue for surfaces
    accent: '#0c2f52', // Accent blue
    text: '#FFFFFF', // White text
    placeholder: '#B0BEC5', // Light gray placeholder text
    disabled: '#78909C', // Disabled grayish-blue
    onSurface: '#FFFFFF', // White text on surface
  },
};