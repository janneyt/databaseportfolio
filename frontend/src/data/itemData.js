import Button from '../components/Button';
import { json, Link } from 'react-router-dom';
import { useState } from 'react';
/**
 * I had to entirely rewrite itemData to allow it to make asynchronous POST calls
 * The scoping for each item is incredibly important
 * 
 * I'll explain how I had to rewrite the function below, but I will note one of the major
 * TODOs left: setup an AXIOS config at the project level so the local_url is not hardcoded
 */

// Axios for API data
import axios from 'axios';

const headers = ["Name", "Description", "Game", "Country", "Edit", "Delete"];


// Convert to using AXIOS config
const local_url = 'http://localhost:5000';

// Axios being saved to state causes infinted rerenders.
const fillData = async (specifics) => {
    /**
     * The specifics JSON should be sent as per the README for the backend integraiton
     * 
     * We're going to go directly to an axios post call and return it
     * 
     * TODO: parameterize both the URL and the additional portion of the URL
     * so as to be available for all post requests
     * 
     * TODO: write similar functions for GET and DELETE
     */
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

    try {
        // If you are not passing a string (ie if you pass an Object or JSON object)
        // This will error
        // TODO: check formatting 
        specifics = JSON.parse(specifics);
    }
    catch {
        throw new Error("Please convert to proper JSON format")
    }

    // Promises require me to put a bunch of placeholder/default values
    // There's probably a more elegant way to do this but I don't want to break it
    let data = ["", "", "", "", "", ""];
    if (action.toUpperCase() === "READ") {

        try {

            // Async call
            const response = await fillData(specifics);

            // Async has to be awaited, including the value returned from an async
            data = await response.data;

            // Another placeholder
            const filledData = [[]];

            // I iterated over the length of the data returned from the server
            // Note: we don't want to stringify this, but it is a JSON object
            // Thus, we have to cram the object into an array for use in React
            // I'm going to iterate over the values of the returned data and save
            // it into the placeholder array
            for (let index = 0; index < data.length; index++) {
                // NOTE ON INDEXING: data is of form [{}] so data has length > 1 but
                // it's not necessarily true that all keys for all data members exist
                // We can't make filledData indexing related to data indexing or vice versa


                // There's a finite number of unique keys, so although we don't want
                // the keys, we iterate over them to find the values
                const keys = Object.keys(data[index]);

                // filledData does not necessarily have an existing member at *index*
                filledData[index] = []

                // This is where I iterate over the keys and place the values in filledData
                for (let element = 0; element < keys.length; element++) {

                    // Push, not indexing or assignment, because filledData is an array
                    filledData[index].push(data[index][keys[element]])
                }

                // Add the buttons for the display list, anything inside the push
                // will get added to one cell in the table
                filledData[index].push(<Link to="/editItem"><Button>Edit Item</Button></Link>);
                filledData[index].push(<Link to="/deleteItem"><Button>DeleteItem</Button></Link>);
            };

            // This must be returned to the calling, awaiting function
            return filledData
        }

        /**
         * Vitally important: this catch statement actually returns the values that
         * allows the Items page to shaw a blank screen instead of erroring
         */
        catch (error) {

            // If there's a bad axios call, fill with empty values
            const filledData = [["1", "error", "database", "not connected"]]

            // filledData[0] is required because filledData is a 2d array and we have to add
            // to the first element of the array
            filledData[0].push(<Link to="/editItem"><Button>Edit Item</Button></Link>);
            filledData[0].push(<Link to="/deleteItem"><Button>DeleteItem</Button></Link>);
            return filledData
        }


    };



};

// As in the original setup
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