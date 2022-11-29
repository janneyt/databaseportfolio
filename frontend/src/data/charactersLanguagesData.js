import Button from '../components/Button';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { ReturnedData } from "../axios/crud.js";

const headers = ["idLanguage", "idCharacter", "Add Language", "Delete Language"];

const fetchCHLTableData = async (Language_params, append, purpose, id) => {

    const list_param = JSON.stringify(Language_params);
    const append_str = JSON.stringify(append);
    // First grab the Languages/ character pairs that are available
    let parameters = JSON.stringify(
      append
        ? '{"columns":' +
            list_param +
            ', "table":"Characters_has_Languages", "append":' +
            append_str +
            "}"
        : '{"columns":' + list_param + ', "table":"Characters_has_Languages"}'
    );
  
    let fetchedData = await ReturnedData("READ", parameters);

    // Debug data returned
    console.log("fetchedData", fetchedData)
    // Set a timeout due to database backup
    for (let index1 = 0; index1 < fetchedData.length; index1++) {
      // Get the character ids based on the ids returned from the earlier query
      if(!fetchedData[index1][0] || !fetchedData[index1][1]){
        fetchedData.slice(index1,1)
        console.log("sliced fetchedData", fetchedData)
        continue
      }
      let append_str1 =
        '"WHERE idCharacter = ' 
      append_str1 = append_str1.concat(fetchedData[index1][0]
          ? fetchedData[index1][0].toString()
          : "-1");
      append_str1 = append_str1.concat('"')
      let character_param = JSON.stringify(
        '{"columns":["characterName"]' +
          ', "table":"Characters", "append":' +
          append_str1 +
          "}"
      );
  
      let append_str2 = '"WHERE idLanguage = ' 
      append_str2 = append_str2.concat(fetchedData[index1][1]
          ? fetchedData[index1][1].toString()
          : "-1")
  
      append_str2 = append_str2.concat('"')
      let language_param = JSON.stringify(
        '{"columns":["languageName"]' +
          ', "table":"Languages", "append":' +
          append_str2 +
          "}"
      );
  
      let fetchedData2 = await ReturnedData("READINTERSECT", character_param, ["characterName"]);
      let fetchedData3 = await ReturnedData("READINTERSECT", language_param, ["languageName"]);
      const character_id = fetchedData[index1][1]
      fetchedData[index1][1] = fetchedData2[0][0];
      fetchedData[index1][0] = fetchedData3[0][0];
      const language_name = fetchedData[index1][0]
      const character_name = fetchedData[index1][1]
      // Add the buttons for the display list, anything inside the push
      // will get added to one cell in the table
      fetchedData[index1].push(
        <Link to="/addLanguageToCharacter" state={{ character : character_name, id : character_id }}>
          <Button>Add Language to Character</Button>
        </Link>
      );
  
      fetchedData[index1].push(
        <Link to="/deleteLanguageFromCharacter" state={{ id: id }}>
          <Button>Delete Language From Character</Button>
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
          name: "Languagename",
          label: "Name Your Language:",
          value: fetchedData[find][1],
        },
        {
          type: "text",
          name: "Languagedescription",
          label: "Describe Your Language",
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
  

const bilboLanguages = [{value:"elvish", label:"Elvish"},
{value:1, label:"Westron"},
{value:2, label:"Sylvan Elvish"},
{value:"null", label:"Null"}
];

// Currently reusing the same Select, this is temporary anyway.
const tableData = [
    ["Bilbo Baggins", <Select options={bilboLanguages}/>],
    ["Frodo Baggins", <Select options={bilboLanguages}/>],
    ["Meriadoc Brandybuck", <Select options={bilboLanguages} />]
];

for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/addLanguageToCharacter"><Button>Add Language</Button></Link>);
    tableData[index].push(<Link to="/deleteLanguageFromCharacter"><Button>Delete Language</Button></Link>);
}

const addFormContents = [
    {type:"select", name:"idLanguage", label:"What language should this character know?", options:bilboLanguages }
];

const deleteFormContents = [
    {type:"hidden", name:"${idLanguage}"}
];


export {headers, tableData, addFormContents, deleteFormContents, fetchCHLTableData};