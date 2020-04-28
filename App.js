import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, FlatList, Modal, ActivityIndicator } from 'react-native';
import { AntDesign } from '@expo/vector-icons';



import Colors from './Color';
import TodoList from './components/TodoList';
import AddListModal from './components/AddTodoList';
import Fire  from './Fire';

export default class App extends React.Component {

  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true
  };

  componentDidMount() {
    firebase = new Fire((err, user) => {
      if (err) {
        console.log('something went wrong!');
      }

      firebase.getLists(lists => {
        this.setState({lists, user}, () => {
          this.setState({loading: false})
        });
      })

      this.setState({user});
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  toggleAddTodoModal() {
    this.setState({
      addTodoVisible: !this.state.addTodoVisible
    });
  }

  renderList = (list) => {
    return <TodoList list={list} updateList={this.updateList}/>
  }

  addList = list => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos:[]
    });
  }

  updateList = list => {
    // this.setState({
    //   lists: this.state.lists.map(item => {
    //     return item.id === list.id ? list : item
    //   })
    // })
    firebase.updateList(list);
  }

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color={Colors.blue}/>
        </View>
      );
    }
    return (
      <View style={styles.container}>

        <Modal 
            animationType="slide"
            visible={this.state.addTodoVisible}
            onRequestClose={() => this.toggleAddTodoModal()}
            >
          <AddListModal closeModal={() => this.toggleAddTodoModal()} addList={this.addList} />
        </Modal>

        <View style={ {flexDirection: "row"}}>
          <View style={ styles.divider} />
            <Text style={ styles.title}>
              Todo <Text style={{fontWeight: "300", color: Colors.blue}}>Lists</Text>
            </Text>
          <View style={ styles.divider} />
        </View>

        <View style={{marginVertical: 48}}>
          <TouchableOpacity style={ styles.addList}
            onPress={() => this.toggleAddTodoModal()}
            onRequestClose={() => this.toggleAddTodoModal()}
            >
            <AntDesign name="plus" size={16} color={Colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View> 

      <View style={{height: 300, paddingLeft: 10}}>
        <FlatList
          data={this.state.lists}
          keyExtractor={item => item.id.toString()}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => this.renderList(item)}
          keyboardShouldPersistTaps="handled"
        />
      </View>
    </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    backgroundColor: Colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: "center"
  },
  title: {
    fontSize: 38,
    fontWeight: "800",
    color: Colors.black,
    paddingHorizontal: 64
  },
  addList: {
    borderWidth: 2,
    borderColor: Colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: "center",
    justifyContent: "center"
  },
  add: {
    color: colors.blue,
    fontWeight: "600",
    fontSize: 14,
    marginTop: 8
  }
});
