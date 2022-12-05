import React, {
  useContext,
  useEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  FlatList,
  Keyboard,
} from 'react-native';
import Activity from '../../components/Activity';
import AuthCont from '../../constants/AuthContext';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import Searchbar from '../../components/Searchbar';
import {connector} from '../../constants/Connector';
import {CustomDarkTheme} from '../../components/Route';
import {useTranslation} from 'react-i18next';
import BottomSheet, {BottomSheetView} from '@gorhom/bottom-sheet';
import AddActivity from './AddActivity';
import {useFocusEffect} from '@react-navigation/native';

export default function IndoorActivity({navigation}) {
  const [taskItem, setTaskItem] = useState([]);
  const [userActivity, setUserActivity] = useState([]);
  const [filterItem, setFilterItem] = useState([]);
  const {userContext} = useContext(AuthCont);
  const [refresh, setRefresh] = useState(false);
  const {t} = useTranslation();
  const bottomSheetRef = useRef(null);
  const snapPoints = ['50%'];
  const [sheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    getActivity();
  }, []);

  useFocusEffect(
    useCallback(() => {
      return () => bottomSheetRef.current?.close();
    }, []),
  );

  const getActivity = async () => {
    const {id} = userContext;

    if (id) {
      setRefresh(false);
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
            if (responseJSON?.msg === 'No available task') {
              setTaskItem([]);
              setFilterItem([]);
              return;
            }

            console.log(responseJSON.msg);
            setTaskItem(responseJSON?.msg?.activity);
            setUserActivity(responseJSON?.msg?.user_activity);
            setFilterItem(responseJSON?.msg?.activity);
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
        onPress={() => {
          navigation.navigate('Activity', {
            activity: item?.activity,
            picture: item?.picture,
            video_name: item?.video_name,
            video_data: item?.video_data,
          });
        }}>
        <Activity text={item?.activity} />
      </TouchableOpacity>
    </ScrollView>
  );

  const handleRefresh = () => {
    setRefresh(true);
    getActivity();
  };

  const handleSnapPress = useCallback(index => {
    bottomSheetRef.current?.snapToIndex(index);
    setSheetOpen(true);
  }, []);

  const getTheme = () => {
    return userContext?.dark_mode === 'F' ? (
      <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
        <View style={[styles.container, {opacity: sheetOpen ? 0.5 : 1}]}>
          <View style={styles.items}>
            <Searchbar
              item={taskItem}
              setItem={setTaskItem}
              filterItem={filterItem}
            />
            <Text style={[styles.text, {fontSize: 22}]}>
              {t('today_activity')} ({moment(new Date()).format('DD/MM/YYYY')})
            </Text>
            {!taskItem.includes('No available task') && (
              <FlatList
                data={taskItem}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                refreshing={refresh}
                onRefresh={handleRefresh}
              />
            )}
            {taskItem.includes('No available task') && (
              <Text
                style={[styles.text]}>
                No available task
              </Text>
            )}
          </View>
          <View style={[styles.items, {opacity: sheetOpen ? 0.4 : 1}]}>
            <Text
              style={[
                styles.text,
                {fontSize: 22},
              ]}>
              My task
            </Text>
            {!userActivity.includes('No available task') && (
              <FlatList
                data={userActivity}
                renderItem={renderItem}
                keyExtractor={(item, index) => index}
                refreshing={refresh}
                onRefresh={handleRefresh}
              />
            )}
            {userActivity.includes('No available task') && (
              <Text
                style={[styles.text]}>
                No available task
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.addWrapper}
            onPress={() => handleSnapPress(0)}>
            <Text style={styles.addText}>+</Text>
          </TouchableOpacity>
        </View>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          index={-1}
          enablePanDownToClose={true}
          onClose={() => {
            setSheetOpen(false);
            Keyboard.dismiss();
          }}>
          <BottomSheetView>
            <AddActivity getActivity={getActivity} />
          </BottomSheetView>
        </BottomSheet>
      </LinearGradient>
    ) : (
      <View style={[styles.container, {CustomDarkTheme}]}>
        <View style={[styles.items, {opacity: sheetOpen ? 0.4 : 1}]}>
          <Searchbar
            item={taskItem}
            setItem={setTaskItem}
            filterItem={filterItem}
          />
          <Text
            style={[
              styles.text,
              {color: CustomDarkTheme?.colors?.text, fontSize: 22},
            ]}>
            {t('today_activity')} ({moment(new Date()).format('DD/MM/YYYY')})
          </Text>
          {!taskItem.includes('No available task') && (
            <FlatList
              data={taskItem}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
              refreshing={refresh}
              onRefresh={handleRefresh}
            />
          )}
          {taskItem.includes('No available task') && (
            <Text style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>
              No available task
            </Text>
          )}
        </View>
        <View style={[styles.items, {opacity: sheetOpen ? 0.4 : 1}]}>
          <Text
            style={[
              styles.text,
              {color: CustomDarkTheme?.colors?.text, fontSize: 22},
            ]}>
            My task
          </Text>
          {!userActivity.includes('No available task') && (
            <FlatList
              data={userActivity}
              renderItem={renderItem}
              keyExtractor={(item, index) => index}
              refreshing={refresh}
              onRefresh={handleRefresh}
            />
          )}
          {userActivity.includes('No available task') && (
            <Text style={[styles.text, {color: CustomDarkTheme?.colors?.text}]}>
              No available task
            </Text>
          )}
        </View>

        <TouchableOpacity
          style={styles.addWrapper}
          onPress={() => handleSnapPress(0)}>
          <Text style={styles.addText}>+</Text>
        </TouchableOpacity>
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          index={-1}
          onClose={() => {
            setSheetOpen(false);
            Keyboard.dismiss();
          }}>
          <BottomSheetView>
            <AddActivity getActivity={getActivity} />
          </BottomSheetView>
        </BottomSheet>
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
