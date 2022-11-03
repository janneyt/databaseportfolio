import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/translationData';

function AddTranslation() {
    return (
        <div className="content">
            <h1>Add Translation Page</h1>
            <Form submitText="Save" inputState={addFormContents} />
        </div>
    )
}

export default AddTranslation;