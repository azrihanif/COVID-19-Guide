import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import Task from '../../components/Task';
import AuthCont from '../../constants/AuthContext';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Searchbar from '../../components/Searchbar';
import {connector} from '../../constants/Connector';
import {CustomDarkTheme} from '../../components/Route';

export default function Home({navigation}) {
  const [taskItem, setTaskItem] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  const {userContext} = useContext(AuthCont);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getAdvice();
  }, []);

  const getAdvice = async () => {
    const {id} = userContext;

    if (id) {
      setRefresh(false);
      try {
        let res = await fetch(connector + '/getAdvice', {
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
            Alert.alert('System Error', responseJSON?.msg);
          } else {
            setTaskItem(responseJSON?.msg);
            setFilterItem(responseJSON?.msg);
          }
        } else {
          console.log('Error!');
        }
      } catch (e) {
        console.error(e);
      }
    }
  };

  const renderItem = ({item}) => (
    <ScrollView bounces={false}>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Advice', {
            title: item?.advice_title,
            advice: item?.advice,
            adviceDate: moment(item?.advice_date).format('DD/MM/YYYY'),
            adviceContact: item?.advice_contact,
            adviceEmail: item?.advice_email,
          })
        }>
        <Task
          getAdvice={getAdvice}
          text={item?.advice}
          adviceID={item?.id}
          likeID={item?.like_id}
          title={item?.advice_title}
          date={moment(item?.advice_date).format('DD/MM/YYYY')}
        />
      </TouchableOpacity>
    </ScrollView>
  );

  const handleRefresh = () => {
    setRefresh(true);
    getAdvice();
  };

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <View style={styles.items}>
          <Searchbar
            item={taskItem}
            setItem={setTaskItem}
            filterItem={filterItem}
          />
          <FlatList
            data={taskItem}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            refreshing={refresh}
            onRefresh={handleRefresh}
          />
        </View>
      </LinearGradient>
    ) : (
      <View
        style={[styles.container, CustomDarkTheme]}>
        <View style={styles.items}>
          <Searchbar
            item={taskItem}
            setItem={setTaskItem}
            filterItem={filterItem}
          />
          <FlatList
            data={taskItem}
            renderItem={renderItem}
            keyExtractor={(item, index) => index}
            refreshing={refresh}
            onRefresh={handleRefresh}
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 0,
    paddingHorizontal: 16,
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
