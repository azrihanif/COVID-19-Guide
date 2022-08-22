import React, {useContext, useEffect, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import Task from '../../components/Task';
import AuthCont from '../../constants/AuthContext';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Searchbar from '../../components/Searchbar';
import {connector} from '../../constants/Connector';

export default function Home({navigation}) {
  const [taskItem, setTaskItem] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  const {userContext} = useContext(AuthCont);

  useEffect(() => {
    getAdvice();
  }, []);

  const getAdvice = async () => {
    const {id} = userContext;

    if (id) {
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

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <ScrollView bounces={false} style={styles.taskWrapper}>
        <View style={styles.items}>
          <Searchbar
            item={taskItem}
            setItem={setTaskItem}
            filterItem={filterItem}
          />
          {taskItem?.map(
            (
              {
                advice_title,
                advice,
                advice_date,
                like_id,
                id,
                advice_contact,
                advice_email,
              },
              index,
            ) => (
              <TouchableOpacity
                key={index}
                onPress={() =>
                  navigation.navigate('Advice', {
                    title: advice_title,
                    advice: advice,
                    adviceDate: moment(advice_date).format('DD/MM/YYYY'),
                    adviceContact: advice_contact,
                    adviceEmail: advice_email,
                  })
                }>
                <Task
                  getAdvice={getAdvice}
                  text={advice}
                  adviceID={id}
                  likeID={like_id}
                  title={advice_title}
                  date={moment(advice_date).format('DD/MM/YYYY')}
                />
              </TouchableOpacity>
            ),
          )}
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
