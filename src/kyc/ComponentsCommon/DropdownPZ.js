import React, { Component } from "react"; 
import {MultiSelect} from 'react-selectize';
import 'react-selectize/themes/index.css';
import cloneDeep from 'lodash.clonedeep';

export class MultiSelectPZ extends Component {
  constructor(props) {
    super(props);
    this.state = {
        className: this.props.className ? this.props.className : null,
        style: this.props.style ? this.props.style : {},
        selected: cloneDeep(this.props.selected),
        options: cloneDeep(this.props.options)
    };
  }

  componentWillReceiveProps(nextProps){
      if(JSON.stringify(nextProps.selected) != JSON.stringify(this.state.selected)){
        this.setState({selected:nextProps.selected});
      }
      if(JSON.stringify(nextProps.options) != JSON.stringify(this.state.options)){
        this.setState({options:nextProps.options});
      }
  }

  onClickPrefer = (data) => {
    this.props.handleOnChange(
        this.state.selected.map((item) => {
            item.prefer = false;
            if(item.value == data.value){
                item.prefer = true;
            }
            return item;
        })
    );
  }

  removeItem = (item) => {
    let _filter = this.state.selected.filter(function(obj){
        return obj.value !== item.value;
    })
    this.props.handleOnChange(cloneDeep(_filter));
  }

  render() {
    return (
            <MultiSelect
                style = {this.state.style}
                className = {this.state.className}
                placeholder = {this.props.placeholder}
                options = {this.state.options}
                values = {this.state.selected}
                onValuesChange = { value => this.props.handleOnChange(cloneDeep(value))}
                renderValue = {(item) => {
                    return (<div className="simple-value">
                                <a onClick={() => {this.onClickPrefer(item)}} href={void(0)}>
                                    <i style={item.prefer  ? {color:"#FFAB06"} : {}} className="fa fa-star"></i>
                                </a> {item.label} <a style={{padding:"2px"}} onClick = {() => {this.removeItem(item)}} href={void(0)}>x</a>
                            </div>)
                }}
            />)
  }
}

export class SingleSelectPZ extends MultiSelectPZ {
  
    onClickPrefer = (data) => {
      this.props.handleOnChange(
          this.state.selected.map((item) => {
              if(item.value == data.value){
                  item.prefer = !item.prefer;
              }
              return item;
          })
      );
    }
  
    render() {
      return (
              <MultiSelect
                  style = {this.state.style}
                  className = {this.state.className}
                  maxValues = {1}
                  placeholder = {this.props.placeholder}
                  options = {this.state.options}
                  values = {this.state.selected}
                  onValuesChange = { value => this.props.handleOnChange(value)}
                  renderValue = {(item) => {
                      return (<div className="simple-value">
                                  <a onClick={() => {this.onClickPrefer(item)}} href={void(0)}>
                                      <i style={item.prefer  ? {color:"#FFAB06"} : {}} className="fa fa-star"></i>
                                  </a> {item.label}
                              </div>)
                  }}
              />)
    }
  }
