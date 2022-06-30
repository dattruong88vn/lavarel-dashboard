import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import CommissionConfigs from '../components/CommissionConfigs';

class CommissionConfigBuilder extends Component {
    render() {
        return (
            <CommissionConfigs
                commissionConfigs={this.props.commissionConfigs}
                functionServices={this.props.services} />
        )
    }
}

const mapStateToProps = state => {
    return {
        commissionConfigs: state.CommissionConfigListReducer
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        services: {
            getCommissionList: (params = {}, callback = null) => {
                dispatch(actions.apiGetCommissionConfigList(params, callback));
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommissionConfigBuilder);