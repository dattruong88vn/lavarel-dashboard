import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';
import DocumentForm from '../components/DocumentForm';

class DocumentFormBuilder extends Component {
    componentDidMount() {
        this.props.functionServices.onFetchTypeRequest(this.props.match.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.message.type && !nextProps.redirecting) {
            setTimeout(() => {
                nextProps.functionServices.onRedirectHandler('/commission-document');
            }, 2000);
        }

        if(nextProps.passedValidation) {
            if(nextProps.match.params.id) {
                nextProps.functionServices.onUpdateDocumentRequest(nextProps.document);
            } else {
                nextProps.functionServices.onAddDocumentRequest(nextProps.document);
            }
        }
    }

    componentWillUnmount() {
        this.props.functionServices.onClearFormHandler();
    }

    handleFormSubmit = e => {
        e.preventDefault();
        this.props.functionServices.onCheckAllValidationHandler();
    }

    render() {
        const {document, documentTypes, message, validation, redirecting, functionServices} = this.props;
        const editing = this.props.match.params.id ? true : false;

        return (
            <DocumentForm 
                document={document}
                documentTypes={documentTypes}
                message={message}
                validation={validation}
                editing={editing}
                redirecting={redirecting}
                functionServices={functionServices}
                submited={this.handleFormSubmit} />   
        );
    }
}

const mapStateToProps = state => {
    const {document, documentTypes, message, validation, redirecting, passedValidation} = state.DocumentForm;
    
    return {
        document: document,
        documentTypes: documentTypes,
        message: message,
        validation: validation,
        redirecting: redirecting,
        passedValidation: passedValidation
    }
};

const mapDispatchToProps = (dispatch, props) => {
    return {
        functionServices: {
            onFetchTypeRequest: id => {
                dispatch(actions.apiGetTypeList(id));
            },
            onUpdateFileRequest: event => {
                dispatch(actions.apiUploadFile(event));
            },
            onAddDocumentRequest: data => {
                dispatch(actions.apiAddDocument(data));
            },
            onUpdateDocumentRequest: data => {
                dispatch(actions.apiUpdateDocument(data));
            },
            onChangeInputHandler: event => {
                dispatch(actions.actChangeInputForm(event));
            },
            onChangeCheckBoxHandler: event => {
                dispatch(actions.actChangeCheckBoxForm(event));
            },
            onChangeDateHandler: event => {
                dispatch(actions.actChangeDateForm(event));
            },
            onChangeSelectHandler: data => {
                dispatch(actions.actChangeSelectForm(data));
            },
            onDeleteFileHandler: data => {
                dispatch(actions.actDeleteFileForm(data));
            },
            onCheckAllValidationHandler: () => {
                dispatch(actions.actCheckAllValidation());
            },
            onClearFormHandler: () => {
                dispatch(actions.actClearForm());
            },
            onRedirectHandler: url => {
                dispatch(actions.actRedirect(url));
            }
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentFormBuilder);