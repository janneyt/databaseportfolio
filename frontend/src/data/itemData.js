import Button from '../components/Button';
import { json, Link } from 'react-router-dom';
import { useState } from 'react';


// Axios for API data
import axios from 'axios';

const headers = ["Name", "Description", "Game", "Country", "Edit", "Delete"];


const ReturnedData = async (action, specifics) => {

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

    const [tableData, setTableData] = useState([["","","",""]])
    let filledData = tableData;
    try {
        specifics = JSON.parse(specifics);
    }
    catch {
        throw new Error("Please convert to proper JSON format")
    }


    // Convert to using AXIOS config
    const local_url = 'http://localhost:5000';
    let data = ["", "", "", "", "", ""];
    if (action.toUpperCase() === "READ") {
        const fillData = async () => {

            return await axios.post(
                local_url + '/select_data',
                specifics,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        }
        try {
            const response = await fillData();
            data = await response.data;
            filledData = tableData;
            for (let index = 0; index < data.length; index++) {
                for (let element = 0; element < data[index].length; element++) {

                    filledData[index][element].push(data[index][element])


                }


                // Add the buttons for the display list, anything inside the push
                // will get added to one cell in the table
                filledData[index].push(<Link to="/editItem"><Button>Edit Item</Button></Link>);
                filledData[index].push(<Link to="/deleteItem"><Button>DeleteItem</Button></Link>);

            };

            setTableData(fillData);

            return tableData
        }
        catch (error){
            console.log("error:", error)
            // If there's a bad axios call, fill with empty values
            filledData = [["1", "error","database", "not connected"]]
            filledData[0].push(<Link to="/editItem"><Button>Edit Item</Button></Link>);
            filledData[0].push(<Link to="/deleteItem"><Button>DeleteItem</Button></Link>);
            return filledData
        }


    };



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



export { headers, ReturnedData, addFormContents, editFormContents, deleteFormContents };