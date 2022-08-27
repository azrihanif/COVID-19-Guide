import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function Language() {
  const [isSelected, setIsSelected] = useState('english');

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <View style={{padding: 16}}>
        <TouchableOpacity onPress={() => setIsSelected('english')}>
          <View style={styles.item}>
            <Text style={styles.text}>English</Text>
            {isSelected === 'english' && (
              <FontAwesome
                style={styles.angle}
                name={'check'}
                size={28}
                color={'#030852'}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondItem}
          onPress={() => setIsSelected('BM')}>
          <View style={styles.item}>
            <Text style={styles.text}>Bahasa Melayu</Text>
            {isSelected === 'BM' && (
              <FontAwesome
                style={styles.angle}
                name={'check'}
                size={28}
                color={'#030852'}
              />
            )}
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.secondItem}
          onPress={() => setIsSelected('chinese')}>
          <View style={styles.item}>
            <Text style={styles.text}>中文</Text>
            {isSelected === 'chinese' && (
              <FontAwesome
                style={styles.angle}
                name={'check'}
                size={28}
                color={'#030852'}
              />
            )}
          </View>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  item: {
    backgroundColor: '#FFFFFF',
    opacity: 0.85,
    padding: 16,
    borderRadius: 10,
    marginBottom: 20,
    flexDirection: 'row',
  },
  angle: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  secondItem: {
    display: 'flex',
    marginTop: -20,
  },
  text: {
    paddingLeft: 8,
    fontSize: 18,
    color: '#030852',
    fontFamily: 'sans-serif',
  },
});
