import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormMessage from './FormMessage';
import Input from '../../commonComponents/form/Input';
import CheckBoxes from '../../commonComponents/form/CheckBoxes';
import FileInput from '../../commonComponents/form/FileInput';
import CustomSelect from '../../commonComponents/form/CustomSelect';
import BtnSubmit from '../../commonComponents/form/BtnSubmit';

const statusOptions = [
    {label: 'Active', value: '1'},
    {label: 'Inactive', value: '2'}
];

const statusDefaultOption = {label: '--- Vui lòng chọn ---', value: ''};

const formatDate = date => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    date = `${yyyy}-${mm}-${dd}`;
    return date;
};

const DocumentForm = props => {
    const {document, documentTypes, message, validation, editing, redirecting, functionServices, submited} = props;

    if(redirecting) {
        return <Redirect to={redirecting} />;
    }

    const valueOfStatus = document.statusId ? statusOptions.find(option => option.value == document.statusId): statusDefaultOption;

    return (
        <div className="row">
            <div className="col-md-12">
                <div className="box box-primary">
                    <div className="box-header with-border">
                        <h3 className="box-title">
                            {editing ? 'Cập nhật tài liệu' : 'Thêm mới tài liệu'}
                        </h3>
                    </div>
                    <div className="box-body">
                        <form onSubmit={submited}>
                            <div className="row">
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <Input 
                                            name="name" 
                                            type="text"
                                            label="Tên tài liệu"
                                            required={true}
                                            value={document.fileName || ''} 
                                            validation={validation.fileName}
                                            changed={functionServices.onChangeInputHandler} />
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <CheckBoxes 
                                            label="Loại giao dịch"
                                            required={true}
                                            types={documentTypes}
                                            validation={validation.listingTypeIds}
                                            changed={functionServices.onChangeCheckBoxHandler} />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-12">
                                    <div className="form-group">
                                        <FileInput 
                                            name="files" 
                                            label="Template đính kèm"
                                            accept=".pdf, .doc, .docx, .xls, .xlsx"
                                            required={true}
                                            fileUploadList={document.files}
                                            validation={validation.files}
                                            changed={functionServices.onUpdateFileRequest} 
                                            deleted={functionServices.onDeleteFileHandler} />
                                    </div>
                                </div>
                            </div>
                            <div className="row" style={{marginTop: '10px'}}>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <Input 
                                            name="expectedDate" 
                                            type="date"
                                            label="Ngày hiệu lực"
                                            required={true}
                                            value={formatDate(new Date(document.expectedDate))}
                                            changed={functionServices.onChangeDateHandler} />    
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="form-group">
                                        <CustomSelect 
                                            name="status"
                                            label="Status"
                                            required={true}
                                            options={statusOptions}
                                            value={valueOfStatus}
                                            validation={validation.statusId}
                                            changed={functionServices.onChangeSelectHandler} />
                                    </div>
                                </div>
                            </div>
                            {message.isShowed ? <FormMessage message={message} /> : null}
                            <div className="row">
                                <div className="col-md-12 text-right">
                                    <BtnSubmit 
                                        id="submitDocumentForm" 
                                        name="Hoàn tất" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

DocumentForm.propTypes = {
    document: PropTypes.shape({
        fileName: PropTypes.string,
        expectedDate: PropTypes.number.isRequired,
        statusId: PropTypes.number,
        files: PropTypes.array.isRequired
    }).isRequired,
    documentTypes: PropTypes.array.isRequired,
    message: PropTypes.shape({
        isShowed: PropTypes.bool.isRequired,
        type: PropTypes.bool,
        content: PropTypes.string
    }).isRequired,
    redirecting: PropTypes.string,
    editing: PropTypes.bool.isRequired,
    functionServices: PropTypes.object.isRequired,
    submited: PropTypes.func.isRequired
};

export default DocumentForm;