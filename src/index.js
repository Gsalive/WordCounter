import React, { Component } from 'react';
import { render } from 'react-dom';
import { compose } from 'ramda';
import 'whatwg-fetch';
import './style.css'
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';


class App extends Component {
  state = {
    text: '',
   
    wordCount: 0,
 
  }

  componentDidMount() {
    this.getText()
      .then(Text => {
        this.setState({ text:('') }, () => this.setCounts(this.state.text));
      })
      .catch(err => this.setState({ text: `Error: ${err.message}` }));
  }

  
  getText = async () => {
    
    const body = ("");
    return body;
  }

  
  removeBreaks = arr => {
    const index = arr.findIndex(el => el.match(/\r?\n|\r/g));
    
    if (index === -1) 
      return arr;
    
    const newArray = [
      ...arr.slice(0,index),
      ...arr[index].split(/\r?\n|\r/),
      ...arr.slice(index+1, arr.length)
    ];

    return this.removeBreaks(newArray);
  }


  removeEmptyElements = arr => {
    const index = arr.findIndex(el => el.trim() === '');

    if (index === -1) 
      return arr;

    arr.splice(index, 1);

    return this.removeEmptyElements(arr)
  };

  setCounts = value => {
    const trimmedValue = value.trim();
    const words = compose(this.removeEmptyElements, this.removeBreaks)(trimmedValue.split(' '));
   


    this.setState({
      text: value,
      
      wordCount: value === '' ? 0 : words.length,
      
    });
  }

  handleChange = e => this.setCounts(e.target.value);
  
  render() {
    return (
     
      <div class="text-center mx-auto my-3 form-outline w-50 text-white" >
        <style>{'body { background-color: #2C2C2D; }'}</style>
        <h3>The Word Reader</h3><br/>
        <textarea class="form-control text-white bg-dark" rows='15' onChange={this.handleChange} value={this.state.text}></textarea><br/>
        <strong >Word Count:</strong>&nbsp; &nbsp;{this.state.wordCount}<br/>
    </div>    
    );
  }
}

render(<App />, document.getElementById('root'));
