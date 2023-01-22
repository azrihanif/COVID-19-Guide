import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QuranContainer from '../../components/QuranContainer';
import {CustomDarkTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';
import {ScrollView} from 'react-native-gesture-handler';
import Sound from 'react-native-sound';

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
          })),
        );
      }
    }
  };

  const convertTime = e => {
    const h = Math.floor(e / 3600)
        .toString()
        .padStart(2, '0'),
      m = Math.floor((e % 3600) / 60)
        .toString()
        .padStart(2, '0'),
      s = Math.floor(e % 60)
        .toString()
        .padStart(2, '0');

    return h + ':' + m + ':' + s;
  };

  const play = (index, title) => {
    let time;
    let alfatiha = new Sound(songs[index]?.quran, Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log(err);
        return;
      }
      time = convertTime(alfatiha.getDuration());
      navigation.navigate('Quran Play', {
        title,
        songs,
        currTime: time,
        duration: alfatiha.getDuration(),
        currSong: songs[index],
      });
    });
  };

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <ScrollView style={{paddingLeft: 16, paddingRight: 16}}>
          {songs?.map(({title}, index) => (
            <QuranContainer
              key={index}
              title={title}
              onPress={() => {
                play(index, title);
              }}
            />
          ))}
        </ScrollView>
      </LinearGradient>
    ) : (
      <View
        colors={['#DFF6FF', '#FFFFFF']}
        style={[styles.container, CustomDarkTheme]}>
        <ScrollView style={{paddingLeft: 16, paddingRight: 16}}>
          {songs?.map(({title}, index) => (
            <QuranContainer
              key={index}
              title={title}
              onPress={() => {
                play(index, title);
              }}
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
