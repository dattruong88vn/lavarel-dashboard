import React, { Component } from 'react';
import { connect } from 'react-redux';
import ModalCheckingPlaning from '../components/ModalCheckingPlaning';

class Section extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        // 
    }

    render() {
        return (
            <ModalCheckingPlaning/>
        );
    }
}

const ModalCheckingPlanningContainer = connect(null,null)(Section);
export default ModalCheckingPlanningContainer;