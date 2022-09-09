import React, {useContext} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AuthCont from '../../constants/AuthContext';
import {CustomDarkTheme} from '../../components/Route';

export default function AdviceScreen({route}) {
  const {userContext} = useContext(AuthCont);
  const {title, advice, adviceDate, adviceContact, adviceEmail} = route.params;

  const makeCall = async contact => {
    await Linking.openURL(`tel:${contact}`);
  };

  const emailTo = async email => {
    await Linking.openURL(
      `mailto:${email}?subject=Questions regarding ${title}`,
    );
  };

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <ScrollView bounces={false} style={styles.scroll}>
          <View style={styles.taskWrapper}>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={require('../../images/profilepic/profile.jpg')}
              />
            </View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.sectionTitle}>{advice}</Text>
            <View style={styles.wrapper}>
              <Text style={styles.text}>Date: {adviceDate}</Text>
              {adviceContact && (
                <TouchableOpacity
                  onPress={() => makeCall(`+6${adviceContact}`)}>
                  <Text style={styles.text}>Phone No: {adviceContact}</Text>
                </TouchableOpacity>
              )}
              {adviceEmail && (
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => emailTo(`${adviceEmail}`)}>
                  <Text style={styles.text}>Email us at: </Text>
                  <Text
                    style={{color: 'blue', textDecorationLine: 'underline'}}>
                    {adviceEmail}
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
    ) : (
      <View colors={['#DFF6FF', '#FFFFFF']} style={[styles.container,CustomDarkTheme]}>
        <ScrollView bounces={false} style={styles.scroll}>
          <View style={styles.taskWrapper}>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={require('../../images/profilepic/profile.jpg')}
              />
            </View>
            <Text style={[styles.title, {color: CustomDarkTheme?.colors?.text}]}>{title}</Text>
            <Text style={[styles.sectionTitle, {color: CustomDarkTheme?.colors?.text}]}>{advice}</Text>
            <View style={styles.wrapper}>
              <Text style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>Date: {adviceDate}</Text>
              {adviceContact && (
                <TouchableOpacity
                  onPress={() => makeCall(`+6${adviceContact}`)}>
                  <Text style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>Phone No: {adviceContact}</Text>
                </TouchableOpacity>
              )}
              {adviceEmail && (
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() => emailTo(`${adviceEmail}`)}>
                  <Text style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>Email us at: </Text>
                  <Text
                    style={{color: 'blue', textDecorationLine: 'underline'}}>
                    {adviceEmail}
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
    width: 200,
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
