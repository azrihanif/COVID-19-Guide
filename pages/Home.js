import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Task from '../components/Task';
import LinearGradient from 'react-native-linear-gradient';

export default function Home() {
  const [task, setTask] = useState();
  const [taskItem, setTaskItem] = useState([]);

  const handleAdd = () => {
    let date = new Date().getDate();
    let month = new Date().getMonth();

    if (month === 0) {
      date += ' Jan';
    } else if (month === 1) {
      date += ' Feb';
    } else if (month === 2) {
      date += ' Mac';
    } else if (month === 3) {
      date += ' Apr';
    } else if (month === 4) {
      date += ' May';
    } else if (month === 5) {
      date += ' Jun';
    } else if (month === 6) {
      date += ' Jul';
    } else if (month === 7) {
      date += ' Aug';
    } else if (month === 8) {
      date += ' Sep';
    } else if (month === 9) {
      date += ' Oct';
    } else if (month === 10) {
      date += ' Nov';
    } else if (month === 11) {
      date += ' Dec';
    }

    if (task) {
      setTaskItem([{text: task, date: date}].concat(taskItem));
      setTask(null);
    } else {
      alert('Please enter a task');
    }
  };

  const completeTask = index => {
    let newItem = [...taskItem];
    newItem.splice(index, 1);
    setTaskItem(newItem);
  };

  return (
    <LinearGradient colors={['#DFF6FF', '#FFFFFF']} style={styles.container}>
      <View style={styles.taskWrapper}>
        <View style={styles.items}>
          {taskItem?.map(({text, date}, index) => (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={text} date={date} />
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.writeTaskWrapper}>
        <TextInput
          style={styles.input}
          placeholder={'Write a task'}
          value={task}
          onChangeText={text => setTask(text)}></TextInput>
        <TouchableOpacity onPress={handleAdd}>
          <View style={styles.addWrapper}>
            <Text style={styles.addText}>+</Text>
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  taskWrapper: {
    paddingTop: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  items: {
    marginTop: 16,
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
