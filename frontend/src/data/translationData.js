import Button from "../components/Button";
import { Link } from "react-router-dom";
import { ReturnedData } from "../axios/crud.js";

const headers = ["idTranslationOutput","outputContents", "inputContents","Delete"];
const inputHeaders = ["inputContents"]
const fetchTranslationsTableData = async (item_params, append, purpose, id) => {
  const list_param = JSON.stringify(item_params);
  const input_param = JSON.stringify(inputHeaders);
  const append_str = JSON.stringify(append);

  let parameters = JSON.stringify(
    append
      ? '{"columns":' +
          list_param +
          ', "table":"TranslationOutputs", "append":' +
          append_str +
          "}"
      : '{"columns":' + list_param + ', "table":"TranslationOutputs"}'
  );

  

  let fetchedData = await ReturnedData("READ", parameters);
  for (let index1 = 0; index1 < fetchedData.length; index1++) {

    // Get the translation inputs by the id from the outputs
    const append_str1 = JSON.stringify('WHERE idTranslationInput = '+fetchedData[index1][0].toString())
    let inputParam = JSON.stringify(
        '{"columns":' +
          input_param +
          ', "table":"TranslationInputs", "append":' +
          append_str1 +
          "}"
    )
    let fetchedData2 = await ReturnedData("READ", inputParam);
    fetchedData[index1].push(fetchedData2)
    // Add the buttons for the display list, anything inside the push
    // will get added to one cell in the table
    fetchedData[index1].push(
      <Link to="/deleteTranslation" state={{ id: id }}>
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

const tableData = [
  [
    "1",
    "${Some input coming from the TranslationInputs table}",
    "${Some output coming from the selected algorithm used to translate}",
  ],
  ["1", "Idea", "Idee"],
  ["2", "Boys", "Ragazze"],
  ["1", "Machine", "Machine"],
  ["2", "Machine", "Macchina"],
];

// Add the buttons for the display list, anything inside the push
// will get added to one cell in the table
for (let index = 0; index < tableData.length; index++) {
  tableData[index].push(
    <div class="buttonGroup">
      <Link to="/deleteTranslation">
        <Button>DeleteTranslation</Button>
      </Link>
      <p>Deleting doesn't change the way the phrase is translated.</p>
    </div>
  );
}

const addFormContents = [
  {
    type: "text",
    name: "playername",
    label: "Please input a phrase to translate:",
  },
];

const deleteFormContents = [{ type: "hidden", name: "${idTranslation}" }];

export {
  headers,
  tableData,
  addFormContents,
  deleteFormContents,
  fetchTranslationsTableData,
};
