import React, { Component, Fragment } from "react";
import Select from "react-select";
import { connect } from "react-redux";
import * as actions from "../actions";

class MatchingListComponent extends Component {
    render() {
        return (
            <Fragment>
                <Select
                    isSearchable={false}
                    options={this.props.options}
                    onChange={(e) => {this.props.onCriteriaListChange(e, {screenId: this.props.tabId, propId: this.props.propId})}}
                    value="N/A"
                    placeholder="Bổ sung tiêu chí"
                />
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        options: state.reducer.criterialOptions,
        criterialSelected: state.reducer.criterialSelected,
        tabId: state.reducer.tabId,
        propId: state.reducer.propId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onCriteriaListChange: (e, data) => {
            dispatch(actions.actOnCriteriaListChange(e, data));
        },
        getCriteriaOption: (data) => {
            dispatch(actions.actGetCriteriaOption(data));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchingListComponent);
