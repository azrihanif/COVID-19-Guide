import React, {useState, useContext} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connector} from '../../constants/Connector';
import LinearGradient from 'react-native-linear-gradient';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { CustomDarkTheme } from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';
import { useTranslation } from 'react-i18next';

export default function Email({navigation, route}) {
  const [isFocus, setIsFocus] = useState('');
  const {data} = route.params;
  const [newEmail, setNewEmail] = useState('');
  const [popUp, setPopUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [flag, setFlag] = useState(false);
  const [correctEmail, setCorrectEmail] = useState(false);
  const {userContext} = useContext(AuthCont);
  const {t} = useTranslation()

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

  const changeEmail = async () => {
    if (data?.email === newEmail || !newEmail) {
      setPopUp(true);
      setErrorMsg('Please enter your new email address');
      setFlag(false);
      modal();
      return;
    }

    if (!correctEmail) {
      setPopUp(true);
      setErrorMsg('Please enter correct email address');
      setFlag(false);
      modal();
      return;
    }

    const params = {oldEmail: data?.email, newEmail: newEmail};
    try {
      let res = await fetch(connector + '/changeEmail', {
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

        if (responseJSON) {
          setPopUp(true);
          setErrorMsg(responseJSON?.msg);
          setFlag(true);
          modal();
        }
      } else {
        setErrorMsg('Error!');
        setFlag(false);
        modal();
      }
    } catch (e) {
      setPopUp(true);
      setErrorMsg(e);
      setFlag(false);
      modal();
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
                  flag &&
                    navigation.navigate({
                      name: 'Profiles',
                      params: {data: {...data, email: newEmail}},
                    });
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
          <Text style={styles.text}>{t("current_email")}</Text>
          <TextInput
            editable={false}
            style={styles.input}
            placeholder={t("current_email")}
            value={data?.email}></TextInput>
          <Text style={styles.text}>{t("new_email")}</Text>
          <TextInput
            style={[styles.input, isFocus === 'email' && styles.focus]}
            placeholder={t("new_email")}
            value={newEmail}
            maxLength={256}
            onChangeText={email => {
              setNewEmail(email);
              validateEmail(email);
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
          {!correctEmail && !!newEmail && (
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
          <View style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <TouchableOpacity style={styles.button} onPress={changeEmail}>
              <Text style={styles.loginText}>{t("save")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    ) : (
      <View style={[styles.container, CustomDarkTheme]}>
        <View style={{paddingHorizontal: 16}}>
          {modal()}
          <Text style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>{t("current_email")}</Text>
          <TextInput
            editable={false}
            style={styles.input}
            placeholder={t("current_email")}
            value={data?.email}></TextInput>
          <Text style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>{t("new_email")}</Text>
          <TextInput
            style={[styles.input, isFocus === 'email' && styles.focus]}
            placeholder={t("new_email")}
            value={newEmail}
            maxLength={256}
            onChangeText={email => {
              setNewEmail(email);
              validateEmail(email);
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
          {!correctEmail && !!newEmail && (
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
          <View style={{alignItems: 'flex-end', justifyContent: 'flex-end'}}>
            <TouchableOpacity style={styles.button} onPress={changeEmail}>
              <Text style={styles.loginText}>{t("save")}</Text>
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
