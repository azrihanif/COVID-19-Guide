import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import MusicContainer from '../../components/MusicContainer';
import MusicPlayer from '../../components/MusicPlayer';

export default function MusicPlaylist({navigation}) {
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

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <View style={{padding: 16}}>
        {data?.map(({name, title, time}, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => navigation.navigate('Music Play')}>
            <MusicContainer title={title} name={name} time={time} />
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.musicPlayer}>
        <MusicPlayer />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  musicPlayer: {
    position: 'absolute',
    width: '100%',
    bottom: -20,
  },
});
