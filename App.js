import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class App extends React.Component {
  state={
    pageTitle:'welcome',
    pageInfo:[
      {title:'first', data:'Changes you make will automatically reload.'},
      {title:'second', data:'Shake your phone to open the developer menu.'},
    ],
    movies:[]
  }

  updateTitle = (value) => {
    this.setState({pageTitle:value})
  }

  renderText = () => {
    return this.state.pageInfo.map((item, i) => <Text key={i} title={item.title}>{item.data}</Text> )
  }

  mockAPI = () => {
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then(response => response.json())
      .then(data=>{
        console.log(data)
        this.setState({movies:data})
      }) 
  }

  mockCallback = (dd) => {
    return dd+'demo'
  }

  mockFunction = () => {
   let demo =  this.mockCallback();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text title='first'>{this.state.pageTitle}</Text>
        {this.renderText()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
