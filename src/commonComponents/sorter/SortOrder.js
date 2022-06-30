import React, {Component} from 'react';

export class HeaderSortItem {
    text = '';
    column = '';
    isSortable = false;
}

export class SortOrderBy {
    column = '';
    isAsc = true;
}

class SortOrder extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!this.props.sortBy) {
            return <i className={'fa fa-sort'}></i>;
        }
        if (this.props.sortBy.isAsc) {
            return <i className={'fa fa-sort-alpha-asc'}></i>;
        }
        return <i className={'fa fa-sort-alpha-desc'}></i>;
    }

}
export default SortOrder;