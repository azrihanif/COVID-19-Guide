import React, {useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const Activity = ({text}) => {
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  return (
    <View style={[styles.item, styles.Shadow]}>
      <View style={styles.textWrapper}>
        <View style={styles.checkBox}>
          <CheckBox
            disabled={false}
            value={toggleCheckBox}
            onValueChange={newValue => setToggleCheckBox(newValue)}
            tintColors={{true: '#3194DF', false: 'grey'}}
          />
        </View>
        <View style={{marginLeft: 36}}>
          <Text numberOfLines={2} style={styles.titleText}>{text}</Text>
        </View>
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
    marginBottom: 20,
  },
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'space-around',
    justifyContent: 'space-around',
    paddingVertical: 16,
  },
  titleText: {
    flexDirection: 'row',
    fontWeight: 'bold',
    color: '#030852',
    paddingBottom: 16,
    fontSize: 16,
  },
  checkBox: {
    position: 'absolute',
    left: 0,
    top: 16,
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
});

export default Activity;
