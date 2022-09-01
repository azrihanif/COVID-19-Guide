import React, {useState} from 'react';
import {StyleSheet, View, Text, TextInput, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Username({route}) {
  const [isFocus, setIsFocus] = useState('');
  const {username} = route.params;
  const [newUsername, setNewUsername] = useState('');

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <View style={{paddingHorizontal: 16}}>
        <Text style={styles.text}>Current Username</Text>
        <TextInput
          editable={false}
          style={styles.input}
          placeholder={'Current Username'}
          value={username}></TextInput>
        <Text style={styles.text}>New Username</Text>
        <TextInput
          style={[styles.input, isFocus === 'username' && styles.focus]}
          placeholder={'New Username'}
          value={newUsername}
          onChangeText={name => setNewUsername(name)}
          onFocus={() => setIsFocus('username')}
          onBlur={() => setIsFocus('')}></TextInput>
        <View style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.loginText}>{'SAVE'}</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 16,
    paddingBottom: 8,
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
    paddingHorizontal: 16,
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
});
