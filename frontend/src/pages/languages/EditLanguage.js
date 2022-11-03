import Form from '../../components/Forms/Form';
import { editFormContents } from '../../data/languageData';

function EditLanguages() {
    return (
        <div className="content">
            <h1>Edit Language Page</h1>
            <Form submitText="Save" inputState={editFormContents} />
        </div>
    )
}

export default EditLanguages;