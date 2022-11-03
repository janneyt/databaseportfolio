import Button from '../components/Button';
import { Link } from 'react-router-dom';

const headers = ["Name", "Countries", "Players", "Languages", "Edit", "Delete"];

const tableData = [
    ["Fun first game!"]
];

// Add the buttons for the display list, anything inside the push
// will get added to one cell in the table
for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/countries"><Button>Countries</Button></Link>);
    tableData[index].push(<Link to="/players"><Button>Players</Button></Link>);
    tableData[index].push(<Link to="/languages"><Button>Languages</Button></Link>);
    tableData[index].push(<Link to="/editGame"><Button>Edit Game</Button></Link>);
    tableData[index].push(<Link to="/deleteGame"><Button>DeleteGame</Button></Link>);
}

const addFormContents = [
    {type:"text", name:"gamename", label:"Name Your Game:"}
];

const editFormContents = [
    {type:"text", name:"gamename", label:"Name Your Game:", value:"${gameName}"}
];

const deleteFormContents = [
    {type:"hidden", name:"${idGame}"}
];


export {headers, tableData, addFormContents,editFormContents, deleteFormContents};