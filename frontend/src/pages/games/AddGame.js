import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/gameData';

function AddGame() {
    return (
        <div className="content">
            <h1>Add Game Page</h1>
            <Form submitText="Save" inputState={addFormContents} />
        </div>
    )
}

export default AddGame;