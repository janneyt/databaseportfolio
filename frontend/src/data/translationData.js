import Button from '../components/Button';
import { Link } from 'react-router-dom';

const headers = ["Original Word", "Translation", "Delete"];

const tableData = [
    ["${Some input coming from the TranslationInputs table}", "${Some output coming from the selected algorithm used to translate}"]
];

// Add the buttons for the display list, anything inside the push
// will get added to one cell in the table
for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<div class="buttonGroup"><Link to="/deleteTranslation"><Button>DeleteTranslation</Button></Link><p>Deleting doesn't change the way the phrase is translated.</p></div>);
}

const addFormContents = [
    {type:"text", name:"playername", label:"Please input a phrase to translate:"}
];

const deleteFormContents = [
    {type:"hidden", name:"${idTranslation}"}
];

export {headers, tableData, addFormContents, deleteFormContents};