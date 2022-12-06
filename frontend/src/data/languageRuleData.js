import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { ReturnedData } from "../axios/crud.js";

const headers = ["ruleName", "definition", "Edit", "Delete"];

const fetchLanguageRuleTableData = async (item_params, append, purpose, id) => {
    const list_param = JSON.stringify(item_params);
    const append_str = JSON.stringify(append);
  
    let parameters = JSON.stringify(
      append
        ? '{"columns":' +
            list_param +
            ', "table":"LanguageRules", "append":' +
            append_str +
            "}"
        : '{"columns":' + list_param + ', "table":"LanguageRules"}'
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
        <Link to="/editLanguageRule" state={{ id: fetchedData[index1][0] }}>
          <Button>Edit Item</Button>
        </Link>
      );
      fetchedData[index1].push(
        <Link to="/deleteLanguageRule" state={{ id: fetchedData[index1][0] }}>
          <Button>Delete Item</Button>
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
    ["Change a to e", "Change all occurrences of the letter a to letter e"],
    ["Change b to p", "Loss of vocalization"],
    ["Change g to k", "Loss of vocalization"]
];

// Add the buttons for the display list, anything inside the push
// will get added to one cell in the table
for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/editLanguageRule"><Button>Edit Language Rule</Button></Link>);
    tableData[index].push(<Link to="/deleteLanguageRule"><Button>Delete Language Rule</Button></Link>);
}

const addFormContents = [
    {type:"text", name:"languagerulename", label:"Name Your Language Rule:"},
    {type:"text", name:"languageruledescription", label:"Describe Your Language Rule:"},
];


const editFormContents = [
        {type:"text", name:"languagerulename", label:"Name Your Language Rule:", value:"${languageRuleName}"},
        {type:"text", name:"languageruledescription", label:"Describe Your Language Rule:", value:"${languageRuleDescription"},
];

const deleteFormContents = [
    {type:"hidden", name:"${idLanguageRule}"}
];


export {headers, tableData, addFormContents,editFormContents, deleteFormContents, fetchLanguageRuleTableData };