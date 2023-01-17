import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, Image, Text, TouchableOpacity} from 'react-native';
import Slider from '@react-native-community/slider';
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {CustomDarkTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';
import Sound from 'react-native-sound';

export default function QuranPlay({route}) {
  const {title, time, picture, songs} = route?.params;
  const [playing, setPlaying] = useState(false);
  const {userContext} = useContext(AuthCont);
  const [music, setMusic] = useState();
  const [pause, setPause] = useState(false);
  const [seconds, setSeconds] = useState();
  const [get, setGet] = useState(0);
  const [timer, setTimer] = useState({s: 0, m: 0});
  const [currentSong, setCurrentSong] = useState(songs[0]);
  // const songs = [
  //   {
  //     title: 'Al-Fatiha',
  //     time: '01:25',
  //     picture: require('../../images/quran/alfatiha.jpg'),
  //   },
  // ];
  var updatedS = timer.s,
    updatedM = timer.m;

  const start = () => {
    setSeconds(setInterval(run, 1000));
  };

  const stop = () => {
    clearInterval(seconds);
  };

  const reset = () => {
    clearInterval(seconds);
    setGet(0);
    setTimer({s: 0, m: 0});
    updatedM = 0;
    updatedS = 0;
    start();
  };

  const run = () => {
    if (updatedS === 60) {
      updatedM++;
      updatedS = 0;
    }
    updatedS++;
    setGet(get => get + 1);
    return setTimer({s: updatedS, m: updatedM});
  };

  const play = () => {
    if (currentSong.title == 'Al-Fatiha') {
      let alfatiha = new Sound('alfatihah.mp3', Sound.MAIN_BUNDLE, err => {
        if (err) {
          console.log(err);
          return;
        }

        alfatiha.play(success => {
          console.log(success);
        });
      });
      setCurrentSong({title: 'Al-Fatiha'});
      setMusic(alfatiha);
    }
  };

  const skipBack = () => {
    const index = songs.findIndex(x => x.title == currentSong.title);
    if (index == 0) {
      setCurrentSong(songs[songs.length - 1]);
      music.setCurrentTime(0);
      reset();
    } else {
      setCurrentSong(songs[index - 1]);
      music.setCurrentTime(0);
      reset();
    }
  };

  const skipNext = () => {
    const index = songs.findIndex(x => x.title == currentSong.title);
    if (index == songs.length - 1) {
      setCurrentSong(songs[0]);
      music.setCurrentTime(0);
      reset();
    } else {
      setCurrentSong(songs[index + 1]);
      music.setCurrentTime(0);
      reset();
    }
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
            <Text style={[styles.text, {fontSize: 22}]}>{currentSong?.title}</Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 16}}>
            <Text style={styles.text}>{`${timer.m}:${
              timer.s < 10 ? '0' + timer.s : timer.s
            }`}</Text>
            <Slider
              style={styles.progress}
              value={get}
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
            <TouchableOpacity style={{paddingLeft: 32}}>
              <Ionicons
                name="play-skip-back-circle-outline"
                color={'#030852'}
                size={50}
                onPress={() => {
                  skipBack();
                }}
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
                    stop();
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
                    start();
                  }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity style={{paddingRight: 32}}>
              <Ionicons
                name="play-skip-forward-circle-outline"
                color={'#030852'}
                size={50}
                onPress={() => {
                  skipNext();
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    ) : (
      <View
        colors={['#DFF6FF', '#FFFFFF']}
        style={[styles.container, CustomDarkTheme]}>
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
              {currentSong?.title}
            </Text>
          </View>
          <View style={{flexDirection: 'row', paddingTop: 16}}>
            <Text style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>
              {`${timer.m}:${timer.s < 10 ? '0' + timer.s : timer.s}`}
            </Text>
            <Slider
              style={styles.progress}
              value={get}
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
            <TouchableOpacity
              style={{paddingLeft: 32}}
              onPress={() => {
                skipBack();
              }}>
              <Ionicons
                name="play-skip-back-circle-outline"
                color={CustomDarkTheme?.colors?.text}
                size={50}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              {playing ? (
                <Ionicons
                  name="pause-circle-outline"
                  color={CustomDarkTheme?.colors?.text}
                  size={100}
                  onPress={() => {
                    setPlaying(playing => !playing);
                    setPause(true);
                    music.pause();
                    stop();
                  }}
                />
              ) : (
                <Ionicons
                  name="play-circle-outline"
                  color={CustomDarkTheme?.colors?.text}
                  size={100}
                  onPress={() => {
                    setPlaying(playing => !playing);
                    pause ? music.play() : play();
                    start();
                  }}
                />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              style={{paddingRight: 32}}
              onPress={() => {
                skipNext();
              }}>
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
    height: 400,
    borderRadius: 8,
  },
  text: {
    color: '#030852',
    fontFamily: 'Sans-serif',
  },
  progress: {
    width: 320,
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
