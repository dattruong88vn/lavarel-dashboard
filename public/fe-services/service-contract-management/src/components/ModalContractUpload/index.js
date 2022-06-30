import _ from "lodash";
import React, { useEffect, useRef, useState } from "react";
import { Container, FileName } from "./style";
import { updateContractFile, uploadFile } from "../../api/File";

function ModalContactUpload(props) {
  const {
    selectedRow,
    onUploadSuccess,
    actionUploadFile,
    setActionUploadFile,
  } = props;
  const [fileUploadSuccess, setFileUploadSuccess] = useState({});
  const [loading, setLoading] = useState(false);
  const noteRef = useRef(null);

  useEffect(() => {
    if (!_.isEmpty(selectedRow) && actionUploadFile) {
      const fileUploaded = {
        link: selectedRow.contractFileLink,
        fileName: selectedRow.contractFileName,
        filePath: selectedRow.contractFilePath,
      };
      noteRef.current.value = selectedRow.contractFileNote;
      setFileUploadSuccess(fileUploaded);
    }
  }, [selectedRow, actionUploadFile]);

  const getFileName = (url) => {
    if (!_.isEmpty(url)) {
      return url.slice(url.lastIndexOf("/") + 1);
    }
    return "";
  };

  const getFileExtention = (url) => {
    if (!_.isEmpty(url)) {
      return url.slice(url.lastIndexOf(".") + 1);
    }
    return "";
  };

  const onUploadFile = (e) => {
    if (!_.isEmpty(e.target.files)) {
      let file = e.target.files[0];
      setLoading(true);
      const allowFile = ["doc", "docx", "pdf"];
      if (!allowFile.includes(getFileExtention(file.name))) {
        alert("File không đúng định dạng pdf, doc, docx");
        setLoading(false);
      } else if ((file.size / 1024 / 1024).toFixed(2) > 30) {
        alert(
          "Tệp tin vượt quá 30M dung lượng cho phép, vui lòng giảm dung lượng tệp tin"
        );
        setLoading(false);
      } else {
        let formData = new FormData();
        formData.append("file", file);
        formData.append("folderPath", "document");
        (async () => {
          try {
            const responseData = await uploadFile(formData);
            if (!_.isEmpty(responseData)) {
              setFileUploadSuccess({
                ...responseData,
                fileName: getFileName(responseData.link),
              });
            }
            setLoading(false);
          } catch (error) {
            setLoading(false);
          }
        })();
      }
    }
  };

  const removeFile = () => {
    setFileUploadSuccess({});
  };

  const onUpdate = () => {
    const updateRequest = {
      contractId: selectedRow.contractId,
      contractFilePath: fileUploadSuccess.filePath || null,
      note: _.get(noteRef, "current.value", ""),
    };
    // call api update here
    (async () => {
      const response = await updateContractFile(updateRequest);
      if (response.code == 200) {
        onUploadSuccess();
      } else {
        console.log("cập nhật hợp đồng thất bại");
      }
      onCloseModal();
    })();
  };

  const onCloseModal = () => {
    window.$("#modal-upload").modal("hide");
    setActionUploadFile(false);
  };

  return (
    <Container>
      <div
        className="modal fade"
        id="modal-upload"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalUploadLabel"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => onCloseModal()}
              >
                <span aria-hidden="true">&times;</span>
              </button>
              <h4 className="modal-title" id="modalUploadLabel">
                Upload hợp đồng đã ký
              </h4>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label
                    for="note-upload-contract-file"
                    className="control-label"
                  >
                    Ghi chú
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="note-upload-contract-file"
                    ref={noteRef}
                    maxLength={256}
                  />
                </div>
                <div className="upload-form">
                  <p>Tệp đính kèm</p>
                  <label htmlFor={`input-upload-file`}>
                    <p className={"upload-text"}>Upload</p>
                  </label>
                </div>
                {loading && _.isEmpty(fileUploadSuccess.link) && (
                  <i className="fa fa-refresh fa-spin" aria-hidden="true"></i>
                )}
                {!_.isEmpty(fileUploadSuccess) &&
                  !_.isEmpty(fileUploadSuccess.link) && (
                    <FileName>
                      <a
                        href={_.get(fileUploadSuccess, "link", "")}
                        target="_blank"
                      >
                        <p className="link">
                          {_.get(fileUploadSuccess, "fileName", "")}
                        </p>
                      </a>
                      {loading ? (
                        <i
                          className="fa fa-refresh fa-spin"
                          aria-hidden="true"
                        ></i>
                      ) : (
                        <i
                          className="fa fa-times"
                          aria-hidden="true"
                          onClick={() => removeFile()}
                        ></i>
                      )}
                    </FileName>
                  )}
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-default"
                data-dismiss="modal"
                onClick={() => onCloseModal()}
              >
                Đóng
              </button>
              <button
                type="button"
                className="btn btn-primary btn-save"
                onClick={() => onUpdate()}
                disabled={loading ? true : false}
                // disabled={!_.isEmpty(fileUploadSuccess) && !_.isEmpty(fileUploadSuccess.path) ? false : true}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
        <input
          type="file"
          name="file"
          id="input-upload-file"
          accept=".doc,.docx,.pdf"
          onChange={onUploadFile}
          onClick={(e) => e.target.value = ""}
          // multiple
        />
      </div>
    </Container>
  );
}

export default ModalContactUpload;
