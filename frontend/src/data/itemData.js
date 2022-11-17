import { ReturnedData, keys } from '../axios/crud.js';
/**
 * I had to entirely rewrite itemData to allow it to make asynchronous POST calls
 * The scoping for each item is incredibly important
 * 
 * I'll explain how I had to rewrite the function below, but I will note one of the major
 * TODOs left: setup an AXIOS config at the project level so the local_url is not hardcoded
 */

const headers = ["idItem", "itemName", "itemDescription", "Game", "Country", "Edit", "Delete"];

const fetchItemTableData = async (item_params, append, purpose, id) => {

    const list_param = JSON.stringify(item_params)
    const append_str = JSON.stringify(append)

    let parameters = JSON.stringify(
        append ? '{"columns":' + list_param + ', "table":"Items", "append":' + append_str + '}' : '{"columns":' + list_param + ', "table":"Items"}'
    );

    let fetchedData = await ReturnedData("READ", parameters);


    if (purpose && purpose.toLowerCase() === "edit") {
        let find = 0
        for(let indexing = 0; indexing < fetchedData.length; indexing++){
            if(fetchedData[indexing][0] === id){
                find = indexing
            }
        }
        const editFormContents = [
            // TODO: dynamically generate fetchedData's indices, instead of hardcoding
            { type: "text", name: "itemname", label: "Name Your Item:", value: fetchedData[find][1] },
            { type: "text", name: "itemdescription", label: "Describe Your Item", value: fetchedData[find][2] },
            { type: "text", name: "gamename", label: "Game Name", value: fetchedData[find][3] },

        ];

        fetchedData = editFormContents

        return editFormContents
    }

    return fetchedData

};

// As in the original setup
const addFormContents = [
    { type: "text", name: "itemname", label: "Name Your Item:" },
    { type: "text", name: "itemdescription", label: "Describe Your Item:" },
    { type: "text", name: "idgame", label: "Game Name (${Pulls game name from game id})" },
    { type: "text", name: "idcountry", label: "Player Name *${Pulls player name from player id}" }
];

const editFormContents = [
    { type: "text", name: "itemname", label: "Name Your Item:", value: "${itemName}" },
    { type: "text", name: "itemdescription", label: "Describe Your Item", value: "${itemDescription}" },
    { type: "text", name: "gamename", label: "Game Name (${Pulls game name from game id})", value: "${gameName}" },

];

const deleteFormContents = [
    { type: "hidden", name: "${idItem}" }
];


export { headers, fetchItemTableData, addFormContents, editFormContents, deleteFormContents };

