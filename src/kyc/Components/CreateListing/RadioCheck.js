import React from "react"
export default function RadioCheck({ name, list, selectedValue, onChange }) {
    return (
        list.length > 0 &&
        <div className="row" onChange={onChange}>
            {list.map((item, index) => {
                const { value, label, data, disabled} = item
                const dataKeys = data ? Object.keys(data) : []
                let dataAttributes = {}
                const isDisabled = disabled ? disabled : false;
                dataKeys.forEach(key => {
                    const domKey = 'data-'+key
                    dataAttributes[domKey.toLowerCase()] = data[key];
                });
                return (
                <div className="col-sm-4 col-md-4" key={index} >
                    <div className="need-radio">
                        <input
                            id={`${name}-${index}`}
                            type="radio"
                            className="need-radio-input"
                            checked={selectedValue == value}
                            value={value}
                            {...dataAttributes}
                            disabled={isDisabled}
                            name={`${name}`}
                        />
                        <label
                            htmlFor={`${name}-${index}`}
                            style={isDisabled ? {
                                opacity: 0.5
                            }: {}}
                            className="need-radio-label"
                        >
                            {" "}
                            {label}
                        </label>
                    </div>
                </div>
            )})}
        </div>
    )
}