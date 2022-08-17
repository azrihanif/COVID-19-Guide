import React, {useState} from 'react';
import {Dimensions, TextInput, StyleSheet, View} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

const deviceWidth = Dimensions.get('window').width;

export default function Searchbar({item, setItem, filterItem}) {
  const [text, setText] = useState(undefined);
  const [clicked, setClicked] = useState(false);

  const filterData = text => {
    if (text) {
      setItem(
        item?.filter(
          ({advice_title, advice}) =>
            advice_title?.toUpperCase()?.includes(text?.toUpperCase()) ||
            advice?.toUpperCase()?.includes(text?.toUpperCase()),
        ),
      );
    } else {
      setItem(filterItem);
    }
  };

  return (
    <View style={styles.container}>
      <Feather
        name="search"
        size={23}
        color="black"
        style={[styles.search, {marginLeft: 1}]}
      />
      <TextInput
        placeholder="Search"
        style={styles.formField}
        placeholderTextColor={'#888888'}
        value={text}
        onChangeText={text => {
          filterData(text);
          setText(text);
        }}
        onFocus={() => {
          setClicked(true);
        }}
      />
      {clicked && (
        <AntDesign
          name="closecircleo"
          color={'#030852'}
          size={23}
          style={styles.clear}
          onPress={() => {
            setText('');
            setItem(filterItem);
            setClicked(false);
          }}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: deviceWidth - 32,
    backgroundColor: 'white',
    borderRadius: 20,
    borderColor: '#888888',
    borderWidth: 1,
  },
  formField: {
    padding: 12,
    paddingLeft: 48,
    paddingRight: 20,

    fontSize: 18,
    height: 50,
    width: '90%',
  },
  clear: {
    position: 'absolute',
    right: 16,
    top: 12,
  },
  search: {
    position: 'absolute',
    left: 16,
    top: 12,
  },
});
