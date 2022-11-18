import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { ReturnedData } from "../axios/crud.js";

const headers = ["idCountry", "countryName", "sizeInKm", "population","Edit","Delete"];

const fetchCountryTableData = async (item_params, append, purpose, id) => {
    const list_param = JSON.stringify(item_params);
    const append_str = JSON.stringify(append);
  
    let parameters = JSON.stringify(
      append
        ? '{"columns":' +
            list_param +
            ', "table":"Countries", "append":' +
            append_str +
            "}"
        : '{"columns":' + list_param + ', "table":"Countries"}'
    );
  
    let fetchedData = await ReturnedData("READ", parameters);
    for (let index1 = 0; index1 < fetchedData.length; index1++) {
      // Add the buttons for the display list, anything inside the push
      // will get added to one cell in the table
      fetchedData[index1].push(
        <Link to="/editItem" state={{ id: fetchedData[index1][0]  }}>
          <Button>Edit Country</Button>
        </Link>
      );
      fetchedData[index1].push(
        <Link to="/deleteItem" state={{ id: fetchedData[index1][0] }}>
          <Button>Delete Country</Button>
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
    ["USA", " 	9,800,8000 km", "330,000,000", "Fun first game!"],
    ["Underwood", " 	1,000 km", "2", "Fun first game!"],
    ["Pipe", ".1 km", "1", "Fun first game!"]
];

for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/editCountry"><Button>Edit Country</Button></Link>);
    tableData[index].push(<Link to="/deleteCountry"><Button>DeleteCountry</Button></Link>);
    tableData[index].push(<Link to="/countriesHaveLanguages"><Button>Languages</Button></Link>);
}

const addFormContents = [
    {type:"text", name:"countryname", label:"Name Your Country:"},
    {type:"text", name:"sizeinkm", label:"How big is your country (in Km)?:"},
    {type:"text", name:"population", label:"What's your country's population?:"},
];

const editFormContents = [{}];
const deleteFormContents = [{}];


export {headers, tableData, addFormContents,editFormContents, deleteFormContents, fetchCountryTableData};