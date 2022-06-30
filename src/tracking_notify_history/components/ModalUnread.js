import React, { Component } from 'react';
import {connect} from "react-redux";
import {Modal} from 'react-bootstrap';

class ModalUnread extends Component {
    constructor(props) {
        super(props);
        this._COLUMNS = [];
        this._TABLE_UNREAD = null;
    }

    handleCloseModal() {
        let {dispatch} = this.props;
        dispatch({type:'SET_SHOW_MODAL_UNREAD', data: false});
    }

    componentWillMount() {
        $('#tableUnread').DataTable().destroy(true);
        this._TABLE_UNREAD = null;
        this._COLUMNS = [
            {
                data: 'name',
                name: 'Tên'
            },
            {
                data: 'phone',
                name: 'Sđt'
            },
            {
                data: 'email',
                name: 'Email'
            },
            {
                data: 'userTypeName',
                name: 'Loại user'
            }
        ];
    }
    
    render() {
        let nameOfColumns = this._COLUMNS.map(column => {
            return (<th key={column.data}>{column.name ? column.name : ''}</th>);
        });
        return (
            <Modal id="modalUnread" 
            show={this.props.tracking.showModalUnread} 
            onHide={() => this.handleCloseModal()} 
            onShow={()=> this.handleShowModal()}
            backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách chưa xem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">
                        <table id={"tableUnread"} className={"table table-bordered table-striped dataTable"}>
                            <thead>
                                <tr>{nameOfColumns}</tr>
                            </thead>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button id="btnCloseModalUnread" className="btn btn-primary" onClick={() => this.handleCloseModal()}>Đóng</button>
                </Modal.Footer>
            </Modal>
        );
    }

    handleShowModal() {
        let that = this;
        that._TABLE_UNREAD = $('#tableUnread')
        .DataTable({
            data: that.props.tracking.dataTableUnread,
            paging: true,
            searching: false,
            ordering: false,
            lengthChange: false,
            pageLength: 5,
            bInfo: false,
            language: DatatableHelper.languages.vn,
            columns: that._COLUMNS
        });
    }
}

export default connect(function (state) {
    return {
        tracking : state.TrackingNotify
    }
})(ModalUnread);