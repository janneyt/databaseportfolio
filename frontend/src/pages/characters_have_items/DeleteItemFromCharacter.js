import Form from '../../components/Forms/Form';
import { deleteFormContents } from '../../data/charactersItemsData';

function DeleteCharacters() {
    return (
        <div className="content">
            <h1>Delete Items from Character</h1>
            <p>{"${Character name and item will be shown here.}"}</p>
            <Form submitText="Delete" inputState={deleteFormContents} />
            <p>{"${idItem in hidden field for delete purposes.}"}</p>
        </div>
    )
}

export default DeleteCharacters;