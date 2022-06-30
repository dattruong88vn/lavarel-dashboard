import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import CommissionConfigForm from '../components/CommissionConfigForm';

class CommissionConfigFormBuilder extends Component {
    render() {
        return (
            <CommissionConfigForm
                commissionConfigs={this.props.commissionConfigs}
                functionServices={this.props.services}
                match={this.props.match} />
        )
    }
}

const mapStateToProps = state => {
    return {
        commissionConfigs: state.CommissionConfigFormReducer
    };
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        services: {
            getCommissionDetail: (id, callback = null) => {
                dispatch(actions.apiGetCommissionDetail(id, callback));
            },
            saveConfigModel: (model, callback = null) => {
                dispatch(actions.apiSaveCommissionConfig(model, callback));
            },
            getCommissionFormDataUserPosition: () => {
                dispatch(actions.apiGetCommissionConfigUserPosition());
            },
            getCommissionFormDataType: () => {
                dispatch(actions.apiGetCommissionConfigDataType());
            },
            getCommissionFormDataFormularType: () => {
                dispatch(actions.apiGetCommissionConfigDataFormularType());
            },
            getCommissionFormDataFormularOperator: () => {
                dispatch(actions.apiGetCommissionConfigDataFormularOperator());
            },
            getCommissionFormDataFormularLogical: () => {
                dispatch(actions.apiGetCommissionConfigDataFormularLogical());
            },
            getCommissionFormDataFormularCurrency: () => {
                dispatch(actions.apiGetCommissionConfigDataFormularCurrency());
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CommissionConfigFormBuilder);