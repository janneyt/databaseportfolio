import Button from '../components/Button';
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
    tableData[index].push(<Button>Add Language</Button>);
    tableData[index].push(<Button>Delete Language</Button>);
}

const addFormContents = [
    {type:"select", name:"languages", label:"What language should this character know?", options:bilboLanguages }
];

const deleteFormContents = [
    {type:"hidden", name:"${idLanguage}"}
];


export {headers, tableData, addFormContents, deleteFormContents};