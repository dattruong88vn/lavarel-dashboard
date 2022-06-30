import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import SortOrder from '../../commonComponents/sorter/SortOrder';

class ComissionConfigList extends Component {
    constructor(props) {
        super(props);
    }
    isDisplay = (column) => {
        return !!this.props.headers.find(item => item.column === column);
    };

    render() { 
        return (
            <table id="table-commision-config" className="table table-bordered table-striped dataTable">
                <thead>
                    <tr>
                        {(this.props.headers || []).map((item, key) => <th key={key}>{item.isSortable ? <>{item.text} <Link to={'#'} onClick={(e) => this.props.onHeaderSortIconClick(item.column)}><SortOrder sortBy={this.props.filter.sortBy.find(itemSort => itemSort.column === item.column)} /></Link></> : item.text}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {this.props.list.map((item, key) => (
                        <tr key={key}>
                            {this.isDisplay('commissionName') && <td><Link to={`/commission-config/detail/${item.commissionId}`}>{item.commissionName}</Link></td>}
                            {this.isDisplay('positionName') && <td>{item.positionName}</td>}
                            {this.isDisplay('name') && <td>{item.name}</td>}
                            {this.isDisplay('period') && <td>{item.period}</td>}
                        </tr>

                    ))}
                </tbody>
            </table>
        )
    }
};

export default ComissionConfigList;
