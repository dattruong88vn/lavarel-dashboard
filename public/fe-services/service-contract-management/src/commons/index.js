import _ from "lodash";
import { printContractFile } from "../api/File";
export function convertIntObj(obj) {
    const res = {}
    for (const key in obj) {
      res[key] = {};
      for (const prop in obj[key]) {
        const parsed = parseInt(obj[key][prop], 10);
        res[key][prop] = isNaN(parsed) ? obj[key][prop] : parsed;
      }
    }
    return res;
}

export const handlePrint = async (contractId) => {
  // console.log("contractId", contractId);
  // window.open("https://gearvn.com/", "_blank");

  const requestPrint = {
    contractId: contractId,
  };
  try {
    window.showPropzyLoading()
    const response = await printContractFile(requestPrint);
    if(response.code != 200) {
      // alert(response.message);
      window.showPropzyAlert(response.message)
    }
    if (!_.isEmpty(response) && !_.isEmpty(response.data) && !_.isEmpty(response.data.link)) {
      window.open(response.data.link, "_blank");
    }
    window.hidePropzyLoading()
  } catch (error) {
    console.log("In hợp đồng thất bại")
    window.hidePropzyLoading()
  }
};