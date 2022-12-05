import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function PlaylistsContainer({title, noOfSongs, onPress}) {
  return (
    <TouchableOpacity style={[styles.item, styles.Shadow]} onPress={onPress}>
      <View style={[styles.textWrapper, {flexDirection: 'row'}]}>
        <FontAwesome name="music" color={'#030852'} size={50} />
        <View style={{paddingLeft: 16}}>
          <Text style={styles.titleText}>{title}</Text>
          <Text style={[styles.titleText, {opacity: 0.5}]}>
            {noOfSongs > 1 ? noOfSongs + ' songs' : noOfSongs + ' song'}
          </Text>
        </View>
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
    maxHeight: 100,
  },
  textWrapper: {
    width: '70%',
  },
  titleText: {
    flexDirection: 'row',
    fontWeight: 'bold',
    color: '#030852',
    fontSize: 18,
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
