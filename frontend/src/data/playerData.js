import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { ReturnedData } from "../axios/crud.js";

const fetchPlayerTableData = async (item_params, append, purpose, id, headers=null) => {
    const list_param = JSON.stringify(item_params);
    const append_str = JSON.stringify(append);
  
    let parameters = JSON.stringify(
      append
        ? '{"columns":' +
            list_param +
            ', "table":"Players", "append":' +
            append_str +
            "}"
        : '{"columns":' + list_param + ', "table":"Players"}'
    );
  
    let fetchedData = await ReturnedData("READ", parameters, headers);
    for (let index1 = 0; index1 < fetchedData.length; index1++) {
      // Add the buttons for the display list, anything inside the push
      // will get added to one cell in the table
      fetchedData[index1].push(
        <Link to="/editPlayer" state={{ id: fetchedData[index1][0]  }}>
          <Button>Edit Player</Button>
        </Link>
      );
      fetchedData[index1].push(
        <Link to="/deletePlayer" state={{ id: fetchedData[index1][0]  }}>
          <Button>Delete Player</Button>
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
          name: "playername",
          label: "Name Your Player:",
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
  

const addFormContents = [
    {type:"text", name:"playername", label:"Name Your Player:"}
];

const editFormContents = [
    {type:"text", name:"playername", label:"Name Your Player:", value:"${playerName}"}
];

const deleteFormContents = [
    {type:"hidden", name:"${idPlayer}"}
];


export {addFormContents,editFormContents, deleteFormContents, fetchPlayerTableData};