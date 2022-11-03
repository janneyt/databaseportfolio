import Form from '../../components/Forms/Form';
import { editFormContents } from '../../data/countryData';

function EditCountry() {
    return (
        <div className="content">
            <h1>Edit Country Page</h1>
            <Form submitText="Save" inputState={editFormContents} />
        </div>
    )
}

export default EditCountry;