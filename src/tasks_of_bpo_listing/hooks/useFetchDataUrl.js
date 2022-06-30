import { useState, useEffect } from 'react';
import axios from 'axios';

const useFetchDataUrl = (url) => {
  const [ resource, setResource ] = useState({
    loading: true,
    data: null,
  });

  useEffect(()=> {
    axios.get(url)
      .then(resource=> {
        setResource({
          data: resource.data.data,
          loading: false
        })
      })
      .catch(err=> setResource({ data: [], loading: false }))
  }, [url]);

  return [resource]
}

export default useFetchDataUrl;
