import { useEffect, useState, useRef } from 'react';
import Button from '../Button';
import FormInput from './FormInput';
import FormSelect from './FormSelect';


import { redirect, useNavigate } from 'react-router-dom';

const Form = ({ submitText="Submit", inputState, onSubmit, refDict={}}) => {
    
    const [inputFields, setInputFields] = useState([{}]);
    
    const navigate = useNavigate();

    useEffect(() => {
        setInputFields(inputState);
    }, [inputState]);
    
    // Why two nearly identical handleFormChange functions? Because ReactSelect passes e.target automatically
    const handleFormChangeSelects = (index, objvalue, objname) => {
        console.log("obj incoming", objvalue, objname)
        refDict.current[objname.name] = objvalue.value;
        console.log("objname", objname)
        console.log("objvalue", objvalue)
        console.log("refDict", refDict.current)
        let input = [...inputFields];
        input[index].value = objvalue.value;
        console.log("input[index].value in handleFormChangeSelects", input[index])
        
        setInputFields(input);
    }

    const handleFormChange = (index, e) => {
        e.preventDefault()
        let input = [...inputFields];
        input[index].value = e.target.value;
        setInputFields(input);
    }

    const formFields = inputFields.map((row, index) => {
        // Check to see what type of input to place into the form
        // Currently this can be type="text" or "select"
        // Defaults to "text"
        if (row.type === "text") {
            row['ref'] = (ele) => {refDict.current[row.name] = ele};
            return <FormInput key={index} inputObj={row} onChange={handleFormChange} index={index} />
        };

        if (row.type === "select") {
            
            return <FormSelect key={index} inputObj={row} onChange={handleFormChangeSelects} index={index} />
        };
        if (row.type === "hidden") {
            row['ref'] = (ele) => {refDict.current[row.name] = ele};
            row['disabled'] = true;
            return <FormInput key={index} inputObj={row} onChange={handleFormChange} index={index} />
        }
    });

    return (
        <form onSubmit={onSubmit}>
            {formFields}
            <Button type="submit">{submitText}</Button>
            <Button onClick={() => {
                navigate(-1);
                }}>Cancel</Button>
        </form>
    );
};

export default Form;