import React, {useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Alert} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {UnorderedList} from '../../components/UnorderedList';
import {CustomDarkTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';
import {connector} from '../../constants/Connector';
import {useNavigation} from '@react-navigation/native';

export default function Deactivate({route}) {
  const navigation = useNavigation();
  const {data} = route?.params;
  const {userContext, setUserContext} = useContext(AuthCont);

  const listTexts = [
    "You won't be able to log in and use any services\nwith that account",
    'You will lose all access to your account',
  ];

  const deleteAcc = async () => {
    const {id} = userContext;
    try {
      let res = await fetch(connector + '/deleteUser', {
        method: 'post',
        mode: 'no-cors',
        body: JSON.stringify({id}),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
      if (res) {
        let responseJSON = await res.json();

        if (responseJSON?.error) {
          Alert.alert('Error', responseJSON?.msg);
        } else {
          Alert.alert('Success', responseJSON?.msg);
          setUserContext(null);
        }
      } else {
        Alert.alert('Error', 'Error Occurred');
      }
    } catch (e) {
      Alert.alert('Error', 'Error Occurred');
    }
  };

  const popUp = () => {
    Alert.alert(
      'Confirmation',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Yes',
          onPress: () => {
            deleteAcc();
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <View style={{paddingHorizontal: 16}}>
          <Text style={[styles.text, {fontWeight: 'bold', fontSize: 20}]}>
            {data?.username} : delete this account?
          </Text>
          <Text style={styles.text}>
            {'\n'}Your account will be deactivated for 7 days. During
            deactivation, you can reactivate your account anytime. After 7 days,
            your account and data will be deleted permanently. {'\n\n'}If you
            delete your account: {'\n'}
            <UnorderedList texts={listTexts} color={'#030852'} />
            {'\n'}Do you want to continue?
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 16,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              popUp();
            }}>
            <Text style={styles.loginText}>{'CONTINUE'}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    ) : (
      <View style={[styles.container, CustomDarkTheme]}>
        <View style={{paddingHorizontal: 16}}>
          <Text
            style={[
              styles.text,
              {
                fontWeight: 'bold',
                fontSize: 20,
                color: CustomDarkTheme?.colors?.text,
              },
            ]}>
            {data?.username} : delete this account?
          </Text>
          <Text style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>
            {'\n'}Your account will be deactivated for 7 days. During
            deactivation, you can reactivate your account anytime. After 7 days,
            your account and data will be deleted permanently. {'\n\n'}If you
            delete your account: {'\n'}
            <UnorderedList
              texts={listTexts}
              color={CustomDarkTheme?.colors?.text}
            />
            {'\n'}Do you want to continue?
          </Text>
        </View>
        <View
          style={{
            position: 'absolute',
            bottom: 16,
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              popUp();
            }}>
            <Text style={styles.loginText}>{'CONTINUE'}</Text>
          </TouchableOpacity>
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
  text: {
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#030852',
    fontFamily: 'sans-serif',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#030852',
    width: '80%',
  },
  loginText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'Sans-serif',
  },
});
