import React from "react";
import Alert from './alert';

const Warning = (props) => {
    return (<>
        <Alert {...props} type={'warning'} ></Alert>
    </>);
}
export default Warning;