import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { ReturnedData, readData} from '../axios/crud.js';

const headers = ["characterName", "characterDescription", "idCountry","idPlayer", "idGame", "Edit", "Delete"];

const fetchCharacterTableData = async (item_params, append, purpose, id) => {

    const list_param = JSON.stringify(item_params)
    const append_str = JSON.stringify(append)

    let parameters = JSON.stringify(
        append ? '{"columns":' + list_param + ', "table":"Characters", "append":' + append_str + '}' : '{"columns":' + list_param + ', "table":"Characters"}'
    );

    let fetchedData = await ReturnedData("READ", parameters);

    for (let index1 = 0; index1 < fetchedData.length; index1++) {
        // Add the buttons for the display list, anything inside the push
        // will get added to one cell in the table
    
        fetchedData[index1].push(<p>Add countries fk here</p>);
        fetchedData[index1].push(<p>Add players fk here</p>);
        fetchedData[index1].push(<p>Add languages fk here</p>);
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
        let find = 0
        for(let indexing = 0; indexing < fetchedData.length; indexing++){
            if(fetchedData[indexing][0] === id){
                find = indexing
            }
        }
        const editFormContents = [
            // TODO: dynamically generate fetchedData's indices, instead of hardcoding
            { type: "text", name: "itemname", label: "Name Your Item:", value: fetchedData[find][1] },
            { type: "text", name: "itemdescription", label: "Describe Your Item", value: fetchedData[find][2] },
            { type: "text", name: "gamename", label: "Game Name", value: fetchedData[find][3] },

        ];

        fetchedData = editFormContents

        return editFormContents
    }
    else if (purpose && purpose.toLowerCase() === "delete") {

        const deleteFormContents = [
            // TODO: dynamically generate fetchedData's indices, instead of hardcoding
            
            { type: "text", name: fetchedData[0][1], value: fetchedData[0][1], disabled:true}
            
        ];

        fetchedData = deleteFormContents

        return deleteFormContents
    }

    return fetchedData

};

const tableData = [
    ["Bilbo Baggins", "A reluctant hero who prefers to eat and sleep over adventuring, until adventuring takes his soul", "The Shire", "JRR Tolkien", "Fun first game!"],
    ["Another Character", "Just a lazy drunk", "Not the Shire", "JRR Tolkien", "Fun first game!"],
    ["Another Character", "Just a lazy drunk", "Not the Shire", "JRR Tolkien", "Fun first game!"]
];

for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/editCharacter"><Button>Edit Character</Button></Link>);
    tableData[index].push(<Link to="/deleteCharacter"><Button>DeleteCharacter</Button></Link>);
}

const addFormContents = [
    {type:"text", name:"charactername", label:"Name your character:", value: "${characterName}"},
    {type:"text", name:"characterdescription", label:"Please describe your character", value: "${characterDescription}"}
];

const editFormContents = [
    {type:"text", name:"charactername", label:"Name your character:", value: "${characterName}"},
    {type:"text", name:"characterdescription", label:"Please describe your character", value: "${characterDescription}"}
];

const deleteFormContents = [
    {type:"hidden", name:"${idCharacter}"}
];


export {headers as CharacterHeaders, tableData, addFormContents,editFormContents, deleteFormContents, fetchCharacterTableData};