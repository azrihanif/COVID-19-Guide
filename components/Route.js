import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Profile from '../pages/Profile';
import ExpertAdvice from '../pages/ExpertAdvice';
import MusicPlaylist from '../pages/MusicPlaylist';
import AdviceScreen from '../pages/AdviceScreen';
import Settings from '../pages/Settings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import {Text, StyleSheet} from 'react-native';
import AuthCont from '../constants/AuthContext';

const Route = () => {
  const {userContext} = useContext(AuthCont);
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const AdviceStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Expert Advice"
        component={ExpertAdvice}
        options={{
          headerStyle: {
            backgroundColor: '#DFF6FF',
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: 'blue',
          headerTitle: 'Advice from Expert',
        }}
      />
      <Stack.Screen
        name="Advice"
        component={AdviceScreen}
        options={({route}) => ({
          headerStyle: {
            backgroundColor: '#DFF6FF',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'blue',
          title: route?.params?.title,
          advice: route?.params?.advice,
          adviceDate: route?.params?.adviceDate,
          adviceContact: route?.params?.adviceContact,
          adviceEmail: route?.params?.adviceEmail,
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );

  const Auth = () => (
    <Tab.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#DFF6FF',
        },
        headerTintColor: 'blue',
        headerTitleAlign: 'center',
        tabBarHideOnKeyboard: true,
        headerShadowVisible: false,
      }}>
      <Tab.Screen
        options={{
          tabBarStyle: {display: 'none'},
          tabBarItemStyle: {display: 'none'},
        }}
        name={'Covid-19 Guide'}
        component={Login}
      />
    </Tab.Navigator>
  );

  const TabNav = () => (
    <Tab.Navigator
      initialRouteName={'Covid-19 Guide'}
      screenOptions={({route}) => ({
        headerShadowVisible: false,
        tabBarIcon: ({_focused, color, size}) => {
          let iconName;
          let rn = route.name;
          if (rn === 'Music') {
            iconName = 'music-note';
          } else if (rn === 'Home') {
            iconName = 'home-outline';
          } else if (rn === 'Profile') {
            iconName = 'account';
          } else if (rn === 'Expert Advices') {
            iconName = 'account-voice';
          }

          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarLabel: ({focused}) => {
          let rn = route.name;

          if (rn === 'Music') {
            return focused ? <Text style={styles.text}>Music</Text> : null;
          } else if (rn === 'Home') {
            return focused ? <Text style={styles.text}>Home</Text> : null;
          } else if (rn === 'Profile') {
            return focused ? <Text style={styles.text}>Profile</Text> : null;
          } else if (rn === 'Expert Advices') {
            return focused ? (
              <Text style={styles.text}>Expert Advice</Text>
            ) : null;
          }
        },
        headerStyle: {
          backgroundColor: '#DFF6FF',
        },
        headerTintColor: 'blue',
        headerTitleAlign: 'center',
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        options={{
          headerLeft: () => (
            <EvilIcons style={{paddingLeft: 12}} name={'navicon'} size={27} color={'blue'} />
          ),
        }}
        name={'Music'}
        component={MusicPlaylist}
      />
      <Tab.Screen name={'Home'} component={Home} />
      <Tab.Screen name={'Profile'} component={Profile} />
      <Tab.Screen
        name={'Expert Advices'}
        component={AdviceStack}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );

  const Drawers = () => (
    <Drawer.Navigator
      initialRouteName="HOME"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#DFF6FF',
        },
        headerTintColor: 'blue',
        headerTitleAlign: 'center',
        tabBarHideOnKeyboard: true,
        headerShadowVisible: false,
      }}>
      <Drawer.Screen name="HOME" component={TabNav} />
      <Drawer.Screen name="PROFILE" component={Profile} />
      <Drawer.Screen name="SETTINGS" component={Settings} />
    </Drawer.Navigator>
  );

  return (
    <NavigationContainer>
      {userContext?.id ? Drawers() : Auth()}
    </NavigationContainer>
  );
};

export default Route;

const styles = StyleSheet.create({
  text: {
    fontSize: 11,
    paddingBottom: 5,
    color: 'blue',
  },
});
