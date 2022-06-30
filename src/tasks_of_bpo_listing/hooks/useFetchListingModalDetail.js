import { useState, useEffect } from 'react'
import axios from 'axios'

const useFetchListingModalDetail = rListingId => {

  const [ loading, setLoading ] = useState(false);
  const [ listingDetail, setListingDetail ] = useState(null);
  const [ listingDetailCompare, setListingDetailCompare ] = useState(null);

  useEffect(()=> {
    async function getResource() {

      setLoading(true);
      try {
        const response = await axios.post("/common/open-modal-listing-detail/get-data", { listingId: rListingId } );
        setListingDetail(response.data.listingDetail);
        setListingDetailCompare(response.data.listingDetailCompare);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }

    getResource();
  }, [rListingId])
  return [loading, listingDetail, listingDetailCompare]
}

export default useFetchListingModalDetail
