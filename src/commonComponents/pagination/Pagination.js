import React, {Component} from 'react';

export class PaginationFilter {
    page = 1;
    limit = 20;
}

class Pagination extends Component {
    _period = 5;
    constructor(props) {
        super(props);
    }
    onPrevClickHandle = () => {
        if (this.props.pagination.page <= 1) {
            return;
        }
        this.props.onClickHandle(this.props.pagination.page - 1);
    };
    onNextClickHandle = () => {
        if (this.props.maxPage && this.props.pagination.page >= this.props.maxPage) {
            return;
        }
        this.props.onClickHandle(this.props.pagination.page + 1);
    };
    onClickHandle = (page) => {
        if (this.props.pagination.page <= 0 || (this.props.maxPage && this.props.pagination.page > this.props.maxPage)) {
            return;
        }
        this.props.onClickHandle(page);
    };
    canNext = () => {
        return !(this.props.maxPage && this.props.pagination.page >= this.props.maxPage);
    };
    canPrev = () => {
        return this.props.pagination.page > 1
    }
    update = () => {
        const map = {
            prevs: [],
            nexts: []
        }
        const start = this.props.pagination.page - parseInt(this._period / 2);
        for (let i = start > 0 ? start : 1; i < this.props.pagination.page; i++) {
            map.prevs.push(i);
        }
        const end = this.props.pagination.page + parseInt(this._period / 2);
        for (let i = this.props.pagination.page + 1; i <= end && i <= this.props.maxPage; i++) {
            map.nexts.push(i);
        }
        return map;
    }
    renderFirstPage = () => {
        if (this.props.pagination.page < parseInt(this._period / 2, 10) + 2) {
            return '';
        }
        let dotLink = this.props.pagination.page === parseInt(this._period / 2, 10) + 3 ? <li className="page-item" onClick={e => this.onClickHandle(2)}><a className="page-link" href="#">{2}</a></li> : <li className="page-item"><a className="page-link" href="#"><i className="fa fa-ellipsis-h"></i></a></li>;
        dotLink = this.props.pagination.page < parseInt(this._period / 2, 10) + 3 ? '' : dotLink;
        return <>
            <li className="page-item" onClick={e => this.onClickHandle(1)} >
                <a className="page-link" href="#">
                    <span aria-hidden="true">{1}</span>
                </a>
            </li>
            {dotLink}
        </>;
    }
    renderMaxPage = () => {
        if (this.props.maxPage < this.props.pagination.page + parseInt(this._period / 2, 10) + 1) {
            return '';
        }
        let dotLink = this.props.maxPage === this.props.pagination.page + parseInt(this._period / 2, 10) + 2 ? <li className="page-item" onClick={e => this.onClickHandle(this.props.maxPage - 1)}><a className="page-link" href="#">{this.props.maxPage - 1}</a></li> : <li className="page-item"><a className="page-link" href="#"><i className="fa fa-ellipsis-h"></i></a></li>;
        dotLink = this.props.maxPage < this.props.pagination.page + parseInt(this._period / 2, 10) + 2 ? '' : dotLink;
        return <>
            {dotLink}
            <li className="page-item" onClick={e => this.onClickHandle(this.props.maxPage)} >
                <a className="page-link" href="#">
                    <span aria-hidden="true">{this.props.maxPage}</span>
                </a>
            </li>
        </>;
    }
    render() {
        const {prevs, nexts} = this.update();
        if (this.props.maxPage <= 0) {
            return <></>;
        }
        return (
            <>
                <nav aria-label="Page navigation float-r" style={{float: "right"}}>
                    <ul className="pagination justify-content-end">
                        {this.canPrev() &&
                            <li className="page-item" onClick={this.onPrevClickHandle} >
                                <a className="page-link" href="#">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>}
                        {this.renderFirstPage()}
                        {prevs.map((i, k) =>
                            <li key={k} className="page-item" onClick={e => this.onClickHandle(i)} >
                                <a className="page-link" href="#">
                                    <span aria-hidden="true">{i}</span>
                                </a>
                            </li>
                        )}
                        <li className="page-item"><a className="page-link current" href="#">{this.props.pagination.page}</a></li>
                        {nexts.map((i, k) =>
                            <li key={k} className="page-item" onClick={e => this.onClickHandle(i)} >
                                <a className="page-link" href="#">
                                    <span aria-hidden="true">{i}</span>
                                </a>
                            </li>
                        )}
                        {this.renderMaxPage()}
                        {this.canNext() &&
                            <li className="page-item" onClick={this.onNextClickHandle}>
                                <a className="page-link" href="#">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>}
                    </ul>
                </nav>
                {this.props.totalItems && <div style={{float: "left"}}>Danh sách có tổng: {this.props.totalItems} tin</div>}
                <div className="clear"></div>
            </>
        );
    }
};
export default Pagination;
