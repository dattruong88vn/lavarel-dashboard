import { useState } from 'react';
import { Field, ErrorMessage, useFormikContext } from 'formik';
import SelectFormik from '../Select/SelectFormik';
import useTypes from '../../hooks/useTypes';
import DateInputFormik from './DateInputFormik';
import IntValueTickBox from './IntValueTickBox';
import FormatNumberInputFormik from './FormatNumberInputFormik';
export default function RequestBlock1() {
    const [getTypeReactSelect, tmp, getDefaultValue] = useTypes();
    const { values } = useFormikContext();
    return (<>
        <h5>1. THÔNG TIN BÊN YÊU CẦU DỊCH VỤ (Sau đây gọi là Bên B)</h5>
        <div className="row">
            <div className="col-md-6">
                <div>
                    <label>Ông/Bà <span className="error">(*)</span> </label>
                    <Field className="form-control" type="text" name="customerName" />
                    <ErrorMessage className="error" name="customerName" component="div" />
                </div>
                <div>
                    <label>CMNN/CCCD</label>
                    <Field className="form-control" type="text" defaultValue={values.customerIdCard} name="customerIdCard" number={true} component={FormatNumberInputFormik}/>
                    <ErrorMessage className="error" name="customerIdCard" component="div" />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Cấp ngày</label>
                        <Field className="form-control" name="customerIdIssueDate" component={DateInputFormik} />
                        <ErrorMessage className="error" name="customerIdIssueDate" component="div" />
                    </div>
                    <div className="col-md-6">
                        <label>Tại</label>
                        <Field className="form-control" type="text" name="customerIdIssuePlace" />
                        <ErrorMessage className="error" name="customerIdIssuePlace" component="div" />
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div>
                    <label>Thông tin vợ/chồng</label>
                    <Field className="form-control" type="text" name="partnerName" />
                    <ErrorMessage className="error" name="partnerName" component="div" />
                </div>
                <div>
                    <label>CMNN/CCCD</label>
                    <Field className="form-control" type="text" defaultValue={values.partnerIdCard} name="partnerIdCard" number={true} component={FormatNumberInputFormik}/>
                    <ErrorMessage className="error" name="partnerIdCard" component="div" />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Cấp ngày</label>
                        <Field className="form-control" name="partnerIdIssueDate" component={DateInputFormik} />
                        <ErrorMessage className="error" name="partnerIdIssueDate" component="div" />
                    </div>
                    <div className="col-md-6">
                        <label>Tại</label>
                        <Field className="form-control" type="text" name="partnerIdIssuePlace" />
                        <ErrorMessage className="error" name="partnerIdIssuePlace" component="div" />
                    </div>
                </div>
            </div>
            <div className="col-md-12">
                <label>Hộ khẩu thường trú</label>
                <Field className="form-control" type="text" name="customerAddress" />
                <ErrorMessage className="error" name="customerAddress" component="div" />
            </div>
            <div className="col-md-6">
                <div>
                    <label>Số tài khoản</label>
                    <Field className="form-control" type="text" defaultValue={values.customerBankAccountNumber} name="customerBankAccountNumber" number={true} component={FormatNumberInputFormik}/>
                    <ErrorMessage className="error" name="customerBankAccountNumber" component="div" />
                </div>
                <div>
                    <label>Số điện thoại</label>
                    <Field className="form-control" type="text" name="customerPhone" />
                    <ErrorMessage className="error" name="customerPhone" component="div" />
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <label>Yêu cầu xuất hóa đơn GTGT cho phí dịch vụ</label>
                    </div>
                    <div className="col-md-6">
                        <div className="checkbox">
                            <Field label={"Có"} name="isExportReceipt" type="radio" notInt={true} value={true} component={IntValueTickBox} />
                            {/* <label>
                                <Field type="radio" name="isExportReceipt" value={true} /> Có
                            </label> */}
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="checkbox">
                            <Field label={"Không"} name="isExportReceipt" type="radio" notInt={true} value={false} component={IntValueTickBox} />
                            {/* <label>
                                <Field type="radio" name="isExportReceipt" value={false} /> Không
                            </label> */}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div>
                    <label>Tại ngân hàng</label>
                    <Field placeholder="Nhập tên ngân hàng" component={SelectFormik} defaultValue={getDefaultValue("BANK", values.bankId)} options={getTypeReactSelect("BANK")} name="bankId" />
                    <ErrorMessage className="error" name="bankId" component="div" />
                </div>
                <div>
                    <label>Email</label>
                    <Field className="form-control" type="text" name="customerEmail" />
                    <ErrorMessage className="error" name="customerEmail" component="div" />
                </div>
            </div>
        </div>
    </>)
}