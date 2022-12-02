import Button from "../components/Button";
import { Link } from "react-router-dom";
import { ReturnedData } from "../axios/crud.js";
import { createFormContents }  from "../functions/submitFunctions.js";

const fetchCoHLTableData = async (
  language_params,
  append,
  purpose,
  id,
  headers = null
) => {
  const list_param = JSON.stringify(language_params);
  const append_str = JSON.stringify(append);
  // First grab the Languages/ country pairs that are available
  let parameters = JSON.stringify(
    append
      ? '{"columns":' +
          list_param +
          ', "table":"Countries_has_Languages", "append":' +
          append_str +
          "}"
      : '{"columns":' + list_param + ', "table":"Countries_has_Languages"}'
  );

  let fetchedData = await ReturnedData("READ", parameters, headers);

  // Debug data returned
  console.log("fetchedData", fetchedData);

  const country_ids = [];
  const language_ids = [];
  for (const [language, country] of fetchedData) {
    if (!language || !country) {
      fetchedData.slice(language, 1);
      continue;
    }
    if (language < 1 || country < 1) {
      fetchedData.slice(language, 1);
      continue;
    }
    language_ids.push(language);
    country_ids.push(country);
  }

  let append_str1 = '"WHERE idCountry in (';
  append_str1 = append_str1.concat(country_ids);
  append_str1 = append_str1.concat(')"');
  let country_param = JSON.stringify(
    '{"columns":["countryName","idCountry"]' +
      ', "table":"Countries", "append":' +
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

  let fetchedData2 = await ReturnedData("READINTERSECT", country_param, [
    "countryName",
    "idCountry",
  ]);
  let fetchedData3 = await ReturnedData("READINTERSECT", language_param, [
    "languageName",
    "idLanguage",
  ]);

  // Iterate again over fetchedData to associate ids with the selected values from the database
  for (let data of fetchedData) {
    let country = data[1];
    let language = data[0];
    let index = fetchedData.indexOf(data);
    let fixed = [];
    let country_name = "";
    for (let [name, id] of fetchedData3) {
      if (id === language) {
        fixed.push(name);
      }
    }
    for (let [name, id] of fetchedData2) {
      if (id === country) {
        country_name = name;
        fixed.push(name);
      }
    }

    // Add edit and delete buttons
    fixed.push(
      <Link
        to="/editLanguageToCountry"
        state={{
          country: country_name,
          country_id: country,
          language_id: language,
        }}
      >
        <Button>Edit Language to Country Relationship</Button>
      </Link>
    );
    fixed.push(
      <Link
        to="/deleteLanguageFromCountry"
        state={{
          country: country_name,
          country_id: country,
          language_id: language,
        }}
      >
        <Button>Delete Language From Country</Button>
      </Link>
    );
    fetchedData.splice(index, 1, fixed);
  }
  return fetchedData;
};

const addFormContents = [
  {
    type: "select",
    name: "idCountry",
    label: "What country are you assigning a language?",
    options: "placeholder",
  },
  {
    type: "select",
    name: "idLanguage",
    label: "What language should this country speak?",
    options: "placeholder",
  },
];

const editFormContents = [
  {
    type: "select",
    name: "idLanguage",
    label: "What language are you giving this country?",
    options: "placeholder",
  },
];

const nullableItems = [{ value: "null", label: "Null" }];

const deleteFormContents = [
  { type: "hidden", name: "${idItem}" },
  {
    type: "select",
    label:
      "Deleting from this table makes a null entry in the countries_have_languages tabke",
    options: nullableItems,
  },
];

export {
  addFormContents,
  deleteFormContents,
  editFormContents,
  fetchCoHLTableData,
};
