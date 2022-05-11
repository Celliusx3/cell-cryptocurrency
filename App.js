import React from 'react';
import { NavigationContainer } from "@react-navigation/native";
import MainStack from './src/navigation/routes';
import { StatusBar } from 'react-native';
import { ThemeContext, ThemeProvider } from './src/themes/Theme';

const App = () => {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {({ theme }) => (
          <NavigationContainer theme={theme}>
            <StatusBar hidden />
            <MainStack/>
          </NavigationContainer>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
    
  );
};

export default App;