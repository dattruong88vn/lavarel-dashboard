import React, { useState, useEffect } from 'react';
import NumberFormat from 'react-number-format';

const BpoBox = (props) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [valueSelect, setValueSelect] = useState('');
    const [show, setShow] = useState(props.show || false);
    const [isError, setIsError] = useState(false);
    const [textSelect, setTextSelect] = useState('Tất cả');

    const onSpanClick = () => {
        setShow(true);
    };

    const onButtonClick = () => {
        if(parseFloat(from) > parseFloat(to)) {
            setIsError(true);
            setFrom('');
            setTo('');
        }
        setShow(false);
    };

    const onSelectPoint = (val) => {
        setShow(false);
        if(val !== 'N/A') {
            const arr = val.split('-');
            setFrom(arr[0]);
            setTo(arr[1]);
            return;
        }
        setFrom('NaN');
        setTo('NaN');
    };

    const handleValidation = (val) => {
        const {formattedValue, floatValue} = val;
        return formattedValue === '' || (floatValue >= 1 &&  floatValue <= 5);
    };

    useEffect(() => {
        if(from !== '' && from !== 'NaN' && from !== '0' && from !== '0.00') {
            if(to !== '' && to !== 'NaN' && to !== '0' && to !== '0.00') {
                setTextSelect(`${from}-${to} ${props.unit}`);
                setValueSelect(`${from}-${to}`);
                return;
            }
            setTextSelect(`>= ${from} ${props.unit}`);
            setValueSelect(`${from}-`);
            return;
        }
        if(to !== '' && to !== 'NaN' && to !== '0' && to !== '0.00') {
            setTextSelect(`<= ${to} ${props.unit}`);
            setValueSelect(`-${to}`);
            return;
        }
        if(from === 'NaN' && to === 'NaN') {
            setTextSelect(`Không có điểm BPO`);
            setValueSelect('N/A');
            return;
        }
        setTextSelect('Tất cả');
        setValueSelect('-');
    }, [from, to]);

    useEffect(() => {
        props.onChange(valueSelect);
    }, [valueSelect]);

    return (
        <div className="price-box">
            <label className="price-box-label col-sm-2">{props.label}</label>
            <div className="col-sm-6">
                <span className={'price-box-span ' + (props.isDisabled ? 'disabled' : '')} onClick={onSpanClick}>{textSelect}</span>
                {show &&
                    <div className="price-box-popover">
                        <div className="row">
                            <div className="col-sm-6">
                                <label>Điểm từ</label>
                                <NumberFormat 
                                    isAllowed = {handleValidation}
                                    thousandSeparator="" decimalScale="2" 
                                    onChange={e => setFrom(e.target.value)} decimalSeparator="." 
                                    className="form-control" name="bpo-from" 
                                    value={from} placeholder={props.unit} />
                            </div>
                            <div className="col-sm-6">
                                <label>Điểm đến</label>
                                <NumberFormat 
                                    isAllowed = {handleValidation}
                                    thousandSeparator="" decimalScale="2" 
                                    onChange={e => setTo(e.target.value)} decimalSeparator="." 
                                    className="form-control" name="bpo-to" 
                                    value={to} placeholder={props.unit} />
                            </div>
                            <div className="col-sm-9">&nbsp;</div>
                            <div className="col-sm-3" style={{textAlign: 'right', margin: '10px 0px'}}>
                                <button type="button" className="btn btn-success" onClick={onButtonClick}>Ok</button>
                            </div>
                            <div style={{clear: 'both'}}></div>
                        </div>

                        <ul className="price-box-list">
                            {props.list.map(i => <li key={i.value} onClick={() => onSelectPoint(i.value)}>{i.text}</li>)}
                        </ul>
                    </div>
                }
            </div>
            <div className={'modal ' + (isError ? 'show' : '')} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>Khoảng điểm tìm kiếm chưa hợp lý, điểm từ không được lớn hơn điểm đến.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={() => setIsError(false)}>Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BpoBox;

