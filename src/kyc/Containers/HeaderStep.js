import React from 'react';
import { connect } from 'react-redux';
import Header from "../ComponentsCommon/Header";
import { fetchInfoStepThunk } from "../Actions/HeaderStepActions";

const containerSection = (props) => {
    const { contentStored, functionServices, current, handleChangeTab, callback } = props;
    return (
        <Header handleChangeTab={handleChangeTab} 
        contentStored={contentStored} 
        functionServices={functionServices} 
        current={current}
        callback = {callback || null} />
    );
};

const mapStateToProps = state => {
    return {contentStored: state.HeaderStepReducer}
};

const mapDispatchToProps = dispatch => {
    return {
        functionServices : {
            onFetchInfoStep : (dealId, callback = null) => {
                dispatch(fetchInfoStepThunk(dealId, callback));
            }    
        }
    };
};



export default connect(mapStateToProps,mapDispatchToProps)(containerSection);
