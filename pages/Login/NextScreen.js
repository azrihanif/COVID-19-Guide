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
import {sha256} from 'react-native-sha256';

export default function NextScreen({navigation, route}) {
  const {username} = route?.params;
  const [password, setPassword] = useState('');
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [isConfPasswordSecure, setIsConfPasswordSecure] = useState(true);
  const [confPass, setConfPassword] = useState('');
  const [storeHash1, setStoreHash1] = useState([]);
  const [valid, setValid] = useState(true);
  const [isFocus, setIsFocus] = useState('');

  const store1 = hash => setStoreHash1(hash);

  const hashPassword1 = pass => sha256(pass).then(hash => store1(hash));

  const validatePass = pass => {
    let reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,256}$/;
    if (!reg.test(pass)) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.text, {textAlign: 'center'}]}>
          Sign Up for COVID-19 Guide
        </Text>
        <TextInput
          style={[styles.input, isFocus === 'password' && styles.focus]}
          placeholder={'Password'}
          value={password}
          secureTextEntry={isPasswordSecure}
          onChangeText={pass => {
            setPassword(pass);
            hashPassword1(pass);
            setValid(validatePass(pass));
          }}
          onFocus={() => setIsFocus('password')}
          onBlur={() => setIsFocus('')}></TextInput>
        {!valid && (
          <Text style={{fontSize: 12, color: 'red', marginTop: -10}}>
            {
              'Use 8 or more characters with a mix of letters, numbers & symbols'
            }
          </Text>
        )}
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
        <TouchableOpacity
          style={styles.next}
          onPress={() => {
            if (!confPass || !password) {
              alert(
                'Please enter your password and confirm password before proceed',
              );
              return;
            }

            if (confPass !== password) {
              alert('Password and Confirm Password did not match');
              return;
            }
            
            navigation.navigate('EmailPhone', {username, password: storeHash1});
          }}>
          <Text style={styles.smallText}>Next</Text>
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
    alignItems: 'center',
  },
  card: {
    width: '90%',
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
    width: '100%',
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
