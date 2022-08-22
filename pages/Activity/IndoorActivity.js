import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
} from 'react-native';
import Activity from '../../components/Activity';
import AuthCont from '../../constants/AuthContext';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Searchbar from '../../components/Searchbar';
import {connector} from '../../constants/Connector';

export default function IndoorActivity({navigation}) {
  const [taskItem, setTaskItem] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  const {userContext} = useContext(AuthCont);

  useEffect(() => {
    getActivity();
  }, []);

  const getActivity = async () => {
    const {id} = userContext;

    if (id) {
      try {
        let res = await fetch(connector + '/getActivity', {
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
          <Text style={styles.text}>
            Today's Activities ({moment(new Date()).format('DD/MM/YYYY')})
          </Text>
          {taskItem?.map(
            ({activity, picture, video_name, video_data}, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  navigation.navigate('Activity');
                }}>
                <Activity text={activity} />
              </TouchableOpacity>
            ),
          )}
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => {}}>
        <View style={styles.addWrapper}>
          <Text style={styles.addText}>+</Text>
        </View>
      </TouchableOpacity>
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
    backgroundColor: '#3194DF',
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#FFF',
    borderWidth: 1,
    position: 'absolute',
    right: 10,
    bottom: 10,
  },
  addText: {
    fontSize: 32,
    fontFamily: 'Sans-serif',
    color: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 4,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Sans-serif',
    color: '#030852',
    paddingBottom: 10,
  },
});
