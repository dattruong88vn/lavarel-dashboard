import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {StateInterface} from '../../store/store';

export const isLoadingCompleted = (dispatch: any) => {
    setLoadingBoundary(dispatch, false);
}
export const isLoading = (dispatch: any) => {
    setLoadingBoundary(dispatch, true);
}
const setLoadingBoundary = (dispatch: any, isLoading: boolean) => {
    dispatch({message: null, isLoading: isLoading});
}

type LoadingBoundaryProps = {
    message?: string
}

const LoadingBoundary: React.FC<LoadingBoundaryProps> = (props) => {
    const loadingState = useSelector((state: StateInterface) => state.loading);
    const [message, setMessage] = useState(props.message || loadingState.message);
    const [isLoading, setIsLoading] = useState(loadingState.isLoading);
    useEffect(() => {
        setMessage(props.message || loadingState.message);
        setIsLoading(loadingState.isLoading);
    }, [props, loadingState]);

    return (
        <>{(isLoading || loadingState.isLoading) &&
            <div>
                <div>{message || loadingState.message}</div>
            </div>}
        </>
    );
};

export default LoadingBoundary;
