import React from "react"
import DateFnsUtils from "@date-io/date-fns"
import {
    KeyboardDatePicker,
    KeyboardTimePicker,
    MuiPickersUtilsProvider,
} from "@material-ui/pickers"

import "components/MyDateTimePicker/index.scss"

/**
 * package url + options: https://material-ui-pickers.dev/getting-started/usage
 */
const MyDateTimePicker = (props) => {
    const configPicker = {
        autoOk: true,
        id: "datetime-picker",
        inputVariant: "outlined",
        InputAdornmentProps: {
            position: "start"
        },
        label: "Datetime Picker",
        margin: "normal",
        open: props.open,
        variant: "dialog",
        TextFieldComponent: (fieldProp) => {
            return (
                <>
                    <input className="form-control" type="text" value={fieldProp.value} onChange={fieldProp.onChange} />
                    {fieldProp.error && <p className="error">{fieldProp.helperText}</p>}
                </>
            )
        },
        // minDate: new Date(),
        // placeholder: "01/01/2021",
        // format
        ...props
    }

    // KeyboardDatePicker, KeyboardTimePicker dont support isTimeOrDate props
    delete configPicker.isTimeOrDate

    let RenderPicker = null
    if (props.isTimeOrDate === 'date') {
        RenderPicker = <KeyboardDatePicker {...configPicker} />
    }
    if (props.isTimeOrDate === 'time') {
        RenderPicker = <KeyboardTimePicker {...configPicker} />
    }

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            {RenderPicker}
        </MuiPickersUtilsProvider>
    )
}

export default MyDateTimePicker
