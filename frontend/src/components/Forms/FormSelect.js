import Select from "react-select";

const FormSelect = ({ inputObj, onChange, index }) => {
  const inputvalue = inputObj.value;

  return (
    <div className="select">
      <label htmlFor={inputObj.name}>{inputObj.label}</label>
      <Select
        name={inputObj.name}
        ref={inputObj.ref}
        options={inputObj.options}
        id={inputObj.name}
        value={{ label: inputObj.value, inputvalue }}
        disabled={inputObj.disabled || false}
        onChange={(objvalue, objname, e) => {
          onChange(index, objvalue, objname);
        }}
      />
    </div>
  );
};

export default FormSelect;
