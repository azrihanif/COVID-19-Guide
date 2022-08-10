import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

export default function MusicPlayer({name, title, time}) {
  const [playing, setPlaying] = useState(false);

  return (
    <TouchableOpacity style={styles.item}>
      <TouchableOpacity style={{paddingLeft: 32}} onPress={() => {}}>
        <Ionicons
          name="play-skip-back-circle-outline"
          color={'#030852'}
          size={40}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          setPlaying(playing => !playing);
        }}>
        {playing ? (
          <Feather name="pause-circle" color="#030852" size={61} />
        ) : (
          <Ionicons name="play-circle-outline" color={'#030852'} size={58} />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={{paddingRight: 32}} onPress={() => {}}>
        <Ionicons
          name="play-skip-forward-circle-outline"
          color={'#030852'}
          size={40}
        />
      </TouchableOpacity>
      <View style={styles.iconWrapper}>
        <View>
          <SimpleLineIcons name="options" color="#030852" size={26} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFF',
    padding: 16,
    borderColor: '#000',
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    maxHeight: 100,
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
  iconWrapper: {
    maxWidth: '30%',
    paddingRight: 16,
  },
});
