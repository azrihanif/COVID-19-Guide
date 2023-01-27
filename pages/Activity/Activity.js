import React, {useContext} from 'react';
import {StyleSheet, View, Text, ScrollView, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';
import {AuthCont} from '../../constants/AuthContext';
import {CustomDarkTheme, CustomDefaultTheme} from '../../components/Route';
import Video from 'react-native-video';

export default function Activity({route}) {
  const {userContext} = useContext(AuthCont);
  const {activity, picture, video_name, video_data} = route.params;

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient
        colors={['#DFF6FF', '#FFFFFF']}
        style={[styles.container, {CustomDefaultTheme}]}>
        <ScrollView bounces={false} style={styles.scroll}>
          <View style={styles.taskWrapper}>
            <View style={styles.imageWrapper}>
              {!!picture && (
                <Image style={styles.image} source={{uri: picture}} />
              )}
              {!!video_data && (
                <Video
                  style={styles.image}
                  resizeMode={'stretch'}
                  source={require('../../images/video/TeUViwrJH9aWLwpJpLvXf9N5xjVtebSQZeFiooHa.mp4')}
                  controls={true}
                />
              )}
              <Text
                style={[
                  styles.sectionTitle,
                  {color: CustomDefaultTheme?.colors?.text},
                ]}>
                {video_name}
              </Text>
            </View>
            <Text
              style={[styles.title, {color: CustomDefaultTheme?.colors?.text}]}>
              {activity}
            </Text>

            <View style={styles.wrapper}>
              <Text
                style={[
                  styles.text,
                  {color: CustomDefaultTheme?.colors?.text},
                ]}>
                Date: {moment(new Date()).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    ) : (
      <View style={[styles.container, {CustomDarkTheme}]}>
        <ScrollView bounces={false} style={styles.scroll}>
          <View style={styles.taskWrapper}>
            <View style={styles.imageWrapper}>
              {!!picture && (
                <Image style={styles.image} source={{uri: picture}} />
              )}
              {!!video_data && (
                <Video
                  style={styles.image}
                  resizeMode={'stretch'}
                  source={require('../../images/video/TeUViwrJH9aWLwpJpLvXf9N5xjVtebSQZeFiooHa.mp4')}
                  controls={true}
                />
              )}
              <Text
                style={[
                  styles.sectionTitle,
                  {color: CustomDarkTheme?.colors?.text},
                ]}>
                {video_name}
              </Text>
            </View>
            <Text
              style={[styles.title, {color: CustomDarkTheme?.colors?.text}]}>
              {activity}
            </Text>

            <View style={styles.wrapper}>
              <Text
                style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>
                Date: {moment(new Date()).format('DD/MM/YYYY')}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  };

  return getTheme();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
  },
  taskWrapper: {
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    paddingBottom: 16,
  },
  image: {
    width: 330,
    height: 200,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#000',
  },
  items: {
    marginTop: 0,
  },
  text: {
    color: '#000',
  },
  wrapper: {
    paddingTop: 16,
  },
});
