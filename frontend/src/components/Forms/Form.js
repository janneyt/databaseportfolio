import { useState } from 'react';
import Button from '../Button';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import { useLocation, Link } from 'react-router-dom';


import { useNavigate } from 'react-router-dom';

const Form = ({ submitText="Submit", inputState, page }) => {
    
    const [inputFields, setInputFields] = useState(inputState)
    const location = useLocation();
    const data = location.state[page];

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
            <Button onClick={() => {

                navigate(-1, {state: {state: location.state}});
                }}>Cancel</Button>
        </form>
    );
};

export default Form;