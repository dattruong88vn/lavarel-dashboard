import { useState, useEffect } from 'react'

import axios from 'axios'

const useFetchComments = () => {
  const [ comments, setComments ] = useState([])

  useEffect(()=> {
    let lsoId = Window.jsDetailData.id

    showPropzyLoading();
    axios.get(`/pos/prescreener/getComments/${lsoId}`)
        .then(response=> {
          hidePropzyLoading();
          setComments({
            data: response.data.data,
        })
    })
  }, [])

  return [comments]
}

export default useFetchComments
