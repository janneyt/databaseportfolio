import Button from '../components/Button';
import { Link } from 'react-router-dom';

// Axios for API data
import Axios from 'axios';
import axios from 'axios';

const headers = ["Name", "Description", "Game","Country", "Edit", "Delete"];

const tableData = (action) => {
    if(action.toUpperCase() === "ADD"){
        axios.
    };
};

// Add the buttons for the display list, anything inside the push
// will get added to one cell in the table
for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/editItem"><Button>Edit Item</Button></Link>);
    tableData[index].push(<Link to="/deleteItem"><Button>DeleteItem</Button></Link>);
}

const addFormContents = [
    {type:"text", name:"itemname", label:"Name Your Item:"},
    {type:"text", name:"itemdescription", label:"Describe Your Item:"},
    {type:"text", name:"gamename", label:"Game Name (${Pulls game name from game id})"},
    {type:"text", name:"playername", label: "Player Name *${Pulls player name from player id}"}
];

const editFormContents = [
    {type:"text", name:"itemname", label:"Name Your Item:", value: "${itemName}"},
    {type:"text", name:"itemdescription", label:"Describe Your Item", value:"${itemDescription}"},
    {type:"text", name:"gamename", label:"Game Name (${Pulls game name from game id})", value:"${gameName}"},
    
];


const deleteFormContents = [
    {type:"hidden", name:"${idItem}"}
];


export {headers, tableData, addFormContents,editFormContents, deleteFormContents};