import Form from '../../components/Forms/Form';
import { deleteFormContents } from '../../data/countryData';

function DeleteCountry() {
    return (
        <div className="content">
            <h1>Delete Country</h1>
            <p>{"${Country name will be shown here.}"}</p>
            <Form submitText="Delete" inputState={deleteFormContents} />
            <p>{"${idCountry in hidden field for delete purposes.}"}</p>
        </div>
    )
}

export default DeleteCountry;