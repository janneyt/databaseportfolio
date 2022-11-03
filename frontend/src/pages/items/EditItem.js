import Form from '../../components/Forms/Form';
import { editFormContents } from '../../data/itemData';

function EditItems() {
    return (
        <div className="content">
            <h1>Edit Item Page</h1>
            <Form submitText="Save" inputState={editFormContents} />
        </div>
    )
}

export default EditItems;