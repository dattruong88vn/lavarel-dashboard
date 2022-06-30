import { useFormikContext } from 'formik';
import NumberFormat from 'react-number-format';
const FormatNumberInputFormik = ({ field, form, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const {name} = {...field};
    return <>
        <NumberFormat decimalScale={props.decimalScale ? 9 : 0} isAllowed={(values) => {
            const { formattedValue, floatValue } = values;
            if(formattedValue !== ""){
                switch (name) {
                    case 'contractDuration':
                        return floatValue >= 0 && floatValue <= 600;
                        break;
                    case 'commission':
                        return floatValue >= 0 && floatValue <= (props.decimalScale ? 100 : 500000000);
                        break;
                    case 'negotiationPrice':
                        return floatValue >= 0 && floatValue <= 900000000000;
                        break;
                }
            }
            return true;
        }} name={field.name} allowLeadingZeros={true} defaultValue={props.defaultValue} value={props.defaultValue} className="form-control" onValueChange={val => setFieldValue(field.name, val.value)} thousandSeparator={props.number ? false : true} />
    </>
}
export default FormatNumberInputFormik;