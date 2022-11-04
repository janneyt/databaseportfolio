import Form from '../../components/Forms/Form';
import { deleteFormContents } from '../../data/itemData';

function DeleteItem() {
    return (
        <div className="content">
            <h1>Delete Item</h1>
            <p>{"${Item name will be shown here.}"}</p>
            <p>Are you sure? Once you click delete, the Item can't be recovered.</p>
            <Form submitText="Delete" inputState={deleteFormContents} />
            <p>{"${idItem in hidden field for delete purposes.}"}</p>
        </div>
    )
}

export default DeleteItem;