import React, { useEffect, useState } from "react";
import Select from "react-select";
import _ from "lodash";

export const selectStyles = {
  control: (styles, { isFocused }) => ({
    ...styles,
    borderColor: isFocused ? "#3c8dbc" : "#d2d6de",
    boxShadow: "none",
    borderRadius: 0,
    fontSize: "14px",
    color: "#555",
    minHeight: "34px",
  }),
  menu: (styles) => ({ ...styles, backgroundColor: "#FFFFFF", zIndex: 2 }),
  dropdownIndicator: (styles) => ({ ...styles, padding: "6px" }),
  option: (styles) => ({ ...styles, cursor: "pointer"}),
};

function SelectCustomizeFlowBootrap3(props) {
  const { options, forwardedRef, defaultValue, onSelect } = props;
  const [optionsWithDefault, setOptionsWithDefault] = useState(options);
  const [isFirst, setIsFirst] = useState(true);
  useEffect(() => {
    if (!_.isEmpty(options)) {
      let optionsTmp = [...options];
      optionsTmp.unshift(defaultValue);
      setOptionsWithDefault(optionsTmp);
    }
  }, [options]);
  return (
    <Select
      defaultValue={defaultValue}
      options={!_.isEmpty(optionsWithDefault) ? optionsWithDefault : [defaultValue] }
      styles={selectStyles}
      ref={forwardedRef}
      onChange={() => {
        !isFirst ? onSelect() : setIsFirst(false);
    }}
    />
  );
}

export default SelectCustomizeFlowBootrap3;
