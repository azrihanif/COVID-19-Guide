import React, {useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';

import Home from '../pages/Home/Home';
import Login from '../pages/Login/Login';
import Profile from '../pages/Profile';
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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
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
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={({navigation}) => ({
          headerTitle: 'Covid-19 Guide',
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
        name="COVID-19 Guide"
        component={COVIDGuide}
        options={({route}) => ({
          headerStyle: {
            backgroundColor: '#DFF6FF',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'blue',
          title: route?.params?.title,
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );

  const ActivityStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Activity Recommendation"
        component={IndoorActivity}
        options={({navigation}) => ({
          headerTitle: 'Activity Recommendation',
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
        name="Activity"
        component={Activity}
        options={({route}) => ({
          headerStyle: {
            backgroundColor: '#DFF6FF',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'blue',
          title: route?.params?.activity,
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );

  const SettingsStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="SETTINGS Screen"
        component={Settings}
        options={({navigation}) => ({
          headerTitle: 'Settings',
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
        name="Favorites"
        component={Favorites}
        options={({route}) => ({
          headerStyle: {
            backgroundColor: '#DFF6FF',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'blue',
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Language"
        component={Language}
        options={({route}) => ({
          headerStyle: {
            backgroundColor: '#DFF6FF',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'blue',
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="FAQ"
        component={FAQ}
        options={({route}) => ({
          headerStyle: {
            backgroundColor: '#DFF6FF',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'blue',
          headerShadowVisible: false,
        })}
      />
      <Stack.Screen
        name="Contact Us"
        component={ContactUs}
        options={({route}) => ({
          headerStyle: {
            backgroundColor: '#DFF6FF',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'blue',
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );

  const MusicStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Music Playlist"
        component={MusicPlaylist}
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
        name="Music Play"
        component={MusicPlay}
        options={({route}) => ({
          headerTitle: 'Music',
          headerStyle: {
            backgroundColor: '#DFF6FF',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'blue',
          headerShadowVisible: false,
        })}
      />
    </Stack.Navigator>
  );

  const QuranStack = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="Quran Playlist"
        component={QuranPlaylist}
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
        name="Quran Play"
        component={QuranPlay}
        options={({route}) => ({
          headerTitle: 'Quran',
          headerStyle: {
            backgroundColor: '#DFF6FF',
          },
          headerTitleAlign: 'center',
          headerTintColor: 'blue',
          headerShadowVisible: false,
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

          return rn === 'Quran Playlists' ? (
            <FontAwesome5 name={'quran'} size={size} color={color} />
          ) : (
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
          } else if (rn === 'Quran Playlists') {
            return focused ? (
              <Text style={styles.text}>Quran Playlists</Text>
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
        component={Profile}
        options={{
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
    <NavigationContainer>
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
});
