import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/itemData';

function AddItem() {
    return (
        <div className="content">
            <h1>Add Item Page</h1>
            <Form submitText="Save" inputState={addFormContents} />
        </div>
    )
}

export default AddItem;