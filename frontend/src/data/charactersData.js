import Button from '../components/Button';
import { Link } from 'react-router-dom';

const headers = ["Name", "Description", "Country","Player", "Game", "Edit", "Delete"];

const tableData = [
    ["Bilbo Baggins", "A reluctant hero who prefers to eat and sleep over adventuring, until adventuring takes his soul", "The Shire", "JRR Tolkien", "Fun first game!"],
    ["Another Character", "Just a lazy drunk", "Not the Shire", "JRR Tolkien", "Fun first game!"],
    ["Another Character", "Just a lazy drunk", "Not the Shire", "JRR Tolkien", "Fun first game!"]
];

for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/editCharacter"><Button>Edit Character</Button></Link>);
    tableData[index].push(<Link to="/deleteCharacter"><Button>DeleteCharacter</Button></Link>);
}

const addFormContents = [
    {type:"text", name:"charactername", label:"Name your character:", value: "${characterName}"},
    {type:"text", name:"characterdescription", label:"Please describe your character", value: "${characterDescription}"}
];

const editFormContents = [
    {type:"text", name:"charactername", label:"Name your character:", value: "${characterName}"},
    {type:"text", name:"characterdescription", label:"Please describe your character", value: "${characterDescription}"}
];

const deleteFormContents = [
    {type:"hidden", name:"${idCharacter}"}
];


export {headers, tableData, addFormContents,editFormContents, deleteFormContents};