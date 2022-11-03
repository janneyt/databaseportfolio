import Button from '../components/Button';

const headers = ["Name", "Edit", "Delete"];

const tableData = [
    ["JRR Tolkien"]
];

// Add the buttons for the display list, anything inside the push
// will get added to one cell in the table
for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Button>Edit Player</Button>);
    tableData[index].push(<Button>DeletePlayer</Button>);
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