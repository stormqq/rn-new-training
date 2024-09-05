import { MD3LightTheme as LightTheme, MD3DarkTheme as DarkTheme } from 'react-native-paper';

export const lightTheme = {
  ...LightTheme,
  colors: {
    ...LightTheme.colors,
    primary: '#6200EE',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#000000',
    onSurface: '#000000',
  },
};

export const darkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#1E3A8A',
    background: '#0A2540',
    surface: '#102E4C',
    text: '#FFFFFF',
    onSurface: '#B3C7E6',
  },
};
