import React from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QuranContainer from '../../components/QuranContainer';
import MusicPlayer from '../../components/MusicPlayer';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function QuranPlaylist({navigation}) {
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

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <View style={{padding: 16}}>
        {data?.map(({title, time}, index) => (
          <TouchableOpacity key={index} onPress={() => navigation.navigate('Quran Play')}>
            <QuranContainer title={title} time={time} />
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
