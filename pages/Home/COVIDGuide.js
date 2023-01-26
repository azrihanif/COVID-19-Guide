import React, {useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {CustomDarkTheme, CustomDefaultTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';

export default function COVIDGuide({route}) {
  const {text, title, date, picture, links} = route.params;
  const {userContext} = useContext(AuthCont);

  const goTo = async link => {
    await Linking.openURL(`https://${link}`);
  };

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient
        colors={['#DFF6FF', '#FFFFFF']}
        style={[styles.container, {CustomDefaultTheme}]}>
        <ScrollView bounces={false} style={styles.scroll}>
          <View style={styles.taskWrapper}>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={
                  !!picture
                    ? {
                        uri: picture,
                      }
                    : require('../../images/no_image.png')
                }
              />
            </View>
            <Text
              style={[styles.title, {color: CustomDefaultTheme?.colors?.text}]}>
              {title}
            </Text>
            <Text
              style={[
                styles.sectionTitle,
                {color: CustomDefaultTheme?.colors?.text},
              ]}>
              {text}
            </Text>
            <View style={styles.wrapper}>
              <Text
                style={[
                  styles.text,
                  {color: CustomDefaultTheme?.colors?.text},
                ]}>
                Date: {date}
              </Text>
              {links && (
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => goTo(`${links}`)}>
                  <Text
                    style={[
                      styles.text,
                      {color: CustomDefaultTheme?.colors?.text},
                    ]}>
                    Visit us at:{' '}
                  </Text>
                  <Text
                    style={{color: 'blue', textDecorationLine: 'underline'}}>
                    {links}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    ) : (
      <View style={[styles.container, {CustomDarkTheme}]}>
        <ScrollView bounces={false} style={styles.scroll}>
          <View style={styles.taskWrapper}>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={
                  !!picture
                    ? {
                        uri: picture,
                      }
                    : require('../../images/no_image.png')
                }
              />
            </View>
            <Text
              style={[styles.title, {color: CustomDarkTheme?.colors?.text}]}>
              {title}
            </Text>
            <Text
              style={[
                styles.sectionTitle,
                {color: CustomDarkTheme?.colors?.text},
              ]}>
              {text}
            </Text>
            <View style={styles.wrapper}>
              <Text
                style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>
                Date: {date}
              </Text>
              {links && (
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => goTo(`${links}`)}>
                  <Text
                    style={[
                      styles.text,
                      {color: CustomDarkTheme?.colors?.text},
                    ]}>
                    Visit us at:&nbsp;
                  </Text>
                  <Text
                    style={{color: 'blue', textDecorationLine: 'underline'}}>
                    {links}
                  </Text>
                </TouchableOpacity>
              )}
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
    width: 350,
    height: 350,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
  },
  items: {
    marginTop: 0,
  },
  wrapper: {
    paddingTop: 16,
  },
});
