import Button from "../components/Button";
import { Link } from "react-router-dom";
import Select from "react-select";
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

  // Debug returned data
  console.log("fetchedData", fetchedData)

  for (let index1 = 0; index1 < fetchedData.length; index1++) {
    // Weed out undefined or missing data
    if(!fetchedData[index1][0] || !fetchedData[index1][1]){
      fetchedData.slice(index1,1)
      continue
    }

    // fetchedData[index1][1] is for characters
    let append_str1 =
      '"WHERE idCharacter = ' 
    append_str1 = append_str1.concat(fetchedData[index1][1]
        ? fetchedData[index1][1].toString()
        : "-1");
    append_str1 = append_str1.concat('"')
    let character_param = JSON.stringify(
      '{"columns":["characterName"]' +
        ', "table":"Characters", "append":' +
        append_str1 +
        "}"
    );

    // Debug character_param
    console.log("character_param", character_param)


    // fetchedData[index1][0] is for items
    let append_str2 = '"WHERE idItem = ' 
    append_str2 = append_str2.concat(fetchedData[index1][0]
        ? fetchedData[index1][0].toString()
        : "-1")

    append_str2 = append_str2.concat('"')
    let item_param = JSON.stringify(
      '{"columns":["itemName"]' +
        ', "table":"Items", "append":' +
        append_str2 +
        "}"
    );

    // Debug item_param
    console.log("item_param", item_param)

    let fetchedData2 = await ReturnedData("READINTERSECT", character_param, ["characterName"]);
    console.log("fetchedData2 should be characters",fetchedData2)
    
    let fetchedData3 = await ReturnedData("READINTERSECT", item_param, ["itemName"]);
    console.log("fetchedData3 should be items", fetchedData3)
    const character_id = fetchedData[index1][1]
    fetchedData[index1][1] = fetchedData2[0][0];
    fetchedData[index1][0] = fetchedData3[0][0];
    const item_name = fetchedData[index1][0]
    const character_name = fetchedData[index1][1]
    // Add the buttons for the display list, anything inside the push
    // will get added to one cell in the table
    fetchedData[index1].push(
      <Link to="/addItemToCharacter" state={{ character : character_name, id : character_id }}>
        <Button>Add Item to Character</Button>
      </Link>
    );

    fetchedData[index1].push(
      <Link to="/deleteItemFromCharacter" state={{ id: id }}>
        <Button>Delete Item From Character</Button>
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

const bilboItems = [
  { value: "sting", label: "sting" },
  { value: "mithrilarmor", label: "Mithril Armor" },
  { value: "theonering", label: "The One Ring" },
];

// Currently reusing the same Select, this is temporary anyway.
const tableData = [
  ["Bilbo Baggins", <Select options={bilboItems} />],
  ["Frodo Baggins", <Select options={bilboItems} />],
  ["Meriadoc Brandybuck", <Select options={bilboItems} />],
];

for (let index = 0; index < tableData.length; index++) {
  tableData[index].push(
    <Link to="/addItemToCharacter">
      <Button>Add Item</Button>
    </Link>
  );
  tableData[index].push(
    <Link to="/deleteItemFromCharacter">
      <Button>Delete Item</Button>
    </Link>
  );
}

const createAddFormContents = (names) => {
  console.log("names in createAddFormContents", names);
  const options = []
  for(const name of names){
    options.push({ value: name[0].toString(), label: name[1] })
  }
  return options
}

const addFormContents = [
  {
    type: "select",
    name: "idItem",
    label: "What item are you giving this character?",
    options: "placeholder",
  },
  {
    type: "hidden",
    name: "idCharacter"
  }
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
  headers,
  tableData,
  addFormContents,
  deleteFormContents,
  fetchCHITableData,
  createAddFormContents,
};
