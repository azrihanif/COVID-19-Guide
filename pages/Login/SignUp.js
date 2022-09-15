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

export default function SignUp({navigation}) {
  const [username, setUsername] = useState('');
  const [isFocus, setIsFocus] = useState('');

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <View style={styles.card}>
        <Text style={[styles.text, {textAlign: 'center'}]}>Sign Up for COVID-19 Guide</Text>
        <TextInput
          style={[styles.input, isFocus === 'username' && styles.focus]}
          placeholder={'Username'}
          value={username}
          onChangeText={user => setUsername(user)}
          onFocus={() => setIsFocus('username')}
          onBlur={() => setIsFocus('')}></TextInput>
        <TouchableOpacity
          style={styles.next}
          onPress={() => {
            if (!username) {
              alert('Please enter username before proceed');
              return;
            }
            navigation.navigate('Next', {username});
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
  incorrect: {borderColor: 'red', borderWidth: 2},
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
