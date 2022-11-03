import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/charactersLanguagesData';

function AddLanguageToCharacter() {
    return (
        <div className="content">
            <h1>Add Language To Character Page</h1>
            <p>{"Editing languages assigned to: ${characterName}"}</p>
            <Form submitText="Save" inputState={addFormContents} />
        </div>
    )
}

export default AddLanguageToCharacter;