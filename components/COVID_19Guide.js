import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

const COVID_19Guide = ({text, date, title, picture}) => {
  return (
    <View style={[styles.item, styles.Shadow]}>
      <View style={styles.itemLeft}>
        <Feather name="info" color={'#000'} size={23} />
      </View>
      <View style={styles.textWrapper}>
        <Text numberOfLines={1} style={styles.titleText}>{title}</Text>
        <Text numberOfLines={2} style={styles.itemText}>
          {text}
        </Text>
        <Text style={styles.smallText}>{date}</Text>
        {picture && <Image style={styles.image} source={picture} />}
      </View>
    </View>
  );
};

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
    minHeight: 200,
  },
  itemLeft: {
    top: 8,
    left: 8,
    position: 'absolute',
  },
  textWrapper: {
    width: '90%',
    paddingLeft: 16,
    top: 8,
    position: 'absolute',
    left: 32,
  },
  titleText: {
    flexDirection: 'row',
    fontWeight: 'bold',
    color: '#000',
    maxHeight: '40%',
    fontSize: 16,
    fontFamily: 'Sans-serif',
    color: '#030852',
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
    maxWidth: '80%',
    paddingTop: 4,
    fontFamily: 'Sans-serif',
    color: '#030852',
  },
  iconWrapper: {
    maxWidth: '30%',
  },
  smallText: {
    fontSize: 12,
    textAlign: 'right',
    fontWeight: 'bold',
    position: 'absolute',
    right: -16,
    top: 3,
    fontFamily: 'Sans-serif',
    color: '#030852',
  },
  image: {
    marginTop: 4,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderColor: '#C0C0C0',
    width: 120,
    height: 120,
    borderRadius: 8,
  },
});

export default COVID_19Guide;
