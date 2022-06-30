import { useState, useEffect } from 'react';
import { BPO_URL } from '../constants';
import axios from 'axios';
import {pageStatusPermission} from '../utils';

const useFetchTaskOfBPOListing = params => {
    const { fromDate, toDate, labelId, districtIds, wardIds } = params;
    const [resource, setResource] = useState({
        loading: true,
        data: [],
        totalRecords: 0,
    });

    useEffect(() => {
        setResource({ ...resource, loading: true });
        const from = fromDate ? new Date(fromDate).setHours(0, 0, 0, 0) : null;
        const to = toDate ? new Date(toDate).setHours(23, 59, 59, 999) : null;

        const requestData = {
            fromDate: fromDate ? from : null,
            toDate: toDate ? to : null,
            labelId: labelId ? labelId : null ,
            districtIds: districtIds ? districtIds : null,
            wardIds: wardIds ? wardIds : null
        };

        axios.post(`${BPO_URL.BPO_ZONE_LISTING}/${params.page === 0 ? 1 : params.page}/${params.pageSize}`,
            requestData).then(response => {
                if(response.data.code !== 200){
                    pageStatusPermission(response.data.code);
                }else{
                    setResource({
                        data: response.data.data,
                        loading: false,
                    });
                }
            }).catch(() => setResource({ ...resource, loading: false }));
    }, [params]);

    return [resource];
}

export default useFetchTaskOfBPOListing;
