import Button from "../components/Button";
import { Link } from "react-router-dom";
import { ReturnedData } from "../axios/crud.js";
import { createFormContents }  from "../functions/submitFunctions.js";

const fetchCHLTableData = async (
  Language_params,
  append,
  purpose,
  id,
  headers = null
) => {
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

  let fetchedData = await ReturnedData("READ", parameters, headers);

  const character_ids = [];
  const language_ids = [];
  for (const [language, character] of fetchedData) {
    if (!language || !character) {
      fetchedData.slice(language, 1);
      continue;
    }
    if (language < 1 || character < 1) {
      fetchedData.slice(language, 1);
      continue;
    }
    language_ids.push(language);
    character_ids.push(character);
  }

  // Debug data returned

  let append_str1 = '"WHERE idCharacter in (';
  append_str1 = append_str1.concat(character_ids);
  append_str1 = append_str1.concat(')"');
  let character_param = JSON.stringify(
    '{"columns":["characterName","idCharacter"]' +
      ', "table":"Characters", "append":' +
      append_str1 +
      "}"
  );

  let append_str2 = '"WHERE idLanguage in (';
  append_str2 = append_str2.concat(language_ids);

  append_str2 = append_str2.concat(')"');
  let language_param = JSON.stringify(
    '{"columns":["languageName", "idLanguage"]' +
      ', "table":"Languages", "append":' +
      append_str2 +
      "}"
  );

  let fetchedData2 = await ReturnedData("READINTERSECT", character_param, [
    "characterName",
    "idCharacter",
  ]);
  let fetchedData3 = await ReturnedData("READINTERSECT", language_param, [
    "languageName",
    "idLanguage",
  ]);

  // Iterate again over fetchedData to associate ids with the selected values from the database
  for (let data of fetchedData) {
    let character = data[1];
    let language = data[0];
    let index = fetchedData.indexOf(data);
    let fixed = [];
    let character_name = "";
    for (let [name, id] of fetchedData3) {
      if (id === language) {
        fixed.push(name);
      }
    }
    for (let [name, id] of fetchedData2) {
      if (id === character) {
        fixed.push(name);
      }
    }

    // Add edit and delete buttons
    fixed.push(
      <Link
        to="/editLanguageToCharacter"
        state={{
          character: character_name,
          character_id: character,
          language_id: language,
        }}
      >
        <Button>Edit Language to Character Relationship</Button>
      </Link>
    );
    fixed.push(
      <Link
        to="/deleteLanguageFromCharacter"
        state={{
          character: character_name,
          character_id: character,
          language_id: language,
        }}
      >
        <Button>Delete Language From Character</Button>
      </Link>
    );
    fetchedData.splice(index, 1, fixed);
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

const bilboLanguages = [
  { value: "elvish", label: "Elvish" },
  { value: 1, label: "Westron" },
  { value: 2, label: "Sylvan Elvish" },
  { value: "null", label: "Null" },
];

// 
const createAddFormContents = (names) => createFormContents(names);

const createEditFormContents = (names) => createFormContents (names);

const addFormContents = [
  {
    type: "select",
    name: "idCharacter",
    label: "What character are you assigning an item?",
    options: "placeholder",
  },
  {
    type: "select",
    name: "idLanguage",
    label: "What language should this character know?",
    options: "placeholder",
  },
];

const editFormContents = [
  {
    type: "select",
    name: "idLanguage",
    label: "What language are you giving this character?",
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
  fetchCHLTableData,
  createAddFormContents,
  createEditFormContents
};
