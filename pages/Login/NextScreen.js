import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function NextScreen() {
  const [password, setPassword] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isConfPasswordSecure, setIsConfPasswordSecure] = useState(true);
  const [confPass, setConfPassword] = useState('');
  const [isFocus, setIsFocus] = useState('');
  const [correctEmail, setCorrectEmail] = useState(false);

  const validateEmail = mail => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (reg.test(mail) === false) {
      console.log('Email is Not Correct');
      setCorrectEmail(false);
    } else {
      console.log('Email is Correct');
      setCorrectEmail(true);
    }
  };

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.text}>Sign Up for COVID-19 Guide</Text>
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
            right: 30,
            top: 70,
          }}
          onPress={() => {
            isPasswordSecure
              ? setIsPasswordSecure(false)
              : setIsPasswordSecure(true);
          }}
        />
        <TextInput
          style={[styles.input, isFocus === 'confPass' && styles.focus]}
          placeholder={'Confirm Password'}
          value={confPass}
          secureTextEntry={isConfPasswordSecure}
          onChangeText={pass => setConfPassword(pass)}
          onFocus={() => setIsFocus('confPass')}
          onBlur={() => setIsFocus('')}></TextInput>
        <MaterialCommunityIcons
          name={isConfPasswordSecure ? 'eye-off' : 'eye'}
          size={28}
          color={'black'}
          style={{
            position: 'absolute',
            right: 30,
            top: 135,
          }}
          onPress={() => {
            isConfPasswordSecure
              ? setIsConfPasswordSecure(false)
              : setIsConfPasswordSecure(true);
          }}
        />
        <TouchableOpacity style={styles.next}>
          <Text style={styles.smallText}>Sign Up</Text>
          <FontAwesome name={'angle-right'} size={32} color={'#030852'} />
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
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
    fontSize: 20,
    fontFamily: 'Sans-serif',
    color: '#030852',
    paddingBottom: 16,
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
  correct: {borderColor: 'green', borderWidth: 2},
  next: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  smallText: {
    fontSize: 16,
    fontFamily: 'Sans-serif',
    color: '#030852',
    paddingBottom: 7,
    marginRight: 8,
  },
});
