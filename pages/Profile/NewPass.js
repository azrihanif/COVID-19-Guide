import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NewPass() {
  const [isFocus, setIsFocus] = useState('');
  const [newPass, setNewPass] = useState('');
  const [currentPass, setCurrentPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <View style={{paddingHorizontal: 16}}>
        <Text style={styles.text}>Current Password</Text>
        <TextInput
          style={[styles.input, isFocus === 'password' && styles.focus]}
          placeholder={'Current Password'}
          value={currentPass}
          secureTextEntry={isPasswordSecure}
          onChangeText={pass => setCurrentPass(pass)}
          onFocus={() => setIsFocus('password')}
          onBlur={() => setIsFocus('')}></TextInput>
        <MaterialCommunityIcons
          name={isPasswordSecure ? 'eye-off' : 'eye'}
          size={28}
          color={'black'}
          style={{
            position: 'absolute',
            right: 32,
            top: 40,
          }}
          onPress={() => {
            isPasswordSecure
              ? setIsPasswordSecure(false)
              : setIsPasswordSecure(true);
          }}
        />
        <Text style={styles.text}>New Password</Text>
        <TextInput
          style={[styles.input, isFocus === 'newPassword' && styles.focus]}
          placeholder={'At least 8 characters'}
          value={newPass}
          onChangeText={pass => setNewPass(pass)}
          onFocus={() => setIsFocus('newPassword')}
          onBlur={() => setIsFocus('')}></TextInput>
        <MaterialCommunityIcons
          name={isPasswordSecure ? 'eye-off' : 'eye'}
          size={28}
          color={'black'}
          style={{
            position: 'absolute',
            right: 32,
            top: 135,
          }}
          onPress={() => {
            isPasswordSecure
              ? setIsPasswordSecure(false)
              : setIsPasswordSecure(true);
          }}
        />
        <Text style={styles.text}>Confirm New Password</Text>
        <TextInput
          style={[styles.input, isFocus === 'confPassword' && styles.focus]}
          placeholder={'At least 8 characters'}
          value={confirmPass}
          onChangeText={pass => setConfirmPass(pass)}
          onFocus={() => setIsFocus('confPassword')}
          onBlur={() => setIsFocus('')}></TextInput>
        <MaterialCommunityIcons
          name={isPasswordSecure ? 'eye-off' : 'eye'}
          size={28}
          color={'black'}
          style={{
            position: 'absolute',
            right: 32,
            top: 230,
          }}
          onPress={() => {
            isPasswordSecure
              ? setIsPasswordSecure(false)
              : setIsPasswordSecure(true);
          }}
        />
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
