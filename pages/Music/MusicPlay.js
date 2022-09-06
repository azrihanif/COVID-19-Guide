import React, {useState} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function MusicPlay({route}) {
  const {title, name, time, picture} = route?.params;
  const [playing, setPlaying] = useState(false);

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <View style={{paddingHorizontal: 16}}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={picture} />
        </View>
        <View
          style={{
            paddingTop: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.text, {fontSize: 22}]}>{title}</Text>
          <Text style={[styles.text, {fontSize: 16}]}>{name}</Text>
        </View>
        <View style={{flexDirection: 'row', paddingTop: 16}}>
          <Text style={styles.text}>0:00</Text>
          <Slider
            style={styles.progress}
            value={10}
            minimumValue={0}
            maximumValue={100}
            thumbTintColor={'#030852'}
            minimumTrackTintColor={'#030852'}
            maximumTrackTintColor={'#000'}
            onSlidingComplete={() => {}}
          />
          <Text
            style={[styles.text, {position: 'absolute', right: 0, top: 16}]}>
            {time}
          </Text>
        </View>
        <View style={styles.player}>
          <TouchableOpacity style={{paddingLeft: 32}} onPress={() => {}}>
            <Ionicons
              name="play-skip-back-circle-outline"
              color={'#030852'}
              size={50}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setPlaying(playing => !playing);
            }}>
            {playing ? (
              <Ionicons name="pause-circle-outline" color="#030852" size={100} />
            ) : (
              <Ionicons
                name="play-circle-outline"
                color={'#030852'}
                size={100}
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={{paddingRight: 32}} onPress={() => {}}>
            <Ionicons
              name="play-skip-forward-circle-outline"
              color={'#030852'}
              size={50}
            />
          </TouchableOpacity>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  imageWrapper: {
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderColor: '#C0C0C0',
    width: 300,
    height: 300,
    borderRadius: 8,
  },
  text: {
    color: '#030852',
    fontFamily: 'Sans-serif',
  },
  progress: {
    width: 300,
    height: 40,
    marginTop: -8,
    flexDirection: 'row',
  },
  player: {
    paddingVertical: 32,
    borderColor: '#000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
