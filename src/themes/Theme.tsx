import React, { useState } from 'react';

const DefaultTheme = {
  dark: false,
  colors: {
    primary: '#6200ee',
    background: '#f6f6f6',
    card: 'rgb(255, 255, 255)',
    text: "#000000",
    border: 'rgb(199, 199, 204)',
    notification: "#f50057",
    positive: "#38A169",
    negative: "#E53E3E"
  }
};

const DarkTheme = {
  ...DefaultTheme,
  dark: true,
  colors: {
    ...DefaultTheme.colors,
    primary: '#F565AD',
    background: '#000000',
    card: '#000000',
    text: "#ffffff",
    border: '#ffffff36',
    notification: "#f50057",
    positive: "#48BB78",
    negative: "#F56565"
  },
};

export const ThemeContext = React.createContext(
  {
    theme: DefaultTheme,
    toggleTheme: () => {}
  }
);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(DarkTheme);

  const toggleTheme = () => {
    setTheme(theme == DefaultTheme ? DarkTheme: DefaultTheme)
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
