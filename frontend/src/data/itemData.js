import Button from '../components/Button';
import { Link } from 'react-router-dom';



// Axios for API data
import axios from 'axios';

const headers = ["Name", "Description", "Game", "Country", "Edit", "Delete"];
let tableData = [
    ["Sword", "A sharp, pointy object with +1 to offense, -1 to your money", "Fun first game", "USA"],
    ["Club", "A blunt stick. Thick. User smash.", "Fun first game", "USA"],
    ["Axe", "A stick with sharp bits.", "Fun first game", "USA"],
];

const returnedData = (action, specifics) => {

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

    // Format should be JSON
    try {
        specifics = JSON.parse(specifics)
        console.log(specifics)
    }
    catch {
        throw new Error("JSON conversion failed, please ensure JSON format")
    };
    const headers = ["Name", "Description", "Game", "Country", "Edit", "Delete"];
    let tableData = [[""]];
    let data = { "columns": "", "table": "" }
    console.log("data", data);
    // Convert to using AXIOS config
    const local_url = 'http://localhost:5000';

    if (action.toUpperCase() === "READ") {

        axios.post(
            local_url + '/select_data',
            specifics,
            // Don't mess with this, we can only send JSON
            {
                headers: { 'Content-Type': 'application/json' }
            }
        ).then(function (response) { data = JSON.parse(response.data) })
            .catch(function (error) { console.log(error.response) })
        
            ;
        console.log("data after axios", data);
    };
    // Iterate over the new data, add to tableData
    for (let index = 0; index < data.length; index++) {
        console.log(data[index])
    }
    // Add the buttons for the display list, anything inside the push
    // will get added to one cell in the table

    for (let index = 0; index < tableData.length; index++) {
        tableData[index].push(<Link to="/editItem"><Button>Edit Item</Button></Link>);
        tableData[index].push(<Link to="/deleteItem"><Button>DeleteItem</Button></Link>);
    }

};

const addFormContents = [
    { type: "text", name: "itemname", label: "Name Your Item:" },
    { type: "text", name: "itemdescription", label: "Describe Your Item:" },
    { type: "text", name: "gamename", label: "Game Name (${Pulls game name from game id})" },
    { type: "text", name: "playername", label: "Player Name *${Pulls player name from player id}" }
];

const editFormContents = [
    { type: "text", name: "itemname", label: "Name Your Item:", value: "${itemName}" },
    { type: "text", name: "itemdescription", label: "Describe Your Item", value: "${itemDescription}" },
    { type: "text", name: "gamename", label: "Game Name (${Pulls game name from game id})", value: "${gameName}" },

];


const deleteFormContents = [
    { type: "hidden", name: "${idItem}" }
];



export { headers, tableData, returnedData, addFormContents, editFormContents, deleteFormContents };