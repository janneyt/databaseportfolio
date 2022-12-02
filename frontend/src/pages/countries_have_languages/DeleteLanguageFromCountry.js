import Form from "../../components/Forms/Form";
import { deleteFormContents } from "../../data/countriesLanguagesData";
// Axios
import { deleteData } from "../../axios/crud.js";

// React
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Functions
import { prepareFormData } from "../../functions/submitFunctions.js";

import ShowIfLoaded from "../../components/ShowIfLoaded";

function DeleteLanguageFromCountry() {
  const location = useLocation();
  const navigate = useNavigate();
  const dataRef = useRef({});
  const submitData = useRef({ columns: [], values: [] });
  const [isLoading, setIsLoading] = useState(true);
  console.log("LOCATION", location)
  const country_id =
    location.state && location.state.country_id
      ? location.state.country_id
      : -1;
  const country =
    location.state && location.state.country
      ? location.state.country
      : null;
  const language_id =
    location.state && location.state.language_id ? location.state.language_id : -1;
  useEffect(() => {
    setIsLoading(false);
  });
  const prepareDeleteData = (e) => {
    e.preventDefault();
    prepareFormData(dataRef, submitData, true);
    const append = `idCountry = ${country_id.toString()} and idLanguage = ${language_id.toString()}`;
    Promise.allSettled([
      deleteData("Countries_has_Languages", submitData.current, append),
    ])
      .then((values) => {
        console.log(values);
        navigate("/CountrysHaveLanguages");
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="content">
      <ShowIfLoaded isLoading={isLoading}>
        <h1>Delete Language from Country</h1>
        <h3>Country: {country}</h3>
        <Form
          submitText="Save"
          inputState={deleteFormContents}
          onSubmit={prepareDeleteData}
          refDict={dataRef}
        />
      </ShowIfLoaded>
    </div>
  );
}


export default DeleteLanguageFromCountry;