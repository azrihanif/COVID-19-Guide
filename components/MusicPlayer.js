import React, {useState, useContext} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {CustomDarkTheme} from '../components/Route';
import {AuthCont} from '../constants/AuthContext';

export default function MusicPlayer({name, title, time}) {
  const [playing, setPlaying] = useState(false);
  const {userContext} = useContext(AuthCont);

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
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
            <Ionicons name="pause-circle-outline" color="#030852" size={65} />
          ) : (
            <Ionicons name="play-circle-outline" color={'#030852'} size={65} />
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
    ) : (
      <TouchableOpacity style={[styles.item, CustomDarkTheme]}>
        <TouchableOpacity style={{paddingLeft: 32}} onPress={() => {}}>
          <Ionicons
            name="play-skip-back-circle-outline"
            color={CustomDarkTheme?.colors?.text}
            size={40}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setPlaying(playing => !playing);
          }}>
          {playing ? (
            <Ionicons
              name="pause-circle-outline"
              color={CustomDarkTheme?.colors?.text}
              size={65}
            />
          ) : (
            <Ionicons
              name="play-circle-outline"
              color={CustomDarkTheme?.colors?.text}
              size={65}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity style={{paddingRight: 32}} onPress={() => {}}>
          <Ionicons
            name="play-skip-forward-circle-outline"
            color={CustomDarkTheme?.colors?.text}
            size={40}
          />
        </TouchableOpacity>
        <View style={styles.iconWrapper}>
          <View>
            <SimpleLineIcons
              name="options"
              color={CustomDarkTheme?.colors?.text}
              size={26}
            />
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return getTheme();
}

const styles = StyleSheet.create({
  item: {
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
