import Button from '../components/Button';

const headers = ["Name", "Description", "Game", "Edit", "Delete"];

const tableData = [
    ["English", "The language that rifles your pockets for spare vocabulary and grammar", "Fun first language!"]
];

// Add the buttons for the display list, anything inside the push
// will get added to one cell in the table
for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Button>Edit Language</Button>);
    tableData[index].push(<Button>Delete Language</Button>);
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
    {type:"text", name:"languagename", label:"Name Your Language:"},
    {type:"text", name:"languagedescription", label:"Describe Your Language:"},
    {type:"text", name:"gamename", label:"Game Name (${Pulls game name from game id})"}
];

const deleteFormContents = [
    {type:"hidden", name:"${idLanguage}"}
];


export {headers, tableData, addFormContents,editFormContents, deleteFormContents};