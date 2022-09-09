import React, {useContext, useEffect} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Profile from '../pages/Profile/Profile';
import ExpertAdvice from '../pages/ExpertAdvice/ExpertAdvice';
import MusicPlaylist from '../pages/Music/MusicPlaylist';
import QuranPlaylist from '../pages/Quran/QuranPlaylists';
import AdviceScreen from '../pages/ExpertAdvice/AdviceScreen';
import IndoorActivity from '../pages/Activity/IndoorActivity';
import ForgotPassword from '../pages/Login/ForgotPassword';
import SignUp from '../pages/Login/SignUp';
import COVIDGuide from '../pages/Home/COVIDGuide';
import Settings from '../pages/Settings/Settings';
import ContactUs from '../pages/Settings/ContactUs';
import FAQ from '../pages/Settings/FAQ';
import Favorites from '../pages/Settings/Favorites';
import Language from '../pages/Settings/Language';
import Activity from '../pages/Activity/Activity';
import QuranPlay from '../pages/Quran/QuranPlay';
import MusicPlay from '../pages/Music/MusicPlay';
import NextScreen from '../pages/Login/NextScreen.js';
import Username from '../pages/Profile/Username';
import PhoneNumber from '../pages/Profile/PhoneNumber';
import Email from '../pages/Profile/Email';
import NewPass from '../pages/Profile/NewPass';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {Text, StyleSheet, Alert} from 'react-native';
import AuthCont from '../constants/AuthContext';
import Deactivate from '../pages/Profile/Deactivate';

export const CustomDefaultTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: '#ffffff',
    text: '#030852',
  },
};
export const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: '#333333',
    text: '#ffffff',
  },
};

const Route = () => {
  const {userContext, setUserContext} = useContext(AuthCont);
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const getTheme =
    userContext?.dark_mode === 'T' ? CustomDarkTheme : CustomDefaultTheme;

  const drawerIcon = navigation => (
    <EvilIcons
      style={{paddingLeft: 12}}
      name={'navicon'}
      size={27}
      color={userContext?.dark_mode === 'T' ? '#FFF' : 'blue'}
      onPress={() => navigation.openDrawer()}
    />
  );

  const goBackIcon = navigation => (
    <MaterialCommunityIcons
      style={{paddingLeft: 12}}
      name={'arrow-left'}
      size={27}
      color={userContext?.dark_mode === 'T' ? '#FFF' : 'blue'}
      onPress={() => navigation.goBack()}
    />
  );

  const logOut = navigation => {
    return Alert.alert('Confirmation', 'Are you sure, you want to logout?', [
      {
        text: 'Yes',
        onPress: () => {
          setUserContext(null);
          navigation.navigate('Covid-19 Guide');
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  const logOutIcon = navigation => (
    <Entypo
      style={{paddingRight: 12}}
      name={'log-out'}
      size={27}
      color={userContext?.dark_mode === 'T' ? '#FFF' : 'blue'}
      onPress={() => {
        logOut(navigation);
      }}
    />
  );

  const AdviceStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#333333',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: userContext?.dark_mode === 'F' ? 'blue' : '#FFF',
      }}>
      <Stack.Screen
        name="Advice from Expert"
        component={ExpertAdvice}
        options={({navigation}) => ({
          headerLeft: () => drawerIcon(navigation),
          headerRight: () => logOutIcon(navigation),
        })}
      />
      <Stack.Screen
        name="Advice"
        component={AdviceScreen}
        options={({route}) => ({
          title: route?.params?.title,
          advice: route?.params?.advice,
          adviceDate: route?.params?.adviceDate,
          adviceContact: route?.params?.adviceContact,
          adviceEmail: route?.params?.adviceEmail,
        })}
      />
    </Stack.Navigator>
  );

  const loginStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#DFF6FF',
        },
        headerTintColor: 'blue',
        headerTitleAlign: 'center',
        tabBarHideOnKeyboard: true,
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        options={{
          tabBarStyle: {display: 'none'},
          tabBarItemStyle: {display: 'none'},
        }}
        name={'Covid-19 Guide'}
        component={Login}
      />
      <Stack.Screen
        options={{
          tabBarStyle: {display: 'none'},
          tabBarItemStyle: {display: 'none'},
        }}
        name={'Forgot Password'}
        component={ForgotPassword}
      />
      <Stack.Screen
        options={{
          tabBarStyle: {display: 'none'},
          tabBarItemStyle: {display: 'none'},
        }}
        name={'Sign Up'}
        component={SignUp}
      />
      <Stack.Screen
        options={{
          tabBarStyle: {display: 'none'},
          tabBarItemStyle: {display: 'none'},
          headerTitle: 'Sign Up',
        }}
        name={'Next'}
        component={NextScreen}
      />
    </Stack.Navigator>
  );

  const HomeStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#333333',
        },
        headerTitleAlign: 'center',
        headerTintColor: userContext?.dark_mode === 'F' ? 'blue' : '#FFF',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => ({
          headerTitle: 'Covid-19 Guide',
          headerShadowVisible: false,
          headerLeft: () => drawerIcon(navigation),
          headerRight: () => logOutIcon(navigation),
        })}
      />
      <Stack.Screen
        name="COVID-19 Guide"
        component={COVIDGuide}
        options={({route}) => ({
          title: route?.params?.title,
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );

  const ActivityStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#333333',
        },
        headerTitleAlign: 'center',
        headerTintColor: userContext?.dark_mode === 'F' ? 'blue' : '#FFF',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="Activity Recommendation"
        component={IndoorActivity}
        options={({navigation}) => ({
          headerTitle: 'Activity Recommendation',

          headerLeft: () => drawerIcon(navigation),
          headerRight: () => logOutIcon(navigation),
        })}
      />
      <Stack.Screen
        name="Activity"
        component={Activity}
        options={({route}) => ({
          title: route?.params?.activity,
        })}
      />
    </Stack.Navigator>
  );

  const SettingsStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#333333',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: userContext?.dark_mode === 'F' ? 'blue' : '#FFF',
      }}>
      <Stack.Screen
        name="SETTINGS Screen"
        component={Settings}
        options={({navigation}) => ({
          headerTitle: 'Settings',
          headerLeft: () => goBackIcon(navigation),
          headerRight: () => logOutIcon(navigation),
        })}
      />
      <Stack.Screen name="Favorites" component={Favorites} />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="FAQ" component={FAQ} />
      <Stack.Screen name="Contact Us" component={ContactUs} />
    </Stack.Navigator>
  );

  const MusicStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#333333',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: userContext?.dark_mode === 'F' ? 'blue' : '#FFF',
      }}>
      <Stack.Screen
        name="Music Playlist"
        component={MusicPlaylist}
        options={({navigation}) => ({
          headerLeft: () => drawerIcon(navigation),
          headerRight: () => logOutIcon(navigation),
        })}
      />
      <Stack.Screen
        name="Music Play"
        component={MusicPlay}
        options={({route}) => ({
          headerTitle: 'Music',
        })}
      />
    </Stack.Navigator>
  );

  const QuranStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#333333',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: userContext?.dark_mode === 'F' ? 'blue' : '#FFF',
      }}>
      <Stack.Screen
        name="Quran Playlist"
        component={QuranPlaylist}
        options={({navigation}) => ({
          headerLeft: () => drawerIcon(navigation),
          headerRight: () => logOutIcon(navigation),
        })}
      />
      <Stack.Screen
        name="Quran Play"
        component={QuranPlay}
        options={({route}) => ({
          headerTitle: 'Quran',
        })}
      />
    </Stack.Navigator>
  );

  const ProfileStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#333333',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: userContext?.dark_mode === 'F' ? 'blue' : '#FFF',
      }}>
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={({navigation}) => ({
          headerLeft: () => goBackIcon(navigation),
          headerRight: () => logOutIcon(navigation),
        })}
      />
      <Stack.Screen
        name="Username"
        component={Username}
        options={({route}) => ({
          headerTitle: 'Profile',
        })}
      />
      <Stack.Screen
        name="Phone"
        component={PhoneNumber}
        options={({route}) => ({
          headerTitle: 'Profile',
        })}
      />
      <Stack.Screen
        name="Email"
        component={Email}
        options={({route}) => ({
          headerTitle: 'Profile',
        })}
      />
      <Stack.Screen
        name="NewPass"
        component={NewPass}
        options={({route}) => ({
          headerTitle: 'Profile',
        })}
      />
      <Stack.Screen
        name="Deactivate"
        component={Deactivate}
        options={({route}) => ({
          headerTitle: 'Profile',
        })}
      />
    </Stack.Navigator>
  );

  const TabNav = () => (
    <Tab.Navigator
      initialRouteName={'Covid-19 Guide'}
      screenOptions={({route, navigation}) => ({
        headerShadowVisible: false,
        headerLeft: () => drawerIcon(navigation),
        headerRight: () => logOutIcon(navigation),
        tabBarIcon: ({_focused, color, size}) => {
          let iconName;
          let rn = route.name;
          let getColor = userContext?.dark_mode === 'F' ? color : '#FFF';
          if (rn === 'Music') {
            iconName = 'music-note';
          } else if (rn === 'Covid-19 Guide') {
            iconName = 'home-outline';
          } else if (rn === 'Indoor Activity') {
            iconName = 'human-handsup';
          } else if (rn === 'Expert Advices') {
            iconName = 'account-voice';
          }

          return rn === 'Quran Playlists' ? (
            <FontAwesome5 name={'quran'} size={size} color={getColor} />
          ) : (
            <MaterialCommunityIcons
              name={iconName}
              size={size}
              color={getColor}
            />
          );
        },
        tabBarLabel: ({focused}) => {
          let rn = route.name;
          let getColor =
            userContext?.dark_mode === 'F' ? styles.text : styles.darkText;
          if (rn === 'Music') {
            return focused ? <Text style={getColor}>Music</Text> : null;
          } else if (rn === 'Covid-19 Guide') {
            return focused ? <Text style={getColor}>Home</Text> : null;
          } else if (rn === 'Indoor Activity') {
            return focused ? (
              <Text style={getColor}>Indoor Activity</Text>
            ) : null;
          } else if (rn === 'Expert Advices') {
            return focused ? <Text style={getColor}>Expert Advice</Text> : null;
          } else if (rn === 'Quran Playlists') {
            return focused ? (
              <Text style={getColor}>Quran Playlists</Text>
            ) : null;
          }
        },
        headerStyle: {
          backgroundColor:
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#333333',
        },
        headerTintColor: 'blue',
        headerTitleAlign: 'center',
        tabBarHideOnKeyboard: true,
      })}>
      <Tab.Screen
        name={'Music'}
        component={MusicStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={'Quran Playlists'}
        component={QuranStack}
        options={{headerShown: false}}
      />
      <Tab.Screen
        options={{headerShown: false}}
        name={'Covid-19 Guide'}
        component={HomeStack}
      />
      <Tab.Screen
        name={'Indoor Activity'}
        component={ActivityStack}
        options={{headerShown: false}}
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
        component={ProfileStack}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="account" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="SETTINGS"
        component={SettingsStack}
        options={{
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons
              name="cog-outline"
              size={22}
              color={color}
            />
          ),
          headerShown: false,
        }}
      />
    </Drawer.Navigator>
  );

  return (
    <NavigationContainer theme={getTheme}>
      {userContext?.id ? Drawers() : loginStack()}
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
  darkText: {
    fontSize: 11,
    paddingBottom: 5,
    color: '#FFF',
  },
});
