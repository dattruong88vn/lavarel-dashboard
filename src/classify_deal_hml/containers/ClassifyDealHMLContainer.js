import React, { Component } from 'react';
import ClassifyDealHMLComponent from '../components/ClassifyDealHMLComponent';
import {connect} from 'react-redux';

class ClassifyDealHMLContainer extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <ClassifyDealHMLComponent />
        );
    }
}
export default connect(null, null)(ClassifyDealHMLContainer);