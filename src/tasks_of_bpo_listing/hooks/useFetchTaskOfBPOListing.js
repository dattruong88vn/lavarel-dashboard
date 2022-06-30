import { useState, useEffect } from 'react'
import { BPO_URL } from '../constants'

import axios from 'axios'
import {pageStatusPermission} from '../../bpo_zone_listing/utils';


const useFetchTaskOfBPOListing = params => {
  const [ resource, setResource ] = useState({
    loading: true,
    data: [],
    totalRecords: 0,
  })

  useEffect(()=> {
    setResource({...resource, loading: true});
    let from = params.fromDate ? new Date(params.fromDate).getTime() : null;
    let to = params.toDate ? new Date(params.toDate) : null;

    if (params.toDate) {
      to.setHours(23,59,59,999); // trick to the end of the day !
      to = to.getTime();
    }

    const requestData = {
      fromDate: params.fromDate ? from  : null,
      toDate: params.toDate ? to : null,
      labelId: params.labelId,
      teamIds: params.teamIds,
      zoneIds: params.zoneIds,
      userIds: params.userIds
    }

    axios.post(`${BPO_URL.TASKS_BPO_LISTING}/${params.page === 0 ? 1 : params.page }/${params.pageSize}`,
      requestData)
        .then(response=> {
          if(response.data.code !== 200){
            pageStatusPermission(response.data.code);
          }else{
              setResource({
                  data: response.data.data,
                  loading: false,
              });
          }
    }).catch(()=> setResource({...resource, loading: false }))
  }, [params])

  return [resource]
}

export default useFetchTaskOfBPOListing
