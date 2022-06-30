import React, { FC, memo, useEffect, useState } from "react";
import "./BAEvaluateBPO.scss";
import _ from "lodash";
import { BAAssigned } from 'model';
import { ControlLabel, FormControl, FormGroup, HelpBlock} from "react-bootstrap";
import { Title } from "index";

type BAEvaluateBPOProps = {
    onChange: (comment: string, deleteStatus: boolean, userId: number) => void;
    baEvaluaBPO: BAAssigned;
    isRequire: boolean;
    isReloadPopup: boolean;
};

const BAEvaluateBPO: FC<BAEvaluateBPOProps> = (props) => {
    const [baInformation, setBaInformation] = useState<BAAssigned>(
        { 
            userId: 0,
            name: '',
            grade: null,
            isActive: false,
            isRequire: false
        }
    )
    const [comment, setComment] = useState<string>('');
    const [deleteStatus, setDeleteStatus] = useState<boolean>(false);
    const [isRequire, setIsRequire] = useState<boolean>(false);

    useEffect(() => {
        setBaInformation(props.baEvaluaBPO);
    }, [props.baEvaluaBPO]);

    useEffect(() => {
        setIsRequire(props.isRequire);
    }, [props.isRequire]);

    useEffect(() => {
        props.onChange(comment, deleteStatus, baInformation.userId);
    }, [comment, deleteStatus]);

    const handleDelete = () => {
        setDeleteStatus(true);
    }

    const handleChangeComment = (evt: any) => {
        setComment(evt.target.value);
    };

    const handleCancelDelete = () => {
        setComment('');
        setDeleteStatus(false);
    }

    useEffect(() => {
        if (props.isReloadPopup) { // remove action delete 
            handleCancelDelete();
        }
    });
 
    return (
        <div className="ba-evaluate-container">
            <div className="ba-name-status">
                <div className='delete-icon'>{deleteStatus && <i className="fa fa-minus-circle" aria-hidden="true" style={{color: 'red'}}></i>}</div>
                <ControlLabel className="ba-name">{baInformation.name}</ControlLabel>
                <span className="ba-status">{baInformation.isActive ? '' : '(Không hoạt động)'}</span>
            </div>
                <div className="ba-evaluate-remove">
                    <div className='ba-evaluate'>
                        {baInformation.grade != null ? <i>Đã đánh giá BPO</i> : <i>Chưa đánh giá BPO</i>}
                    </div>
                    {baInformation.grade == null && <div className='ba-remove'>
                        {!deleteStatus ? <span className='ba-delete' onClick={() => handleDelete()}>Xóa</span>
                         : <form>
                            <FormGroup
                                controlId="formBasicText"
                                >
                                <Title text="Lý do xóa" isRequire={true} customClassTitle="ba-evaluate-remove__title" customClassContainer="ba-evaluate-remove__container__title" />
                                <FormControl
                                    type="text"
                                    value={comment}
                                    placeholder="Nhập lý do xóa"
                                    onChange={(evt) => handleChangeComment(evt)}
                                    onKeyPress={(evt) => { evt.key === 'Enter' && evt.preventDefault(); }}
                                    maxLength={500}
                                />
                                <FormControl.Feedback />
                                {isRequire && <HelpBlock style={{color: 'red'}}>Vui lòng nhập lý do xóa</HelpBlock>}
                            </FormGroup>
                            <span className='ba-cancel' onClick={() => handleCancelDelete()}>Hủy Xóa</span>
                        </form>}
                    </div>}
                </div>
        </div>
    );
};

    export default memo(BAEvaluateBPO);
