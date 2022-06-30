import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const headers = [
    {data: 'documentId', name: 'ID'},
    {data: 'name', name: 'Tên tài liệu'},
    {data: 'transactionType', name: 'Loại giao dịch'},
    {data: 'attachedTemplate', name: 'Template đính kèm'},
    {data: 'effectiveDate', name: 'Ngày hiệu lực'},
    {data: 'status', name: 'Status'}
];

const nameOfColumns = headers.map(column => (
    <th key={column.data}>{column.name ? column.name : ''}</th>
));

const DocumentList = props => {
    const fileTypeList = ['word', 'excel', 'pdf'];
    const dataOfColumns = props.documents.map(document => 
        <tr key={document.fileId} role="row">
            <td>{document.fileId}</td>
            <td>
                <Link to={`/commission-document/detail/${document.fileId}`}>
                    {document.fileName}
                </Link>
            </td>
            <td>{document.listingTypeName}</td>
            <td>
                {document.files ? document.files.map((file, fKey) => {
                    const className = fileTypeList.includes(file.type) ? `fa-file-${file.type}-o` : 'fa-file-o';
                    return (
                        <span key={fKey} style={{marginRight: "10px"}}>
                            <a href={file.link} target="_blank">
                                <i className={`fa ${className}`} aria-hidden="true"></i>
                            </a>
                        </span>
                    );
                }
                ): null}
            </td>
            <td>{new Date(document.expectedDate).toLocaleDateString("en-GB")}</td>
            <td>{document.statusName}</td>    
        </tr>
    );

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">Danh sách tài liệu</h3>
                        <Link to="/commission-document/add">
                            <button className="btn btn-primary pull-right">Thêm</button>
                        </Link>
                    </div>
                    <div className="box-body">
                        <div className="form-group">
                            <table id="table-document" className="table table-bordered table-striped dataTable">
                                <thead>
                                    <tr>{nameOfColumns}</tr>
                                </thead>
                                <tbody>{dataOfColumns}</tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>    
    );
};

DocumentList.propTypes = {
    documents: PropTypes.arrayOf(
        PropTypes.shape({
            fileId: PropTypes.number.isRequired,
            fileName: PropTypes.string.isRequired,
            listingTypeName: PropTypes.string.isRequired,
            files: PropTypes.arrayOf(
                PropTypes.shape({
                    type: PropTypes.string.isRequired,
                    link: PropTypes.string.isRequired
                })
            ).isRequired,
            expectedDate: PropTypes.string.isRequired,
            statusName: PropTypes.string.isRequired
        })
    ).isRequired
};

export default DocumentList;