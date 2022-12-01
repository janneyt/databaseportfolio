import Button from "../components/Button";
import { Link } from "react-router-dom";
import Select from "react-select";
import { ReturnedData } from "../axios/crud.js";

const fetchCHITableData = async (
  item_params,
  append,
  purpose,
  id,
  headers = null
) => {
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

  let fetchedData = await ReturnedData("READ", parameters, headers);

  // Debug returned data
  console.log("fetchedData", fetchedData, headers);
  const character_ids = [];
  const item_ids = [];
  for (const [item, character] of fetchedData) {
    if (!item || !character) {
      fetchedData.slice(item, 1);
      continue;
    }
    if (item < 1 || character < 1) {
      fetchedData.slice(item, 1);
      continue;
    }
    item_ids.push(item);
    character_ids.push(character);
  }
  console.log("ITEM IDS", item_ids);
  console.log("CHARACTER IDs", character_ids);

  // fetchedData[index1][1] is for characters
  let append_str1 = '"WHERE idCharacter in (';
  append_str1 = append_str1.concat(
    character_ids
  );
  append_str1 = append_str1.concat(')"');
  let character_param = JSON.stringify(
    '{"columns":["characterName","idCharacter"]' +
      ', "table":"Characters", "append":' +
      append_str1 +
      "}"
  );

  // Debug character_param
  console.log("character_param", character_param)

  // fetchedData[index1][0] is for items
  let append_str2 = '"WHERE idItem in (' 
  append_str2 = append_str2.concat(
    item_ids
  )

  append_str2 = append_str2.concat(')"')
  let item_param = JSON.stringify(
    '{"columns":["itemName","idItem"]' +
      ', "table":"Items", "append":' +
      append_str2 +
      "}"
  );

  // Debug item_param
  console.log("item_param", item_param)

  let fetchedData2 = await ReturnedData("READINTERSECT", character_param, ["characterName","idCharacter"]);  
  let fetchedData3 = await ReturnedData("READINTERSECT", item_param, ["itemName","idItem"]);

  // Iterate again over fetchedData to associate ids with the selected values from the database
  for(let data of fetchedData){
    let character = data[1]
    let item = data[0]
    let index = fetchedData.indexOf(data)
    let fixed = []
    let character_name = '';
    for(let [name, id] of fetchedData3){
      if(id === item){
        fixed.push(name)
      }
    }
    for(let [name, id] of fetchedData2){
      if(id === character){
        fixed.push(name)
      }
    }

    // Add edit and delete buttons
    fixed.push(
      <Link to="/editItemToCharacter" state={{ character : character_name, character_id : character, item_id : item }}>
        <Button>Edit Item to Character</Button>
      </Link>
    );
    fixed.push(
      <Link to="/deleteItemFromCharacter" state={{ character : character_name, character_id : character, item_id : item }}>
        <Button>Delete Item From Character</Button>
      </Link>
    );
    fetchedData.splice(index, 1, fixed)

    console.log("fetchedData inside for loops", fetchedData)
  }
  console.log("FETCHEDDATA FIXED", fetchedData)

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
        name: "itemName",
        label: "Name Your Item:",
        value: fetchedData[find][1],
      },
      {
        type: "text",
        name: "itemDescription",
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

const createAddFormContents = (names) => {
  const options = [];
  for (const name of names) {
    options.push({ value: name[0].toString(), label: name[1] });
  }
  return options;
};

const createEditFormContents = (names) => {
  const options = [];
  for (const name of names) {
    options.push({ value: name[0].toString(), label: name[1] });
  }
  return options;
};

const addFormContents = [
  {
    type: "select",
    name: "idCharacter",
    label: "What character are you assigning an item?",
    options: "placeholder",
  },
  {
    type: "select",
    name: "idItem",
    label: "What item are you giving this character?",
    options: "placeholder",
  },
];

const editFormContents = [
  {
    type: "select",
    name: "idItem",
    label: "What item are you giving this character?",
    options: "placeholder",
  },
];

const nullableItems = [{ value: "null", label: "Null" }];

const deleteFormContents = [
  { type: "hidden", name: "${idItem}" },
  {
    type: "select",
    label:
      "Deleting from this table makes a null entry in the characters_have_items tabke",
    options: nullableItems,
  },
];

export {
  addFormContents,
  editFormContents,
  deleteFormContents,
  fetchCHITableData,
  createAddFormContents,
  createEditFormContents,
};
