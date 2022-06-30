import React from 'react';
import PropTypes from 'prop-types';

const FileInput = props => {
    const typeList = ['word', 'excel', 'pdf'];
    const styleColor = props.validation.isShowed ? {color: 'red'} : {};
    const styleButton = props.validation.isShowed ? {background: 'red', border: '1px solid red'} : {};
    const required = props.required ? 'required' : null;
    const fileUploadList = (props.fileUploadList).map((file, fKey) => {
        const className = typeList.includes(file.type) ? `fa-file-${file.type}-o` : 'fa-file-o';
        return (
            <div key={fKey} className="form-group" style={{display: "flex", flexGrow: "grow", alignItems: "center"}}>
                <span style={{marginRight: "10px"}}>
                    <a href={file.link} target="_blank">
                        <i className={`fa ${className} fa-3x`} aria-hidden="true"></i>
                    </a>
                </span>
                <span style={{marginRight: "10px", fontWeight: "bold"}}>
                    {file.name}
                </span>
                <span onClick={() => props.deleted(fKey)}>
                    <i className="fa fa-times-circle-o fa-2x" aria-hidden="true" style={{color: "red"}}></i>
                </span>
            </div>
        );
    });

    return (
        <>
            <label className={`control-label ${required}`} style={styleColor} >{props.label}</label>
            <label 
                className="btn btn-primary btn-sm" 
                htmlFor="files" 
                style={{...styleButton, marginLeft: "20px"}}>Thêm</label>   
            <div className="row" style={{marginTop: "10px"}}>
                <input 
                    className="hidden"
                    type="file" 
                    id="files" 
                    name={props.name}
                    value=""
                    accept={props.accept}
                    onChange={props.changed} />
                <div className="col-md-10 col-xs-10">
                    {fileUploadList}
                </div>    
            </div>
        </>
    )
};

FileInput.defaultProps = {
    validation: {
        isShowed: false
    }
};

export default FileInput;