import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function COVIDGuide({route}) {
  const {text, title, date, picture, links} = route.params;

  const goTo = async link => {
    await Linking.openURL(`https://${link}`);
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
          <Text style={styles.sectionTitle}>{text}</Text>
          <View style={styles.wrapper}>
            <Text style={styles.text}>Date: {date}</Text>
            {links && (
              <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={() => goTo(`${links}`)}>
                <Text style={styles.text}>Visit us at: </Text>
                <Text style={{color: 'blue', textDecorationLine: 'underline'}}>
                  {links}
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
