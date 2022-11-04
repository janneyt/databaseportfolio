import Button from '../components/Button';
import { Link } from 'react-router-dom';

const headers = ["Name", "Description", "Country","Player", "Game", "Edit", "Delete"];

const tableData = [
    ["Bilbo Baggins", "A reluctant hero who prefers to eat and sleep over adventuring, until adventuring takes his soul", "The Shire", "JRR Tolkien", "Fun first game!"],
    ["Bilbo Baggins", "A reluctant hero who prefers to eat and sleep over adventuring, until adventuring takes his soul", "The Shire", "JRR Tolkien", "Fun first game!"]
];

for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/editCharacter"><Button>Edit Character</Button></Link>);
    tableData[index].push(<Link to="/deleteCharacter"><Button>DeleteCharacter</Button></Link>);
}

const addFormContents = [
    {type:"text", name:"countryname", label:"Name your country:"},
    {type:"text", name:"sizeInKM", label:"How large is your country?"}
];

const editFormContents = [
    {type:"text", name:"countryname", label:"Name your country:", value: "${countryName}"},
    {type:"text", name:"sizeInKM", label:"How large is your country?", value:"${sizeInKM}"},
];

const deleteFormContents = [
    {type:"hidden", name:"${idCountry}"}
];


export {headers, tableData, addFormContents,editFormContents, deleteFormContents};