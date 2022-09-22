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
import EmailNoScreen from '../pages/Login/EmailNoScreen';
import NextForgot from '../pages/Login/NextForgot';
import VerifyOTP from '../pages/Login/VerifyOTP';
import ChangePass from '../pages/Login/ChangePass';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import {Text, StyleSheet, Alert} from 'react-native';
import AuthCont from '../constants/AuthContext';
import Deactivate from '../pages/Profile/Deactivate';
import {useTranslation} from 'react-i18next';

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
    background: '#182533',
    text: '#ffffff',
  },
};

const Route = () => {
  const {userContext, setUserContext} = useContext(AuthCont);
  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();
  const {t} = useTranslation();

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
    return Alert.alert(t('confirmation'), t('logout_message'), [
      {
        text: t('yes'),
        onPress: () => {
          setUserContext(null);
          navigation.navigate('Covid-19 Guide');
        },
      },
      {
        text: t('no'),
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
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#182533',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: userContext?.dark_mode === 'F' ? 'blue' : '#FFF',
      }}>
      <Stack.Screen
        name={t('advice_expert')}
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
          headerTitle: 'Forgot Password',
        }}
        name={'Next Forgot'}
        component={NextForgot}
      />
      <Stack.Screen
        options={{
          tabBarStyle: {display: 'none'},
          tabBarItemStyle: {display: 'none'},
          headerTitle: 'Forgot Password',
        }}
        name={'Verify OTP'}
        component={VerifyOTP}
      />
      <Stack.Screen
        options={{
          tabBarStyle: {display: 'none'},
          tabBarItemStyle: {display: 'none'},
          headerTitle: 'Forgot Password',
          // headerLeft: () => {
          //   return null;
          // },
        }}
        name={'Change Password'}
        component={ChangePass}
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
      <Stack.Screen
        options={{
          tabBarStyle: {display: 'none'},
          tabBarItemStyle: {display: 'none'},
          headerTitle: 'Sign Up',
        }}
        name={'EmailPhone'}
        component={EmailNoScreen}
      />
    </Stack.Navigator>
  );

  const HomeStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#182533',
        },
        headerTitleAlign: 'center',
        headerTintColor: userContext?.dark_mode === 'F' ? 'blue' : '#FFF',
      }}>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => ({
          headerTitle: t('covid19_guide'),
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
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#182533',
        },
        headerTitleAlign: 'center',
        headerTintColor: userContext?.dark_mode === 'F' ? 'blue' : '#FFF',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="Activity Recommendation"
        component={IndoorActivity}
        options={({navigation}) => ({
          headerTitle: t('activity_recommendation'),
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
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#182533',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: userContext?.dark_mode === 'F' ? 'blue' : '#FFF',
      }}>
      <Stack.Screen
        name="SETTINGS Screen"
        component={Settings}
        options={({navigation}) => ({
          headerTitle: t('settings'),
          headerLeft: () => goBackIcon(navigation),
          headerRight: () => logOutIcon(navigation),
        })}
      />
      <Stack.Screen
        name="Favorites"
        component={Favorites}
        options={{headerTitle: t('favorites')}}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={{headerTitle: t('language')}}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}
        options={{headerTitle: t('faq')}}
      />
      <Stack.Screen
        name="Contact Us"
        component={ContactUs}
        options={{headerTitle: t('contact_us')}}
      />
    </Stack.Navigator>
  );

  const MusicStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#182533',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: userContext?.dark_mode === 'F' ? 'blue' : '#FFF',
      }}>
      <Stack.Screen
        name="Music Playlist"
        component={MusicPlaylist}
        options={({navigation}) => ({
          headerTitle: t('music_playlist'),
          headerLeft: () => drawerIcon(navigation),
          headerRight: () => logOutIcon(navigation),
        })}
      />
      <Stack.Screen
        name="Music Play"
        component={MusicPlay}
        options={({route}) => ({
          headerTitle: t('music'),
        })}
      />
    </Stack.Navigator>
  );

  const QuranStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#182533',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: userContext?.dark_mode === 'F' ? 'blue' : '#FFF',
      }}>
      <Stack.Screen
        name="Quran Playlist"
        component={QuranPlaylist}
        options={({navigation}) => ({
          headerTitle: t('quran_playlist'),
          headerLeft: () => drawerIcon(navigation),
          headerRight: () => logOutIcon(navigation),
        })}
      />
      <Stack.Screen
        name="Quran Play"
        component={QuranPlay}
        options={({route}) => ({
          headerTitle: t('Quran'),
        })}
      />
    </Stack.Navigator>
  );

  const ProfileStack = () => (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor:
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#182533',
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
        headerTintColor: userContext?.dark_mode === 'F' ? 'blue' : '#FFF',
      }}>
      <Stack.Screen
        name="Profiles"
        component={Profile}
        options={({navigation}) => ({
          headerTitle: t('profile'),
          headerLeft: () => goBackIcon(navigation),
          headerRight: () => logOutIcon(navigation),
        })}
      />
      <Stack.Screen
        name="Username"
        component={Username}
        options={({route}) => ({
          headerTitle: t('profile'),
        })}
      />
      <Stack.Screen
        name="Phone"
        component={PhoneNumber}
        options={({route}) => ({
          headerTitle: t('profile'),
        })}
      />
      <Stack.Screen
        name="Email"
        component={Email}
        options={({route}) => ({
          headerTitle: t('profile'),
        })}
      />
      <Stack.Screen
        name="NewPass"
        component={NewPass}
        options={({route}) => ({
          headerTitle: t('profile'),
        })}
      />
      <Stack.Screen
        name="Deactivate"
        component={Deactivate}
        options={({route}) => ({
          headerTitle: t('profile'),
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
            return focused ? <Text style={getColor}>{t('music')}</Text> : null;
          } else if (rn === 'Covid-19 Guide') {
            return focused ? <Text style={getColor}>{t('home')}</Text> : null;
          } else if (rn === 'Indoor Activity') {
            return focused ? (
              <Text style={getColor}>{t('indoor_activity')}</Text>
            ) : null;
          } else if (rn === 'Expert Advices') {
            return focused ? (
              <Text style={getColor}>{t('expert_advice')}</Text>
            ) : null;
          } else if (rn === 'Quran Playlists') {
            return focused ? <Text style={getColor}>{t('Quran')}</Text> : null;
          }
        },
        headerStyle: {
          backgroundColor:
            userContext?.dark_mode === 'F' ? '#DFF6FF' : '#182533',
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
      initialRouteName={t('home')}
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
        name={t('home')}
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
        name={t('profile')}
        component={ProfileStack}
        options={{
          headerShown: false,
          drawerIcon: ({color}) => (
            <MaterialCommunityIcons name="account" size={22} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name={t('settings')}
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
