import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QuranContainer from '../../components/QuranContainer';
import MusicPlayer from '../../components/MusicPlayer';
import {CustomDarkTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';

export default function QuranPlaylist({navigation}) {
  const {userContext} = useContext(AuthCont);
  const data = [
    {
      title: 'Al-Fatiha',
      time: '3:13',
    },
    {
      title: 'Al-Baqarah',
      time: '3:53',
    },
    {
      title: 'Al-Imran',
      time: '2:34',
    },
    {
      title: 'Al-Nisa',
      time: '3:13',
    },
  ];

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <View style={{paddingLeft: 16, paddingRight: 16}}>
          {data?.map(({title, time}, index) => (
            <QuranContainer
              key={index}
              title={title}
              time={time}
              onPress={() =>
                navigation.navigate('Quran Play', {
                  title,
                  time,
                  picture: require('../../images/profilepic/profile.jpg'),
                })
              }
            />
          ))}
        </View>
        <View style={styles.musicPlayer}>
          <MusicPlayer />
        </View>
      </LinearGradient>
    ) : (
      <View
        colors={['#DFF6FF', '#FFFFFF']}
        style={[styles.container, CustomDarkTheme]}>
        <View style={{paddingLeft: 16, paddingRight: 16}}>
          {data?.map(({title, time}, index) => (
            <QuranContainer
              key={index}
              title={title}
              time={time}
              onPress={() =>
                navigation.navigate('Quran Play', {
                  title,
                  time,
                  picture: require('../../images/profilepic/profile.jpg'),
                })
              }
            />
          ))}
        </View>
        <View style={styles.musicPlayer}>
          <MusicPlayer />
        </View>
      </View>
    );
  };

  return getTheme();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  musicPlayer: {
    position: 'absolute',
    width: '100%',
    bottom: -20,
  },
});
