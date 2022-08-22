import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Linking,
  ScrollView,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function AdviceScreen({route}) {
  const {title, advice, adviceDate, adviceContact, adviceEmail} = route.params;

  const makeCall = async contact => {
    await Linking.openURL(`tel:${contact}`);
  };

  const emailTo = async email => {
    await Linking.openURL(
      `mailto:${email}?subject=Questions regarding ${title}`,
    );
  };

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <ScrollView bounces={false} style={styles.scroll}>
        <View style={styles.taskWrapper}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={require('../../images/profilepic/profile.jpg')}
            />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.sectionTitle}>{advice}</Text>
          <View style={styles.wrapper}>
            <Text style={styles.text}>Date: {adviceDate}</Text>
            {adviceContact && (
              <TouchableOpacity onPress={() => makeCall(`+6${adviceContact}`)}>
                <Text style={styles.text}>Phone No: {adviceContact}</Text>
              </TouchableOpacity>
            )}
            {adviceEmail && (
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => emailTo(`${adviceEmail}`)}>
                <Text style={styles.text}>Email us at: </Text>
                <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
                  {adviceEmail}
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scroll: {
    flex: 1,
  },
  taskWrapper: {
    paddingTop: 8,
    paddingBottom: 16,
    paddingHorizontal: 16,
  },
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    paddingBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 5,
  },
  title: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#000',
  },
  items: {
    marginTop: 0,
  },
  text: {
    color: '#000',
  },
  wrapper: {
    paddingTop: 16,
  },
});
