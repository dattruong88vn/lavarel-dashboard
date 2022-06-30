import { useFormikContext } from 'formik';
import Select from 'react-select';
import AsyncSelect from 'react-select/async';
import { getPreListing, getAutofill } from '../../apis/contractForm';
import { selectStyles } from './index';

const loadOptions = async (inputValue, callback) => {
    const resp = await getPreListing(inputValue);
    const data = resp.data;

    callback(data.map((item) => {
        return { label: `${item.lsoListingId} - ${item.address}`, value: item.lsoListingId }
    }));
}

const SelectFormik = ({ field, form, ...props }) => {
    const { defaultValue, options, async, autoFill, placeholder } = props;
    const { setFieldValue } = useFormikContext();

    const onChange = async (selected) => {

        if (autoFill) {
            const resp = await getAutofill(selected.value);
            const data = resp.data;

            const dateObject = new Date();
            const year = dateObject.getFullYear();
            const month = dateObject.getMonth() + 1;
            const contractCode = `HĐDV-${year}/${month}/${selected.value}`;

            setFieldValue("contractCode", contractCode);
            setFieldValue("customerName", data.customerName === null ? '' : data.customerName)
            setFieldValue("customerPhone", data.customerPhone === null ? '' : data.customerPhone)
            setFieldValue("customerEmail", data.customerEmail === null ? '' : data.customerEmail)
            setFieldValue("propertyAddress", data.propertyAddress === null ? '' : data.propertyAddress)
            setFieldValue("listingAddress", data.propertyAddress === null ? '' : data.propertyAddress)
            setFieldValue("negotiationPrice", data.propertyPrice === null ? '' : data.propertyPrice);
            setFieldValue("serviceTypeId",data.serviceTypeId);
            setFieldValue("lsoId", selected.value);
        }else{
            setFieldValue(field.name, selected.value);
            if(field.name === 'commissionTypeId'){
                setFieldValue('commission', null);
            }
        }
    }

    if (async) {
        return <AsyncSelect loadingMessage={()=>"Đang tải..."} noOptionsMessage={()=>"Không có lựa chọn phù hợp"} placeholder={placeholder} defaultValue={defaultValue} styles={selectStyles} onChange={onChange} loadOptions={loadOptions} />
    }
    return <Select placeholder={placeholder} defaultValue={defaultValue} onChange={onChange} options={options} styles={selectStyles} />
}
export default SelectFormik;