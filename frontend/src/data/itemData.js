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

// Setup the headers
const headers = ["Item ID", "Name", "Description", "Edit", "Delete"];

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

export { headers, addFormContents, editFormContents, deleteFormContents };