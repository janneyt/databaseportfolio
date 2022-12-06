// Import fetch functions
import { fetchCharacterTableData } from "../data/charactersData";
import { fetchCHITableData } from "../data/charactersItemsData";
import { fetchCHLTableData } from "../data/charactersLanguagesData";
import { fetchCoHLTableData } from "../data/countriesLanguagesData";
import { fetchCountryTableData } from "../data/countryData";
import { fetchGameTableData } from "../data/gameData";
import { fetchItemTableData } from "../data/itemData";
import { fetchLanguageTableData } from "../data/languageData";
import { fetchLanguageRuleTableData } from "../data/languageRuleData";
import { fetchLLRTableData } from "../data/languagesLanguageRulesData";
import { fetchPlayerTableData } from "../data/playerData";
import { fetchTranslationsTableData } from "../data/translationData";


// Import the header defenitions for each page
// Determines the columns for the rows in each table and
// what data values to query for in the SQL
import {
    CharacterItemsHeaders,
    CharacterHeaders,
    CharacterLanguageHeaders,
    CountryHeaders,
    CountryLanguageHeaders,
    GameHeaders,
    ItemHeaders,
    LanguageHeaders,
    PlayerHeaders,
    LanguageRuleHeaders,
    LLRHeaders,
    TranslationHeaders} from '../data/headers';

import { getCurrentGame } from "../functions/gameFunctions";

// Assign a string to each fetchFunction
// Used in DataNext to select the right fetch func
const fetchFunctionDict = {
    "items": fetchItemTableData,
    "characters": fetchCharacterTableData,
    "languagerules": fetchLanguageRuleTableData,
    "games": fetchGameTableData,
    "players": fetchPlayerTableData,
    "countries": fetchCountryTableData,
    "languages": fetchLanguageTableData,
    "translationoutputs": fetchTranslationsTableData,
    "characters_has_items": fetchCHITableData,
    "characters_has_languages": fetchCHLTableData,
    "countries_has_languages": fetchCoHLTableData,
    "langaugeslanguagerules": fetchLLRTableData,
}

// Dict of headers with strings assigned to
// each header to be used in DataNext
const headerDict = {
    "items": ItemHeaders,
    "characters": CharacterHeaders,
    "languagerules": LanguageRuleHeaders,
    "games": GameHeaders,
    "players": PlayerHeaders,
    "countries": CountryHeaders,
    "languages": LanguageHeaders,
    "characters_has_items": CharacterItemsHeaders,
    "characters_has_languages": CharacterLanguageHeaders,
    "countries_has_languages": CountryLanguageHeaders,
}

// Used when filtering for content of a table
// within a specified game
const filterGame = {
    "items": true,
    "characters": true,
    "languagerules": true,
    "games": true,
    "players": true,
    "countries": true,
    "languages": true,
    "characters_has_items": false,
    "characters_has_languages": false,
    "countries_has_languages": false,
}

// Settings for games
const gameSettings = {'current': getCurrentGame()};

/*
* Function: DataNext
* Description: An interface func that passes the given parameters
* to downstream functions when getting data from the backend/database.
* Will call the definitions of the proper fetch function and get
* the proper headers.
* Params:
*     page: The page you are requesting data for (i.e. "Items", "Games").
*           (i.e. 1 will select the second row of data to use for say an
*           edit page)
*   append: The append value to pass for some backend SQL append statements
*  purpose: The use for your data (i.e. "READ", "EDIT", "DELETE", "UPDATE")
*       id: The id # of the data row you want to pass for use in 
*           downstream functions
*
*/
const DataNext = async (page, append = null, purpose = "READ", id = null, offset = 2) => {
    if (!page) {
        throw new Error("Please provide a page name for your data transfer.");
    }

    // Get the right header according to the page parameter passed
    const headers = headerDict[page.toLowerCase()];

    // Ensure that a header definition in the dictionary is found
    if (headers == undefined) {
        throw new Error("Headers with given page name don't exist.");
    }

    // Prepare the headers by slicing the buttons off the given headers
    // array
    const requestedHeaders = headers.slice(0, headers.length - offset);

    // Get an updated current game
    gameSettings.current = getCurrentGame();

    // Append a game filter feature
    if (gameSettings.current > 0 && filterGame[page.toLowerCase()] && page.toLowerCase() !== "games") {
        if (append) {
            append = append + ' AND idgame = ' + gameSettings.current;
        } else {
            append = 'WHERE idgame = ' + gameSettings.current;
        };
    }

    // Get the data with function assigned to the given "page" key
    const dataResults = await fetchFunctionDict[page.toLowerCase()](
        requestedHeaders,
        append,
        purpose,
        id,
        headers,
    )

    if(!dataResults) {
        const dataResults = [];
        for(const data of headers){
            dataResults.push(["No data returned"])
        }
        return dataResults;
    };
    return dataResults;
};

export { DataNext };