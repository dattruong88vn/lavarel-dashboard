import React, {useEffect, useState} from "react";

const Alert = (props) => {
    const [className, setClassName] = useState('');

    useEffect(() => {
        if (props.type === 'warning') {
            setClassName('warning');
            return;
        }
        if (props.type === 'error') {
            setClassName('error');
            return;
        }
        setClassName('info')
    }, [props]);
    return (<>
        {props.content && <div className={props.className + ' ' + className} style={{textAlign: 'center', padding: '20px', margin: '20px auto'}}>
            <p>{props.content}</p>
        </div>}
    </>);
}
export default Alert;