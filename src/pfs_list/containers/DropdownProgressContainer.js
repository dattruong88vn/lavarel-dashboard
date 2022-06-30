import React, { Component } from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import DropdownProgress from '../components/DropdownProgress';

class DropdownProgressContainer extends Component {
    
    componentWillMount() {
        this.props.onResetDataPostDP();
    }

    componentDidMount() {
        this.props.onGetListProgressDP();
    }
    
    handleChangeSelect($feild, $option) {
        let that = this;
        let mortgageRequestId = that.props.mortgageRequestId;
        let value = {};
        value[$feild] = $option;
        let data = {};
        data[$feild] = $option.value;
        that.props.onSetDataSelectProgress(value, data);
        that.props.onSetDataPostDP({mortgageRequestId: mortgageRequestId})
        that.props.onUpdateProgress({
            mortgageRequestId: mortgageRequestId,
            progressId: data.progressId
        });
    }

    render() {
        return (
            <DropdownProgress dp={this.props.dp}
            handleChangeSelect={this.handleChangeSelect.bind(this)}
            info={this.props.info}
            />
        );
    }
}

const mapStateToProps = state => {
    return {
        dp: state.DropdownProgress
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        onGetListProgressDP: () => {
            dispatch(actions.actGetListProgressDP());
        },
        onSetDataSelectProgress: (value, data) => {
            dispatch(actions.actSetDataSelectProgress(value, data));
        },
        onUpdateProgress: (data) => {
            dispatch(actions.actUpdateProgress(data));
        },
        onSetDataPostDP: (data) => {
            dispatch(actions.actSetDataPostDP(data));
        },
        onResetDataPostDP: () => {
            dispatch(actions.actResetDataPostDP());
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(DropdownProgressContainer);