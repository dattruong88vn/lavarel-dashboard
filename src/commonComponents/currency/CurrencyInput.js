import React from 'react';
import NumberFormat from 'react-number-format';

export default class CurrencyInput extends React.Component {
    constructor(props) {
        super(props);
    }
    handleOnChange = (e) => {
        this.props.onChange(this.props.name, e.target.value);
    }
    render() {
        const {
            currency,
            placeholder,
            className,
            name,
            value
        } = this.props;

        return (
            <>
                <NumberFormat decimalScale="2" decimalSeparator="." thousandSeparator="," className={className} name={name} onChange={this.handleOnChange} value={value} placeholder={placeholder} suffix={' ' + currency} />
            </>

        )
    }

}