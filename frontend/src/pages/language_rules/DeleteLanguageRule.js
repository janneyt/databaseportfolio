import Form from '../../components/Forms/Form';
import { deleteFormContents } from '../../data/languageRuleData';

function DeleteLanguageRule() {
    return (
        <div className="content">
            <h1>Delete Language Rule</h1>
            <p>{"${LanguageRule name will be shown here.}"}</p>
            <p>Are you sure you want to delete a language rule? Once you click delete, the language rule and all languages that use that language will be deleted.</p>
            <Form submitText="Delete" inputState={deleteFormContents} />
            <p>{"${idLanguageRule in hidden field for delete purposes.}"}</p>
        </div>
    )
}

export default DeleteLanguageRule;