import React from 'react';


type ConfirmDialogProps = {
    message: string;
    onOkAction: (item: any) => any;
    onCancelAction: (item: any) => any;
    okText?: string,
    cancelText?: string,
    title: string,
    item: any,
    isDisplay: boolean,
    id: string
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = (props) => {
    const onCancelHandle = () => {
        props.onCancelAction(props.item);
    }
    const onOkHandle = () => {
        props.onOkAction(props.item);
    }
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
                            <button type="button" className="btn btn-second" data-dismiss="modal" onClick={onCancelHandle}>{props.okText}</button>
                            <button type="button" id="create-bpo" className="btn btn-success" onClick={onOkHandle}>{props.okText}</button>
                        </div>
                    </div>
                </div>
            </div>}
        </>
    );
};

export default ConfirmDialog;
