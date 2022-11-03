import Form from '../../components/Forms/Form';
import { editFormContents } from '../../data/playerData';

function EditPlayer() {
    return (
        <div className="content">
            <h1>Edit Player Page</h1>
            <Form submitText="Save" inputState={editFormContents} />
        </div>
    )
}

export default EditPlayer;