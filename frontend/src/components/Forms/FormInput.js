const FormInput = ({inputObj, onChange, index}) => {
    return (
        <div className="input">
            <label htmlFor={inputObj.name}>{inputObj.label}</label>
            <br></br>
            <input 
                type={inputObj.type || "text"} 
                id={inputObj.name} name={inputObj.name} 
                value={inputObj.value || ""} 
                onChange={(e) => onChange(index, e)} />
        </div>
    );
};

export default FormInput;