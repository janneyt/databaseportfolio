import Button from '../components/Button';

const headers = ["Name", "Countries", "Players", "Languages", "Edit", "Delete"];

const tableData = [
    ["Fun first game!"]
];

// Add the buttons for the display list, anything inside the push
// will get added to one cell in the table
for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Button>Countries</Button>);
    tableData[index].push(<Button>Players</Button>);
    tableData[index].push(<Button>Languages</Button>);
    tableData[index].push(<Button>Edit Game</Button>);
    tableData[index].push(<Button>DeleteGame</Button>);
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