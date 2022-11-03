import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/playerData';

function AddPlayer() {
    return (
        <div className="content">
            <h1>Add Player Page</h1>
            <Form submitText="Save" inputState={addFormContents} />
        </div>
    )
}

export default AddPlayer;