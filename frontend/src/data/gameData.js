import Button from "../components/Button";
import { Link, useNavigate } from 'react-router-dom';
import { ReturnedData } from "../axios/crud.js";
import { switchGame } from "../functions/buttonFunctions/switchGame";
import axios from "axios";

const client = axios.create({
  baseURL: "http://localhost:60645",
});

const fetchGameTableData = async (item_params, append, purpose, id, headers=null) => {
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

  let fetchedData = await ReturnedData("READ", parameters, headers, 3);
  console.log("fetched data", fetchedData);
  for (let index1 = 0; index1 < fetchedData.length; index1++) {
    // Add the buttons for the display list, anything inside the push
    // will get added to one cell in the table

    //fetchedData[index1].push(<p>Add countries fk here</p>);
    //fetchedData[index1].push(<p>Add players fk here</p>);
    //fetchedData[index1].push(<p>Add languages fk here</p>);
    // Add the buttons for the display list, anything inside the push
    // will get added to one cell in the table
    fetchedData[index1].push(
      <Link to="/" >
        <Button onClick={switchGame} value={fetchedData[index1][0]}>Set Active</Button>
      </Link>
    );
    fetchedData[index1].push(
      <Link to="/editGame" state={{ id: fetchedData[index1][0]  }}>
        <Button>Edit Game</Button>
      </Link>
    );
    fetchedData[index1].push(
      <Link to="/deleteGame" state={{ id: fetchedData[index1][0] }}>
        <Button>Delete Game</Button>
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
        name: "gamename",
        label: "Game Name",
        value: fetchedData[find][1],
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


const deleteFormContents = [{ type: "hidden", name: "${idGame}" }];

export {
  tableData,
  addFormContents,
  deleteFormContents,
  fetchGameTableData,
};
