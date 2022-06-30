import React from "react";
import Alert from './alert';

const Info = (props) => {
    return (<>
        <Alert {...props} type={'info'} ></Alert>
    </>);
}
export default Info;