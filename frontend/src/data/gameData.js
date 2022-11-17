import Button from "../components/Button";
import { Link } from "react-router-dom";
import { ReturnedData } from "../axios/crud.js";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:60645",
});

const headers = [
  "gameName",
  "Edit",
  "Delete",
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
const countryHeaders = [
  "countryName",
  "sizeInKm",
  "population",
  "Game",
  "Edit",
  "Delete",
  "Languages",
];

let options = [];
const pullForeignKeys = (page, id) => {
  const header =
    page === "Games"
      ? gameHeaders
      : page === "Players"
      ? playerHeaders
      : countryHeaders;
  const data =
    header === gameHeaders
      ? header.slice(0, gameHeaders.length - 5)
      : header === playerHeaders
      ? header.slice(0, playerHeaders.length - 2)
      : header.slice(0, countryHeaders.length - 4);
  const specifics = {
    table:
      page === "Games" ? "Games" : page === "Players" ? "Players" : "Countries",
    columns: data,
    filter: " idGame = " + id.toString(),
  };
  return client
    .post("/select_data", specifics, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      for (const item of response.data) {
        let additional = {};
        additional = {
          value: item.gameName
            ? item.gameName
            : item.playerName
            ? item.playerName
            : item.countryName,

          label: item.gameName
            ? item.gameName
            : item.playerName
            ? item.playerName
            : item.countryName,
        };
        options.push(additional);
      }
      console.log("options before", options);
      return response;
    })
    .catch((error) => console.log(error));

};

const fetchGameTableData = async (item_params, append, purpose, id) => {
  const list_param = JSON.stringify(item_params);
  const append_str = JSON.stringify(append);

  let parameters = JSON.stringify(
    append
      ? '{"columns":' +
          list_param +
          ', "table":"Games", "append":' +
          append_str +
          "}"
      : '{"columns":' + list_param + ', "table":"Games"}'
  );

  let fetchedData = await ReturnedData("READ", parameters);
  for (let index1 = 0; index1 < fetchedData.length; index1++) {
    // Add the buttons for the display list, anything inside the push
    // will get added to one cell in the table

    //fetchedData[index1].push(<p>Add countries fk here</p>);
    //fetchedData[index1].push(<p>Add players fk here</p>);
    //fetchedData[index1].push(<p>Add languages fk here</p>);
    // Add the buttons for the display list, anything inside the push
    // will get added to one cell in the table
    fetchedData[index1].push(
      <Link to="/editItem" state={{ id: fetchedData[index1][0]  }}>
        <Button>Edit Item</Button>
      </Link>
    );
    fetchedData[index1].push(
      <Link to="/deleteItem" state={{ id: fetchedData[index1][0] }}>
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

const tableData = [
  ["Fun first game!"],
  ["Once again, brilliant game!"],
  ["Bit repetitious innit? Third time through"],
];

// Add the buttons for the display list, anything inside the push
// will get added to one cell in the table
for (let index = 0; index < tableData.length; index++) {
  tableData[index].push(
    <Link to="/countries">
      <Button>Countries</Button>
    </Link>
  );
  tableData[index].push(
    <Link to="/players">
      <Button>Players</Button>
    </Link>
  );
  tableData[index].push(
    <Link to="/languages">
      <Button>Languages</Button>
    </Link>
  );
  tableData[index].push(
    <Link to="/editGame">
      <Button>Edit Game</Button>
    </Link>
  );
  tableData[index].push(
    <Link to="/deleteGame">
      <Button>DeleteGame</Button>
    </Link>
  );
}

const addFormContents = [
  { type: "text", name: "gamename", label: "Name Your Game:" },
];

const editFormContents = [
  {
    type: "text",
    name: "gamename",
    label: "Name Your Game:",
    value: "${gameName}",
  },
];

const deleteFormContents = [{ type: "hidden", name: "${idGame}" }];

export {
  headers,
  tableData,
  addFormContents,
  editFormContents,
  deleteFormContents,
  fetchGameTableData,
};
