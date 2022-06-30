import { useState, useEffect } from "react";
import { BPO_URL } from "../constants";
import axios from "axios";

const useFetchConfigGrade = () => {
  const [resource, setResource] = useState({
    loading: true,
    data: null,
  });

  useEffect(() => {
    setResource({ ...resource, loading: true });

    axios
      .get(BPO_URL.BPO_CONFIG_GRADES)
      .then((resource) => {
        setResource({
          data: resource.data.data,
          loading: false,
        });
      })
      .catch((err) => setResource({ data: [], loading: false }));
  }, []);

  return [resource];
};

export default useFetchConfigGrade;
