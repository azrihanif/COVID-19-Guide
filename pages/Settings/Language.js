import React, {useState, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {CustomDarkTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';
import {connector} from '../../constants/Connector';

export default function Language() {
  const {userContext, setUserContext} = useContext(AuthCont);
  const {i18n} = useTranslation();

  const changeLng = async lang => {
    const data = {
      id: userContext?.id,
      language: lang,
    };

    try {
      let res = await fetch(connector + '/changeLanguage', {
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
        alert(responseJSON?.msg);
      } else {
        console.log('Error!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const changeLanguage = text => {
    if (text === 'english') {
      setUserContext({...userContext, language: 'english'});
      changeLng('english')
    } else if (text === 'malay') {
      setUserContext({...userContext, language: 'malay'});
      changeLng('malay')
    } else {
      setUserContext({...userContext, language: 'chinese'});
      changeLng('chinese')
    }
  };

  const test = () => (
    <View style={{paddingHorizontal: 16}}>
      <TouchableOpacity
        onPress={() => {
          i18n.changeLanguage('english');
          changeLanguage('english');
        }}>
        <View style={styles.item}>
          <Text style={styles.text}>English</Text>
          {userContext?.language === 'english' && (
            <FontAwesome
              style={styles.angle}
              name={'check'}
              size={28}
              color={'#030852'}
            />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          i18n.changeLanguage('malay');
          changeLanguage('malay');
        }}>
        <View style={[styles.item, styles.secondItem]}>
          <Text style={styles.text}>Bahasa Melayu</Text>
          {userContext?.language === 'malay' && (
            <FontAwesome
              style={styles.angle}
              name={'check'}
              size={28}
              color={'#030852'}
            />
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          i18n.changeLanguage('chinese');
          changeLanguage('chinese');
        }}>
        <View style={styles.secondItem}>
          <Text style={styles.text}>中文</Text>
          {userContext?.language === 'chinese' && (
            <FontAwesome
              style={styles.angle}
              name={'check'}
              size={28}
              color={'#030852'}
            />
          )}
        </View>
      </TouchableOpacity>
    </View>
  );

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        {test()}
      </LinearGradient>
    ) : (
      <View style={[styles.container, CustomDarkTheme]}>{test()}</View>
    );
  };

  return getTheme();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    backgroundColor: '#FFFFFF',
    opacity: 0.85,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  angle: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  secondItem: {
    display: 'flex',
    backgroundColor: '#FFFFFF',
    opacity: 0.85,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: -20,
    borderTopStartRadius: 0,
    borderTopRightRadius: 0,
  },
  text: {
    paddingLeft: 8,
    fontSize: 18,
    color: '#030852',
    fontFamily: 'sans-serif',
  },
});
