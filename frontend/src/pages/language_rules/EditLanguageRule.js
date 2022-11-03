import Form from '../../components/Forms/Form';
import { editFormContents } from '../../data/languageRuleData';

function EditLanguageRule() {
    return (
        <div className="content">
            <h1>Edit Language Rule Page</h1>
            <Form submitText="Save" inputState={editFormContents} />
        </div>
    )
}

export default EditLanguageRule;