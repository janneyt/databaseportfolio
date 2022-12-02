import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { ReturnedData } from "../axios/crud.js";

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
        character_name = name;
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
};
