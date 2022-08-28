import React from 'react';
import {StyleSheet} from 'react-native';
import {List} from 'react-native-paper';

export default function Accordion({list}) {

  return (
    <List.Section>
      {list?.map(({title, icon, listItem, expanded, handlePress}, index) => (
        <List.Accordion
          key={index}
          title={title}
          left={props => !!icon && <List.Icon {...props} icon={icon} />}
          expanded={expanded}
          onPress={handlePress}>
          {listItem?.map(({title}) => (
            <List.Item title={title} />
          ))}
        </List.Accordion>
      ))}
    </List.Section>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
