import React from "react";
import Select from "react-select";
import AsyncSelect from "react-select/async";

const selectStyles = {
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
};

function AsyncSelectCustomizeFlowBootrap3(props) {
  const { options, forwardedRef } = props;
  return (
    <AsyncSelect
      // defaultValue={options[0]}
      defaultOptions
      cacheOptions
      loadOptions={options}
      styles={selectStyles}
      ref={forwardedRef}
    />
  );
}

export default AsyncSelectCustomizeFlowBootrap3;
