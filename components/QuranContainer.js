import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function QuranContainer({title, time, onPress}) {
  const [playing, setPlaying] = useState(false);
  const [music, setMusic] = useState(null);
  const [pause, setPause] = useState(false);
  const [duration, setDuration] = useState(0);

  const play = () => {
    let alfatiha = new Sound('alfatihah.mp3', Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log(err);
        return;
      }

      alfatiha.play(success => {
        console.log(success);
      });

      let d = Math.floor(alfatiha.getDuration() / 60);
      let s = Number(alfatiha.getDuration() % 60).toFixed(0);
      let t = d.toString();
      let ss = s.toString();

      setDuration(`${t.padStart(2, '0')}:${ss.padStart(2, '0')}`);
    });

    setMusic(alfatiha);
  };

  return (
    <View style={[styles.item, styles.Shadow]}>
      <TouchableOpacity>
        {playing ? (
          <Feather
            name="pause-circle"
            color="#030852"
            size={40}
            onPress={() => {
              setPlaying(playing => !playing);
              setPause(true);
              music.pause();
            }}
          />
        ) : (
          <Ionicons
            name="play-circle-outline"
            color={'#030852'}
            size={40}
            onPress={() => {
              setPlaying(playing => !playing);
              pause ? music.play() : play();
            }}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.textWrapper} onPress={() => onPress()}>
        <Text style={styles.titleText}>{title}</Text>
      </TouchableOpacity>
      <View style={styles.iconWrapper}>
        <View>
          {playing ? (
            <SimpleLineIcons name="options" color="#030852" size={32} />
          ) : (
            <Text style={styles.smallText}>{time}</Text>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    opacity: 0.85,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    maxHeight: 100,
  },
  textWrapper: {
    width: '70%',
  },
  titleText: {
    flexDirection: 'row',
    fontWeight: 'bold',
    color: '#030852',
    fontSize: 18,
    fontFamily: 'sans-serif',
    paddingBottom: 5,
  },
  Shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 3,
  },
  itemText: {
    textAlign: 'left',
    maxHeight: '70%',
  },
  iconWrapper: {
    maxWidth: '30%',
  },
  smallText: {
    fontSize: 16,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#030852',
  },
});
