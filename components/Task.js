import React, {useEffect, useState, useContext} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {connector} from '../constants/Connector';
import AuthCont from '../constants/AuthContext';

const Task = ({text, date, title, likeID, adviceID, getAdvice}) => {
  const [like, setLike] = useState(false);
  const [dislike, setDislike] = useState(false);
  const {userContext} = useContext(AuthCont);

  useEffect(() => {
    getData();
  }, [likeID]);

  const getData = () => {
    if (!!likeID) {
      if (likeID === 'T') {
        setLike(true);
      } else {
        setDislike(true);
      }
    }
  };

  const updateLike = async (l, d) => {
    const {id} = userContext;
    let newLike = '';

    if (l === 'T') {
      newLike = 'T';
    } else if (d === 'T') {
      newLike = 'F';
    }

    try {
      let res = await fetch(connector + '/updateLike', {
        method: 'post',
        mode: 'no-cors',
        body: JSON.stringify({advice_id: adviceID, like: newLike, user_id: id}),
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
          getAdvice();
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
      <View style={styles.itemLeft}>
        <Feather name="info" color={'#000'} size={23} />
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.itemText}>{text}</Text>
      </View>
      <View style={styles.iconWrapper}>
        <View>
          <Text style={styles.smallText}>{date}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: 16,
          }}>
          <TouchableOpacity
            onPress={() => {
              let t = '';
              if (like && !dislike) {
                setLike(false);
                setDislike(false);
              } else if (!like && dislike) {
                setLike(true);
                setDislike(false);
                t = 'T';
              } else {
                setLike(true);
                t = 'T';
              }
              updateLike(t, 'F');
            }}>
            <AntDesign
              style={{padding: 5}}
              name="like1"
              color={like ? 'blue' : '#000'}
              size={23}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              let t = '';
              if (!like && dislike) {
                setDislike(false);
                setLike(false);
              } else if (like && !dislike) {
                setDislike(true);
                setLike(false);
                t = 'T';
              } else {
                setDislike(true);
                t = 'T';
              }
              updateLike('F', t);
            }}>
            <AntDesign
              style={{padding: 5}}
              name="dislike1"
              color={dislike ? 'blue' : '#000'}
              size={23}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

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
    minHeight: 100,
  },
  itemLeft: {
    top: 8,
    left: 8,
    position: 'absolute',
  },
  textWrapper: {
    width: '70%',
    paddingTop: 16,
  },
  titleText: {
    flexDirection: 'row',
    fontWeight: 'bold',
    color: '#000',
    maxHeight: '40%',
    fontFamily: 'Sans-serif',
    color: '#030852',
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
    fontFamily: 'Sans-serif',
    color: '#030852',
  },
  iconWrapper: {
    maxWidth: '30%',
  },
  smallText: {
    fontSize: 10,
    textAlign: 'right',
    fontWeight: 'bold',
    fontFamily: 'Sans-serif',
    color: '#030852',
  },
});

export default Task;
