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

export default function SignUp({navigation}) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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
          style={[styles.input, isFocus === 'username' && styles.focus]}
          placeholder={'Username'}
          value={username}
          onChangeText={user => setUsername(user)}
          onFocus={() => setIsFocus('username')}
          onBlur={() => setIsFocus('')}></TextInput>
        <TextInput
          style={[
            styles.input,
            isFocus === 'email' && styles.focus,
            correctEmail && styles.correct,
            !correctEmail && !!email && styles.incorrect,
          ]}
          placeholder={'Email or Phone number'}
          value={email}
          onChangeText={mail => {
            setEmail(mail);
            validateEmail(mail);
          }}
          onFocus={() => setIsFocus('email')}
          onBlur={() => setIsFocus('')}></TextInput>
        {correctEmail && (
          <MaterialCommunityIcons
            name={'check-circle'}
            size={28}
            color={'green'}
            style={{
              position: 'absolute',
              right: 30,
              top: 137,
            }}
          />
        )}
        {!correctEmail && !!email && (
          <MaterialCommunityIcons
            name={'close-circle'}
            size={28}
            color={'red'}
            style={{
              position: 'absolute',
              right: 30,
              top: 137,
            }}
          />
        )}
        <TouchableOpacity
          style={styles.next}
          onPress={() => {
            if (!email && !username) {
              alert(
                'Please enter both username and email address before proceed',
              );
              return;
            }

            if (!correctEmail) {
              alert('Please enter correct email address');
              return;
            }
            navigation.navigate('Next');
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
