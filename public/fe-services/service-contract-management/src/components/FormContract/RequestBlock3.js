import { Field, ErrorMessage, useFormikContext } from 'formik';
import useTypes from '../../hooks/useTypes';
import IntValueTickBox from './IntValueTickBox';
export default function RequestBlock3() {
    const { values } = useFormikContext();
    const [tmp, getType] = useTypes();
    return (<>
        <h5>3. DỊCH VỤ</h5>
        <div className="row">
            <div className="col-md-6">
                <div className="row">
                    <div className="col-md-12">
                        <label>3.1 Loại dịch vụ</label>
                    </div>
                    {getType('SERVICE_TYPE')?.list && getType('SERVICE_TYPE').list.map((item, index) => {
                        return <div key={index} className="col-md-3">
                            <div className="checkbox">
                                <Field label={item.name} name="serviceTypeId" type="radio" value={item.id} component={IntValueTickBox} />
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <div className="col-md-12">
                <div className="row">
                    <div className="col-md-12">
                        <label>3.2 Gói dịch vụ</label>
                    </div>
                    {getType('SERVICE_PACKAGE')?.list && getType('SERVICE_PACKAGE').list.map((item, index) => {
                        return <div key={index} className="col-md-4">
                            <div className="checkbox package-service-style">
                                <Field label={item.name} name="servicePackageId" type="radio" value={item.id} childs={item.childList} component={IntValueTickBox} />
                                <div style={{
                                    paddingLeft: '50px',
                                    // pointerEvents:values.servicePackageId === item.id ? 'inherit' : 'none',
                                    pointerEvents: 'none',
                                    opacity:values.servicePackageId === item.id ? 'inherit' : '0.8'
                                }}>
                                    {item.childList.map((child, indexChild) => {
                                        return <div key={indexChild} className="checkbox">
                                            <Field label={child.name} name="servicePackageChildIds" type="checkbox" value={child.id} component={IntValueTickBox} />
                                        </div>
                                    })}
                                </div>
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    </>)
}