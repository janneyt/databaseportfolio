import Button from '../components/Button';
import Select from 'react-select';

const headers = ["Name", "Character's Known Items", "Add Item", "Delete Item"];

const bilboItems = [{value:"sting", label:"sting"},
{value:"mithrilarmor", label:"Mithril Armor"},
{value:"theonering", label:"The One Ring"}
];

// Currently reusing the same Select, this is temporary anyway.
const tableData = [
    ["Bilbo Baggins", <Select options={bilboItems}/>],
    ["Frodo Baggins", <Select options={bilboItems}/>]
];

for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Button>Add Item</Button>);
    tableData[index].push(<Button>Delete Item</Button>);
}

const addFormContents = [
    {type:"select", name:"items", label:"What item are you giving this character?", options:bilboItems }
];

const deleteFormContents = [
    {type:"hidden", name:"${idItem}"}
];


export {headers, tableData, addFormContents, deleteFormContents};