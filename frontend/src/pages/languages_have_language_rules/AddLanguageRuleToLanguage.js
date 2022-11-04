import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/languagesLanguageRulesData';

function AddLanguageRuleToLanguage() {
    return (
        <div className="content">
            <h1>Add Language Rule to Language</h1>
            <p>{"Editing language rules assigned to: ${languageName}"}</p>
            <Form submitText="Save" inputState={addFormContents} />
        </div>
    )
}

export default AddLanguageRuleToLanguage;