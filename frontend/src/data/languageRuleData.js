import Button from '../components/Button';
import { Link } from 'react-router-dom';

const headers = ["Name", "Description", "Edit", "Delete"];

const tableData = [
    ["Change a to e", "Change all occurrences of the letter a to letter e"],
    ["Change b to p", "Loss of vocalization"],
    ["Change g to k", "Loss of vocalization"]
];

// Add the buttons for the display list, anything inside the push
// will get added to one cell in the table
for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/editLanguageRule"><Button>Edit Language Rule</Button></Link>);
    tableData[index].push(<Link to="/deleteLanguageRule"><Button>Delete Language Rule</Button></Link>);
}

const addFormContents = [
    {type:"text", name:"languagerulename", label:"Name Your Language Rule:"},
    {type:"text", name:"languageruledescription", label:"Describe Your Language Rule:"},
];


const editFormContents = [
        {type:"text", name:"languagerulename", label:"Name Your Language Rule:", value:"${languageRuleName}"},
        {type:"text", name:"languageruledescription", label:"Describe Your Language Rule:", value:"${languageRuleDescription"},
];

const deleteFormContents = [
    {type:"hidden", name:"${idLanguageRule}"}
];


export {headers, tableData, addFormContents,editFormContents, deleteFormContents};