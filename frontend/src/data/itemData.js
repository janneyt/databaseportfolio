import Button from '../components/Button';

const headers = ["Name", "Description", "Game","Country", "Edit", "Delete"];

const tableData = [
    ["Sword", "A sharp, pointy object with +1 to offense, -1 to your money", "Fun first game", "USA"],
    ["Club", "A blunt stick. Thick. User smash.", "Fun first game", "USA"],
    ["Axe", "A stick with sharp bits.", "Fun first game", "USA"],
];

// Add the buttons for the display list, anything inside the push
// will get added to one cell in the table
for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Button>Edit Item</Button>);
    tableData[index].push(<Button>DeleteItem</Button>);
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
    {type:"text", name:"playername", label: "Player Name *${Pulls player name from player id}", value: "${playerName}"}
];

const deleteFormContents = [
    {type:"hidden", name:"${idItem}"}
];


export {headers, tableData, addFormContents,editFormContents, deleteFormContents};