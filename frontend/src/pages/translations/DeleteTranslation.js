import Form from '../../components/Forms/Form';
import { deleteFormContents } from '../../data/translationData';

function DeleteTranslation() {
    return (
        <div className="content">
            <h1>Delete Translation</h1>
            <p>{"${Translation name will be shown here.}"}</p>
            <p>Are you sure? Once you click delete, the Translation can't be recovered.</p>
            <Form submitText="Delete" inputState={deleteFormContents} />
            <p>{"${idTranslation in hidden field for delete purposes.}"}</p>
        </div>
    )
}

export default DeleteTranslation;