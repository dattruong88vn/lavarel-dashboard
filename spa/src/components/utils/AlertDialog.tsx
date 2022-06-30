import React from 'react';


type AlertDialogProps = {
    id: string;
    message: string,
    title: string,
    onCloseAction: (item: any) => any;
    okText: string,
    item: any,
    isDisplay: boolean
}

const AlertDialog: React.FC<AlertDialogProps> = (props) => {

    const onOkHandle = () => {
        props.onCloseAction(props.item);
    };
    return (
        <> {props.isDisplay &&
            <div id={props.id} className="modal fade" role="dialog">
                <div className="modal-dialog modal-bpo">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h4 className="modal-title"><strong>{props.title}</strong></h4>
                        </div>
                        <div className="modal-body">
                            {props.message}
                        </div>
                        <div className="modal-footer">
                            <button type="button" id="create-bpo" className="btn btn-success" onClick={onOkHandle}>{props.okText}</button>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default AlertDialog;
