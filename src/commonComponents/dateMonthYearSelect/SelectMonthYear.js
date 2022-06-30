import React, {Component} from 'react';

class SelectMonthYear extends Component {
    constructor(props) {
        super(props);
        this.state = {
            months: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            years: [],
            selectedYear: this.props.selectedMonth,
            selectedMonth: this.props.selectedYear
        }

    }
    componentDidMount() {
        let years = this.state.years;
        let selectedMonth = this.props.selectedMonth;
        let selectedYear = this.props.selectedYear;
        if (years.length === 0) {
            const period = 10;
            const cDate = new Date();
            selectedMonth = cDate.getMonth() + 1;
            selectedYear = cDate.getFullYear();
            for (var i = cDate.getFullYear() - period; i < cDate.getFullYear() + period; i++) {
                years.push(i);
            }
        }
        this.setState({
            ...this.state,
            years: years,
            selectedMonth: selectedMonth,
            selectedYear: selectedYear
        });
    }

    onMonthChange = (e) => {
        this.setState({...this.state, selectedMonth: e.target.value}, () => {
            this.props.onChange(this.state.selectedMonth, this.state.selectedYear);
        });
    }
    onYearChange = (e) => {
        this.setState({...this.state, selectedYear: e.target.value}, () => {
            this.props.onChange(this.state.selectedMonth, this.state.selectedYear);
        });
    }

    render() {
        return (
            <div className={'' + (this.props.className || '')}>
                <label className={'col-md-2'}>{this.props.labelText}</label>
                <div className={'col-md-3'}>
                    <select className={'form-control'} name={'month' + (this.props.monthName || '')} onChange={this.onMonthChange} value={this.state.selectedMonth}>
                        {this.state.months.map((m, k) => <option key={k} value={m}>{m}</option>)}
                    </select>
                </div>
                <div className={'col-md-3'}>
                    <select className={'form-control'} name={'year' + (this.props.yearName || '')} onChange={this.onYearChange} value={this.state.selectedYear}>
                        {this.state.years.map((y, k) => <option key={k} value={y}>{y}</option>)}
                    </select>
                </div>
            </div>);
    }

}
export default SelectMonthYear;