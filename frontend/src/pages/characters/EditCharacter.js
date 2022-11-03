import Form from '../../components/Forms/Form';
import { editFormContents } from '../../data/charactersData';

function EditCharacters() {
    return (
        <div className="content">
            <h1>Edit Character Page</h1>
            <Form submitText="Save" inputState={editFormContents} />
        </div>
    )
}

export default EditCharacters;