import React, {useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Switch,
} from 'react-native';
import AuthCont from '../../constants/AuthContext';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {connector} from '../constants/Connector';

export default function Settings({navigation}) {
  const {userContext} = useContext(AuthCont);
  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <ScrollView bounces={false} style={styles.taskWrapper}>
        <View>
          <Text style={{paddingBottom: 10, fontFamily: 'Sans-serif'}}>
            Content
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
            <View style={styles.item}>
              <FontAwesome name={'heart-o'} size={28} color={'#030852'} />
              <Text style={styles.text}>Favorites</Text>
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
            Preferences
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Language')}>
            <View
              style={[
                styles.item,
                {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
              ]}>
              <FontAwesome name={'globe'} size={28} color={'#030852'} />
              <Text style={styles.text}>Language</Text>
              <Text style={styles.Langtext}>English</Text>
              <FontAwesome
                style={styles.angle}
                name={'angle-right'}
                size={32}
                color={'#030852'}
              />
            </View>
          </TouchableOpacity>
          <View style={[styles.item, styles.secondItem]}>
            <Ionicons name={'moon'} size={28} color={'#030852'} />
            <Text style={styles.text}>Dark Mode</Text>
            <Switch
              trackColor={{false: '#767577', true: 'blue'}}
              thumbColor={isEnabled ? 'blue' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              style={[
                styles.angle,
                {transform: [{scaleX: 1.5}, {scaleY: 1.5}]},
              ]}
            />
          </View>
        </View>
        <View>
          <Text style={{paddingBottom: 10, fontFamily: 'Sans-serif'}}>
            Contact Us
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('FAQ')}>
            <View
              style={[
                styles.item,
                {borderBottomLeftRadius: 0, borderBottomRightRadius: 0},
              ]}>
              <Feather name={'user'} size={28} color={'#030852'} />
              <Text style={styles.text}>FAQ</Text>
              <FontAwesome
                style={styles.angle}
                name={'angle-right'}
                size={32}
                color={'#030852'}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Contact Us')}>
            <View style={[styles.item, styles.secondItem]}>
              <FontAwesome name={'phone'} size={28} color={'#030852'} />
              <Text style={styles.text}>Contact Us</Text>
              <FontAwesome
                style={styles.angle}
                name={'angle-right'}
                size={32}
                color={'#030852'}
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  taskWrapper: {
    paddingTop: 0,
    paddingHorizontal: 16,
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
  Langtext: {
    position: 'absolute',
    right: 45,
    top: 18,
    fontSize: 16,
    color: 'grey',
    fontFamily: 'sans-serif',
  },
  angle: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  secondItem: {
    display: 'flex',
    marginTop: -20,
    borderTopStartRadius: 0,
    borderTopRightRadius: 0,
  },
});
