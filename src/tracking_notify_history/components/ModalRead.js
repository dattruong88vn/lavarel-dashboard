import React, { Component } from 'react';
import {connect} from "react-redux";
import {Modal} from 'react-bootstrap';

class ModalRead extends Component {
    constructor(props) {
        super(props);
        this._COLUMNS = [];
        this._TABLE_READ = null;
        this.tableRead = React.createRef();
    }

    handleCloseModal() {
        let {dispatch} = this.props;
        dispatch({type:'SET_SHOW_MODAL_READ', data: false});
    }

    componentWillMount() {
        $(this.refs.tableRead).DataTable().destroy(true);
        this._TABLE_READ = null;
        this._COLUMNS = [
            {
                data: 'name',
                name: 'Tên',
                width: '200px'
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
            },
            {
                data: 'beforeAction',
                name: 'Before action'
            },
            {
                data: 'nextAction',
                name: 'Next action'
            }
        ];
    }
    
    render() {
        let nameOfColumns = this._COLUMNS.map(column => {
            return (<th key={column.data}>{column.name ? column.name : ''}</th>);
        });
        return (
            <Modal id="modalRead" show={this.props.tracking.showModalRead} 
            onHide={() => this.handleCloseModal()} 
            onShow={()=> this.handleShowModal()}
            backdrop="static">
                <Modal.Header closeButton>
                    <Modal.Title>Danh sách đã xem</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-group">                        
                        <table ref={this.tableRead} className={"table table-bordered table-striped"}>
                            <thead>
                                <tr>{nameOfColumns}</tr>
                            </thead>
                        </table>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button id="btnCloseModalRead" className="btn btn-primary" onClick={() => this.handleCloseModal()}>Đóng</button>
                </Modal.Footer>
            </Modal>
        );
    }
    
    handleShowModal() {
        let that = this;
        that._TABLE_READ = $(this.tableRead.current)
        .DataTable({
            data: that.props.tracking.dataTableRead,
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
})(ModalRead);