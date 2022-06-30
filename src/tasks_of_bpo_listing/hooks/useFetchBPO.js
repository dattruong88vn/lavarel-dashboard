import { useState, useEffect } from 'react'
import axios from 'axios'
import { BPO_URL } from '../constants'

const useFetchBPO = (listingId) => {
  const [ resource, setResource ] = useState({
    loading: true,
    data: null,
  });

  useEffect(()=> {
    if (listingId !== 0 && listingId !== null) {
      setResource({...resource, loading: true})

      async function fetchBPOModal() {
        try {
          const response = await axios.get(`${BPO_URL.BPO_RESOURCE}/${listingId}`);
          setResource({
            data: response.data.data,
            loading: false
          })
        } catch (error) {
          setResource({ data: [], loading: false })
        }
      }
      fetchBPOModal();
    }
  }, [listingId])

  return [resource]
}

export default useFetchBPO
