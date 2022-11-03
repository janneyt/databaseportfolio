import Form from '../../components/Forms/Form';
import { deleteFormContents } from '../../data/languageData';

function DeleteLanguage() {
    return (
        <div className="content">
            <h1>Delete Language</h1>
            <p>{"${Language name will be shown here.}"}</p>
            <p>Are you sure? Once you click delete, the Language can't be recovered.</p>
            <Form submitText="Delete" inputState={deleteFormContents} />
            <p>{"${idLanguage in hidden field for delete purposes.}"}</p>
        </div>
    )
}

export default DeleteLanguage;