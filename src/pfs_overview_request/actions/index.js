import * as types from './actionTypes';
import callApi from '../../utils/apiCaller';
let _STORED_LOCAL = {
    defaultValue : {value : '', label: "--- Vui lòng chọn ---"}
};

export const apiGetOverviewRequest = () => {
    return (dispatch) => {
        return callApi(`/pfs-list/get-overview-request`, 'GET', {}).then(res => {
            dispatch(actSetOverviewRequest(res.data.data));
        });
    };
};

const actSetOverviewRequest = (data) => (
    {
        type: types.PFS_SET_OVERVIEW_REQUEST,
        data
    }
);
