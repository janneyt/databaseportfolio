import Select from 'react-select';

const RegularSelect = ({inputObj}) => {
    return (
        <div className="select">
            <label htmlFor={inputObj.name}>{inputObj.label}</label>
            <Select name={inputObj.name} options={inputObj.options} />
        </div>
    );
};

export default RegularSelect;