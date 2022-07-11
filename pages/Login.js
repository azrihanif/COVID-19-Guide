import React, {useContext, useState} from 'react';
import {View, Text, StyleSheet, TextInput, Button} from 'react-native';
import {sha256} from 'react-native-sha256';
import {AuthCont} from '../constants/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import {connector} from '../constants/Connector';

const Login = ({navigation}) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const {setUserContext} = useContext(AuthCont);

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
        <Text style={styles.text}>USER LOGIN</Text>
        <TextInput
          style={styles.input}
          placeholder={'Username'}
          value={username}
          onChangeText={user => setUsername(user)}></TextInput>
        <TextInput
          style={styles.input}
          placeholder={'Password'}
          value={password}
          secureTextEntry={true}
          onChangeText={pass => setPassword(pass)}></TextInput>
        <Button
          style={styles.button}
          title="LOGIN"
          onPress={() => {
            if (password && username) {
              hashPassword(password);
            } else {
              alert('Please enter your username or password');
            }
          }}></Button>
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
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
    marginBottom: 16,
  },
  button: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});

export default Login;
