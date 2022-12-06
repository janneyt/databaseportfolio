import Form from "../../components/Forms/Form";
// Axios
import { updateData } from "../../axios/crud.js";

// React
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Functions
import { prepareFormData } from "../../functions/submitFunctions.js";

// Data
import {
  editFormContents,
  createEditFormContents,
} from "../../data/countriesLanguagesData";

import { DataNext } from "../../axios/DataNext.js";
import { createFormContents } from "../../functions/submitFunctions.js";

import ShowIfLoaded from "../../components/ShowIfLoaded";

function EditLanguageToCountry() {
  const location = useLocation();
  const navigate = useNavigate();
  const dataRef = useRef({});
  const submitData = useRef({ columns: [], values: [] });
  const [languages, setLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [EditForm, setEditForm] = useState(editFormContents);
  const country_id =
    location.state && location.state.country_id
      ? location.state.country_id
      : -1;
  console.log("LocATION", location);
  const language_id =
    location.state && location.state.language_id
      ? location.state.language_id
      : -1;
  const country =
    location.state && location.state.country ? location.state.country : null;

  const createEditFormContents = (names) => createFormContents(names);

  useEffect(() => {
    DataNext("Languages").then((response) => {
      setLanguages(response);
      editFormContents[0].options = createEditFormContents(response);
      setEditForm(editFormContents);
      if (response[0] !== []) {
        setIsLoading(false);
      }
      return response;
    });
  }, [setEditForm]);

  const prepareAddData = (e) => {
    e.preventDefault();
    prepareFormData(dataRef, submitData, true);
    submitData.current.values[submitData.current.columns.indexOf("idCountry")] =
      country_id.toString();
    const append = `idCountry = ${country_id.toString()} and idLanguage = ${language_id.toString()}`;
    setIsLoading(true);
    Promise.allSettled([
      updateData("Countries_has_Languages", submitData, append),
    ])
      .then((values) => {
        console.log(values);
        navigate("/CountriesHaveLanguages");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="content">
      <ShowIfLoaded isLoading={isLoading}>
        <h1>Add Language to Country</h1>
        <h3>Country: {country}</h3>
        <Form
          submitText="Save"
          inputState={EditForm}
          onSubmit={prepareAddData}
          refDict={dataRef}
        />
      </ShowIfLoaded>
    </div>
  );
}

export default EditLanguageToCountry;
