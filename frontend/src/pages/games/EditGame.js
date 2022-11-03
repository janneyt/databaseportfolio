import Form from '../../components/Forms/Form';
import { editFormContents } from '../../data/gameData';

function EditGame() {
    return (
        <div className="content">
            <h1>Edit Game Page</h1>
            <Form submitText="Save" inputState={editFormContents} />
        </div>
    )
}

export default EditGame;