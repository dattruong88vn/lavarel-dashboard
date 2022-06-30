import React, { Component } from "react";
import MatchingPanelComponent from "../components/MatchingPanelComponent";
import { connect } from "react-redux";
import * as actions from "../actions";

class MatchingPanelContainer extends Component {
    componentDidMount() {
        this.props.getCriteriaItems({ screenId: 1, propId: 1 });
        this.props.getCriteriaOption({ screenId: 1, propId: 1 });
    }

    render() {
        return (
            <MatchingPanelComponent/>
        );
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        getCriteriaOption: (data) => {
            dispatch(actions.actGetCriteriaOption(data));
        },
        getCriteriaItems: (data) => {
            dispatch(actions.actGetCriteriaItems(data));
        }
    };
};

export default connect(null, mapDispatchToProps)(MatchingPanelContainer);
