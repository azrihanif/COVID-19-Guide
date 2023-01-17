import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MusicContainer from '../../components/MusicContainer';
import MusicPlayer from '../../components/MusicPlayer';
import {CustomDarkTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';

export default function MusicPlaylist({navigation}) {
  const {userContext} = useContext(AuthCont);
  const songs = [
    {
      name: 'Harry Styles',
      title: 'As it was',
      time: '2:46',
      picture: require('../../images/music/asitwas.jpg')
    },
  ];

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <View style={{paddingLeft: 16, paddingRight: 16}}>
          {songs?.map(({name, title, time, picture}, index) => (
            <MusicContainer
              key={index}
              title={title}
              name={name}
              time={time}
              onPress={() =>
                navigation.navigate('Music Play', {
                  title,
                  name,
                  time,
                  picture: picture,
                  currSong: songs[index]
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
      <View style={[styles.container, CustomDarkTheme]}>
        <View style={{paddingLeft: 16, paddingRight: 16}}>
          {songs?.map(({name, title, time, picture}, index) => (
            <MusicContainer
              key={index}
              title={title}
              name={name}
              time={time}
              onPress={() =>
                navigation.navigate('Music Play', {
                  title,
                  name,
                  time,
                  picture: picture,
                  currSong: songs[index]
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
