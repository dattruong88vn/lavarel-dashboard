import React from 'react';
import MoneyCollectedPlanInput from './MoneyCollectedPlanInput';
import NumberFormat from 'react-number-format';

export default class MoneyCollectedPlanRow extends React.Component {
    constructor(props) {
        super(props);
    }

    /**
     * Handle event on input change
     */
    handleOnChangeInput = (e) => {
        let {
            name,
            value
        } = e.target;

        if (name === 'status') {
            value = e.target.checked;
        }

        const {
            plan
        } = this.props;

        const updatedPlan = {
            ...plan,
            [name]: value
        };

        this.props.onChange(updatedPlan);
    }

    handleCurrencyChange = (name, value) => {
        const {
            plan
        } = this.props;

        const updatedPlan = {
            ...plan,
            [name]: value
        };

        this.props.onChange(updatedPlan);
    }

    /**
     * Event on clicking remove plan
     * Remove plan having id
     */
    onRemovePlan = () => {
        const {id} = this.props.plan;
        this.props.onRemove(id);
    }

    render() {

        const {
            plan: {
                expectedDate,
                status
            }
        } = this.props;

        return (
            <div className="row commission-deal-row">
                <div className="col-sm-4">
                    <form className="form-inline">
                        <div className="form-group">
                            <span className="money-collected-plan-input-label">Số tiền</span>
                            <NumberFormat
                                decimalScale="0"
                                thousandSeparator="."
                                decimalSeparator=","
                                allowedDecimalSeparators={[]}
                                className="form-control"
                                name="collectPrice"
                                onChange={e => this.handleCurrencyChange('collectPrice', e.target.value)}
                                value={this.props.collectPrice}
                                suffix={' đ'} />

                        </div>
                    </form>
                </div>

                <MoneyCollectedPlanInput
                    type="date"
                    label="Ngày thu"
                    name="expectedDate"
                    value={expectedDate}
                    onChange={this.handleOnChangeInput}
                />

                <div className="col-sm-2">
                    <div className="checkbox">
                        <label>
                            <input
                                type="checkbox"
                                name="status"
                                checked={status}
                                onChange={this.handleOnChangeInput}
                            /> Đã thu
                        </label>
                    </div>
                </div>

                <div className="col-sm-2">
                    <button className="btn btn-sm" onClick={this.onRemovePlan}>
                        <i className="fa fa-minus text-danger"></i>
                    </button>
                </div>


            </div>
        )
    }
}