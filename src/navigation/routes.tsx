import React from 'react';
import HomeScreen from '../screens/home/HomeScreen';
import DetailsScreen from '../screens/details/DetailsScreen';
import ExampleScreen from '../screens/examples/ExampleScreen';
import AccountDetailsScreen from '../screens/accountDetails/AccountDetailsScreen';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import GraphScreen from '../screens/graphs/GraphScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome';
import SettingsScreen from '../screens/settings/SettingsScreen';

export type RootStackParamList = {
  // Example: undefined;
  Main: undefined;
  Details: {platform: string, pair: string};
  AccountDetails: {platform: string, transactionId: string}
};

const MainStackNavigator = createStackNavigator<RootStackParamList>();

const MainStack = () => {
  return (
    <MainStackNavigator.Navigator screenOptions={{ headerTitleAlign: "center", cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,}}>
      {/* <MainStackNavigator.Screen name="Example" component={ExampleScreen}/> */}
      <MainStackNavigator.Screen name="Main" component={MainTab} options={{headerShown: false}} />
      <MainStackNavigator.Screen name="Details" component={DetailsTab} />
      <MainStackNavigator.Screen name="AccountDetails" component={AccountDetailsScreen} options={{title: "Account Details"}} />
    </MainStackNavigator.Navigator>
  );
};

const DetailsTabNavigator = createBottomTabNavigator();
export const DetailsContext = React.createContext(null);

const DetailsTab = ({ route }) => {
  return (
    <DetailsContext.Provider value={{platform: route.params.platform, pair: route.params.pair}}>
      <DetailsTabNavigator.Navigator screenOptions={{headerShown: false}}>
        <DetailsTabNavigator.Screen options={{
          title: "Graph",
          tabBarLabel: "Graph",
          tabBarIcon: ({ color, size }) => (
            <Icon name="bar-chart" size={size} color={color} />
          ),}} 
          name='Graph'
          component={GraphScreen} />
        <DetailsTabNavigator.Screen options={{
          title: "Transactions",
          tabBarLabel: "Transactions",
          tabBarIcon: ({ color, size }) => (
            <Icon name="exchange" size={size} color={color} />
          ),}} 
          name='Transactions'
          component={DetailsScreen} />
      </DetailsTabNavigator.Navigator>
    </DetailsContext.Provider>
  );
}

const MainTabNavigator = createBottomTabNavigator();

const MainTab = () => {
  return (
    <MainTabNavigator.Navigator screenOptions={{headerTitleAlign: "center"}}>
      <MainTabNavigator.Screen options={{
        title: "Home",
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" size={size} color={color} />
        ),}} 
        name='Home'
        component={HomeScreen} />
      <MainTabNavigator.Screen options={{
        title: "Settings",
        tabBarLabel: "Settings",
        tabBarIcon: ({ color, size }) => (
          <Icon name="gear" size={size} color={color} />
        ),}} 
        name='Settings'
        component={SettingsScreen} />
    </MainTabNavigator.Navigator>
  );
};

export default MainStack