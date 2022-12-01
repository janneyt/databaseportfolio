import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { ReturnedData } from '../axios/crud.js';
import axios from "axios";

const client = axios.create({
    baseURL: "http://localhost:60645",
  });

const fetchCharacterTableData = async (item_params, append, purpose, id, headers=null) => {

    const list_param = JSON.stringify(item_params)
    const append_str = JSON.stringify(append)

    let parameters = JSON.stringify(
        append ? '{"columns":' + list_param + ', "table":"Characters", "append":' + append_str + '}' : '{"columns":' + list_param + ', "table":"Characters"}'
    );

    let fetchedData = await ReturnedData("READ", parameters, headers);

    for (let index1 = 0; index1 < fetchedData.length; index1++) {
        // Add the buttons for the display list, anything inside the push
        // will get added to one cell in the table
    
        //fetchedData[index1].push(<p>Add countries fk here</p>);
        //fetchedData[index1].push(<p>Add players fk here</p>);
        //fetchedData[index1].push(<p>Add languages fk here</p>);
        // Add the buttons for the display list, anything inside the push
        // will get added to one cell in the table
        fetchedData[index1].push(
          <Link to="/editCharacter" state={{ id: fetchedData[index1][0] }}>
            <Button>Edit Character</Button>
          </Link>
        );
        fetchedData[index1].push(
          <Link to="/deleteCharacter" state={{ id: fetchedData[index1][0]  }}>
            <Button>DeleteCharacter</Button>
          </Link>
        );
      }
    

    if (purpose && purpose.toLowerCase() === "edit") {
        let find = 0
        for(let indexing = 0; indexing < fetchedData.length; indexing++){
            if(fetchedData[indexing][0] === id){
                find = indexing
            }
        }
        const editFormContents = [
            // TODO: dynamically generate fetchedData's indices, instead of hardcoding
            { type: "text", name: "characterName", label: "Name Your Character:", value: fetchedData[find][1] },
            { type: "text", name: "characterDescription", label: "Describe Your Character", value: fetchedData[find][2] },
            // { type: "text", name: "gamename", label: "Game Name", value: fetchedData[find][3] },

        ];

        fetchedData = editFormContents

        return editFormContents
    }
    else if (purpose && purpose.toLowerCase() === "delete") {
        console.log("FETCHED DATA", fetchedData);
        const deleteFormContents = [
            // TODO: dynamically generate fetchedData's indices, instead of hardcoding
            
            { type: "text", name: fetchedData[0][1], value: fetchedData[0][1], disabled:true }
            
        ];
        fetchedData = deleteFormContents
        return deleteFormContents
    }
    return fetchedData
};

const addFormContents = [
    {type:"text", name:"charactername", label:"Name your character:"},
    {type:"text", name:"characterdescription", label:"Please describe your character"},
];

const editFormContents = [
    {type:"text", name:"charactername", label:"Name your character:", value: "${characterName}"},
    {type:"text", name:"characterdescription", label:"Please describe your character", value: "${characterDescription}"}
];

const deleteFormContents = [
    {type:"hidden", name:"${idCharacter}"}
];


export {addFormContents,editFormContents, deleteFormContents, fetchCharacterTableData};