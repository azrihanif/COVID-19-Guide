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
import IndoorActivity from '../pages/IndoorActivity';
import Settings from '../pages/Settings';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Text, StyleSheet, Alert} from 'react-native';
import AuthCont from '../constants/AuthContext';

const Route = () => {
  const {userContext, setUserContext} = useContext(AuthCont);
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const drawerIcon = navigation => (
    <EvilIcons
      style={{paddingLeft: 12}}
      name={'navicon'}
      size={27}
      color={'blue'}
      onPress={() => navigation.openDrawer()}
    />
  );

  const logOut = () => {
    return Alert.alert('Confirmation', 'Are you sure, you want to logout?', [
      {
        text: 'Yes',
        onPress: () => {
          setUserContext(null);
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  const logOutIcon = () => (
    <Entypo
      style={{paddingRight: 12}}
      name={'log-out'}
      size={27}
      color={'blue'}
      onPress={() => {
        logOut();
      }}
    />
  );

  const AdviceStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Advice from Expert"
        component={ExpertAdvice}
        options={({navigation}) => ({
          headerStyle: {
            backgroundColor: '#DFF6FF',
          },
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerTintColor: 'blue',
          headerLeft: () => drawerIcon(navigation),
          headerRight: () => logOutIcon(),
        })}
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
      screenOptions={({route, navigation}) => ({
        headerShadowVisible: false,
        headerLeft: () => drawerIcon(navigation),
        headerRight: () => logOutIcon(),
        tabBarIcon: ({_focused, color, size}) => {
          let iconName;
          let rn = route.name;
          if (rn === 'Music') {
            iconName = 'music-note';
          } else if (rn === 'Covid-19 Guide') {
            iconName = 'home-outline';
          } else if (rn === 'Indoor Activity') {
            iconName = 'human-handsup';
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
          } else if (rn === 'Covid-19 Guide') {
            return focused ? <Text style={styles.text}>Home</Text> : null;
          } else if (rn === 'Indoor Activity') {
            return focused ? (
              <Text style={styles.text}>Indoor Activity</Text>
            ) : null;
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
      <Tab.Screen name={'Music'} component={MusicPlaylist} />
      <Tab.Screen name={'Covid-19 Guide'} component={Home} />
      <Tab.Screen
        name={'Indoor Activity'}
        component={IndoorActivity}
        options={{title: 'Activity Recommendation'}}
      />
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
        drawerLabelStyle: {
          marginLeft: -25,
          fontSize: 15,
        },
      }}>
      <Drawer.Screen
        name="HOME"
        component={TabNav}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="home-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="PROFILE"
        component={Profile}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="account" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="SETTINGS"
        component={Settings}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="cog-outline"
              size={22}
              color={color}
            />
          ),
        }}
      />
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
