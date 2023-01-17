import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QuranContainer from '../../components/QuranContainer';
import MusicPlayer from '../../components/MusicPlayer';
import {CustomDarkTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';
import {ScrollView} from 'react-native-gesture-handler';

export default function QuranPlaylist({navigation}) {
  const {userContext} = useContext(AuthCont);
  const [songs, setSongs] = useState();

  useEffect(() => {
    getQuran();
  }, []);

  const getQuran = async () => {
    const res = await fetch(
      'https://raw.githubusercontent.com/penggguna/QuranJSON/master/quran.json',
    );
    if (res) {
      const response = await res.json();
      if (response) {
        setSongs(
          response?.map(({name, recitation}, index) => ({
            index: index + 1,
            title: name,
            quran: recitation,
            time: '01:25',
          })),
        );
      }
    }
  };

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <ScrollView style={{paddingLeft: 16, paddingRight: 16}}>
          {songs?.map(({title, time}, index) => (
            <QuranContainer
              key={index}
              title={title}
              time={time}
              onPress={() =>
                navigation.navigate('Quran Play', {
                  title,
                  time,
                  songs,
                  currSong: songs[index],
                })
              }
            />
          ))}
        </ScrollView>
      </LinearGradient>
    ) : (
      <View
        colors={['#DFF6FF', '#FFFFFF']}
        style={[styles.container, CustomDarkTheme]}>
        <ScrollView style={{paddingLeft: 16, paddingRight: 16}}>
          {songs?.map(({title, time, picture}, index) => (
            <QuranContainer
              key={index}
              title={title}
              time={time}
              onPress={() =>
                navigation.navigate('Quran Play', {
                  title,
                  time,
                  picture,
                  songs,
                  currSong: songs[index],
                })
              }
            />
          ))}
        </ScrollView>
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
