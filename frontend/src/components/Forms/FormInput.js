const FormInput = ({inputObj, onChange, index, ref}) => {
    return (
        <div className="input">
            <label htmlFor={inputObj.name}>{inputObj.label}</label>
            <br></br>
            <input 
                ref={inputObj.ref}
                type={inputObj.type || "text"} 
                id={inputObj.name} name={inputObj.name} 
                value={inputObj.value || ""} 
                onChange={(e) => onChange(index, e)} />
        </div>
    );
};

export default FormInput;