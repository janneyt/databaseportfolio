import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/countryData';

function AddCountry() {
    return (
        <div className="content">
            <h1>Add Country Page</h1>
            <Form submitText="Save" inputState={addFormContents} />
        </div>
    )
}

export default AddCountry;