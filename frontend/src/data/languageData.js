import Button from '../components/Button';
import { Link } from 'react-router-dom';

const headers = ["Name", "Description", "Game", "Edit", "Delete"];

const tableData = [
    ["English", "The language that rifles your pockets for spare vocabulary and grammar", "Fun first language!"]
];

// Add the buttons for the display list, anything inside the push
// will get added to one cell in the table
for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/editLanguage"><Button>Edit Language</Button></Link>);
    tableData[index].push(<Link to="/deleteLanguage"><Button>Delete Language</Button></Link>);
}

const optionsLanguageRules = [
    {value:"a to e" , label:"Change a to e"}
]

const addFormContents = [
    {type:"text", name:"languagename", label:"Name Your Language:"},
    {type:"text", name:"languagedescription", label:"Describe Your Language:"},
    {type:"text", name:"gamename", label:"Game Name (${Pulls game name from game id})"},
    {type:"select", name:"languagerules", label:"Language Rules Available", options:optionsLanguageRules }
];


const editFormContents = [
    {type:"text", name:"languagename", label:"Name Your Language:", value:"${languageName}"},
    {type:"text", name:"languagedescription", label:"Describe Your Language:", value:"${languageDescription}"},
    {type:"text", name:"gamename", label:"Game Name (${Pulls game name from game id})", value:"${gameName}"}
];

const deleteFormContents = [
    {type:"hidden", name:"${idLanguage}"}
];


export {headers, tableData, addFormContents,editFormContents, deleteFormContents};