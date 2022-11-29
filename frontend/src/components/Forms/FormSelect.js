import Select from "react-select";

const FormSelect = ({ inputObj, onChange, index, ref }) => {
  return (
    <div className="select">
      <label htmlFor={inputObj.name}>{inputObj.label}</label>
      <Select
        name={inputObj.name}
        ref={inputObj.ref}
        options={inputObj.options}
        id={inputObj.name}
        value={inputObj.value || ""}
        disabled={inputObj.disabled || false}
        onChange={(e) => {onChange(index, e)}}
      />
    </div>
  );
};

export default FormSelect;
