import Select from 'react-select';

const FormSelect = ({inputObj}) => {
    console.log(inputObj);
    return (
        <div className="select">
            <label htmlFor={inputObj.name}>{inputObj.label}</label>
            <Select name={inputObj.name} options={inputObj.options} />
        </div>
    );
};

export default FormSelect;