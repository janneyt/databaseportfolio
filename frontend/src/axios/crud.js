import axios from "axios";
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { fetchItemTableData, headers as itemHeaders} from '../data/itemData.js';
import { CharacterHeaders, fetchCharacterTableData } from '../data/charactersData.js';
import { fetchGameTableData, headers as GameHeaders} from '../data/gameData.js';

const client = axios.create({
    baseURL: "http://localhost:60645"
});

let keys = [null]

let data = [[]]

let headers = [];

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

const DataNext = async (page_determiner, append, purpose, id) => {
    /**
     * This is an interface to fit between Items and itemData. It's meant to make
     * all pages be able to call dataNext, which will then decide which data page to call
     */
    if (!page_determiner) {
        throw new Error("Please provide the page name for your data transfer");
    } else if (page_determiner.toLowerCase() === "items") {
        headers = itemHeaders
        const header_len = headers.length
        const header_mod = headers
        const itemData = header_mod.slice(0, header_len - 4)
        

        /* Head off to itemData, which will also call functions in this file as well */
        const returnedData = await fetchItemTableData(itemData, append ? append : null, purpose ? purpose : null, id);
        console.log("returned data in crud", returnedData)
        return returnedData
    } else if(page_determiner.toLowerCase() === "characters"){
        headers = CharacterHeaders 
        const header_len = headers.length
        const header_mod = headers
        const characterData = header_mod.slice(0, header_len - 5)

        const returnedData = await fetchCharacterTableData(characterData, append ? append : null, purpose ? purpose : null, id);
        return returnedData;
    } else if(page_determiner.toLowerCase() === "games"){
        headers = GameHeaders 
        const header_len = headers.length
        const header_mod = headers
        const gameData = header_mod.slice(0, header_len - 5)

        const returnedData = await fetchGameTableData(gameData, append ? append : null, purpose ? purpose : null, id);
        return returnedData;
    }


}

const insertData = async (table, submitData, append="") => {
    try {
        const specifics = {
            "table":table,
            "columns":submitData["columns"],
            "values":submitData["values"],
            "append":append
        }
        
        return client.post(
            '/insert_data',
            specifics,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(
            (response) => { return response.data }
        )

    } catch {

    }


;}

const updateData = async (page, updates, append) => {
    if(!page){
        throw new Error("Page could not be determined.")
    }
    try {
        const header_len = itemHeaders.length
        const header_mod = itemHeaders
        const columns = header_mod.slice(1, header_len - 4)
        const values = [];
        for(const value of updates){
            values.push(value)
        }
        const specifics = {
            "table":page,
            "columns":columns,
            "values": values,
            "filter": append
        }
        return client.post(
            '/update_data',
            specifics,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        ).then(
            (response) => { return response.data }
        ).catch((error) => console.log(error))
    } catch {

    }
}

const deleteData = async (table, id, filter) => {

    // Why pass id? Because I want to make a check here that the id is valid, i.e. greater than -1.
    try{
        if(!table || ! id || id === -1){
            throw new Error("Could not delete due to missing information, try again.")
        }
        const specifics = {
            "table": table,
            filters: filter
        };
        return client.post(
            '/delete_data',
            specifics,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch (error) {
        console.log(error);
    }
}

const readData = async (specifics) => {
    try {

        await fillData(specifics).then(
            (response) => {
                data = response
                return response
            }
        )



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
            keys = Object.keys(data[index]);

            // filledData does not necessarily have an existing member at *index*
            filledData[index] = []

            // This is where I iterate over the keys and place the values in filledData
            for (let element = 0; element < keys.length; element++) {


                // Put the filled Data in the right spot in the header
                for (let header_element = 0; header_element < headers.length; header_element++) {

                    if (keys[element] === headers[header_element]) {

                        filledData[index][header_element] = data[index][keys[element]]

                    }
                }

            }
            const id = filledData[index][0]
            // Placeholders for future FKs
            // Have to parameterize this via calling the foreign key array I'm creating
            filledData[index].push("Game 1")
            filledData[index].push("The Shire")


            // Add the buttons for the display list, anything inside the push
            // will get added to one cell in the table
            filledData[index].push(<Link to="/editItem" state={{id: id}} ><Button>Edit Item</Button></Link>);
            filledData[index].push(<Link to="/deleteItem" state={{id: id}}><Button>DeleteItem</Button></Link>);

        };

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
        filledData[0].push(<Link to="/editItem" state={{ id: 0 }}><Button>Edit Item</Button></Link>);
        filledData[0].push(<Link to="/deleteItem"><Button>DeleteItem</Button></Link>);

        console.log(error);
        return filledData
    }


};




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
    
    try {
        console.log("specifics for showing data", specifics);
        const response = await client.post(
            '/select_data',
            specifics,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );

        data = response.data;
        return response.data;
    } catch (error) {
        console.log(error);
        data = [[]];
        return error;
    }
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
        throw new Error("Please convert to proper JSON format. Thrown by your friendly Returned Data.")
    }

    // Promises require me to put a bunch of placeholder/default values
    // There's probably a more elegant way to do this but I don't want to break it

    if (action.toUpperCase() === "READ") {
        return await readData(specifics);

    } else if (action.toUpperCase() === "UPDATE") {
        return updateData(specifics);


    }

};

export { DataNext, ReturnedData, keys, updateData, insertData, deleteData, readData };