import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Switch,
} from 'react-native';
import AuthCont from '../../constants/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {connector} from '../../constants/Connector';
import {CustomDarkTheme} from '../../components/Route';
import {useTranslation} from 'react-i18next';

export default function Settings({navigation}) {
  const {userContext, setUserContext} = useContext(AuthCont);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = async() => {
    setIsEnabled(isEnabled => !isEnabled);
    setUserContext({
      ...userContext,
      dark_mode: userContext?.dark_mode === 'T' ? 'F' : 'T',
    });

    const data = {
      id: userContext?.id,
      darkMode: userContext?.dark_mode === 'T' ? 'F' : 'T',
    };

    try {
      let res = await fetch(connector + '/changeDarkMode', {
        method: 'post',
        mode: 'no-cors',
        body: JSON.stringify(data),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
      if (res) {
        let responseJSON = await res.json();
        if(responseJSON?.error){
          alert(responseJSON?.msg);
        }
      } else {
        console.log('Error!');
      }
    } catch (e) {
      console.error(e);
    }
  };
  const {t} = useTranslation();

  const getLang = () => {
    if (userContext?.language === 'english') {
      return 'English';
    } else if (userContext?.language === 'malay') {
      return 'Bahasa Melayu';
    } else {
      return '中文';
    }
  };

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <ScrollView bounces={false} style={styles.taskWrapper}>
          <View>
            <Text style={{paddingBottom: 10, fontFamily: 'Sans-serif'}}>
              {t('content')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
              <View style={styles.item}>
                <FontAwesome name={'heart-o'} size={28} color={'#030852'} />
                <Text style={styles.text}>{t('favorites')}</Text>
                <FontAwesome
                  style={styles.angle}
                  name={'angle-right'}
                  size={32}
                  color={'#030852'}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{paddingBottom: 10, fontFamily: 'Sans-serif'}}>
              {t('preferences')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Language')}>
              <View
                style={[
                  styles.item,
                  {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
                ]}>
                <FontAwesome name={'globe'} size={28} color={'#030852'} />
                <Text style={[styles.text, {marginLeft: 5}]}>
                  {t('language')}
                </Text>
                <Text style={styles.Langtext}>{getLang()}</Text>
                <FontAwesome
                  style={styles.angle}
                  name={'angle-right'}
                  size={32}
                  color={'#030852'}
                />
              </View>
            </TouchableOpacity>
            <View style={[styles.item, styles.secondItem]}>
              <Ionicons name={'moon'} size={28} color={'#030852'} />
              <Text style={styles.text}>{t('dark_mode')}</Text>
              <Switch
                trackColor={{false: '#767577', true: 'blue'}}
                thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => toggleSwitch()}
                value={isEnabled}
                style={[
                  styles.angle,
                  {transform: [{scaleX: 1.5}, {scaleY: 1.5}]},
                ]}
              />
            </View>
          </View>
          <View>
            <Text style={{paddingBottom: 10, fontFamily: 'Sans-serif'}}>
              {t('contact_us')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
              <View
                style={[
                  styles.item,
                  {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
                ]}>
                <Feather name={'user'} size={28} color={'#030852'} />
                <Text style={styles.text}>{t('faq')}</Text>
                <FontAwesome
                  style={styles.angle}
                  name={'angle-right'}
                  size={32}
                  color={'#030852'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Contact Us')}>
              <View style={[styles.item, styles.secondItem]}>
                <FontAwesome name={'phone'} size={28} color={'#030852'} />
                <Text style={[styles.text, {marginLeft: 5}]}>
                  {t('contact_us')}
                </Text>
                <FontAwesome
                  style={styles.angle}
                  name={'angle-right'}
                  size={32}
                  color={'#030852'}
                />
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </LinearGradient>
    ) : (
      <View style={[styles.container, CustomDarkTheme]}>
        <ScrollView bounces={false} style={styles.taskWrapper}>
          <View>
            <Text
              style={{
                paddingBottom: 10,
                fontFamily: 'Sans-serif',
                color: CustomDarkTheme?.colors?.text,
              }}>
              {t('content')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
              <View style={styles.item}>
                <FontAwesome name={'heart-o'} size={28} color={'#030852'} />
                <Text style={styles.text}>{t('favorites')}</Text>
                <FontAwesome
                  style={styles.angle}
                  name={'angle-right'}
                  size={32}
                  color={'#030852'}
                />
              </View>
            </TouchableOpacity>
          </View>
          <View>
            <Text
              style={{
                paddingBottom: 10,
                fontFamily: 'Sans-serif',
                color: CustomDarkTheme?.colors?.text,
              }}>
              {t('preferences')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Language')}>
              <View
                style={[
                  styles.item,
                  {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
                ]}>
                <FontAwesome name={'globe'} size={28} color={'#030852'} />
                <Text style={[styles.text, {marginLeft: 5}]}>
                  {t('language')}
                </Text>
                <Text style={styles.Langtext}>{getLang()}</Text>
                <FontAwesome
                  style={styles.angle}
                  name={'angle-right'}
                  size={32}
                  color={'#030852'}
                />
              </View>
            </TouchableOpacity>
            <View style={[styles.item, styles.secondItem]}>
              <Ionicons name={'moon'} size={28} color={'#030852'} />
              <Text style={styles.text}>{t('dark_mode')}</Text>
              <Switch
                trackColor={{false: '#767577', true: 'blue'}}
                thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => toggleSwitch()}
                value={!isEnabled}
                style={[
                  styles.angle,
                  {transform: [{scaleX: 1.5}, {scaleY: 1.5}]},
                ]}
              />
            </View>
          </View>
          <View>
            <Text
              style={{
                paddingBottom: 10,
                fontFamily: 'Sans-serif',
                color: CustomDarkTheme?.colors?.text,
              }}>
              {t('contact_us')}
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
              <View
                style={[
                  styles.item,
                  {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
                ]}>
                <Feather name={'user'} size={28} color={'#030852'} />
                <Text style={styles.text}>{t('faq')}</Text>
                <FontAwesome
                  style={styles.angle}
                  name={'angle-right'}
                  size={32}
                  color={'#030852'}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Contact Us')}>
              <View style={[styles.item, styles.secondItem]}>
                <FontAwesome name={'phone'} size={28} color={'#030852'} />
                <Text style={[styles.text, {marginLeft: 5}]}>
                  {t('contact_us')}
                </Text>
                <FontAwesome
                  style={styles.angle}
                  name={'angle-right'}
                  size={32}
                  color={'#030852'}
                />
              </View>
            </TouchableOpacity>
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
  taskWrapper: {
    paddingTop: 0,
    paddingHorizontal: 16,
  },
  item: {
    backgroundColor: '#FFFFFF',
    opacity: 0.85,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
  text: {
    paddingLeft: 16,
    fontSize: 18,
    color: '#030852',
    fontFamily: 'sans-serif',
  },
  Langtext: {
    position: 'absolute',
    right: 45,
    top: 18,
    fontSize: 16,
    color: 'grey',
    fontFamily: 'sans-serif',
  },
  angle: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  secondItem: {
    display: 'flex',
    marginTop: -20,
    borderTopStartRadius: 0,
    borderTopRightRadius: 0,
  },
});
