import { ReturnedData } from "../axios/crud.js";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "../components/Button";

/**
 * I had to entirely rewrite itemData to allow it to make asynchronous POST calls
 * The scoping for each item is incredibly important
 *
 * I'll explain how I had to rewrite the function below, but I will note one of the major
 * TODOs left: setup an AXIOS config at the project level so the local_url is not hardcoded
 */

const client = axios.create({
  baseURL: "http://localhost:60645",
});

const foreignKeys = ["Games"];

const countryHeaders = [
  "Name",
  "Size in Km",
  "Population",
  "Game",
  "Edit",
  "Delete",
  "Languages",
];
const playerHeaders = ["playerName", "Edit", "Delete"];
const gameHeaders = [
  "gameName",
  "idCountry",
  "idPlayer",
  "idLanguage",
  "Edit",
  "Delete",
];
const headers = [
  "idItem",
  "itemName",
  "itemDescription",
  "Edit",
  "Delete",
];

const fetchItemTableData = async (item_params, append, purpose, id) => {
  const list_param = JSON.stringify(item_params);
  const append_str = JSON.stringify(append);

  let parameters = JSON.stringify(
    append
      ? '{"columns":' +
          list_param +
          ', "table":"Items", "append":' +
          append_str +
          "}"
      : '{"columns":' + list_param + ', "table":"Items"}'
  );

  let fetchedData = await ReturnedData("READ", parameters);

  for (let index1 = 0; index1 < fetchedData.length; index1++) {
    // Add the buttons for the display list, anything inside the push
    // will get added to one cell in the table
    //fetchedData[index1].push(<p>Add game fk here</p>);
    //fetchedData[index1].push(<p>Add country fk here</p>);
    // Add the buttons for the display list, anything inside the push
    // will get added to one cell in the table
    fetchedData[index1].push(
      <Link to="/editItem" state={{ id: id }}>
        <Button>Edit Item</Button>
      </Link>
    );
    fetchedData[index1].push(
      <Link to="/deleteItem" state={{ id: id }}>
        <Button>DeleteItem</Button>
      </Link>
    );
  }

  if (purpose && purpose.toLowerCase() === "edit") {
    let find = 0;
    for (let indexing = 0; indexing < fetchedData.length; indexing++) {
      if (fetchedData[indexing][0] === id) {
        find = indexing;
      }
    }
    const editFormContents = [
      // TODO: dynamically generate fetchedData's indices, instead of hardcoding
      {
        type: "text",
        name: "itemname",
        label: "Name Your Item:",
        value: fetchedData[find][1],
      },
      {
        type: "text",
        name: "itemdescription",
        label: "Describe Your Item",
        value: fetchedData[find][2],
      },
      {
        type: "text",
        name: "gamename",
        label: "Game Name",
        value: fetchedData[find][3],
      },
    ];

    fetchedData = editFormContents;

    return editFormContents;
  } else if (purpose && purpose.toLowerCase() === "delete") {
    const deleteFormContents = [
      // TODO: dynamically generate fetchedData's indices, instead of hardcoding

      {
        type: "text",
        name: fetchedData[0][1],
        value: fetchedData[0][1],
        disabled: true,
      },
    ];

    fetchedData = deleteFormContents;

    return deleteFormContents;
  }

  return fetchedData;
};

const pullForeignKeys = (page) => {
  const header = page === "Games" ? gameHeaders : playerHeaders;
  let options = [];
  const data =
    header === gameHeaders
      ? header.slice(0, gameHeaders.length - 5)
      : header.slice(0, playerHeaders.length - 2);
  const specifics = {
    table: page === "Games" ? "Games" : "Players",
    columns: data,
  };

  client
    .post("/select_data", specifics, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      let additional = {};
      for (const item of response.data) {
        additional = {
          value: item.gameName
            ? item.gameName
            : item.characterName
            ? item.characterName
            : item.playerName,
          label: item.gameName
            ? item.gameName
            : item.characterName
            ? item.characterName
            : item.playerName,
        };
        options.push(additional);
      }

    })
    .catch((error) => console.log(error));

  return options;
};

// As in the original setup
const addFormContents = [
  { type: "text", name: "itemname", label: "Name Your Item:" },
  { type: "text", name: "itemdescription", label: "Describe Your Item:" },
  // {
  //   type: "select",
  //   name: "idgame",
  //   label: "Game Name (${Pulls game name from game id})",
  //   options: pullForeignKeys("Games"),
  // },
  // {
  //   type: "select",
  //   name: "idplayer",
  //   label: "Player Name *${Pulls player name from player id}",
  //   options: pullForeignKeys("Players"),
  // },
];

const editFormContents = [
  {
    type: "text",
    name: "itemname",
    label: "Name Your Item:",
    value: "${itemName}",
  },
  {
    type: "text",
    name: "itemdescription",
    label: "Describe Your Item",
    value: "${itemDescription}",
  },
  {
    type: "text",
    name: "gamename",
    label: "Game Name (${Pulls game name from game id})",
    value: "${gameName}",
  },
];

const deleteFormContents = [{ type: "hidden", name: "${idItem}" }];

export {
  headers,
  fetchItemTableData,
  addFormContents,
  editFormContents,
  deleteFormContents,
};
