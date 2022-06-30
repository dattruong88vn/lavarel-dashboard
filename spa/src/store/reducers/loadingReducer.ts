const initialState = {
    isLoading: false,
    message: 'loading...'
};
interface LoadingAction {
    isLoading: boolean,
    message?: string
}
const loadingReducer = (state = initialState, action: LoadingAction) => {
    state.isLoading = action.isLoading || initialState.isLoading;
    state.message = action.message || initialState.message;
    return {...state};
};

export default loadingReducer;
