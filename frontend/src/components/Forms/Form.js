import { useState, useEffect } from 'react';
import Button from '../Button';
import FormInput from './FormInput';

const Form = ({ submitText="Submit", inputState}) => {
    
    const [inputFields, setInputFields] = useState(inputState)

    const handleFormChange = (index, e) => {
        let input = [...inputFields];
        input[index].value = e.target.value;
        setInputFields(input);
    }

    const formFields = inputFields.map((row, index) => (
        <FormInput key={index} inputObj={row} onChange={handleFormChange} index={index} />
    ));



    return (
        <form>
            {formFields}
            <Button type="submit">{submitText}</Button>
            <Button>Cancel</Button>
        </form>
    );
};

export default Form;