import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View, Header, Left, Button, Icon, Right, Form, Textarea, Content, Item, Input, Fab } from 'native-base'
import AsyncStorage from '@react-native-community/async-storage';

export default class NoteForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
          notes: "",
          active: false,
          key:"",
          title:"",
          noteText:"",
          date:"",
          color:"#FDFDFD",
        };
      }

    componentDidMount(){
        this.setState({notes:this.props.notes, key:this.props.currentKey})
        console.log(this.props.currentKey);
    }

    async addNote(){
        
        if (this.state.noteText != "") {
            var newNote = {
                key:this.state.key,
                title:this.state.title,
                noteText:this.state.noteText,
                date: new Date(),
                color:this.state.color,
            }
            var notesY = this.state.notes
            if (notesY != null) {
                notesY.push(newNote)
            } else {
                notesY = [newNote]
            }
            notesY.sort(function(a,b){
                return b.key - a.key
            })
            this.setState({notes:notesY})
            
            await AsyncStorage.setItem('notes',JSON.stringify(notesY));
        }
        this.closeModal()
    }

    closeModal(){
        this.props.parentCallback(false);
    }

    render() {
        return (
            <View style={[styles.viewForm, {backgroundColor:this.state.color}]}>
                <Item transparent style={{borderBottomWidth:0.5, borderBottomColor: "#CCCCCC", height:65}}>
                    <Left>
                        <Button transparent onPress={() =>  {this.addNote()}}>
                            <Icon name="arrow-back" style={{color:"black"}}/>
                        </Button>
                    </Left>
                    <Right>
                        <Button transparent>
                            <Icon name="trash" style={{color:"black"}}/>
                        </Button>
                    </Right>
                </Item>
                <View style={{flex:1}}>
                    <Content style={{flex:1, paddingTop: 20, paddingLeft:30, paddingRight:30}}>
                            <Textarea placeholder='Title' style={{fontSize:22, fontWeight: "bold"}} maxLength={60} rowSpan={3} onChangeText={title=>{this.setState({title:title})}}/>
                            <Textarea rowSpan={100} maxLength={1000} placeholder="Note" style={{fontSize:20}} onChangeText={noteText=>{this.setState({noteText:noteText})}}/>
                    </Content>
                </View>
                <View style={{height:45, borderTopWidth:0.5, borderTopColor: "#CCCCCC", padding: 20, justifyContent:"center", alignItems:"center"}}>
                    <Text style={{fontSize:15, color:"#888888"}}>Date</Text>
                </View>
                <Fab
                    active={this.state.active}
                    direction="up"
                    containerStyle={{ }}
                    style={[{backgroundColor: this.state.color}]}
                    position="bottomRight"
                    onPress={() => this.setState({ active: !this.state.active })}>
                    <Icon name="color-filter" style={{color:"#888888"}}/>
                    <Button style={{ backgroundColor: '#fAfAfA' }} onPress={() => this.setState({ color: "#FDFDFD", active: !this.state.active })}>
                        
                    </Button>
                    <Button style={{ backgroundColor: '#fffcc4' }} onPress={() => this.setState({ color: "#fffcc4", active: !this.state.active })}>
                        
                    </Button>
                    <Button style={{ backgroundColor: '#f2d3d3' }} onPress={() => this.setState({ color: "#f2d3d3", active: !this.state.active })}>
                        
                    </Button>
                    <Button style={{ backgroundColor: '#d7fcd4' }} onPress={() => this.setState({ color: "#d7fcd4", active: !this.state.active })}>
                        
                    </Button>
                    <Button style={{ backgroundColor: '#d0f4f5' }} onPress={() => this.setState({ color: "#d0f4f5", active: !this.state.active })}>
                        
                    </Button>
                    <Button style={{ backgroundColor: '#e9d3f5' }} onPress={() => this.setState({ color: "#e9d3f5", active: !this.state.active })}>
                        
                    </Button>
                </Fab>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    viewForm: {
        flex:1,
    }
})
