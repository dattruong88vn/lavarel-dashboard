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
                <span className="ba-status">{baInformation.isActive ? '' : '(Kh??ng ho???t ?????ng)'}</span>
            </div>
                <div className="ba-evaluate-remove">
                    <div className='ba-evaluate'>
                        {baInformation.grade != null ? <i>???? ????nh gi?? BPO</i> : <i>Ch??a ????nh gi?? BPO</i>}
                    </div>
                    {baInformation.grade == null && <div className='ba-remove'>
                        {!deleteStatus ? <span className='ba-delete' onClick={() => handleDelete()}>X??a</span>
                         : <form>
                            <FormGroup
                                controlId="formBasicText"
                                >
                                <Title text="L?? do x??a" isRequire={true} customClassTitle="ba-evaluate-remove__title" customClassContainer="ba-evaluate-remove__container__title" />
                                <FormControl
                                    type="text"
                                    value={comment}
                                    placeholder="Nh???p l?? do x??a"
                                    onChange={(evt) => handleChangeComment(evt)}
                                    onKeyPress={(evt) => { evt.key === 'Enter' && evt.preventDefault(); }}
                                    maxLength={500}
                                />
                                <FormControl.Feedback />
                                {isRequire && <HelpBlock style={{color: 'red'}}>Vui l??ng nh???p l?? do x??a</HelpBlock>}
                            </FormGroup>
                            <span className='ba-cancel' onClick={() => handleCancelDelete()}>H???y X??a</span>
                        </form>}
                    </div>}
                </div>
        </div>
    );
};

    export default memo(BAEvaluateBPO);
