import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchCountListing = (url, data) => {
    const { fromDate, toDate, labelId, districtIds, wardIds } = data;

    const [resource, setResource] = useState({
        loading: true,
        data: null,
    });

    useEffect(() => {
        let body;
        if (data) {
            const from = new Date(fromDate).setHours(0, 0, 0, 0);
            const to = new Date(toDate).setHours(23, 59, 59, 999);

            body = {
                fromDate: fromDate ? from : null,
                toDate: toDate ? to : null,
                labelId: labelId ? labelId : null,
                districtIds: districtIds ? districtIds : null,
                wardIds: wardIds ? wardIds : null
            }
        }
        axios.post(url, body)
            .then(resource => {
                const count = resource.data.data;

                const total = Math.ceil(Number(count) / data.pageSize);
                setResource({
                    data: total,
                    count,
                    loading: false
                })
            })
            .catch(err => setResource({ data: [], loading: false }))
    }, [data])

    return [resource]
}

export default useFetchCountListing;
