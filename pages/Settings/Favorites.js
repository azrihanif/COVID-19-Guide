import React, {useContext} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CustomDarkTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';

export default function Favorites() {
  const {userContext} = useContext(AuthCont);

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <View style={{paddingHorizontal: 16}}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.item}>
              <MaterialCommunityIcons
                name={'music-note'}
                size={28}
                color={'#030852'}
              />
              <Text style={styles.text}>Music</Text>
              <FontAwesome
                style={styles.angle}
                name={'angle-right'}
                size={32}
                color={'#030852'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.secondItem}>
              <MaterialCommunityIcons
                name={'human-handsup'}
                size={28}
                color={'#030852'}
              />
              <Text style={styles.text}>Activity</Text>
              <FontAwesome
                style={styles.angle}
                name={'angle-right'}
                size={32}
                color={'#030852'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    ) : (
      <View style={[styles.container, CustomDarkTheme]}>
        <View style={{paddingHorizontal: 16}}>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.item}>
              <MaterialCommunityIcons
                name={'music-note'}
                size={28}
                color={'#030852'}
              />
              <Text style={styles.text}>Music</Text>
              <FontAwesome
                style={styles.angle}
                name={'angle-right'}
                size={32}
                color={'#030852'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {}}>
            <View style={styles.secondItem}>
              <MaterialCommunityIcons
                name={'human-handsup'}
                size={28}
                color={'#030852'}
              />
              <Text style={styles.text}>Activity</Text>
              <FontAwesome
                style={styles.angle}
                name={'angle-right'}
                size={32}
                color={'#030852'}
              />
            </View>
          </TouchableOpacity>
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
  item: {
    backgroundColor: '#FFFFFF',
    opacity: 0.85,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
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
  secondItem: {
    display: 'flex',
    borderTopStartRadius: 0,
    borderTopRightRadius: 0,
    backgroundColor: '#FFFFFF',
    opacity: 0.85,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    marginTop: -20,
  },
});
