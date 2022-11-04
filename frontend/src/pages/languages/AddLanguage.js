import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/languageData';

function AddLanguage() {
    return (
        <div className="content">
            <h1>Add Language Page</h1>
            <Form submitText="Save" inputState={addFormContents} />
        </div>
    )
}

export default AddLanguage;