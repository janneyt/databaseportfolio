import Button from "../components/Button";
import { Link } from "react-router-dom";
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
  console.log("Done fetching")
  if(fetchedData.length < 1){
    console.log("inside length less than 1")
    const empty = [[]];
    for(const slot of headers){
      empty[0].push("No data to be displayed, please add item-character relationship")
    }
    return empty;
  }
  // Debug returned data
  console.log("fetchedData", fetchedData);
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
        character_name = name;
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

  }

  return fetchedData;
  
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

const searchFormContents = [
  {
    type: "text",
    name: "idItem",
    label: "Search by item name or character name"
  }
]

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
  searchFormContents,
  fetchCHITableData,
};
