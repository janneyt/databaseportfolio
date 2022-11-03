import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/countriesLanguagesData';

function AddLanguageToCountry() {
    return (
        <div className="content">
            <h1>Add Language To Country Page</h1>
            <p>{"Editing languages assigned to: ${countryName}"}</p>
            <Form submitText="Save" inputState={addFormContents} />
        </div>
    )
}

export default AddLanguageToCountry;