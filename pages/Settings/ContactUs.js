import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { CustomDarkTheme } from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';

export default function ContactUs() {
  const [isFocus, setIsFocus] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const {userContext} = useContext(AuthCont);

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <View style={styles.card}>
          <Text style={styles.text}>Drop us a message</Text>
          <TextInput
            style={[styles.input, isFocus === 'name' && styles.focus]}
            placeholder={'Full Name'}
            value={name}
            onChangeText={user => setName(user)}
            onFocus={() => setIsFocus('name')}
            onBlur={() => setIsFocus('')}></TextInput>
          <TextInput
            style={[styles.input, isFocus === 'email' && styles.focus]}
            placeholder={'Email Address'}
            value={email}
            onChangeText={pass => setEmail(pass)}
            onFocus={() => setIsFocus('email')}
            onBlur={() => setIsFocus('')}></TextInput>
          <TextInput
            style={[styles.input, isFocus === 'message' && styles.focus]}
            placeholder={'Message'}
            value={message}
            onChangeText={pass => setMessage(pass)}
            onFocus={() => setIsFocus('message')}
            onBlur={() => setIsFocus('')}></TextInput>

          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.loginText}>{'SUBMIT'}</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    ) : (
      <View style={[styles.container, CustomDarkTheme]}>
        <View style={styles.card}>
          <Text style={styles.text}>Drop us a message</Text>
          <TextInput
            style={[styles.input, isFocus === 'name' && styles.focus]}
            placeholder={'Full Name'}
            value={name}
            onChangeText={user => setName(user)}
            onFocus={() => setIsFocus('name')}
            onBlur={() => setIsFocus('')}></TextInput>
          <TextInput
            style={[styles.input, isFocus === 'email' && styles.focus]}
            placeholder={'Email Address'}
            value={email}
            onChangeText={pass => setEmail(pass)}
            onFocus={() => setIsFocus('email')}
            onBlur={() => setIsFocus('')}></TextInput>
          <TextInput
            style={[styles.input, isFocus === 'message' && styles.focus]}
            placeholder={'Message'}
            value={message}
            onChangeText={pass => setMessage(pass)}
            onFocus={() => setIsFocus('message')}
            onBlur={() => setIsFocus('')}></TextInput>

          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.loginText}>{'SUBMIT'}</Text>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 20,
    justifyContent: 'space-between',
    marginBottom: 20,
    flexDirection: 'column',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingBottom: 16,
    color: '#030852',
    fontFamily: 'Sans-serif',
  },
  input: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 11,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    marginBottom: 16,
  },
  focus: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#030852',
  },
  loginText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'Sans-serif',
  },
  bottomText: {
    fontSize: 16,
    fontFamily: 'Sans-serif',
    color: '#030852',
    paddingTop: 16,
    marginBottom: -16,
    textAlign: 'center',
  },
});
