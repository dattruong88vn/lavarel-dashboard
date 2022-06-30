import DatePicker, {registerLocale} from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import vi from "date-fns/locale/vi";
import { useFormikContext } from 'formik';
import moment from "moment";
import { useRef } from "react";
registerLocale("vi",vi);

const DateInputFormik = ({ field, form, ...props }) => {
    const { setFieldValue } = useFormikContext();
    const ref_date = useRef(null);
    return <div className="input-group date">
        <DatePicker
            {...props}
            locale="vi"
            selected={field.value}
            dateFormat="dd/MM/yyyy"
            onChange={date => setFieldValue(field.name, Date.parse(date))}
            peekNextMonth
            showMonthDropdown
            minDate={new Date("01-01-1970")}
            maxDate={moment().add(30,'day').toDate()}
            showYearDropdown
            dropdownMode="select"
            ref= {ref_date}
        />
        <div className="input-group-addon">
            <i className="fa fa-calendar"
              onClick={() => {
                ref_date.current.setOpen(true)
              }}
            ></i>
        </div>
    </div>
}
export default DateInputFormik;