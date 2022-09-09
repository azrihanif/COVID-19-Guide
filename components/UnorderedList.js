import React from 'react';
import {Text, View} from 'react-native';

export const UnorderedList = ({texts, color}) => {
  return (
    <Column>
      {texts.map((t, index) => (
        <Row key={index}>
          <Column
            style={{
              alignSelf: 'flex-start',
              justifyContent: 'flex-start',
              marginRight: 12,
              transform: [{scale: 2.5}],
            }}>
            <Text
              style={{
                alignSelf: 'flex-start',
                justifyContent: 'flex-start',
                fontSize: 16,
                color: color,
                fontFamily: 'sans-serif',
              }}>
              {'\u2022'}
            </Text>
          </Column>
          <Column>
            <Text
              style={{
                fontSize: 16,
                color: color,
                fontFamily: 'sans-serif',
              }}>
              {t}
            </Text>
          </Column>
        </Row>
      ))}
    </Column>
  );
};

const Column = ({children, style}) => {
  return (
    <View style={[{display: 'flex', flexDirection: 'column'}, style]}>
      {children}
    </View>
  );
};

const Row = ({children, style}) => {
  return (
    <View style={[{display: 'flex', flexDirection: 'row'}, style]}>
      {children}
    </View>
  );
};
