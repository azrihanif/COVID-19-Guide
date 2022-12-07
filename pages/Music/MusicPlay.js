import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CustomDarkTheme, CustomDefaultTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';
import Sound from 'react-native-sound';

export default function MusicPlay({route}) {
  const {title, name, time, picture} = route?.params;
  const [playing, setPlaying] = useState(false);
  const {userContext} = useContext(AuthCont);
  const [music, setMusic] = useState();
  const [pause, setPause] = useState(false);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    !!music &&
      music.getCurrentTime(seconds => {
        setDuration((seconds / music.getDuration()) * 100);
        console.log('at ' + seconds);
      });
  }, [music]);

  const play = () => {
    let harryStyles = new Sound('harry_styles.mp3', Sound.MAIN_BUNDLE, err => {
      if (err) {
        console.log(err);
        return;
      }

      harryStyles.play(success => {
        console.log(success);
      });
    });

    setMusic(harryStyles);
  };

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
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
            <Text style={styles.text}>{(Number(duration / 60).toFixed(2)).toString().replace('.', ':')}</Text>
            <Slider
              style={styles.progress}
              value={duration}
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
            <TouchableOpacity>
              {playing ? (
                <Ionicons
                  name="pause-circle-outline"
                  color="#030852"
                  size={100}
                  onPress={() => {
                    setPlaying(playing => !playing);
                    setPause(true);
                    music.pause();
                    music.getCurrentTime(seconds => {
                      setDuration((seconds / music.getDuration()) * 100);
                      console.log('at ' + seconds);
                    });
                  }}
                />
              ) : (
                <Ionicons
                  name="play-circle-outline"
                  color={'#030852'}
                  size={100}
                  onPress={() => {
                    setPlaying(playing => !playing);
                    pause ? music.play() : play();
                  }}
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
    ) : (
      <View style={[styles.container, CustomDarkTheme]}>
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
            <Text
              style={[
                styles.text,
                {fontSize: 22, color: CustomDarkTheme?.colors?.text},
              ]}>
              {title}
            </Text>
            <Text
              style={[
                styles.text,
                {fontSize: 16, color: CustomDarkTheme?.colors?.text},
              ]}>
              {name}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 16}}>
            <Text style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>
              0:00
            </Text>
            <Slider
              style={styles.progress}
              value={10}
              minimumValue={0}
              maximumValue={100}
              thumbTintColor={CustomDarkTheme?.colors?.text}
              minimumTrackTintColor={CustomDarkTheme?.colors?.text}
              maximumTrackTintColor={'#FFF'}
              onSlidingComplete={() => {}}
            />
            <Text
              style={[
                styles.text,
                {
                  position: 'absolute',
                  right: 0,
                  top: 16,
                  color: CustomDarkTheme?.colors?.text,
                },
              ]}>
              {time}
            </Text>
          </View>
          <View style={styles.player}>
            <TouchableOpacity style={{paddingLeft: 32}} onPress={() => {}}>
              <Ionicons
                name="play-skip-back-circle-outline"
                color={CustomDarkTheme?.colors?.text}
                size={50}
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
                  size={100}
                />
              ) : (
                <Ionicons
                  name="play-circle-outline"
                  color={CustomDarkTheme?.colors?.text}
                  size={100}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={{paddingRight: 32}} onPress={() => {}}>
              <Ionicons
                name="play-skip-forward-circle-outline"
                color={CustomDarkTheme?.colors?.text}
                size={50}
              />
            </TouchableOpacity>
          </View>
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
