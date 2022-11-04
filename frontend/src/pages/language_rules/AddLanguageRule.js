import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/languageRuleData';

function AddLanguageRule() {
    return (
        <div className="content">
            <h1>Add Language Rule Page</h1>
            <Form submitText="Save" inputState={addFormContents} />
        </div>
    )
}

export default AddLanguageRule;