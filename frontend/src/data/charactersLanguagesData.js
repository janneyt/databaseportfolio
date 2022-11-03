import Button from '../components/Button';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const headers = ["Name", "Character's Known Languages", "Add Language", "Delete Language"];

const bilboLanguages = [{value:"elvish", label:"Elvish"},
{value:"westron", label:"Westron"},
{value:"sylvanelvish", label:"Sylvan Elvish"}
];

// Currently reusing the same Select, this is temporary anyway.
const tableData = [
    ["Bilbo Baggins", <Select options={bilboLanguages}/>],
    ["Frodo Baggins", <Select options={bilboLanguages}/>]
];

for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/AddLanguageToCharacter"><Button>Add Language</Button></Link>);
    tableData[index].push(<Link to="/DeleteLanguageFromCharacter"><Button>Delete Language</Button></Link>);
}

const addFormContents = [
    {type:"select", name:"languages", label:"What language should this character know?", options:bilboLanguages }
];

const deleteFormContents = [
    {type:"hidden", name:"${idLanguage}"}
];


export {headers, tableData, addFormContents, deleteFormContents};