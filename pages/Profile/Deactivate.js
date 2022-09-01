import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function Deactivate() {
  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <View style={{padding: 16}}>
        <Text>This is Quran Player</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  musicPlayer: {
    position: 'absolute',
    width: '100%',
    bottom: -20,
  },
});
