import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
class MatchingTypeComponent extends Component {
    
    render() {
        return (
            <Fragment>
                <div className="row">
                    <div
                        onChange={(e) => {
                            this.props.getCriteriaItems({screenId: this.props.tabId, propId: e.target.value});
                            this.props.getCriteriaOption({screenId: this.props.tabId, propId: e.target.value});
                        }}
                    >
                        <div className="col-xs-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="screen"
                                    id="ccch"
                                    value="1"
                                    defaultChecked
                                /> {"   "}
                                <label className="form-check-label" htmlFor="ccch">
                                    {"      "}Chung Cư Căn Hộ
                                </label>
                            </div>
                        </div>
                        <div className="col-xs-3">
                            <div className="form-check">
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="screen"
                                    id="!ccch"
                                    value="2"
                                /> {"   "}
                                <label className="form-check-label" htmlFor="!ccch">
                                    {"      "} Khác Chung Cư Căn Hộ
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        tabId: state.reducer.tabId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCriteriaItems: (data) => {
            dispatch(actions.actGetCriteriaItems(data));
        },
        getCriteriaOption: (data) => {
            dispatch(actions.actGetCriteriaOption(data));
        },
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MatchingTypeComponent);
