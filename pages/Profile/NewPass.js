import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connector} from '../../constants/Connector';
import {sha256} from 'react-native-sha256';
import {CustomDarkTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';
import {useTranslation} from 'react-i18next';

export default function NewPass({navigation}) {
  const [isFocus, setIsFocus] = useState('');
  const [newPass, setNewPass] = useState('');
  const [currentPass, setCurrentPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [isCurrPasswordSecure, setIsCurrPasswordSecure] = useState(true);
  const [isConfPasswordSecure, setIsConfPasswordSecure] = useState(true);
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [popUp, setPopUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [storeHash1, setStoreHash1] = useState([]);
  const [storeHash2, setStoreHash2] = useState([]);
  const [storeHash3, setStoreHash3] = useState([]);
  const [mod, setMod] = useState(false);
  const [valid, setValid] = useState(true);
  const [confValid, setConfValid] = useState(true);
  const {userContext} = useContext(AuthCont);
  const {t} = useTranslation();

  const store1 = hash => setStoreHash1(hash);
  const store2 = hash => setStoreHash2(hash);
  const store3 = hash => setStoreHash3(hash);
  
  const hashPassword1 = pass => sha256(pass).then(hash => store1(hash));
  const hashPassword2 = pass => sha256(pass).then(hash => store2(hash));
  const hashPassword3 = pass => sha256(pass).then(hash => store3(hash));

  const validatePass = pass => {
    let reg = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,256}$/;
    if (!reg.test(pass)) {
      return false;
    } else {
      return true;
    }
  };

  const changePass = async () => {
    if (!currentPass || !newPass || !confirmPass) {
      setPopUp(true);
      setErrorMsg('Please enter your new password');
      setMod(false);
      modal();
      return;
    }

    if (!valid || !confValid) {
      setPopUp(true);
      setErrorMsg('Please enter the password with correct format');
      setMod(false);
      modal();
      return;
    }

    if (currentPass === newPass) {
      setPopUp(true);
      setErrorMsg('New password cannot be the same as old password');
      setMod(false);
      modal();
      return;
    }

    if (newPass !== confirmPass) {
      setPopUp(true);
      setErrorMsg('New password and confirm password did not match');
      setMod(false);
      modal();
      return;
    }

    const params = {
      currentPass: storeHash1,
      confirmPass: storeHash2,
      newPass: storeHash3,
    };

    try {
      let res = await fetch(connector + '/changePass', {
        method: 'post',
        mode: 'no-cors',
        body: JSON.stringify(params),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
      if (res) {
        let responseJSON = await res.json();

        if (responseJSON?.error) {
          setPopUp(true);
          setErrorMsg(responseJSON?.msg);
          setMod(false);
        } else {
          setPopUp(true);
          setErrorMsg(responseJSON?.msg);
          setMod(true);
        }
      } else {
        setErrorMsg('Error!');
        setMod(false);
      }
    } catch (e) {
      setPopUp(true);
      setErrorMsg(e);
      setMod(false);
    }
  };

  const modal = () => {
    return (
      <Modal transparent visible={popUp} animationType="fade">
        <View style={styles.modalBackGround}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <TouchableOpacity
                onPress={() => {
                  setPopUp(false);
                  mod && navigation.navigate({name: 'Profile'});
                }}>
                <FontAwesome name="close" color={'#000'} size={25} />
              </TouchableOpacity>
            </View>
            <View style={{paddingBottom: 16}}>
              <Text style={styles.modalText}>{errorMsg}</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <View style={{paddingHorizontal: 16}}>
          {modal()}
          <Text style={styles.text}>{t('current_pass')}</Text>
          <TextInput
            style={[styles.input, isFocus === 'password' && styles.focus]}
            placeholder={t('current_pass')}
            value={currentPass}
            secureTextEntry={isCurrPasswordSecure}
            onChangeText={pass => {
              setCurrentPass(pass);
              hashPassword1(pass);
            }}
            onFocus={() => setIsFocus('password')}
            onBlur={() => setIsFocus('')}></TextInput>
          <MaterialCommunityIcons
            name={isCurrPasswordSecure ? 'eye-off' : 'eye'}
            size={28}
            color={'black'}
            style={{
              position: 'absolute',
              right: 32,
              top: 40,
            }}
            onPress={() => {
              isCurrPasswordSecure
                ? setIsCurrPasswordSecure(false)
                : setIsCurrPasswordSecure(true);
            }}
          />
          <Text style={styles.text}>{t('new_pass')}</Text>
          <TextInput
            style={[styles.input, isFocus === 'newPassword' && styles.focus]}
            placeholder={t('8chars')}
            value={newPass}
            secureTextEntry={isPasswordSecure}
            onChangeText={pass => {
              setNewPass(pass);
              hashPassword3(pass);
              setValid(validatePass(pass));
            }}
            onFocus={() => setIsFocus('newPassword')}
            onBlur={() => setIsFocus('')}></TextInput>
          {!valid && (
            <Text style={{fontSize: 12, color: 'red', marginTop: -10}}>
              {t('pass_error')}
            </Text>
          )}
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
          <Text style={styles.text}>{t('conf_pass')}</Text>
          <TextInput
            style={[styles.input, isFocus === 'confPassword' && styles.focus]}
            placeholder={t('8chars')}
            value={confirmPass}
            onChangeText={pass => {
              setConfirmPass(pass);
              hashPassword2(pass);
              setConfValid(validatePass(pass));
            }}
            onFocus={() => setIsFocus('confPassword')}
            secureTextEntry={isConfPasswordSecure}
            onBlur={() => setIsFocus('')}></TextInput>
          {!confValid && (
            <Text
              style={{
                fontSize: 12,
                color: 'red',
                marginTop: -10,
                marginBottom: 8,
              }}>
              {t('pass_error')}
            </Text>
          )}
          <MaterialCommunityIcons
            name={isConfPasswordSecure ? 'eye-off' : 'eye'}
            size={28}
            color={'black'}
            style={{
              position: 'absolute',
              right: 32,
              top: 230,
            }}
            onPress={() => {
              isConfPasswordSecure
                ? setIsConfPasswordSecure(false)
                : setIsConfPasswordSecure(true);
            }}
          />
          <View style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                changePass();
              }}>
              <Text style={styles.loginText}>{'SAVE'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    ) : (
      <View style={[styles.container, CustomDarkTheme]}>
        <View style={{paddingHorizontal: 16}}>
          {modal()}
          <Text style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>
            {t('current_pass')}
          </Text>
          <TextInput
            style={[styles.input, isFocus === 'password' && styles.focus]}
            placeholder={t('current_pass')}
            value={currentPass}
            secureTextEntry={isCurrPasswordSecure}
            onChangeText={pass => {
              setCurrentPass(pass);
              hashPassword1(pass);
            }}
            onFocus={() => setIsFocus('password')}
            onBlur={() => setIsFocus('')}></TextInput>
          <MaterialCommunityIcons
            name={isCurrPasswordSecure ? 'eye-off' : 'eye'}
            size={28}
            color={'black'}
            style={{
              position: 'absolute',
              right: 32,
              top: 40,
            }}
            onPress={() => {
              isCurrPasswordSecure
                ? setIsCurrPasswordSecure(false)
                : setIsCurrPasswordSecure(true);
            }}
          />
          <Text style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>
            {t('new_pass')}
          </Text>
          <TextInput
            style={[styles.input, isFocus === 'newPassword' && styles.focus]}
            placeholder={t('8chars')}
            value={newPass}
            secureTextEntry={isPasswordSecure}
            onChangeText={pass => {
              setNewPass(pass);
              hashPassword3(pass);
              setValid(validatePass(pass));
            }}
            onFocus={() => setIsFocus('newPassword')}
            onBlur={() => setIsFocus('')}></TextInput>
          {!valid && (
            <Text style={{fontSize: 12, color: 'red', marginTop: -10}}>
              {t('pass_error')}
            </Text>
          )}
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
          <Text style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>
            {t('conf_pass')}
          </Text>
          <TextInput
            style={[styles.input, isFocus === 'confPassword' && styles.focus]}
            placeholder={t('8chars')}
            value={confirmPass}
            onChangeText={pass => {
              setConfirmPass(pass);
              hashPassword2(pass);
              setConfValid(validatePass(pass));
            }}
            onFocus={() => setIsFocus('confPassword')}
            secureTextEntry={isConfPasswordSecure}
            onBlur={() => setIsFocus('')}></TextInput>
          {!confValid && (
            <Text
              style={{
                fontSize: 12,
                color: 'red',
                marginTop: -10,
                marginBottom: 8,
              }}>
              {t('pass_error')}
            </Text>
          )}
          <MaterialCommunityIcons
            name={isConfPasswordSecure ? 'eye-off' : 'eye'}
            size={28}
            color={'black'}
            style={{
              position: 'absolute',
              right: 32,
              top: 230,
            }}
            onPress={() => {
              isConfPasswordSecure
                ? setIsConfPasswordSecure(false)
                : setIsConfPasswordSecure(true);
            }}
          />
          <View style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                changePass();
              }}>
              <Text style={styles.loginText}>{t('save')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return getTheme();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  modalBackGround: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 30,
    borderRadius: 20,
    elevation: 20,
  },
  header: {
    width: '100%',
    height: 40,
    alignItems: 'flex-end',
  },
  modalText: {
    paddingHorizontal: 5,
    paddingTop: 3,
    color: '#000',
  },
});
