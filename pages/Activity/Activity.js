import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

export default function Activity({route}) {
  const {activity, picture, video_name, video_data} = route.params;

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <ScrollView bounces={false} style={styles.scroll}>
        <View style={styles.taskWrapper}>
          <View style={styles.imageWrapper}>
            <Image
              style={styles.image}
              source={require('../../images/profilepic/profile.jpg')}
            />
            <Text style={styles.sectionTitle}>{video_name}</Text>
          </View>
          <Text style={styles.title}>{activity}</Text>

          <View style={styles.wrapper}>
            <Text style={styles.text}>
              Date: {moment(new Date()).format('DD/MM/YYYY')}
            </Text>
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
