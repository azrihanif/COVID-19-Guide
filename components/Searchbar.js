import React from 'react';
import {Dimensions, TextInput, StyleSheet, View} from 'react-native';

const deviceWidth = Dimensions.get('window').width;

export default function Searchbar({item, setItem, filterItem}) {
  const filterData = text => {
    if (text) {
      setItem(
        item.filter(({advice_title, advice}) =>
          advice_title.toUpperCase().includes(text.toUpperCase()) || advice.toUpperCase().includes(text.toUpperCase())
        ),
      );
    } else {
      setItem(filterItem);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search"
        style={styles.formField}
        placeholderTextColor={'#888888'}
        onChangeText={text => filterData(text)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: deviceWidth - 32,
    zIndex: 99,
    backgroundColor: 'white',
    borderRadius: 20,
  },
  formField: {
    borderWidth: 1,
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 20,
    borderColor: '#888888',
    fontSize: 18,
    height: 50,
  },
});
