import React, {useContext, useState, useEffect} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Modal,
  Button,
  Alert,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthCont} from '../constants/AuthContext';
import {sha256} from 'react-native-sha256';
import LinearGradient from 'react-native-linear-gradient';
import {connector} from '../constants/Connector';

export default function Profile({navigation}) {
  const {userContext} = useContext(AuthCont);
  const [data, setData] = useState();
  const [visible, setVisible] = useState(false);
  const [popUp, setPopUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const {id} = userContext;
    try {
      let res = await fetch(connector + '/getProfile', {
        method: 'post',
        mode: 'no-cors',
        body: JSON.stringify({id: id}),
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
          modal();
        } else {
          setData(responseJSON?.msg);
        }
      } else {
        setErrorMsg('Error!');
        modal();
      }
    } catch (e) {
      setPopUp(true);
      setErrorMsg(e);
      modal();
    }
  };

  const upload = async form => {
    try {
      let res = await fetch(connector + '/uploadFile', {
        method: 'post',
        mode: 'no-cors',
        body: form,
        headers: {
          'Content-type': 'multipart/form-data',
        },
      });
      if (res) {
        let responseJSON = await res.json();
        console.log('responseJSON', responseJSON);
      } else {
        console.log('Error!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const openLibrary = async types => {
    const {id} = userContext;
    let options = {
      noData: true,
      mediaType: 'photo',
    };
    const result =
      types === 'imageUpload'
        ? await launchImageLibrary(options)
        : await launchCamera(options);
    if (result?.didCancel) {
      console.log('User cancelled operations');
    } else {
      if (result?.assets[0]?.uri) {
        let formData = new FormData();
        formData.append('profilepic', {
          uri: result?.assets[0]?.uri,
          type: result?.assets[0]?.type,
          name: result?.assets[0]?.fileName,
        });
        formData.append('id', id);
        upload(formData);
      }
    }
  };

  const modal = () => {
    return (
      <Modal transparent visible={popUp} animationType="fade">
        <View style={styles.modalBackGround}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setPopUp(false)}>
                <FontAwesome name="close" color={'#000'} size={25} />
              </TouchableOpacity>
            </View>
            <View style={{paddingBottom: 16}}>
              <Text style={styles.text}>{errorMsg}</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  const deleteUser = async () => {
    const {id} = userContext;
    if (id) {
      try {
        let res = await fetch(connector + '/deleteUser', {
          method: 'post',
          mode: 'no-cors',
          body: JSON.stringify({id: id}),
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
        });
        if (res) {
          let responseJSON = await res.json();
          if (responseJSON.error) {
            Alert.alert('Account Deleted', responseJSON?.msg);
          } else {
            Alert.alert('Account Deleted', responseJSON?.msg);
            navigation.navigate('Covid-19 Guide');
          }
        } else {
          console.log('Error!');
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const showConfirmDialog = () => {
    return Alert.alert(
      'Are you sure?',
      'This action will delete your account. Are you sure you want to proceed?',
      [
        {
          text: 'Yes',
          onPress: () => {
            deleteUser();
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  const changePhoto = () => {
    return (
      <Modal transparent visible={visible} animationType="fade">
        <View style={styles.modalBackGround}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setVisible(false)}>
                <FontAwesome name="close" color={'#000'} size={25} />
              </TouchableOpacity>
            </View>
            <View style={{paddingBottom: 16}}>
              <Button
                title="Upload Image"
                onPress={() => {
                  openLibrary('imageUpload');
                  setVisible(false);
                }}
              />
            </View>
            <Button
              title="Open Camera"
              onPress={() => {
                openLibrary('openCamera');
                setVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
    );
  };

  const hashPassword = pass => {
    sha256(pass).then(hash => {
      submit(hash);
    });
  };

  const submit = async hash => {
    if (data?.name && data?.username) {
      if (data?.confPass !== data?.password) {
        setErrorMsg('Confirm Password and Password did not match');
        setPopUp(true);
        modal();
        return;
      }

      const {id} = userContext;
      const sendData = {
        id: id,
        email: data?.email,
        password: hash,
        name: data?.name,
        address: data?.address,
        phone_no: data?.phone_no,
      };
      
      try {
        let res = await fetch(connector + '/updateProfile', {
          method: 'post',
          mode: 'no-cors',
          body: JSON.stringify(sendData),
          headers: {
            Accept: 'application/json',
            'Content-type': 'application/json',
          },
        });
        if (res) {
          let responseJSON = await res.json();
          setPopUp(true);
          setErrorMsg(responseJSON?.msg);
          modal();
        } else {
          setErrorMsg('Error!');
          modal();
        }
      } catch (e) {
        setPopUp(true);
        setErrorMsg(e);
        modal();
      }
    } else {
      setErrorMsg('Please fill in your profile information before submitting');
      setPopUp(true);
      modal();
    }
  };

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <ScrollView bounces={false} style={styles.scroll}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={require('../images/profilepic/profile.jpg')}
            />
          </View>
          <Text
            style={styles.sectionTitle}
            onPress={() => {
              setVisible(true);
            }}>
            Change profile photo
          </Text>
          {changePhoto()}
          {modal()}
          <View style={styles.action}>
            <FontAwesome
              style={{marginTop: 10}}
              name="user"
              color={'#000'}
              size={25}
            />
            <View
              style={{flexDirection: 'column', width: '94%', paddingLeft: 8}}>
              <Text style={styles.text}>Name</Text>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid="#C0C0C0"
                placeholder={'Name'}
                value={data?.name}
                onChangeText={text => {
                  setData(prev => ({...prev, name: text}));
                }}></TextInput>
            </View>
          </View>
          <View style={styles.action}>
            <MaterialCommunityIcons
              style={{marginTop: 10}}
              name="email"
              color={'#000'}
              size={25}
            />
            <View
              style={{flexDirection: 'column', width: '92%', paddingLeft: 5}}>
              <Text style={styles.text}>Email</Text>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid="#C0C0C0"
                placeholder={'Email'}
                value={data?.email}
                onChangeText={text => {
                  setData(prev => ({...prev, email: text}));
                }}></TextInput>
            </View>
          </View>
          <View style={styles.action}>
            <FontAwesome
              style={{marginTop: 10}}
              name="globe"
              color={'#000'}
              size={25}
            />
            <View
              style={{flexDirection: 'column', width: '93%', paddingLeft: 5}}>
              <Text style={styles.text}>Address</Text>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid="#C0C0C0"
                placeholder={'Address'}
                value={data?.address}
                onChangeText={text => {
                  setData(prev => ({...prev, address: text}));
                }}></TextInput>
            </View>
          </View>
          <View style={styles.action}>
            <Feather
              style={{marginTop: 10}}
              name="lock"
              color={'#000'}
              size={22}
            />
            <View
              style={{flexDirection: 'column', width: '93%', paddingLeft: 5}}>
              <Text style={styles.text}>Password</Text>
              <TextInput
                style={styles.textInput}
                underlineColorAndroid="#C0C0C0"
                placeholder={'Password'}
                secureTextEntry={true}
                value={data?.password}
                onChangeText={text => {
                  setData(prev => ({...prev, password: text}));
                }}></TextInput>
            </View>
          </View>
          <View style={styles.action}>
            <Feather
              style={{marginTop: 10}}
              name="lock"
              color={'#000'}
              size={22}
            />
            <View
              style={{flexDirection: 'column', width: '93%', paddingLeft: 5}}>
              <Text style={styles.text}>Confirm Password</Text>
              <TextInput
                secureTextEntry={true}
                style={styles.textInput}
                underlineColorAndroid="#C0C0C0"
                placeholder={'Confirm Password'}
                value={data?.confPass}
                onChangeText={text => {
                  setData(prev => ({...prev, confPass: text}));
                }}></TextInput>
            </View>
          </View>
          <View style={styles.action}>
            <FontAwesome
              style={{marginTop: 10}}
              name="phone"
              color={'#000'}
              size={22}
            />
            <View
              style={{flexDirection: 'column', width: '94%', paddingLeft: 8}}>
              <Text style={styles.text}>Phone</Text>
              <TextInput
                keyboardType="number-pad"
                style={styles.textInput}
                underlineColorAndroid="#C0C0C0"
                placeholder={'Phone'}
                value={data?.phone_no}
                onChangeText={text => {
                  setData(prev => ({...prev, phone_no: text}));
                }}></TextInput>
            </View>
          </View>
          <View>
            <Text
              style={styles.deleteAccount}
              onPress={() => {
                showConfirmDialog();
              }}>
              Delete My Account
            </Text>
          </View>
          <View>
            <TouchableOpacity
              style={[styles.ButtonWrapper, styles.Shadow]}
              activeOpacity={0.5}
              onPress={() => {
                if (data?.password && data?.confPass) {
                  hashPassword(data?.password);
                } else {
                  setErrorMsg('Please enter your password to update profile');
                  setPopUp(true);
                  modal();
                }
              }}>
              <Text style={styles.SubmitText}>SAVE</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scroll: {
    flex: 1,
  },
  imageWrapper: {
    paddingTop: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  deleteText: {
    paddingHorizontal: 5,
    paddingTop: 3,
    color: '#000',
    fontWeight: 'normal',
  },
  text: {
    paddingHorizontal: 5,
    paddingTop: 3,
    color: '#000',
  },
  image: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderColor: '#C0C0C0',
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
  },
  deleteAccount: {
    paddingTop: 8,
    fontSize: 16,
    fontWeight: 'normal',
    color: 'red',
    textAlign: 'center',
  },
  sectionTitle: {
    paddingTop: 8,
    fontSize: 16,
    fontWeight: 'normal',
    color: 'blue',
    textAlign: 'center',
  },
  items: {
    marginTop: 16,
  },
  writeTaskWrapper: {
    width: '100%',
    flexDirection: 'row',
    paddingLeft: 8,
    paddingRight: 8,
  },
  input: {
    paddingVertical: 8,
    borderRadius: 16,
    borderColor: '#FFF',
    borderWidth: 1,
    width: '100%',
  },
  ButtonWrapper: {
    backgroundColor: 'blue',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#000',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 30,
    marginBottom: 30,
  },
  Shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  SubmitText: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
    marginBottom: 10,
    paddingBottom: 5,
    paddingLeft: 5,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 5,
    color: '#000',
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
  buttWrap: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  button: {
    fontSize: 16,
  },
});
