import axios from "axios";
import { Link } from 'react-router-dom';
import { Button } from 'react';


const client = axios.create({
  local_url: "http://localhost:5000" 
});

/**
 * Unfortunately, implementing CRUD required a rewrite of the Items page. The steps are as follows:
 * The old tableData variable has to be global to resolve the promises
 * 
 * Created a new async function (Items cannot be async or React gets mad) that calls 
 * the axios method inside itemData.js
 * 
 * Use a .then method and set the response equal to a new variable
 * Assign that variable to the global tableData variable
 * Return the new variable
 * 
 * For some reason, all three of these steps must be followed to resolve the Promise
 * and also store the value higher up
 * 
 * Call the new async function
 * 
 * Still TODO: Write a funciton that creates the currently hardcoded string of requested data
*/

let tableData = [[]]

const dataNext = async (list_params) => {
    const res = await ReturnedData("READ", list_params, "post")
        .then((response) =>
            {
                const data = response;
                tableData = data
                return data
            }
        ).catch((error) => console.log("error in items.js", error));
    return res;
}

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

    return await client.post(
        '/select_data',
        specifics,
        {
            headers: {
                'Content-Type': 'application/json'
            }
        }
    ).then(
        (response) => JSON.parse(response)
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

    if (action.toUpperCase() === "READ") {

        try {

            // Async call
            const data = await fillData(specifics);

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

export { ReturnedData, dataNext };