import Form from "../../components/Forms/Form";
import { addFormContents, createAddFormContents } from "../../data/charactersLanguagesData";
import { useLocation, useNavigate } from "react-router-dom";
import { prepareFormData } from "../../functions/submitFunctions.js";
import { DataNext } from '../../axios/DataNext.js';
import { insertData } from "../../axios/crud.js";
import { useState, useEffect, useRef } from "react";
import ShowIfLoaded from "../../components/ShowIfLoaded";

function AddLanguageToCharacter() {
  const location = useLocation();
  const [post, setPost] = useState([{}]);
  const navigate = useNavigate();
  const dataRef = useRef({});
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addForm, setAddForm] = useState(addFormContents);
  const character =
    location.state && location.state.character
      ? location.state.character
      : null;
  const character_id = location.state && location.state.id ? location.state.id : -1
  const submitData = useRef({ columns: [], values: [] });
  const prepareAddData = (e) => {
    e.preventDefault();
    console.log("dataRef", dataRef)
    prepareFormData(dataRef, submitData, true);
    submitData.current.values[submitData.current.columns.indexOf("idCharacter")] = character_id.toString();
    console.log("submitData", submitData)
    insertData("Characters_has_Languages", submitData.current);
    navigate("/charactersHaveLanguages");
  };


  useEffect(() => {
    DataNext("Languages").then((response) => {
      setItems(response);
      addFormContents[0].options = createAddFormContents(response);
      setAddForm(addFormContents);
      console.log(addForm);
      if (response[0] !== []) {
        setIsLoading(false);
      }
      return response;
    });
  }, [setAddForm]);
  return (
    <div className="content">
      <ShowIfLoaded isLoading={isLoading}>
        <h1>Add Language to Character</h1>
        <h3>
          Character:{" "}
          {character}
        </h3>
        <Form
          submitText="Save"
          inputState={addForm}
          onSubmit={prepareAddData}
          refDict={dataRef}
        />
      </ShowIfLoaded>
    </div>
  );
}

export default AddLanguageToCharacter;
