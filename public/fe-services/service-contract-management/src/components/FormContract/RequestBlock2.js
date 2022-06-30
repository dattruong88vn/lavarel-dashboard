import { Field, ErrorMessage, useFormikContext } from 'formik';
import DateInputFormik from './DateInputFormik';
import FormatNumberInputFormik from './FormatNumberInputFormik';
export default function RequestBlock2() {
    const { values } = useFormikContext();
    return (<>
        <h5>2. THÔNG TIN NHÀ/ĐẤT/CĂN HỘ CHUNG CƯ (sau đây gọi chung là "BĐS")</h5>
        <div className="row">
            <div className="col-md-12">
                <label>Địa chỉ</label>
                <Field className="form-control" type="text" name="propertyAddress" />
                <ErrorMessage className="error" name="propertyAddress" component="div" />
            </div>
            <div className="col-md-6">
                <div>
                    <label>Số GCN</label>
                    <Field className="form-control" type="text" name="propertyNumberGcn" />
                    <ErrorMessage className="error" name="propertyNumberGcn" component="div" />
                </div>
                <div>
                    <label>Nơi cấp</label>
                    <Field className="form-control" type="text" name="propertyNumberGcnIssuePlace" />
                    <ErrorMessage className="error" name="propertyNumberGcnIssuePlace" component="div" />
                </div>
                <div>
                    <label>Đăng ký thay đổi ngày</label>
                    <Field className="form-control" name="propertyRegisDateChanged" component={DateInputFormik} />
                    <ErrorMessage className="error" name="propertyRegisDateChanged" component="div" />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Hợp đồng mua bán số</label>
                        <Field className="form-control" type="text" name="propertyContractNumber" />
                        <ErrorMessage className="error" name="propertyContractNumber" component="div" />
                    </div>
                    <div className="col-md-6">
                        <label>Ký ngày</label>
                        <Field className="form-control" name="signDate" component={DateInputFormik} />
                        <ErrorMessage className="error" name="signDate" component="div" />
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div>
                    <label>Số vào sổ cấp GCN</label>
                    <Field className="form-control" type="text" name="propertyNumberGcnBook" />
                    <ErrorMessage className="error" name="propertyNumberGcnBook" component="div" />
                </div>
                <div>
                    <label>Ngày cấp</label>
                    <Field className="form-control" name="propertyNumberGcnIssueDate" component={DateInputFormik} />
                    <ErrorMessage className="error" name="propertyNumberGcnIssueDate" component="div" />
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Thông báo nộp lệ phí trước bạ số</label>
                        <Field className="form-control" type="text" name="propertyFeeNotify" />
                        <ErrorMessage className="error" name="propertyFeeNotify" component="div" />
                    </div>
                    <div className="col-md-6">
                        <label>Cấp ngày</label>
                        <Field className="form-control" name="propertyFeeDate" component={DateInputFormik} />
                        <ErrorMessage className="error" name="propertyFeeDate" component="div" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <label>Ký giữa</label>
                        <Field className="form-control" type="text" name="signBetween" />
                        <ErrorMessage className="error" name="signBetween" component="div" />
                    </div>
                    <div className="col-md-6">
                        <label>Và</label>
                        <Field className="form-control" type="text" name="signWith" />
                        <ErrorMessage className="error" name="signWith" component="div" />
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <label>Giá BĐS hai bên thỏa thuận (VNĐ)</label>
                <Field className="form-control" type="text" defaultValue={values.negotiationPrice} name="negotiationPrice" component={FormatNumberInputFormik}/>
                <ErrorMessage className="error" name="negotiationPrice" component="div" />
            </div>
        </div>
    </>)
}