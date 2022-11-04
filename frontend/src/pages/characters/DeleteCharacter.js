import Form from '../../components/Forms/Form';
import { deleteFormContents } from '../../data/charactersData';

function DeleteCharacters() {
    return (
        <div className="content">
            <h1>Delete Character</h1>
            <p>{"${Character name will be shown here.}"}</p>
            <Form submitText="Save" inputState={deleteFormContents} />
            <p>{"${idCharacter in hidden field for delete purposes.}"}</p>
        </div>
    )
}

export default DeleteCharacters;