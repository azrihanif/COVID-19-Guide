import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Text,
} from 'react-native';
import COVID_19Guide from '../../components/COVID_19Guide';
import LinearGradient from 'react-native-linear-gradient';
import Searchbar from '../../components/Searchbar';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment';
import {connector} from '../../constants/Connector';
import {AuthCont} from '../../constants/AuthContext';

export default function Home({navigation}) {
  const [taskItem, setTaskItem] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  const {userContext} = useContext(AuthCont);
  const [popUp, setPopUp] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    getInfo();
  }, []);

  const getInfo = async () => {
    const {id} = userContext;

    try {
      let res = await fetch(connector + '/getCOVIDInfo', {
        method: 'post',
        mode: 'no-cors',
        body: JSON.stringify({id: id}),
        headers: {
          Accept: 'application/json',
          'Content-type': 'application/json',
        },
      });
      if (res) {
        let responseJSON = await res.json();
        if (responseJSON?.error) {
          setPopUp(true);
          setErrorMsg(responseJSON?.msg);
          modal();
        } else {
          setTaskItem(
            responseJSON?.msg?.map(
              ({covid19_info, links, picture, title, date}, index) => ({
                text: covid19_info,
                adviceID: index,
                title: title,
                date: moment(date).format('DD/MM/YYYY'),
                links: links,
                picture: picture,
              }),
            ),
          );
          setFilterItem(
            responseJSON?.msg?.map(
              ({covid19_info, links, picture, title, date}, index) => ({
                text: covid19_info,
                adviceID: index,
                title: title,
                date: moment(date).format('DD/MM/YYYY'),
                links: links,
                picture: picture,
              }),
            ),
          );
        }
      } else {
        setErrorMsg('Error!');
        modal();
      }
    } catch (e) {
      setPopUp(true);
      setErrorMsg(e);
      modal();
    }
  };

  const modal = () => {
    return (
      <Modal transparent visible={popUp} animationType="fade">
        <View style={styles.modalBackGround}>
          <View style={styles.modalContainer}>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => setPopUp(false)}>
                <FontAwesome name="close" color={'#000'} size={25} />
              </TouchableOpacity>
            </View>
            <View style={{paddingBottom: 16}}>
              <Text style={styles.text}>{errorMsg}</Text>
            </View>
          </View>
        </View>
      </Modal>
    );
  };

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <ScrollView bounces={false} style={styles.taskWrapper}>
        <View style={styles.items}>
          <Searchbar
            item={taskItem}
            setItem={setTaskItem}
            filterItem={filterItem}
          />
          {modal()}
          {taskItem?.map(({text, adviceID, title, date, picture, links}) => (
            <TouchableOpacity
              key={adviceID}
              onPress={() => {
                navigation.navigate('COVID-19 Guide');
              }}>
              <COVID_19Guide
                text={text}
                adviceID={adviceID}
                title={title}
                date={date}
                picture={picture}
              />
            </TouchableOpacity>
          ))}
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
  taskWrapper: {
    paddingTop: 0,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 0,
  },
  writeTaskWrapper: {
    position: 'absolute',
    bottom: 16,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  input: {
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 60,
    borderColor: '#C0C0C0',
    borderWidth: 1,
    width: 250,
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#C0C0C0',
    borderWidth: 1,
  },
  addText: {},
});
