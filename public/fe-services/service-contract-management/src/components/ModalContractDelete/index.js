import _ from "lodash";
import React, { useEffect, useState } from "react";
import { Container, Loading } from "./style";
import { deleteContractFile } from "../../api/File";
import { contractPermission } from "../../api/CheckPermission";

function ModalContactDelete(props) {
  const { selectedRow, onDeleteSuccess, actionDelete, setActionDelete } = props;
  const [unauthorized, setUnauthorized] = useState(true);
  const [loading, setLoading] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    if (!_.isEmpty(selectedRow) && actionDelete) {
      const permissionRequest = {
        contractId: selectedRow.contractId,
        actionCode: "DELETE",
      };
      setLoading(true);
      (async () => {
        try {
          const response = await contractPermission(permissionRequest);
          if (!_.isEmpty(response) && response.code == 200) {
            setUnauthorized(false);
          } else {
            setUnauthorized(true);
            setErrorMessage(response.message);
          }
          setLoading(false);
        } catch (error) {
          setErrorMessage("Lỗi hệ thống");
          setLoading(false);
        }
      })();
    }
  }, [selectedRow, actionDelete]);

  const onDelete = () => {
    const deleteRequest = {
      contractId: selectedRow.contractId,
    };
    // call api delete
    (async () => {
      setLoading(true);
      const response = await deleteContractFile(deleteRequest);
      if (response.code == 200) {
        onDeleteSuccess();
        onCloseModal();
      } else {
        setErrorMessage(response.message);
        setUnauthorized(true);
      }
      setLoading(false);
    })();
  };

  const onCloseModal = () => {
    window.$("#modal-delete").modal("hide");
    setActionDelete(false);
  };

  return (
    <Container>
      <div
        className="modal fade"
        id="modal-delete"
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
                Xóa hợp đồng
              </h4>
            </div>
            <div className="modal-body">
              {loading ? (
                <Loading>
                  <i className="fa fa-refresh fa-spin" aria-hidden="true"></i>
                </Loading>
              ) : (
                <p>
                  {unauthorized
                    ? errorMessage
                    : `Bạn có chắc bạn muốn xóa HĐ số ${selectedRow.contractCode}?`}
                </p>
              )}
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
                {!unauthorized && !loading && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => onDelete()}
                    // disabled={loading ? true : false}
                  >
                    Xóa
                  </button>
                )}
              </div>
            
          </div>
        </div>
      </div>
    </Container>
  );
}

export default ModalContactDelete;
