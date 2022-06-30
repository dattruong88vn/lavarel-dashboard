import React  from 'react';
import {connect} from 'react-redux';
import * as actions from '../actions';
import Component from '../components/PfsOverviewRequest';

function ComponentContainer ({overview, functionServices}) {
    return (
        <Component
            {...{overview, functionServices} }
        />
    );
}
const mapStateToProps = state => {
    return {
        overview: state.overview
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        functionServices : {
            onFetchOverviewRequest: () => {
                dispatch(actions.apiGetOverviewRequest());
            },
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ComponentContainer);