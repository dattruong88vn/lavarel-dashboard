import { Field, ErrorMessage, useFormikContext } from 'formik';
import useTypes from '../../hooks/useTypes';
import SelectFormik from '../Select/SelectFormik';
import DateInputFormik from './DateInputFormik';
import IntValueTickBox from './IntValueTickBox';
import FormatNumberInputFormik from './FormatNumberInputFormik';

export default function ContractBlock() {
    const { values, setFieldValue } = useFormikContext();
    const [getTypeReactSelect, getType, getDefaultValue] = useTypes();

    return (<>
        <div className="row">
            <div className="col-md-12">
                <label>3.1 Phí dịch vụ</label>
            </div>
            <div className="col-md-7">
                <div className="row pl-20px">
                    <div className="col-md-7">
                        <label>Loại hoa hồng</label>
                        <Field component={SelectFormik} defaultValue={getDefaultValue("COMMISSION_TYPE", values.commissionTypeId)} options={getTypeReactSelect("COMMISSION_TYPE")} name="commissionTypeId" />
                        <ErrorMessage className="error" name="commissionTypeId" component="div" />
                    </div>
                    {values.commissionTypeId === 20 && <div className="col-md-5">
                        <label>Thành tiền VNĐ</label>
                        <Field className="form-control" type="text" defaultValue={values.commission} name="commission" component={FormatNumberInputFormik} />
                        <ErrorMessage className="error" name="commission" component="div" />
                    </div>}
                    {values.commissionTypeId === 21 &&
                        <div className="col-md-5">
                            <div className="col-md-5 px-0">
                                <label>% Hoa hồng</label>
                                <Field className="form-control" type="text" decimalScale={true} defaultValue={values.commission} name="commission" component={FormatNumberInputFormik} />
                                {/* <Field className="form-control" type="text" name="commission" /> */}
                                <ErrorMessage className="error" name="commission" component="div" />
                            </div>
                            {values.serviceTypeId === 2 && <div className="col-md-7 px-0 actual-price">
                                <p>Giá giao dịch thực tế</p>
                            </div>}
                        </div>
                    }
                </div>
            </div>
            {values.serviceTypeId === 3 && <div className="col-md-5">
                <div className="row">
                    <div className="col-md-12">
                        <label>Thời hạn HĐ (tháng)</label>
                        <Field className="form-control" type="text" defaultValue={values.contractDuration} name="contractDuration" component={FormatNumberInputFormik} />
                        <ErrorMessage className="error" name="contractDuration" component="div" />
                    </div>
                </div>
            </div>}
            {values.serviceTypeId === 2 && <div className="col-md-12">
                <label>3.2 Thời hạn thanh toán</label>
                {getType('PAYMENT_TERM')?.list && getType('PAYMENT_TERM').list.map((item, index) => {
                    return <div key={index} className="checkbox">
                        <Field label={item.name} component={IntValueTickBox} type="radio" name="paymentTermId" value={item.id} />
                    </div>
                })}
            </div>}
            <div className="col-md-12">
                <label>3.3 Hình thức thanh toán</label>
                <div className="row">
                    {getType('PAYMENT_METHOD')?.list && getType('PAYMENT_METHOD').list.map((item, index) => {
                        return <div key={index} className="col-md-4">
                            <div className="checkbox">
                                <Field label={item.name} name="paymentMethodId" type="radio" value={item.id} component={IntValueTickBox} />
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className="col-md-6">
                <label>3.4 Thời hạn thực hiện dịch vụ</label>
                <div className="row">
                    {getType('SERVICE_TIME')?.list && getType('SERVICE_TIME').list.map((item, index) => {
                        return <div key={index} className="col-md-4">
                            <div className="checkbox">
                                <Field label={item.name} name="serviceTimeId" type="radio" value={item.id} component={IntValueTickBox} />
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className="col-md-3">
                <label>Ngày hiệu lực hợp đồng</label>
                <div style={{paddingTop:"14px"}}>
                    <Field className="form-control" name="contractValidDate" component={DateInputFormik} />
                    <ErrorMessage className="error" name="contractValidDate" component="div" />
                </div>
            </div>
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-3">
                        <label>Trạng thái</label>
                        <div className="pl-20px">
                            <Field component={SelectFormik} defaultValue={getDefaultValue("STATUS", values.statusId)} options={getTypeReactSelect("STATUS")} name="statusId" />
                            <ErrorMessage className="error" name="statusId" component="div" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>)
}