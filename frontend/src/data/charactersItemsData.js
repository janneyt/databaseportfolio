import Button from '../components/Button';
import { Link } from 'react-router-dom';
import Select from 'react-select';
import { ReturnedData } from "../axios/crud.js";

const headers = ["idItem", "idCharacter", "Add Item", "Delete Item"];

const fetchCHITableData = async (item_params, append, purpose, id) => {
    const list_param = JSON.stringify(item_params);
    const append_str = JSON.stringify(append);
    // First grab the items/ character pairs that are available
    let parameters = JSON.stringify(
        append
          ? '{"columns":' +
              list_param +
              ', "table":"Characters_has_Items", "append":' +
              append_str +
              "}"
          : '{"columns":' + list_param + ', "table":"Characters_has_Items"}'
      );
    
    let fetchedData = await ReturnedData("READ", parameters);
    console.log("fetched Data originally", fetchedData)
    for (let index1 = 0; index1 < fetchedData.length; index1++) {
  
      // Get the character ids based on the ids returned from the earlier query
      const append_str1 = JSON.stringify('WHERE idCharacter = '+ fetchedData[index1][0] ? fetchedData[index1][0].toString() : "-1")
      console.log("append_str1", append_str1)
      let character_param = JSON.stringify(
          '{"columns":["characterName"]' +
            ', "table":"Characters", "append":' +
            append_str1 +
            "}"
      )
      const append_str2 = JSON.stringify('WHERE idItem = '+ fetchedData[index1][1] ? fetchedData[index1][1].toString() : "-1")
      let item_param = JSON.stringify(
        '{"columns":["itemName"]' +
          ', "table":"Items", "append":' +
          append_str2 +
          "}"
    )
    console.log("fetched Data", fetchedData)
    console.log("item param", item_param)
      let fetchedData2 = await ReturnedData("READ", character_param);
      let fetchedData3 = await ReturnedData("READ", item_param);

      fetchedData[0] = fetchedData2
      fetchedData[1] = fetchedData3
      // Add the buttons for the display list, anything inside the push
      // will get added to one cell in the table
      fetchedData[index1].push(
        <Link to="/deleteCharactersHasItems" state={{ id: id }}>
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
  

const bilboItems = [{value:"sting", label:"sting"},
{value:"mithrilarmor", label:"Mithril Armor"},
{value:"theonering", label:"The One Ring"},

];

// Currently reusing the same Select, this is temporary anyway.
const tableData = [
    ["Bilbo Baggins", <Select options={bilboItems}/>],
    ["Frodo Baggins", <Select options={bilboItems}/>],
    ["Meriadoc Brandybuck", <Select options={bilboItems} />]
];

for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/addItemToCharacter"><Button>Add Item</Button></Link>);
    tableData[index].push(<Link to="/deleteItemFromCharacter"><Button>Delete Item</Button></Link>);
}

const addFormContents = [
    {type:"select", name:"items", label:"What item are you giving this character?", options:bilboItems }
];

const nullableItems = [
    {value:"null",label:"Null"}
]

const deleteFormContents = [
    {type:"hidden", name:"${idItem}"},
    {type:"select", label:"Deleting from this table makes a null entry in the characters_have_items tabke", options:nullableItems}
];


export {headers, tableData, addFormContents, deleteFormContents, fetchCHITableData};