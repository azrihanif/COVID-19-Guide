import React, {useState, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Accordion from '../../components/Accordian';
import {CustomDarkTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';

export default function FAQ() {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  const {userContext} = useContext(AuthCont);

  const list = [
    {
      title: 'FAQ 1',
      listItem: [
        {
          title: 'Question 1',
        },
        {
          title: 'Question 2',
        },
      ],
    },
    {
      title: 'FAQ 2',
      listItem: [
        {
          title: 'Question 1',
        },
        {
          title: 'Question 2',
        },
      ],
    },
  ];

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <View style={{paddingRight: 16, paddingLeft: 16}}>
          <Accordion
            list={list}
            handlePress={handlePress}
            expanded={expanded}
          />
        </View>
      </LinearGradient>
    ) : (
      <View style={[styles.container, CustomDarkTheme]}>
        <View style={{paddingRight: 16, paddingLeft: 16}}>
          <Accordion
            list={list}
            handlePress={handlePress}
            expanded={expanded}
          />
        </View>
      </View>
    );
  };

  return getTheme();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  musicPlayer: {
    position: 'absolute',
    width: '100%',
    bottom: -20,
  },
});
