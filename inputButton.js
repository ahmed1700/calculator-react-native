import React, { Component } from 'react'
import { Text, View, TouchableHighlight } from 'react-native'
import styles from "./style";
export default class InputButton extends Component {
    render() {
        return (

            <TouchableHighlight style={[styles.inputButton, this.props.highlight ? styles.inputButtonHighlight : null]}
                onPress={this.props.onPress}
                underlayColor='#193447'
            >
                <Text style={styles.inputButtonText}>{this.props.value}</Text>
            </TouchableHighlight>

        )
    }
}
