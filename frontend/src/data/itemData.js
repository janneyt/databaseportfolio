import { ReturnedData } from '../axios/crud.js';
/**
 * I had to entirely rewrite itemData to allow it to make asynchronous POST calls
 * The scoping for each item is incredibly important
 * 
 * I'll explain how I had to rewrite the function below, but I will note one of the major
 * TODOs left: setup an AXIOS config at the project level so the local_url is not hardcoded
 */


const headers = ["idItem", "itemName", "itemDescription", "Game", "Country", "Edit", "Delete"];

const fetchItemTableData = (item_params, append, purpose) => {
    const list_param = JSON.stringify(item_params)
    const append_str = JSON.stringify(append)

    let parameters = JSON.stringify(
        append ? '{"columns":' + list_param + ', "table":"Items", "append":"' + append + '"}' : '{"columns":' + list_param + ', "table":"Items"}'
    );
    let fetchedData = ReturnedData("READ", parameters);


    if (purpose && purpose.toLowerCase() === "edit") {
        console.log("before editFormContents", fetchedData)
        const editFormContents = [
            { type: "text", name: "itemname", label: "Name Your Item:", value: fetchedData[0][1] },
            { type: "text", name: "itemdescription", label: "Describe Your Item", value: fetchedData[0][2] },
            { type: "text", name: "gamename", label: "Game Name", value: fetchedData[0][3] },

        ];
        console.log("post editFormContents", fetchedData)
        
        fetchedData = editFormContents

        return editFormContents
    }

    return fetchedData

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



export { headers, fetchItemTableData, addFormContents, editFormContents, deleteFormContents };