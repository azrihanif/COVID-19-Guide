import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import {
  Image,
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  ScrollView,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {AuthCont} from '../../constants/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import {connector} from '../../constants/Connector';
import {CustomDarkTheme} from '../../components/Route';
import {useTranslation} from 'react-i18next';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';

export default function Profile({route}) {
  const navigation = useNavigation();
  const {userContext} = useContext(AuthCont);
  const [data, setData] = useState();
  const [popUp, setPopUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const {t} = useTranslation();
  const bottomSheetRef = useRef(null);
  const snapPoints = ['25%'];
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => bottomSheetRef.current?.close();
    }, []),
  );

  useEffect(() => {
    if (route?.params?.data) {
      getData();
    }
  }, [route?.params?.data]);

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
        bottomSheetRef.current?.close();
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

  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
    setSheetOpen(true);
  }, []);

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

  const change = () => {
    return (
      <View style={{padding: 16}}>
        <View style={{paddingBottom: 16}}>
          <Pressable
            style={styles.button1}
            onPress={() => {
              openLibrary('imageUpload');
            }}>
            <Text style={styles.loginText}>{t('upload_image')}</Text>
          </Pressable>
        </View>
        <View>
          <Pressable
            style={styles.button1}
            onPress={() => {
              openLibrary('openCamera');
            }}>
            <Text style={styles.loginText}>{t('open_camera')}</Text>
          </Pressable>
        </View>
      </View>
    );
  };

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.writeTaskWrapper, , {opacity: sheetOpen ? 0.5 : 1}]}>
          <ScrollView bounces={false} style={styles.scroll}>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={!!data?.profilepic ? require('../../images/profilepic/profile.jpg') : require('../../images/profilepic/default_dp.png')}
              />
            </View>
            <Text
              style={styles.sectionTitle}
              onPress={() => {
                handleSnapPress(0);
              }}>
              {t('change_photo')}
            </Text>
            <View style={{paddingTop: 16}}>
              <Text style={{paddingBottom: 10, fontFamily: 'Sans-serif'}}>
                {t('account_info')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Username', {data});
                }}>
                <View
                  style={[
                    styles.item,
                    {borderBottomRightRadius: 0, borderBottomLeftRadius: 0},
                  ]}>
                  <Feather name={'user'} size={28} color={'#030852'} />
                  <Text style={styles.text}>{t('change_username')}</Text>
                  <FontAwesome
                    style={styles.angle}
                    name={'angle-right'}
                    size={32}
                    color={'#030852'}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Phone', {data});
                }}>
                <View
                  style={[
                    styles.item,
                    {
                      marginTop: -20,
                      borderTopStartRadius: 0,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 0,
                    },
                  ]}>
                  <FontAwesome name={'phone'} size={28} color={'#030852'} />
                  <Text style={[styles.text, {marginLeft: 5}]}>
                    {t('change_number')}
                  </Text>
                  <FontAwesome
                    style={styles.angle}
                    name={'angle-right'}
                    size={32}
                    color={'#030852'}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Email', {data});
                }}>
                <View
                  style={[
                    styles.item,
                    {
                      marginTop: -20,
                      borderTopStartRadius: 0,
                      borderTopRightRadius: 0,
                    },
                  ]}>
                  <MaterialCommunityIcons
                    name={'email'}
                    size={28}
                    color={'#030852'}
                  />
                  <Text style={styles.text}>{t('change_email')}</Text>
                  <FontAwesome
                    style={styles.angle}
                    name={'angle-right'}
                    size={32}
                    color={'#030852'}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{paddingBottom: 10, fontFamily: 'Sans-serif'}}>
                {t('security')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('NewPass');
                }}>
                <View style={styles.item}>
                  <FontAwesome name={'lock'} size={32} color={'#030852'} />
                  <Text style={[styles.text, {marginLeft: 5}]}>
                    {t('change_pass')}
                  </Text>
                  <FontAwesome
                    style={styles.angle}
                    name={'angle-right'}
                    size={32}
                    color={'#030852'}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text style={{paddingBottom: 10, fontFamily: 'Sans-serif'}}>
                {t('deactivate_account')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Deactivate', {data});
                }}>
                <View style={styles.item}>
                  <FontAwesome name={'user'} size={28} color={'red'} />
                  <Text style={[styles.text, {color: 'red', marginLeft: 5}]}>
                    {t('deactivate')}
                  </Text>
                  <FontAwesome
                    style={styles.angle}
                    name={'angle-right'}
                    size={32}
                    color={'red'}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose={true}
          onClose={() => setSheetOpen(false)}>
          <BottomSheetView>{change()}</BottomSheetView>
        </BottomSheet>
      </LinearGradient>
    ) : (
      <View style={[styles.container, CustomDarkTheme]}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles.writeTaskWrapper, {opacity: sheetOpen ? 0.5 : 1}]}>
          <ScrollView bounces={false} style={styles.scroll}>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={!!data?.profilepic ? require('../../images/profilepic/profile.jpg') : require('../../images/profilepic/default_dp.png')}
              />
            </View>
            <Text
              style={[
                styles.sectionTitle,
                {color: CustomDarkTheme?.colors?.text},
              ]}
              onPress={() => {
                handleSnapPress(0);
              }}>
              {t('change_photo')}
            </Text>
            <View style={{paddingTop: 16}}>
              <Text
                style={{
                  paddingBottom: 10,
                  fontFamily: 'Sans-serif',
                  color: CustomDarkTheme?.colors?.text,
                }}>
                {t('account_info')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Username', {data});
                }}>
                <View
                  style={[
                    styles.item,
                    {borderBottomRightRadius: 0, borderBottomLeftRadius: 0},
                  ]}>
                  <Feather name={'user'} size={28} color={'#030852'} />
                  <Text style={styles.text}>{t('change_username')}</Text>
                  <FontAwesome
                    style={styles.angle}
                    name={'angle-right'}
                    size={32}
                    color={'#030852'}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Phone', {data});
                }}>
                <View
                  style={[
                    styles.item,
                    {
                      marginTop: -20,
                      borderTopStartRadius: 0,
                      borderTopRightRadius: 0,
                      borderBottomRightRadius: 0,
                      borderBottomLeftRadius: 0,
                    },
                  ]}>
                  <FontAwesome name={'phone'} size={28} color={'#030852'} />
                  <Text style={[styles.text, {marginLeft: 5}]}>
                    {t('change_number')}
                  </Text>
                  <FontAwesome
                    style={styles.angle}
                    name={'angle-right'}
                    size={32}
                    color={'#030852'}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Email', {data});
                }}>
                <View
                  style={[
                    styles.item,
                    {
                      marginTop: -20,
                      borderTopStartRadius: 0,
                      borderTopRightRadius: 0,
                    },
                  ]}>
                  <MaterialCommunityIcons
                    name={'email'}
                    size={28}
                    color={'#030852'}
                  />
                  <Text style={styles.text}>{t('change_email')}</Text>
                  <FontAwesome
                    style={styles.angle}
                    name={'angle-right'}
                    size={32}
                    color={'#030852'}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  paddingBottom: 10,
                  fontFamily: 'Sans-serif',
                  color: CustomDarkTheme?.colors?.text,
                }}>
                {t('security')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('NewPass');
                }}>
                <View style={styles.item}>
                  <FontAwesome name={'lock'} size={32} color={'#030852'} />
                  <Text style={[styles.text, {marginLeft: 5}]}>
                    {t('change_pass')}
                  </Text>
                  <FontAwesome
                    style={styles.angle}
                    name={'angle-right'}
                    size={32}
                    color={'#030852'}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View>
              <Text
                style={{
                  paddingBottom: 10,
                  fontFamily: 'Sans-serif',
                  color: CustomDarkTheme?.colors?.text,
                }}>
                {t('deactivate_account')}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('Deactivate', {data});
                }}>
                <View style={styles.item}>
                  <FontAwesome name={'user'} size={28} color={'red'} />
                  <Text style={[styles.text, {color: 'red', marginLeft: 5}]}>
                    {t('deactivate')}
                  </Text>
                  <FontAwesome
                    style={styles.angle}
                    name={'angle-right'}
                    size={32}
                    color={'red'}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose={true}
          onClose={() => setSheetOpen(false)}>
          <BottomSheetView>{change()}</BottomSheetView>
        </BottomSheet>
      </View>
    );
  };

  return getTheme();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    paddingHorizontal: 16,
  },
  imageWrapper: {
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
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

  sectionTitle: {
    paddingTop: 8,
    fontSize: 16,
    fontWeight: 'normal',
    color: 'blue',
    textAlign: 'center',
  },
  item: {
    backgroundColor: '#FFFFFF',
    opacity: 0.85,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
  text: {
    paddingLeft: 16,
    fontSize: 18,
    color: '#030852',
    fontFamily: 'sans-serif',
  },
  angle: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  items: {
    marginTop: 16,
  },
  writeTaskWrapper: {
    width: '100%',
    flexDirection: 'row',
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
  button1: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
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
