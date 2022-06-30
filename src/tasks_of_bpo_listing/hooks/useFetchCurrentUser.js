import { useState, useEffect } from 'react'
import axios from 'axios'
import { BPO_URL } from '../constants'

const useFetchCurrentUser = () => {
  const [ currentUser, setCurrentUser ] = useState({
    loading: true,
    data: null,
  });

  useEffect(()=> {
    setCurrentUser({...currentUser, loading: true})

    async function fetchCurrentUser() {
      try {
        const response = await axios.get(`${BPO_URL.BPO_CURRENT_USER}`);
        setCurrentUser({
          data: response.data,
          loading: false
        })
      } catch (error) {
        setCurrentUser({ data: [], loading: false })
      }
    }
    fetchCurrentUser();
  }, [])

  return [currentUser]
}

export default useFetchCurrentUser
