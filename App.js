import React, { Component } from 'react'
import { View, Text } from 'react-native'
import styles from "./style";
import InputButton from "./inputButton";
const inputButtons = [
  [1, 2, 3, '/'],
  [4, 5, 6, '*'],
  [7, 8, 9, '-'],
  [0, '.', '=', '+'],
  ['C', 'CE']
];

export default class App extends Component {
  constructor(props) {
    super(props);
    this.intialState = {
      previousInputValue: 0,
      selectedSymbol: null,
      inputValue: 0
    }
    this.state = this.intialState;
  }
  render() {
    return (
      <View style={styles.rootContainer}>
        <View style={styles.displayContainer}>
          <Text style={styles.displayText}>{this.state.inputValue}</Text>
        </View>
        <View style={styles.inputContainer}>
          {this._renderInputButtons()}
        </View>
      </View>
    )
  }
  _renderInputButtons2() {
    let views = [];
    for (let r = 0; r < inputButtons.length; r++) {
      let row = inputButtons[r];
      let inputRow = [];
      for (let i = 0; i < row.length; i++) {
        let input = row[i];
        inputRow.push(<InputButton
          onPress={this._onInputButtonPressed.bind(this, input)}
          value={input} key={r + '-' + i} />);
      }
      views.push(<View style={styles.inputRow} key={"row" + r}>{inputRow}</View>)
    }
    return views;
  }
  _renderInputButtons() {
    let views = inputButtons.map((row, index) => {
      let inputRow = row.map((buttonValue, columnIndex) => {
        return <InputButton
          highlight={this.state.selectedSymbol === buttonValue}
          onPress={this._onInputButtonPressed.bind(this, buttonValue)}
          value={buttonValue}
          key={'button -' + columnIndex} />
      });
      return <View style={styles.inputRow} key={"row" + index}>{inputRow}</View>
    });
    return views;
  }
  _onInputButtonPressed(input) {
    switch (typeof input) {
      case 'number': return this._handleNumberInput(input);
      default: return this._handleStringInput(input);
    }
  }
  _handleNumberInput(num) {
    let currentInputValue = (this.state.inputValue * 10) + num;
    this.setState({
      inputValue: currentInputValue
    })
  }
  _handleStringInput(str) {
    switch (str) {
      case '/':
      case '*':
      case '+':
      case '-':
        this.setState({
          selectedSymbol: str,
          previousInputValue: this.state.inputValue,
          inputValue: 0
        })
      case '=':
        let previousInputValue = this.state.previousInputValue;
        let symbol = this.state.selectedSymbol;
        let currentInputValue = this.state.inputValue;
        if (!symbol) return;
        this.setState({
          selectedSymbol: null,
          previousInputValue: 0,
          inputValue: eval(previousInputValue + symbol + currentInputValue)
        });
        break;
      case 'C':
        this.setState({ inputValue: 0 })
      case 'CE':
        break;
    }
  }
}
