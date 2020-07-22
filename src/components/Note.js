import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Text, View } from 'native-base'

export default class Note extends Component {
    render() {
        return (
            <View style={[styles.noteView, {backgroundColor: this.props.color}]}>
                <Text style={{fontWeight: "bold", marginBottom:8}}>{this.props.title}</Text>
                <Text numberOfLines={9}>{this.props.noteText}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    noteView: {
        flex:1,
        padding: 15,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "#CCCCCC",
    }
})
