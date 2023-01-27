import React, {useContext, useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MusicContainer from '../../components/MusicContainer';
import MusicPlayer from '../../components/MusicPlayer';
import {CustomDarkTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';
import Sound from 'react-native-sound';
import Searchbar from '../../components/Searchbar';
import {connector} from '../../constants/Connector';

export default function MusicPlaylist({navigation, route}) {
  const {userContext} = useContext(AuthCont);
  const [songs, setSongs] = useState();
  const [filterItem, setFilterItem] = useState(songs);

  useEffect(() => {
    getMusic();
  }, []);

  const getMusic = async () => {
    const {id} = userContext;
    try {
      let res = await fetch(connector + '/getMusic', {
        method: 'post',
        mode: 'no-cors',
        body: JSON.stringify({id: id, genre: route?.params?.genre}),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
      if (res) {
        const response = await res?.json();
        console.log(response?.msg)
        setSongs(response?.msg);
        setFilterItem(response?.msg);
      } else {
        console.log('Error!');
      }
    } catch (e) {
      console.error(e);
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

  const play = (index, title, name, picture, id) => {
    let time;
    let harryStyles = new Sound(songs[index]?.song, Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log(err);
        return;
      }
      time = convertTime(harryStyles.getDuration());
      navigation.navigate('Music Play', {
        id,
        title,
        name,
        time,
        duration: harryStyles.getDuration(),
        picture: picture,
        currSong: songs[index],
        songs,
      });
    });
  };

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <View style={{paddingLeft: 16, paddingRight: 16}}>
          <Searchbar item={songs} setItem={setSongs} filterItem={filterItem} />
          {songs?.map(({id, name, title, time, picture, favourite}, index) => (
            <MusicContainer
              key={index}
              title={title}
              like={favourite}
              musicID={id}
              name={name}
              time={time}
              onPress={() => play(index, title, name, picture, id)}
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
          <Searchbar item={songs} setItem={setSongs} filterItem={filterItem} />
          {songs?.map(({id, name, title, time, picture, favourite}, index) => (
            <MusicContainer
              key={index}
              title={title}
              musicID={id}
              like={favourite}
              name={name}
              time={time}
              onPress={() => play(index, title, name, picture, id)}
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
