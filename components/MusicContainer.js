import React, {useState, useContext, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AuthCont from '../constants/AuthContext';
import {connector} from '../constants/Connector';

export default function MusicContainer({
  name,
  title,
  time,
  onPress,
  musicID,
  like,
  update,
}) {
  const [playing, setPlaying] = useState();
  const {userContext} = useContext(AuthCont);

  useEffect(() => {
    if (like === 'T') {
      setPlaying(true);
    } else {
      setPlaying(false);
    }
  }, []);

  const updateLike = async (l) => {
    const {id} = userContext;

    try {
      let res = await fetch(connector + '/updateFavMusic', {
        method: 'post',
        mode: 'no-cors',
        body: JSON.stringify({
          music_id: musicID,
          user_id: id,
          like: l,
        }),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
      if (res) {
        let responseJSON = await res.json();
        if (responseJSON?.error) {
          Alert.alert('System Error', responseJSON?.msg);
        } else {
          console.log(responseJSON?.msg);
        }
      } else {
        console.log('Error!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View style={[styles.item, styles.Shadow]}>
      <TouchableOpacity>
        {playing ? (
          <FontAwesome
            name="heart"
            color="red"
            size={40}
            onPress={() => {
              updateLike('F');
              setPlaying(play => !play);
            }}
          />
        ) : (
          <FontAwesome
            name="heart"
            color={'#030852'}
            size={40}
            onPress={() => {
              updateLike('T');
              setPlaying(play => !play);
            }}
          />
        )}
      </TouchableOpacity>
      <TouchableOpacity style={styles.textWrapper} onPress={() => onPress()}>
        <Text style={[styles.titleText, {opacity: 0.5}]}>{name}</Text>
        <Text style={styles.titleText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#FFFFFF',
    opacity: 0.85,
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    maxHeight: 100,
  },
  textWrapper: {
    width: '80%',
  },
  titleText: {
    flexDirection: 'row',
    fontWeight: 'bold',
    color: '#030852',
    fontSize: 18,
    fontFamily: 'sans-serif',
    paddingBottom: 5,
  },
  Shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 3,
  },
  itemText: {
    textAlign: 'left',
    maxHeight: '70%',
  },
  iconWrapper: {
    maxWidth: '30%',
  },
  smallText: {
    fontSize: 16,
    textAlign: 'right',
    fontWeight: 'bold',
    color: '#030852',
  },
});
