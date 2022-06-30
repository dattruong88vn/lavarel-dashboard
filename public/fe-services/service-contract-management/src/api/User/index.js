import axios from 'axios';

export const getCurrentUser = async () => {
  const response = await axios.get("/spa/getCurrentUser");
  // console.log("getCurrentUser response: ",response)
  return response.data;
};