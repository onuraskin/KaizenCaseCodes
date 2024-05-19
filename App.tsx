import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import MainPage from './src/pages/MainPage';
import DetailPage from './src/pages/DetailPage';
import {PlusIcon, StarIcon, KesfetIcon} from './src/assets/svg';
import Colors from './src/theme/Colors';
import {styles} from './styles';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Detail"
        component={DetailPage}
        options={{headerShown: false, tabBarVisible: false}}
      />
    </Stack.Navigator>
  );
};

const CustomTabBarIcon = ({label}: {label: string}) => {
  if (label === 'KEŞFET') {
    return (
      <View style={styles.tabBarIconContainer}>
        <KesfetIcon height={26} width={26} fill={Colors.black} />
        <Text style={styles.searchIcon}>{label}</Text>
      </View>
    );
  } else if (label === 'PLUS') {
    return (
      <View style={styles.plusIconContainer}>
        <View style={styles.plusIconWrapper}>
          <PlusIcon height={39} width={39} fill={Colors.black} />
        </View>
      </View>
    );
  } else {
    return (
      <View style={styles.starIconContainer}>
        <StarIcon height={26} width={26} fill={Colors.black} />
        <Text style={styles.tabBarLabelText}>{label}</Text>
      </View>
    );
  }
};

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: Colors.white,
            height: 55,
            borderTopRightRadius: 1.5,
            borderTopLeftRadius: 1.5,
            borderTopEndRadius: 20,
            borderTopStartRadius: 20,
          },
        }}>
        <Tab.Screen
          name="MainScreen"
          component={MainStackNavigator}
          options={{
            headerShown: false,
            tabBarIcon: () => <CustomTabBarIcon label="KEŞFET" />,
          }}
        />
        <Tab.Screen
          name="Empty1"
          options={{
            tabBarIcon: () => <CustomTabBarIcon label="PLUS" />,
          }}>
          {() => null}
        </Tab.Screen>
        <Tab.Screen
          name="Empty2"
          options={{
            tabBarIcon: () => <CustomTabBarIcon label="DAHA CÜZDAN" />,
          }}>
          {() => null}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
