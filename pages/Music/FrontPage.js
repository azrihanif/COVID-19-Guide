import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import GenreContainer from '../../components/GenreContainer';
import MusicPlayer from '../../components/MusicPlayer';
import {CustomDarkTheme} from '../../components/Route';
import {AuthCont} from '../../constants/AuthContext';

export default function FrontPage({navigation}) {
  const {userContext} = useContext(AuthCont);
  const data = [
    {
      name: 'Charlie Puth',
      title: 'Light Switch',
      time: '3:13',
    },
    {
      name: 'Joji',
      title: 'Glimpse of Us',
      time: '3:53',
    },
    {
      name: 'Charlie Puth & Jong Kook',
      title: 'Left and Right',
      time: '2:34',
    },
    {
      name: 'Ed Sheeran',
      title: 'Shivers',
      time: '3:13',
    },
  ];

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <View
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          <GenreContainer
            title={'My Playlists'}
            color="#C0EEE4"
            name={'list-ul'}
            onPress={() => navigation.navigate('Playlists')}
          />
          <GenreContainer
            title={'Songs'}
            color="#FED049"
            name={'music'}
            onPress={() => navigation.navigate('Front Page')}
          />
          <GenreContainer
            title={'My Favourites'}
            color="#68B984"
            name={'heart'}
            onPress={() => navigation.navigate('Front Page')}
          />
          <GenreContainer
            title={'Genre'}
            color="#F06292"
            name={'cogs'}
            onPress={() => navigation.navigate('Playlists')}
          />
        </View>
      </LinearGradient>
    ) : (
      <View style={[styles.container, CustomDarkTheme]}>
        <View
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
          }}>
          <GenreContainer
            title={'My Playlists'}
            color="#C0EEE4"
            name={'list-ul'}
            onPress={() => navigation.navigate('Playlists')}
          />
          <GenreContainer
            title={'Songs'}
            color="#FED049"
            name={'music'}
            onPress={() => navigation.navigate('Front Page')}
          />
          <GenreContainer
            title={'My Favourites'}
            color="#68B984"
            name={'heart'}
            onPress={() => navigation.navigate('Front Page')}
          />
          <GenreContainer
            title={'Genre'}
            color="#F06292"
            name={'cogs'}
            onPress={() => navigation.navigate('Playlists')}
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
