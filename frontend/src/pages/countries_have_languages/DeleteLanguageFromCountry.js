import Form from '../../components/Forms/Form';
import { deleteFormContents } from '../../data/charactersLanguagesData';

function DeleteLanguageFromCountry() {
    return (
        <div className="content">
            <h1>Delete Languages from Country</h1>
            <p>{"${Country name and language will be shown here.}"}</p>
            <Form submitText="Delete" inputState={deleteFormContents} />
            <p>{"${idLanguage in hidden field for delete purposes.}"}</p>
        </div>
    )
}

export default DeleteLanguageFromCountry;