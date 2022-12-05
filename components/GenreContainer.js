import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function GenreContainer({title, color, name, onPress}) {

  return (
    <TouchableOpacity style={[styles.item, styles.Shadow, {height: 200, width: '48%', backgroundColor: color}]} onPress={onPress}>
      <View style={{flexDirection: 'row', justifyContent: 'space-around', width: '100%'}}>
        <Text style={styles.titleText}>{title}</Text>
        <FontAwesome name={name} size={20} color={'#030852'} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    opacity: 0.85,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    maxHeight: 200,
  },
  textWrapper: {
    width: '70%',
  },
  titleText: {
    flexDirection: 'row',
    fontWeight: 'bold',
    color: '#030852',
    fontSize: 20,
    fontFamily: 'sans-serif',
    paddingBottom: 5,
  },
  Shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 3,
  },
  itemText: {
    textAlign: 'left',
    maxHeight: '70%',
  },
  iconWrapper: {
    maxWidth: '30%',
  },
  smallText: {
    fontSize: 16,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#030852',
  },
});
