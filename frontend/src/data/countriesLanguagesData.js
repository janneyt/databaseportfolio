import Button from '../components/Button';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { ReturnedData } from "../axios/crud.js";

const headers = ["idLanguage", "idCountry", "Add Language", "Delete Language"];

const fetchCoHLTableData = async (language_params, append, purpose, id) => {

    const list_param = JSON.stringify(language_params);
    const append_str = JSON.stringify(append);
    // First grab the Languages/ character pairs that are available
    let parameters = JSON.stringify(
      append
        ? '{"columns":' +
            list_param +
            ', "table":"Countries_has_Languages", "append":' +
            append_str +
            "}"
        : '{"columns":' + list_param + ', "table":"Countries_has_Languages"}'
    );
  
    let fetchedData = await ReturnedData("READ", parameters);

    // Debug data returned
    console.log("fetchedData", fetchedData)
    // Set a timeout due to database backup
    for (let index1 = 0; index1 < fetchedData.length; index1++) {
      // Get the character ids based on the ids returned from the earlier query
      if(!fetchedData[index1][0] || !fetchedData[index1][1]){
        fetchedData.slice(index1,1)
        continue
      }
      let append_str1 =
        '"WHERE idCountry = ' 
      append_str1 = append_str1.concat(fetchedData[index1][0]
          ? fetchedData[index1][0].toString()
          : "-1");
      append_str1 = append_str1.concat('"')
      let country_param = JSON.stringify(
        '{"columns":["countryName"]' +
          ', "table":"Countries", "append":' +
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
  
      let fetchedData2 = await ReturnedData("READINTERSECT", country_param, ["countryName"]);
      let fetchedData3 = await ReturnedData("READINTERSECT", language_param, ["languageName"]);

      // Debug language and character data
      console.log("Language: ",fetchedData3)
      console.log("Country: ", fetchedData2)

      const country_id = fetchedData[index1][1]
      fetchedData[index1][1] = fetchedData2[0][0];
      fetchedData[index1][0] = fetchedData3[0][0];
      const language_name = fetchedData[index1][0]
      const country_name = fetchedData[index1][1]
      // Add the buttons for the display list, anything inside the push
      // will get added to one cell in the table
      fetchedData[index1].push(
        <Link to="/addLanguageToCountry" state={{ country : country_name, id : country_id }}>
          <Button>Add Language to Character</Button>
        </Link>
      );
  
      fetchedData[index1].push(
        <Link to="/deleteLanguageFromCountry" state={{ id: id }}>
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

const countryLanguages = [{value:"countrylanguages", label:"{$languageName}"},
{value:"westron", label:"Westron"},
{value:"sylvanelvish", label:"Sylvan Elvish"},
{value:"None", label:"Null"}
];

// Currently reusing the same Select, this is temporary anyway.
const tableData = [
    ["${countryName}", <Select options={countryLanguages}/>],
    ["USA", <Select options={countryLanguages}/>],
    ["Gondor", <Select options={countryLanguages} />]
];

for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/addLanguageToCountry"><Button>Add Language</Button></Link>);
    tableData[index].push(<Link to="/deleteLanguageFromCountry"><Button>Delete Language</Button></Link>);
}

const addFormContents = [
    {type:"select", name:"languages", label:"What language should be assigned to country?", options:countryLanguages }
];

const deleteFormContents = [
    {type:"hidden", name:"${idLanguage}"}
];


export {headers, tableData, addFormContents, deleteFormContents, fetchCoHLTableData};