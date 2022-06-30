import React, { Component } from "react"; 
import {MultiSelectPZ,SingleSelectPZ} from './../ComponentsCommon/DropdownPZ';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
        options: [
            {
                label:"Quận 1",
                value:1,
                prefer:false
            },
            {
                label:"Quận 2",
                value:2,
                prefer:false
            },
            { 
                label:"Quận 3",
                value:3,
                prefer:false
            },
        ],
        value:[],
        options2: [
            {
                label:"Hướng 1",
                value:1,
                prefer:false
            },
            {
                label:"Hướng 2",
                value:2,
                prefer:false
            },
            { 
                label:"Hướng 3",
                value:3,
                prefer:false
            },
        ],
        value2:[]
    }
  }

  handleOnChange = (value) => {
      this.setState({...this.state,value});
  }
  handleOnChange2 = (value2) => {
    this.setState({...this.state,value2});
}

  render() {
    return (
        <div>
            <SingleSelectPZ placeholder="SingleSelect" 
            handleOnChange={this.handleOnChange} selected={this.state.value} options={this.state.options}/>
            <pre>VALUE: {JSON.stringify(this.state.value)}</pre>
            <pre>OPTIONS: {JSON.stringify(this.state.options)}</pre>
            <MultiSelectPZ placeholder="MultiSelect" 
            handleOnChange={this.handleOnChange2} selected={this.state.value2} options={this.state.options2}/>
            <pre>VALUE: {JSON.stringify(this.state.value2)}</pre>
            <pre>OPTIONS: {JSON.stringify(this.state.options2)}</pre>
        </div>);
  }
}

export default Dropdown;
