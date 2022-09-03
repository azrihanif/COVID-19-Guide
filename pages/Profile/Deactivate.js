import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {UnorderedList} from '../../components/UnorderedList';

export default function Deactivate({route}) {
  const {data} = route?.params;

  const listTexts = [
    "You won't be able to log in and use any services\nwith that account",
    'You will lose all access to your account',
  ];

  return (
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
          <UnorderedList texts={listTexts} />
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
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.loginText}>{'CONTINUE'}</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
