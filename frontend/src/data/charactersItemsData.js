import Button from "../components/Button";
import { Link } from "react-router-dom";
import Select from "react-select";
import { ReturnedData } from "../axios/crud.js";

const headers = ["idItem", "idCharacter", "Add Item", "Delete Item"];

const fetchCHITableData = async (item_params, append, purpose, id) => {
  console.log("item params", item_params)
  console.log("append", append)
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
  console.log("calling ReturnedData")
  let fetchedData = await ReturnedData("READ", parameters);
  console.log("fetchedData", fetchedData)

  // Set a timeout due to database backup
  for (let index1 = 0; index1 < fetchedData.length; index1++) {
    // Get the character ids based on the ids returned from the earlier query
    if(!fetchedData[index1][0] || !fetchedData[index1][1]){
      fetchedData.slice(index1,1)
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

    let append_str2 = '"WHERE idItem = ' 
    append_str2 = append_str2.concat(fetchedData[index1][1]
        ? fetchedData[index1][1].toString()
        : "-1")

    append_str2 = append_str2.concat('"')
    let item_param = JSON.stringify(
      '{"columns":["itemName"]' +
        ', "table":"Items", "append":' +
        append_str2 +
        "}"
    );
    console.log(append_str1)
    console.log(append_str2)
    let fetchedData2 = await ReturnedData("READINTERSECT", character_param, ["characterName"]);
    let fetchedData3 = await ReturnedData("READINTERSECT", item_param, ["itemName"]);
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
  console.log(names);
  const options = []
  for(const name of names){
    options.push({ value: name[1], label: name[1] })
  }
  return options
}

const addFormContents = [
  {
    type: "select",
    name: "items",
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
  headers,
  tableData,
  addFormContents,
  deleteFormContents,
  fetchCHITableData,
  createAddFormContents,
};
