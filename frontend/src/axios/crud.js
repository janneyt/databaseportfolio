// Axios
import axios from "axios";

// React
import { Link } from 'react-router-dom';

// Components
import Button from '../components/Button';

// Data Imports
import { fetchItemTableData, headers as itemHeaders} from '../data/itemData.js';
import { CharacterHeaders, fetchCharacterTableData } from '../data/charactersData.js';
import { fetchGameTableData, headers as GameHeaders} from '../data/gameData.js';
import { fetchLanguageRuleTableData, headers as LanguageRuleHeaders} from '../data/languageRuleData.js';
import { fetchPlayerTableData, headers as PlayerHeaders } from '../data/playerData.js';
import { fetchCountryTableData, headers as CountryHeaders } from '../data/countryData.js';
import { fetchLanguageTableData, headers as LanguageHeaders } from '../data/languageData.js';
import { fetchTranslationsTableData, headers as TranslationsHeaders } from '../data/translationData.js';
import { fetchCHITableData, headers as CharacterItemHeaders } from '../data/charactersItemsData.js';
import { fetchCHLTableData, headers as CharacterLanguageHeaders } from '../data/charactersLanguagesData.js';
import { fetchCoHLTableData, headers as CountryLanguageHeaders } from '../data/countriesLanguagesData.js';


// Create an axios client to use for all requests
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
        const header_mod = headers
        const itemData = header_mod.slice(0, headers.length - 2)
        const returnedData = await fetchItemTableData(itemData, append ? append : null, purpose ? purpose : null, id);
        return returnedData

    } else if(page_determiner.toLowerCase() === "characters") {
        headers = CharacterHeaders 
        const header_mod = headers
        const characterData = header_mod.slice(0, headers.length - 2)
        const returnedData = await fetchCharacterTableData(characterData, append ? append : null, purpose ? purpose : null, id);
        return returnedData;

    } else if(page_determiner.toLowerCase() === "languagerules") {
        headers = LanguageRuleHeaders 
        const header_mod = headers
        const languageRuleData = header_mod.slice(0, headers.length - 2)
        const returnedData = await fetchLanguageRuleTableData(languageRuleData, append ? append : null, purpose ? purpose : null, id);
        return returnedData;

    } else if(page_determiner.toLowerCase() === "games") {
        headers = GameHeaders
        const header_mod = headers
        const gameData = header_mod.slice(0, headers.length - 2)
        const returnedData = await fetchGameTableData(gameData, append ? append : null, purpose ? purpose : null, id);
        return returnedData;

    } else if(page_determiner.toLowerCase() === "players") {
        headers = PlayerHeaders 
        const header_mod = headers
        const playerData = header_mod.slice(0, headers.length - 2)
        const returnedData = await fetchPlayerTableData(playerData, append ? append : null, purpose ? purpose : null, id);
        return returnedData;

    } else if(page_determiner.toLowerCase() === "countries") {
        headers = CountryHeaders
        const header_mod = headers
        const countryData = header_mod.slice(0, headers.length - 2)
         const returnedData = await fetchCountryTableData(countryData, append ? append : null, purpose ? purpose : null, id);
        return returnedData;

    } else if(page_determiner.toLowerCase() === "languages") {
        headers = LanguageHeaders
        const header_mod = headers
        const languageData = header_mod.slice(0, headers.length - 2)
         const returnedData = await fetchLanguageTableData(languageData, append ? append : null, purpose ? purpose : null, id);
        return returnedData;

    } else if(page_determiner.toLowerCase() === "translationoutputs") {
        headers = TranslationsHeaders
        const header_mod = headers
        const languageData = header_mod.slice(0, headers.length - 2)
        const returnedData = await fetchTranslationsTableData(languageData, append ? append : null, purpose ? purpose : null, id);
        return returnedData;

    } else if(page_determiner.toLowerCase() === "characters_has_items") {
        headers = CharacterItemHeaders
        const header_mod = headers
        const charItemData = header_mod.slice(0, headers.length - 2)
        const returnedData = await fetchCHITableData(charItemData, append ? append : null, purpose ? purpose : null, id);

        return returnedData;
    } else if(page_determiner.toLowerCase() === "characters_has_languages") {
        headers = CharacterLanguageHeaders
        const header_mod = headers
        const charLangData = header_mod.slice(0, headers.length - 2)
        const returnedData = await fetchCHLTableData(charLangData, append ? append : null, purpose ? purpose : null, id);

        return returnedData;
    } else if(page_determiner.toLowerCase() === "countries_has_languages") {
        headers = CountryLanguageHeaders
        const header_mod = headers
        const countryLangData = header_mod.slice(0, headers.length - 2)

        // Debug headers
        console.log("country lang data debug",countryLangData)
        const returnedData = await fetchCoHLTableData(countryLangData, append ? append : null, purpose ? purpose : null, id);

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

const updateData = async (page, updates, append, id) => {
    if(!page){
        throw new Error("Page could not be determined.")
    }
    try {
        // Debug log
        console.log("UPDATES", updates)

        // Create specifics, or JSON table format
        const specifics = JSON.stringify( {
            "table":page,
            "columns": updates.current["columns"],
            "values": updates.current["values"],
            "filter": append
        })
        console.log(specifics)
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
    console.log("id", id)
    console.log("filter",filter)

    // This is needed to make sure deleteData is working with the right headers
    const update_header = Array.from(headers)
        const indexer = update_header.indexOf("Edit");

        update_header.splice(indexer, 1)

        const indexer1 = update_header.indexOf("Delete")

        update_header.splice(indexer1, 1)

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

const readData = async (specifics, tables) => {
    console.log("SPECIFICS", specifics)
    const old_headers = headers
    if(tables){
        headers = tables
    }

    try {

        await fillData(specifics).then(
            (response) => {
                data = response
                return response
            }
        )

        console.log("Data returned into filledData", data);
        console.log("headers after data returned", headers);

        // Weird asynchronous bug requires resetting headers so first select for intersection table succeeds.
        if(tables){
            old_headers = headers;
            headers = tables;
        }
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

                // Debug filled Data going into for loop
                console.log("data at index", data[index])

                // Debug keys
                console.log("keys at this point: ", keys)
                
                // Put the filled Data in the right spot in the header
                for (let header_element = 0; header_element < headers.length; header_element++) {

                    // Debug if keys and headers have the same header name
                    console.log("keys at element", keys[element])
                    console.log("headers at header_element", headers[header_element])

                    if (keys[element] === headers[header_element]) {

                        // Prove data is here
                        console.log("data at key and element", data[index][keys[element]])
                        

                        filledData[index][header_element] = data[index][keys[element]]
                        
                        // Debug filledData for assignment issues
                        console.log("filledData index header_element", filledData[index][header_element])

                    }
                }

            }
            const id = filledData[index][0]
            

        };

        // Debug the headers switching back to their original state
        headers = old_headers
        console.log("headers", headers)

        // Debug filledData
        console.log("filledData", filledData)
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
        console.log("specifics in Fill Data", specifics)
        const response = await client.post(
            '/select_data',
            specifics,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        console.log("response in fillData", data)
        data = response.data;
        
        return response.data;
    } catch (error) {
        console.log(error);
        data = [[]];
        return error;
    }
}

const ReturnedData = async (action, specifics, tables) => {

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
        return updateData(specifics, );


    } else if(action.toUpperCase() === "READINTERSECT"){
        // We have to change the headers as the intersection tables need to read from two different tables
        console.log("Entering readData for intersection tables")
        return await readData(specifics, tables)
    }

};

export { DataNext, ReturnedData, keys, updateData, insertData, deleteData, readData };