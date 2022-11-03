import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/charactersItemsData';

function AddItemToCharacter() {
    return (
        <div className="content">
            <h1>Add Item To Character Page</h1>
            <p>{"Editing items assigned to: ${characterName}"}</p>
            <Form submitText="Save" inputState={addFormContents} />
        </div>
    )
}

export default AddItemToCharacter;