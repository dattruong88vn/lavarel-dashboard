import { useFormikContext } from 'formik';
const IntValueTickBox = ({ field, form, ...props }) => {
  const { values, setFieldValue } = useFormikContext();
  const { notInt, childs,disabled } = props;
  const { onChange, ...customField } = field;

  const autoFillCheckbox = () => {
    if (field.name === 'servicePackageId' && childs) {
      setFieldValue('servicePackageChildIds', childs.map(child => child.id))
    }
  }

  const changeEvent = (e) => {
    autoFillCheckbox();

    let { value, checked } = e.target;
    if (!notInt)
      value = parseInt(value);
    else
      value = (value === 'true');

    if (props.type === 'checkbox') {
      let valueByFieldName = [...{ ...values }[field.name]];
      if (checked) {
        valueByFieldName.push(value);

        value = valueByFieldName;

      } else { // remove item 
        value = valueByFieldName.filter(function (item) {
          return item !== value
        })
      }
    }
    setFieldValue(field.name, value);
  }

  return (
    <label>
      <input {...customField} onChange={changeEvent} type={props.type} /> {props.label}
    </label>
  );
}
export default IntValueTickBox;