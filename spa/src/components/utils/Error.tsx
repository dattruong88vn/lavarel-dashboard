import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Alert} from 'react-bootstrap';
import {ERROR_GENERAL} from '../../store/types';
import {StateInterface} from '../../store/store';

export const clearError = (dispatch: any) => {
    setError(dispatch, '');
}
export const setError = (dispatch: any, error: string) => {
    dispatch({type: ERROR_GENERAL, message: error});
}

type ErrorProps = {
    error?: string
}

const Error: React.FC<ErrorProps> = (props) => {
    const errorState = useSelector((state: StateInterface) => state.error);
    const [error, setError] = useState(props.error || errorState.message);
    const dispatch = useDispatch();
    const onClickCloseHandle = () => {
        dispatch({type: ERROR_GENERAL, error: ''});
        setError('');
    }

    useEffect(() => {
        setError(props.error || errorState.message);
    }, [props, errorState])

    return (
        <>{(error || errorState.message) &&
            <Alert className={'mt-5'} bsStyle="warning" onDismiss={onClickCloseHandle}>
                {error || errorState.message}
            </Alert>}
        </>
    );
};

export default Error;
