import Button from '../components/Button';
import { Link } from 'react-router-dom';

const headers = ["Name", "Edit", "Delete"];

const tableData = [
    ["JRR Tolkien"],
    ["George Martin"],
    ["Matthew Mercer"]
];

// Add the buttons for the display list, anything inside the push
// will get added to one cell in the table
for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/editPlayer"><Button>Edit Player</Button></Link>);
    tableData[index].push(<Link to="/deletePlayer"><Button>DeletePlayer</Button></Link>);
}

const addFormContents = [
    {type:"text", name:"playername", label:"Name Your Player:"}
];

const editFormContents = [
    {type:"text", name:"playername", label:"Name Your Player:", value:"${playerName}"}
];

const deleteFormContents = [
    {type:"hidden", name:"${idPlayer}"}
];


export {headers, tableData, addFormContents,editFormContents, deleteFormContents};