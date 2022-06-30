import axios from "axios";

const applyCriteria = (id, data) => {
    return axios.all([
        axios.post(`matching-configuration/set-criteria/1/${id}`, data),
        axios.post(`matching-configuration/set-criteria/2/${id}`, data)
    ])
};

export default {
    applyCriteria
}

