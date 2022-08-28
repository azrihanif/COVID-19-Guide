import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Accordion from '../../components/Accordian';

export default function FAQ() {
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);
  
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

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <View style={{paddingRight: 16, paddingLeft: 16}}>
        <Accordion list={list} handlePress={handlePress} expanded={expanded} />
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
