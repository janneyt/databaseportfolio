import { useState } from 'react';
import Button from '../Button';
import FormInput from './FormInput';
import FormSelect from './FormSelect';

import { useNavigate } from 'react-router-dom';

const Form = ({ submitText="Submit", inputState}) => {
    
    const [inputFields, setInputFields] = useState(inputState)

    const handleFormChange = (index, e) => {
        let input = [...inputFields];
        input[index].value = e.target.value;
        setInputFields(input);
    }

    const formFields = inputFields.map((row, index) => {
        // Check to see what type of input to place into the form
        // Currently this can be type="text" or "select"
        // Defaults to "text"
        
        if (row.type == "text") {
            return <FormInput key={index} inputObj={row} onChange={handleFormChange} index={index} />
        };

        if (row.type == "select") {
            return <FormSelect inputObj = {row} />
        };
    });

    const navigate = useNavigate();

    return (
        <form>
            {formFields}
            <Button type="submit">{submitText}</Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </form>
    );
};

export default Form;