import React, { Component } from 'react'
import { StyleSheet, Modal, FlatList } from 'react-native'
import { Text, View, Container, Header, Content, Button, Item, Input, Icon, Fab, Grid, Left, Right } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';
import Note from "./Note";
import NoteForm from "./NoteForm"

export default class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentKey:"",
            notes:"",
            visibleModal: false,
        };
      }

      componentDidMount(){
        this.getNotes();
      }

      async getNotes(){
        //   await AsyncStorage.clear()
        var notesOk = await AsyncStorage.getItem('notes')
        console.log(JSON.parse(notesOk));
        
        this.setState({notes:JSON.parse(notesOk)})
        if (this.state.notes) {
            this.setState({currentKey:+this.state.notes[0].key+1})
        } else {
            this.setState({currentKey: 0})
        }
        console.log(this.state.currentKey);
        
      }

      callbackFunction = (childData) => {
        this.setState({visibleModal: childData})
        this.getNotes();
    }

    render() {
        return (
            <View style={{flex:1, backgroundColor:"#F8F8F8"}}>
                <Modal visible={this.state.visibleModal} animationType={"slide"}>
                    <NoteForm currentKey={this.state.currentKey} notes={this.state.notes} parentCallback={this.callbackFunction}/>
                </Modal>
                <View style={{flex:1}}>
                    <View style={styles.searchInput}>
                        <Item rounded style={{backgroundColor:"#FDFDFD"}}>
                            <Input placeholder='Search Note'style={{marginLeft: 5}}/>
                            <Icon active name='search' style={{marginRight: 5}}/>
                        </Item>
                    </View>
                    <FlatList contentContainerStyle={styles.noteList} numColumns={2} data={this.state.notes} renderItem={({item, index})=>(
                        <View style={styles.noteContent}>
                            <Note title={item.title} noteText={item.noteText} color={item.color}/>
                        </View>
                    )}
                    key={(item,index) => item.key}
                    keyExtractor={(item,index) => index.toString()}/>
                </View>
                    <Fab
                        position="bottomRight"
                        style={styles.fabStyle}
                        onPress={() => this.setState({ visibleModal: !this.state.visibleModal })}>
                        <View>
                            <Icon name="add" style={styles.fabIcon}/>
                        </View>
                    </Fab>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    searchInput: {
        paddingTop: 20,
        paddingRight: 20,
        paddingLeft: 20,
        paddingBottom: 10,
        
    },
    noteList: {
        padding:8, 
        width: "100%",
    },
    noteContent: {
        width:"48%",
        margin: "1%",
        
    },
    fabStyle: {
        backgroundColor: "#454545"
    },  
    fabIcon: {
        color: "#FFFFFF"
    }
})
