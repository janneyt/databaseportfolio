import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { ReturnedData } from "../axios/crud.js";

const headers = ["idLanguage", "languageName", "languageDescription", "Edit", "Delete"];

const fetchLanguageTableData = async (item_params, append, purpose, id, headers=null) => {
    const list_param = JSON.stringify(item_params);
    const append_str = JSON.stringify(append);
  
    let parameters = JSON.stringify(
      append
        ? '{"columns":' +
            list_param +
            ', "table":"Languages", "append":' +
            append_str +
            "}"
        : '{"columns":' + list_param + ', "table":"Languages"}'
    );
  
    let fetchedData = await ReturnedData("READ", parameters, headers);
    for (let index1 = 0; index1 < fetchedData.length; index1++) {
      // Add the buttons for the display list, anything inside the push
      // will get added to one cell in the table
      fetchedData[index1].push(
        <Link to="/editLanguage" state={{ id: fetchedData[index1][0]  }}>
          <Button>Edit Language</Button>
        </Link>
      );
      fetchedData[index1].push(
        <Link to="/deleteLanguage" state={{ id: fetchedData[index1][0]  }}>
          <Button>Delete Language</Button>
        </Link>
      );
    }
  
    if (purpose && purpose.toLowerCase() === "edit") {
      console.log("fetchedData", fetchedData);
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
          name: "languagename",
          label: "Name Your Language:",
          value: fetchedData[find][1],
        },
        {
          type: "text",
          name: "languagedescription",
          label: "Describe Your Language",
          value: fetchedData[find][2],
        },
        // {
        //   type: "text",
        //   name: "gamename",
        //   label: "Game Name",
        //   value: fetchedData[find][3],
        // },
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
    ["English", "The language that rifles your pockets for spare vocabulary and grammar", "Fun first language!"],
    ["Spanish", "What the Romans would speak today if they hadn't lost the empire"],
    ["Italian", "No, the Romans were from Italia, they'd speak Italian"],
    ["Romanian", "Guys, it is literally in our name."]
];

// Add the buttons for the display list, anything inside the push
// will get added to one cell in the table
for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/editLanguage"><Button>Edit Language</Button></Link>);
    tableData[index].push(<Link to="/deleteLanguage"><Button>Delete Language</Button></Link>);
}

const optionsLanguageRules = [
    {value:"a to e" , label:"Change a to e"}
]

const addFormContents = [
    {type:"text", name:"languagename", label:"Name Your Language:"},
    {type:"text", name:"languagedescription", label:"Describe Your Language:"},
    {type:"select", name:"languagerules", label:"Language Rules Available", options:optionsLanguageRules }
];


const editFormContents = [
    {type:"text", name:"languagename", label:"Name Your Language:", value:"${languageName}"},
    {type:"text", name:"languagedescription", label:"Describe Your Language:", value:"${languageDescription}"},
    {type:"text", name:"gamename", label:"Game Name (${Pulls game name from game id})", value:"${gameName}"}
];

const deleteFormContents = [
    {type:"hidden", name:"${idLanguage}"}
];


export {headers, tableData, addFormContents,editFormContents, deleteFormContents, fetchLanguageTableData};