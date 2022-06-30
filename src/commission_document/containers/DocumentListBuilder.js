import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import DocumentList from '../components/DocumentList';
import Pagination from '../../commonComponents/pagination/Pagination';

class DocumentBuilder extends Component {
    shouldComponentUpdate(nextProps, nextState) {
        if(nextProps.documents === this.props.documents && nextProps.filter === this.props.filter) {
            return false;
        }

        return true;
    }

    componentDidMount() {
        this.props.functionServices.onFetchDocumentListRequest(this.props.filter);
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.filter !== this.props.filter) {
            this.props.functionServices.onFetchDocumentListRequest(this.props.filter);
        }
    }

    render() {
        return (
            <div>
                <DocumentList 
                    documents={this.props.documents || []}
                    functionServices={this.props.functionServices} />
                <Pagination
                    pagination={this.props.filter.pagination}
                    onClickHandle={this.props.functionServices.onChangePaginationHandler}
                    maxPage={this.props.totalPages} />    
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        documents: state.DocumentList.documents,
        totalPages: state.DocumentList.totalPages,
        filter: state.DocumentList.filter
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        functionServices : {
            onFetchDocumentListRequest: params => {
                dispatch(actions.apiGetDocumentList(params));
            },
            onChangePaginationHandler: page => {
                dispatch(actions.actChangePagination(page));
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentBuilder);