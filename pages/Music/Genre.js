import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PlaylistsContainer from '../../components/PlaylistsContainer';
import MusicPlayer from '../../components/MusicPlayer';
import {CustomDarkTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';
import {connector} from '../../constants/Connector';

export default function Playlists({navigation}) {
  const {userContext} = useContext(AuthCont);
  const [songs, setSongs] = useState();

  useEffect(() => {
    getMusic();
  }, []);

  const getMusic = async () => {
    const {id} = userContext;
    try {
      let res = await fetch(connector + '/getGenre', {
        method: 'post',
        mode: 'no-cors',
        body: JSON.stringify({id: id}),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
      if (res) {
        const response = await res?.json();
        setSongs(response?.msg);
      } else {
        console.log('Error!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <View style={{paddingLeft: 16, paddingRight: 16}}>
          {songs?.map(({title, noOfSongs}, index) => (
            <PlaylistsContainer
              key={index}
              title={title}
              noOfSongs={noOfSongs}
              onPress={() => navigation.navigate('Front Page',{genre: title})}
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
          {songs?.map(({title, noOfSongs},index) => (
            <PlaylistsContainer
              key={index}
              title={title}
              noOfSongs={noOfSongs}
              onPress={() => navigation.navigate('Front Page',{genre: title})}
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
