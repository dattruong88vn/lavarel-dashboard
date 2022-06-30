import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchCountListing = (url, data ) => {
  const [ resource, setResource ] = useState({
    loading: true,
    data: null,
  });

  useEffect(()=> {
    let body;
    if (data) {
      let from = new Date(data.fromDate).getTime();

      const toDate = new Date(data.toDate);
      toDate.setHours(23,59,59,999); // trick to the end of the day !
      let to = toDate.getTime();

      body = {
        fromDate: data.fromDate ? from : null,
        toDate: data.toDate ? to : null,
        labelId: data.labelId,
        teamIds: data.teamIds,
        zoneIds: data.zoneIds,
        userIds: data.userIds
        }
      }
      axios.post(url, body )
        .then(resource=> {
          const count = resource.data.data.count;

          const total = Math.ceil(Number(count)/data.pageSize);
          setResource({
            data: total,
            count,
            loading: false
          })
        })
        .catch(err=> setResource({ data: [], loading: false }))
  }, [data])

  return [resource]
}

export default useFetchCountListing;
