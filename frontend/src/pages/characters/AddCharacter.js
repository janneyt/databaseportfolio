import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/charactersData';

function AddCharacter() {
    return (
        <div className="content">
            <h1>Add Character Page</h1>
            <Form submitText="Save" inputState={addFormContents} />
        </div>
    )
}

export default AddCharacter;