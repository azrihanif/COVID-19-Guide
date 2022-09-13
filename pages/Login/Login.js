import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Pressable} from 'react-native';
import {sha256} from 'react-native-sha256';
import {AuthCont} from '../../constants/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import {connector} from '../../constants/Connector';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTranslation } from 'react-i18next';

const Login = ({navigation}) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isFocus, setIsFocus] = useState('');
  const {setUserContext} = useContext(AuthCont);
  const {i18n} = useTranslation()

  const hashPassword = pass => {
    sha256(pass).then(hash => {
      login(hash);
    });
  };

  const login = async hash => {
    const data = {
      username: username,
      password: hash,
    };

    try {
      let res = await fetch(connector + '/login', {
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
        if (responseJSON?.error) {
          alert(responseJSON?.msg);
        } else {
          i18n.changeLanguage(responseJSON?.msg?.language)
          setUserContext(responseJSON?.msg);
        }
      } else {
        console.log('Error!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Login</Text>
        <TextInput
          style={[styles.input, isFocus === 'username' && styles.focus]}
          placeholder={'Username'}
          value={username}
          onChangeText={user => setUsername(user)}
          onFocus={() => setIsFocus('username')}
          onBlur={() => setIsFocus('')}></TextInput>
        <TextInput
          style={[styles.input, isFocus === 'password' && styles.focus]}
          placeholder={'Password'}
          value={password}
          secureTextEntry={isPasswordSecure}
          onChangeText={pass => setPassword(pass)}
          onFocus={() => setIsFocus('password')}
          onBlur={() => setIsFocus('')}></TextInput>
        <MaterialCommunityIcons
          name={isPasswordSecure ? 'eye-off' : 'eye'}
          size={28}
          color={'black'}
          style={{
            position: 'absolute',
            right: 25,
            top: 140,
          }}
          onPress={() => {
            isPasswordSecure
              ? setIsPasswordSecure(false)
              : setIsPasswordSecure(true);
          }}
        />
        <Pressable
          style={styles.button}
          onPress={() => {
            if (password && username) {
              hashPassword(password);
            } else {
              alert('Please enter your username or password');
            }
          }}>
          <Text style={styles.loginText}>{'LOGIN'}</Text>
        </Pressable>
        <Pressable
          style={styles.text}
          onPress={() => {
            navigation.navigate('Forgot Password');
          }}>
          <Text style={styles.bottomText}>{'Forgot password?'}</Text>
        </Pressable>
        <Pressable
          style={styles.text}
          onPress={() => {
            navigation.navigate('Sign Up');
          }}>
          <Text style={styles.bottomText}>{'Sign Up'}</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFF9FE',
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

export default Login;
