import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";
class MatchingItemComponent extends Component {
   
    onRemoveCriteria = (criteriaId, criteriaName) => {
        this.props.onRemoveCriteria(criteriaId, criteriaName);
    };

    onCriteriaItemChange = (itemId, value, fieldName, sub = null, i = null, valid = null) => {
        this.props.onCriteriaItemChange({itemId, value, fieldName, sub, i, valid});
    };

    onCriteriaSubItemAdd = (itemId) => {
        this.props.onCriteriaSubItemAdd({ itemId: itemId });
    };

    onCriteriaSubItemDelete = (itemId, subItemId) => {
        this.props.onCriteriaSubItemDelete({
            itemId: itemId,
            subItemId: subItemId,
        });
    };

    renderCriteriaSubItem = (item) => {
        const key = Object.keys(item);
        const value = Object.values(item)[0];

        return value.items.rowData.map((subItem, j) => {
            return (
                <div
                    key={`sub${j}`}
                    className="row"
                    style={{ paddingTop: "10px" }}
                >
                    <div className="col-xs-6">
                        {subItem.value.hasOwnProperty("number") ? (
                            <div className="input-group">
                                <span className="input-group-addon" style={{backgroundColor: "#d2d6de", width: 0}}>{value.label}</span>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={subItem.value.number}
                                    onChange={(e) => this.onCriteriaItemChange(key, e.target.value, "number", "value", j)}
                                    onBlur={(e) => this.onCriteriaItemChange(key, e.target.value, "number", "value", j, true)}
                                    style={{maxWidth: "80px"}}
                                />
                                <span className="input-group-addon" style={{backgroundColor: "#d2d6de", width: 0}}>{value.unit}</span>
                            </div>
                        ) : (
                            <div className="input-group" style={{paddingTop: "7px"}}>
                                {subItem.value.text}
                            </div>
                        )}
                    </div>
                    <div className="col-xs-1">
                        <input
                            className="form-control"
                            type="text"
                            value={subItem.score.number}
                            onChange={(e) => this.onCriteriaItemChange(key, e.target.value, "number", "score", j)}
                            onBlur={(e) => this.onCriteriaItemChange(key, e.target.value, "number", "score", j, true)}
                        />
                    </div>
                    <div className="col-xs-3">
                        {value.addMore && (
                            <>
                                <button
                                    className="btn btn-primary"
                                    onClick={() => this.onCriteriaSubItemDelete(key, j)}
                                >
                                    -
                                </button>
                                &nbsp;
                            </>
                        )}

                        {value.addMore && (
                            <button
                                className="btn btn-primary"
                                onClick={() => this.onCriteriaSubItemAdd(key)}
                            >
                                +
                            </button>
                        )}
                    </div>
                    <div className="col-xs-3"></div>
                </div>
            );
        });
    };

    renderCriteria = () => {
        return this.props.criteriaItemList.map((item, i) => {
            const key = Object.keys(item);
            const value = Object.values(item)[0];

            return (
                <div key={i} style={{
                    borderTop: "1px solid",
                    paddingTop: "10px",
                    paddingBottom: "10px"
                }}>
                    <div className="row">
                        <div className="col-xs-2">
                            <button
                                className="btn btn-primary"
                                onClick={() => this.onRemoveCriteria(key, value.name)}>
                                - 
                                </button>&nbsp;      
                            <b>{value.name}</b>
                        </div>
                        <div className="col-xs-7"></div>
                        <div className="col-xs-1">
                            <input
                                className="form-control"
                                type="text"
                                value={typeof value.weight !== "object" ? value.weight : null}
                                onChange={(e) => this.onCriteriaItemChange(key, e.target.value, "weight")}
                                onBlur={(e) => this.onCriteriaItemChange(key, e.target.value, "weight", null, null, true)}
                            />
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-xs-6">{value.defaultText}</div>
                        <div className="col-xs-1" style={{paddingLeft: "26px"}}>{value.maxScore}</div> 
                        <div className="col-xs-3">
                            {value.addMore && (
                                <button
                                    className="btn btn-primary"
                                    onClick={() => this.onCriteriaSubItemAdd(key)}>
                                    +
                                </button>
                            )}
                        </div>
                    </div>
                    {value.hasOwnProperty("items") && this.renderCriteriaSubItem(item)}
                </div>
            )    
        });
    };
    render() {
        return <Fragment>{this.renderCriteria()}</Fragment>;
    }
}

const mapStateToProps = (state) => {
    return {
        criteriaItemList: state.reducer.criteriaItemList,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getCriteriaItems: (data) => {
            dispatch(actions.actGetCriteriaItems(data));
        },
        onRemoveCriteria: (id, name) => {
            dispatch(actions.actRemoveCriteria(id, name));
        },
        onCriteriaItemChange: (data) => {
            dispatch(actions.actCriteriaItemChange(data));
        },
        onCriteriaSubItemAdd: (data) => {
            dispatch(actions.actOnCriteriaSubItemAdd(data));
        },
        onCriteriaSubItemDelete: (data) => {
            dispatch(actions.actOnCriteriaSubItemDelete(data));
        },
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(MatchingItemComponent);
