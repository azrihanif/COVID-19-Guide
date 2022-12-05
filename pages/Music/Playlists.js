import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PlaylistsContainer from '../../components/PlaylistsContainer';
import MusicPlayer from '../../components/MusicPlayer';
import {CustomDarkTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';

export default function Playlists({navigation}) {
  const {userContext} = useContext(AuthCont);
  const data = [
    {
      name: 'Charlie Puth',
      title: 'Light Switch',
      time: '3:13',
    },
    {
      name: 'Joji',
      title: 'Glimpse of Us',
      time: '3:53',
    },
    {
      name: 'Charlie Puth & Jong Kook',
      title: 'Left and Right',
      time: '2:34',
    },
    {
      name: 'Ed Sheeran',
      title: 'Shivers',
      time: '3:13',
    },
  ];

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <View style={{paddingLeft: 16, paddingRight: 16}}>
          <PlaylistsContainer
            title={'Test123'}
            noOfSongs="10"
            onPress={() => navigation.navigate('Front Page')}
          />
          <PlaylistsContainer title={'Test123'} noOfSongs="10" />
          <PlaylistsContainer title={'Test123'} noOfSongs="10" />
        </View>
        <View style={styles.musicPlayer}>
          <MusicPlayer />
        </View>
      </LinearGradient>
    ) : (
      <View style={[styles.container, CustomDarkTheme]}>
        <View style={{paddingLeft: 16, paddingRight: 16}}>
          <PlaylistsContainer
            title={'Test123'}
            noOfSongs="10"
            onPress={() => navigation.navigate('Front Page')}
          />
          <PlaylistsContainer title={'Test123'} noOfSongs="10" />
          <PlaylistsContainer title={'Test123'} noOfSongs="10" />
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
