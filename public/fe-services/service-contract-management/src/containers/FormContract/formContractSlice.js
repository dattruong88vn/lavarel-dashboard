import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import _ from 'lodash'
import { getDefines, getStatusContract, getContractDetail } from '../../apis/contractForm'
import { pageStatusPermission } from '../../ultils'

export const fetchDefines = createAsyncThunk(
  'form-contract/get-defines',
  async (thunkAPI) => {
    const response = await getDefines()
    return response.data
  }
)

export const fetchStatusContract = createAsyncThunk(
  'form-contract/get-status',
  async (thunkAPI) => {
    const response = await getStatusContract()
    return response.data
  }
)

export const fetchDetail = createAsyncThunk(
  'form-contract/get-detail',
  async (id,thunkAPI) => {
    const response = await getContractDetail(id);
    let result = "";
    if (_.isEmpty(response.data) && response.code == "401") {
      pageStatusPermission(401);
    } else {
      result = response.data;
    }
    return result;
  }
)

const initialState = {
  infoContract: {
    "contractId": null,
    "contractCode": null, // Số HĐ đã gen
    "customerName": null,
    "customerIdCard": null, // CMND or CCCD
    "customerIdIssueDate": null, // ngày cấp CMND/CCCD 
    "customerIdIssuePlace": null, // Nơi cấp
    "partnerName": null, // Tên của Vợ hoặc Chồng
    "partnerIdCard": null,
    "partnerIdIssueDate": null,
    "partnerIdIssuePlace": null,
    "customerAddress": null,
    "customerBankAccountNumber": null, // Số TK ngân hàng
    "bankId": null, // id của ngân hàng trong hệ thống Propzy
    "customerPhone": null,
    "customerEmail": null,
    "isExportReceipt": false, // Yêu cầu xuất hóa đơn GTGT
    "propertyAddress": null, // Đia chỉ của property
    "listingAddress":null,
    "propertyNumberGcn": null, // Số GCN
    "propertyNumberGcnBook": null, // Số vào sổ cấp GCN
    "propertyNumberGcnIssuePlace": null, // Nơi cấp GCN
    "propertyNumberGcnIssueDate": null, // Ngày cấp GCN
    "propertyRegisDateChanged": null, // Đăng ký thay đổi ngày
    "propertyFeeNotify": null, // Thông báo nộp lệ phí trước bạ số
    "propertyFeeDate": null, // Ngày cấp thông báo nộp lệ phí trước bạ
    "propertyContractNumber": null, // Hợp đồng mua bán số
    "signDate": null,
    "signBetween": null, // Ký giữa ...
    "signWith": null, // Ký với ...
    "serviceTypeId": 2, // Loại dịch vụ
    "servicePackageId": null, // Gói dịch vụ
    "servicePackageChildIds": [],
    "commissionTypeId": 21, // Loại hoa hồng
    "commission": null, // Giá trị hoa hồng nếu type là %, nếu type là VNĐ thì để null
    "commissionValue": null, // Value của hoa hồng, trong trường hợp loại hoa hồng là % thì FE tự tính ra số tiền VND dựa theo propertyPrice
    "negotiationPrice": null,
    "contractDuration": null, // Thời hạn hợp đồng (tính bằng tháng)
    "paymentTermId": null, // Thời hạn thanh toán
    "paymentMethodId": null, // Hình thức thanh toán
    "serviceTimeId": null, // Thời gian thực hiện dịch vụ
    "contractValidDate": null, // Ngày hiệu lực hợp đồng
    "statusId": 2, // Trạng thái hợp đồng,
    "lsoId": null
  },
  types: [],
  loaded:{
    define:false,
    status:false,
    info:false
  }
}

const slice = createSlice({
    name: 'formContract',
    initialState: initialState,
    reducers: {
      fetch(state, action) {
        console.log("fetch", "state", state, "action", action)
      }
    },
    extraReducers: (builder) => {
      // Add reducers for additional action types here, and handle loading state as needed
      builder.addCase(fetchDefines.fulfilled, (state, action) => {
        state.types = state.types.concat(action.payload);
        state.loaded.define = true;
      })
      .addCase(fetchStatusContract.fulfilled, (state, action) => {
        state.types = state.types.concat(action.payload);
        state.loaded.status = true;
      })
      .addCase(fetchDetail.fulfilled, (state, action) => {
        state.infoContract = action.payload
        state.loaded.info = true;
      })
    },
  })

export const { fetch } = slice.actions

export default slice.reducer