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
import SwitchSelector from 'react-native-switch-selector';
import {connector} from '../../constants/Connector';

export default function SignUp({navigation, route}) {
  const {username, password} = route?.params;
  const [phoneNo, setPhoneNo] = useState('');
  const [email, setEmail] = useState('');
  const [isFocus, setIsFocus] = useState('');
  const [selected, setSelected] = useState('email');
  const [correctEmail, setCorrectEmail] = useState(false);

  const options = [
    {label: 'Email', value: 'email'},
    {label: 'Phone Number', value: 'phone'},
  ];

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

  const handlePress = value => {
    setSelected(value);
    if (value === 'email') {
      setPhoneNo('');
      setIsFocus('');
    } else {
      setEmail('');
      setCorrectEmail(false);
      setIsFocus('');
    }
  };

  const signUp = async () => {
    const data = {
      username: username,
      password: password,
      email: email,
      phoneNo: phoneNo,
    };

    try {
      let res = await fetch(connector + '/signUp', {
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
          alert(responseJSON?.msg);
          navigation.navigate('Covid-19 Guide')
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
        <Text style={[styles.text, {textAlign: 'center'}]}>
          Sign Up for COVID-19 Guide
        </Text>
        <SwitchSelector
          options={options}
          initial={0}
          borderColor={'#C0C0C0'}
          selectedColor={'#FFF'}
          buttonColor={'#030852'}
          hasPadding
          textStyle={{fontSize: 16, fontFamily: 'Sans-serif'}}
          selectedTextStyle={{fontSize: 16, fontFamily: 'Sans-serif'}}
          onPress={value => handlePress(value)}
          style={{paddingBottom: 16}}
        />
        {selected === 'phone' && (
          <TextInput
            style={[styles.input, isFocus === 'phone' && styles.focus]}
            placeholder={'Phone number'}
            value={phoneNo}
            onChangeText={phone => setPhoneNo(phone)}
            onFocus={() => setIsFocus('phone')}
            keyboardType={'phone-pad'}
            onBlur={() => setIsFocus('')}></TextInput>
        )}
        {selected === 'email' && (
          <TextInput
            style={[
              styles.input,
              isFocus === 'email' && styles.focus,
              correctEmail && styles.correct,
              !correctEmail && !!email && styles.incorrect,
            ]}
            placeholder={'Email Address'}
            value={email}
            onChangeText={mail => {
              setEmail(mail);
              validateEmail(mail);
            }}
            onFocus={() => setIsFocus('email')}
            onBlur={() => setIsFocus('')}></TextInput>
        )}
        {selected === 'email' && correctEmail && (
          <MaterialCommunityIcons
            name={'check-circle'}
            size={28}
            color={'green'}
            style={{
              position: 'absolute',
              right: 30,
              top: 127,
            }}
          />
        )}
        {selected === 'email' && !correctEmail && !!email && (
          <MaterialCommunityIcons
            name={'close-circle'}
            size={28}
            color={'red'}
            style={{
              position: 'absolute',
              right: 30,
              top: 127,
            }}
          />
        )}
        <TouchableOpacity
          style={styles.next}
          onPress={() => {
            if (!email && !phoneNo) {
              alert(
                'Please enter either phone number or email address before proceed',
              );
              return;
            }

            if (!correctEmail && selected === 'email') {
              alert('Please enter correct email address');
              return;
            }
            
            signUp()
          }}>
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
