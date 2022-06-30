import React, { Component } from 'react';

export default class Dropdown extends Component {
    constructor(props) {
        super(props);
    }

    handleChangeDocument(obj) {
        this.props.handleChangeDocument(obj);
    }

    render() {
        let {index} = this.props;
        return (
            <select defaultValue={this.props.doc.channelTypeId} name="channelTypeId" onChange={(e) => {
                let {name,value} = e.target;
                this.handleChangeDocument({index,name,value})
            }} className="form-control">
                {this.props.chanels}
            </select>
        );
    }
}