import React from "react";
import Alert from './alert';

const Error = (props) => {
    return (<>
        <Alert {...props} type={'error'} ></Alert>
    </>);
}
export default Error;