import React, {useState, useEffect, useRef} from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';
import {connector} from '../../constants/Connector';
import LinearGradient from 'react-native-linear-gradient';

export default function VerifyOTP({navigation, route}) {
  const {method, username} = route?.params;
  let textInput = useRef(null);
  const lengthInput = 6;
  let clockCall = null;
  const defaultTimer = 180;
  const [internalVal, setInternalVal] = useState('');
  const [countdown, setCountdown] = useState(defaultTimer);
  const [enableResend, setEnableResend] = useState(false);

  useEffect(() => {
    clockCall = setInterval(() => {
      decrementClock();
    }, 1000);
    return () => {
      clearInterval(clockCall);
    };
  });

  const decrementClock = () => {
    if (countdown === 0) {
      setEnableResend(true);
      setCountdown(0);
      clearInterval(clockCall);
    } else {
      setCountdown(countdown - 1);
    }
  };

  const onChangeText = async val => {
    setInternalVal(val);
    if (val?.length === lengthInput) {
      if (method === 'email address') {
        const data = {
          username: username,
          OTPCode: val,
        };
        try {
          let res = await fetch(connector + '/verifyOTPEmail', {
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
              navigation.navigate('Change Password', {username: username});
            }
          } else {
            console.log('Error!');
          }
        } catch (e) {
          console.error(e);
        }
      }
    } else if (method === 'phone number') {
      const data = {
        username: username,
        OTPCode: val,
      };
      try {
        let res = await fetch(connector + '/verifyOTPSMS', {
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
            navigation.navigate('Change Password', {username: username});
          }
        } else {
          console.log('Error!');
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const onChangeNumber = () => {
    navigation.goBack();
  };

  const onResendOTP = () => {
    if (enableResend) {
      setCountdown(defaultTimer);
      setEnableResend(false);
      clearInterval(clockCall);
      clockCall = setInternal(() => {
        decrementClock(0);
      }, 1000);
    }
  };

  useEffect(() => {
    textInput.focus();
  }, []);

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <KeyboardAvoidingView
        keyboardVerticalOffset={50}
        behavior={'padding'}
        style={styles.containerAvoidingView}>
        <Text style={styles.textTile}>
          Input your OTP code sent via {method}
        </Text>
        <View>
          <TextInput
            ref={input => (textInput = input)}
            onChangeText={onChangeText}
            style={{width: 250, height: 0}}
            value={internalVal}
            maxLength={lengthInput}
            returnKeyType={'done'}
            keyboardType={'number-pad'}
          />
        </View>
        <View style={styles.containerInput}>
          {Array(lengthInput)
            .fill()
            .map((data, index) => (
              <View
                key={index}
                style={[
                  styles.cellView,
                  {
                    borderBottomColor:
                      index === internalVal?.length ? 'red' : '#030852',
                  },
                ]}>
                <Text style={styles.cellText} onPress={() => textInput.focus()}>
                  {internalVal && internalVal?.length > 0
                    ? internalVal[index]
                    : ''}
                </Text>
              </View>
            ))}
        </View>
        <View style={styles.bottomView}>
          <TouchableOpacity onPress={onChangeNumber}>
            <View style={styles.btnChangeNumber}>
              <Text style={styles.textChange}>Go back</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onResendOTP}>
            <View style={styles.btnResend}>
              <Text
                style={[
                  styles.textResend,
                  {
                    color: enableResend ? '#030852' : 'gray',
                  },
                ]}>
                Resend OTP ({countdown})
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerAvoidingView: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  textTile: {
    marginTop: 50,
    marginBottom: 50,
    fontSize: 16,
  },
  containerInput: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellView: {
    paddingVertical: 11,
    width: 40,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1.5,
  },
  cellText: {
    textAlign: 'center',
    fontSize: 16,
  },
  bottomView: {
    flexDirection: 'row',
    flex: 1,
    marginBottom: 50,
    alignItems: 'flex-end',
  },
  btnChangeNumber: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  textChange: {
    color: '#030852',
    alignItems: 'center',
    fontSize: 16,
  },
  btnResend: {
    width: 150,
    height: 50,
    borderRadius: 10,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  textResend: {
    alignItems: 'center',
    fontSize: 16,
  },
});
