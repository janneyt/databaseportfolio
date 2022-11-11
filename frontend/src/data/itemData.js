import Button from '../components/Button';
import { Link } from 'react-router-dom';

// Axios for API data
import axios from 'axios';



const headers = ["Name", "Description", "Game","Country", "Edit", "Delete"];

const tableData = (action, specifics) => {
    /*
        Takes the action and specifics data members and creates axios posts.

        Action should be a string with CREATE, READ, UPDATE or DELETE as the possible options

        specifics should be a map with the column options formatted as per the README.
        The table and columns keys are required.
        Append is optional

        Example specifics:
        {
            "columns":"iditems",
            "table":"Items",
            "append":"WHERE idItem = 1"
        }

        This function can error. Put INSIDE A TRY/CATCH due to all the errors it can throw
    */ 

    // Specifics should be a map  
    if(!(specifics instanceof Map)){
        throw new Error("Please pass a map to function");
    };

    // Format should be JSON
    if(!JSON.parse(specifics)){
        throw new Error("JSON conversion failed, please ensure JSON format")
    };

    // columns and table are required
    if(!specifics.columns || !specifics.table){
        throw new Error("Required fields missing, consult README")
    };

    // Create the url from the .env format
    // Having problems with dotenv, going around it atm
    const local_url = 'localhost:5000';

    if(action.toUpperCase() === "READ"){
        
        const data = axios.post(
            local_url+'/select_data',
            specifics
        );
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