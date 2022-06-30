import React, {useEffect, useState} from 'react';
import NumberFormat from 'react-number-format';

const PriceBox = (props) => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [show, setShow] = useState(props.show || false);
    const [textSelect, setTextSelect] = useState('-- Vui lòng chọn --');
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        setFrom(props.priceFrom);
        setTo(props.priceTo);
    }, [props]);

    const onButtonClick = (e) => {
        if (parseFloat(from) > parseFloat(to)) {
            setIsError(true);
            return;
        }
        setShow(false);
        props.onChange(from, to);
    }
    const onSelectPrice = (val) => {
        const arr = val.split('-');
        setFrom(arr[0]);
        setTo(arr[1]);
        setShow(false);
    }
    const onSpanClick = (e) => {
        setShow(true);
    }

    useEffect(() => {
        props.onChange(from, to);
        if (to != '' && to != '0' && to != 'NaN' && to != '0.00') {
            if (from != '' && from != '0' && from != 'NaN' && from != '0.00') {
                setTextSelect(from + '-' + to + ' ' + props.unit);
                return;
            }
            setTextSelect('<=' + to + ' ' + props.unit);
            return;
        }
        if (from != '' && from != '0' && from != 'NaN' && from != '0.00') {
            setTextSelect('>=' + from + ' ' + props.unit);
            return;
        }
        setTextSelect('-- Vui lòng chọn --');
    }, [from, to]);
    return (
        <div className="price-box">
            <label className="price-box-label col-sm-2">{props.label}</label>
            <div className="col-sm-6">
                <span className={'price-box-span ' + (props.isDisabled ? 'disabled' : '')} onClick={e => onSpanClick(e)}>{textSelect}</span>
                {show &&
                    <div className="price-box-popover">
                        <div className="row">
                            <div className="col-sm-6">
                                <label>Giá từ</label>
                                <NumberFormat thousandSeparator="" decimalScale="2" onChange={e => setFrom(e.target.value)} decimalSeparator="." className="form-control" name="price-from" value={from} placeholder={props.unit} />
                            </div>
                            <div className="col-sm-6">
                                <label>Giá đến</label>
                                <NumberFormat thousandSeparator="" decimalScale="2" onChange={e => setTo(e.target.value)} decimalSeparator="." className="form-control" name="price-to" value={to} placeholder={props.unit} />
                            </div>
                            <div className="col-sm-9">
                                &nbsp;
                        </div>
                            <div className="col-sm-3" style={{textAlign: 'right', margin: '10px 0px'}}>
                                <button type="button" className="btn btn-success" onClick={onButtonClick}>Ok</button>
                            </div>
                            <div style={{clear: 'both'}}></div>
                        </div>

                        <ul className="price-box-list">
                            {props.list.map(i => <li key={i.value} onClick={e => onSelectPrice(i.value)}>{i.text}</li>)}
                        </ul>
                    </div>
                }
            </div>
            <div className={'modal ' + (isError ? 'show' : '')} role="dialog">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-body">
                            <p>Khoảng giá tìm kiếm chưa hợp lý, giá từ không được lớn hơn giá đến.</p>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={e => setIsError(false)}>Ok</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default PriceBox;
