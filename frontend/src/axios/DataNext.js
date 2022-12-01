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

import { readData, ReturnedData } from '../axios/crud';


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

// Assign a string to each fetchFunction
// Used in DataNext to select the right fetch func
const fetchFunctionDict = {
    "items": async (...rest) => await fetchItemTableData(...rest),
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
    "translationoutputs": TranslationHeaders,
    "characters_has_items": CharacterItemsHeaders,
    "characters_has_languages": CharacterLanguageHeaders,
    "countries_has_languages": CountryLanguageHeaders,
    "langaugeslanguagerules": LLRHeaders,
}

/*
* Function: DataNext
* Description: An interface func that passes the given parameters
* to downstream functions when getting data from the backend/database.
* Will call the definitions of 
* Params:
*     page: The page you are requesting data for (i.e. "Items", "Games").
*       id: The id # of the data row you want to pass for use in downstream functions
*           (i.e. 1 will select the second row of data to use for say an edit page)
*   append: The append value to pass for some backend SQL append statements
*  purpose: The use for your data (i.e. "READ", "EDIT", "DELETE", "UPDATE")
*
*/
const DataNext = async (page, id = null, append = null, purpose = null, offset = 2) => {
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

    // Get the data with function assigned to the given "page" key
    const dataResults = await fetchFunctionDict[page.toLowerCase()](
        requestedHeaders,
        append,
        purpose,
        id,
        headers,
    )

    console.log("POST RESULTS", dataResults);
    return dataResults;
};

export { DataNext };