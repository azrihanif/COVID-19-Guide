import React, {useState} from 'react';
import {StyleSheet, TextInput, View, Pressable, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import DropDownPicker from 'react-native-dropdown-picker';

export default function AddActivity() {
  const [text, setText] = useState('');
  const {t} = useTranslation();
  const [isFocus, setIsFocus] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Everyday', value: 'Everyday'},
    {label: 'Once', value: 'Once'},
  ]);

  return (
    <View style={{padding: 16, height: '100%'}}>
      <Text style={styles.text}>Activity Name</Text>
      <TextInput
        style={[styles.input, isFocus === 'username' && styles.focus]}
        placeholder={'Activity Name'}
        value={text}
        onChangeText={user => setText(user)}
        onFocus={() => setIsFocus('username')}
        onBlur={() => setIsFocus('')}></TextInput>
      <Text style={styles.text}>Frequency of the activity</Text>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={[styles.input, isFocus === 'dropdown' && styles.focus]}
        placeholderStyle={{color: 'gray'}}
        placeholder={'Frequency of the activity'}
        dropDownDirection={'BOTTOM'}
        dropDownContainerStyle={{
          borderColor: 'gray',
        }}
        onOpen={() => setIsFocus("dropdown")}
        onClose={() => setIsFocus('')}
      />
      <View style={{position: 'absolute', bottom: 16, right: 16}}>
        <Pressable style={styles.button} onPress={() => {}}>
          <Text style={styles.loginText}>{'Add New Activity'}</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: '100%',
    marginBottom: 16,
  },
  focus: {
    borderColor: 'blue',
    borderWidth: 2,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: '#030852',
  },
  loginText: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: 'white',
    fontFamily: 'Sans-serif',
  },
  text: {
    fontSize: 16,
    paddingBottom: 8,
    color: '#030852',
    fontFamily: 'Sans-serif',
  },
});
