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
  editFormContents
} from "../../data/charactersItemsData";

import { DataNext } from '../../axios/DataNext.js';

import ShowIfLoaded from "../../components/ShowIfLoaded";
import { createFormContents }  from "../../functions/submitFunctions.js";

function EditItemToCharacter() {
  const location = useLocation();
  const navigate = useNavigate();
  const dataRef = useRef({});
  const submitData = useRef({ columns: [], values: [] });
  const [items, setItems] = useState([]);
  const createEditFormContents = (names) => createFormContents(names);
  const [isLoading, setIsLoading] = useState(true);
  const [EditForm, setEditForm] = useState(editFormContents);
  const character_id = location.state && location.state.character_id ? location.state.character_id : -1
  console.log("LocATION", location)
  const item_id = location.state && location.state.item_id ? location.state.item_id : -1
  const character =
    location.state && location.state.character
      ? location.state.character
      : null;

  useEffect(() => {
    DataNext("Items").then((response) => {
      setItems(response);
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
    submitData.current.values[submitData.current.columns.indexOf("idCharacter")] = character_id.toString();
    const append = `idCharacter = ${character_id.toString()} and idItem = ${item_id.toString()}`
    setIsLoading(true);
    Promise.allSettled([
      updateData("Characters_has_Items", submitData, append)
    ])
      .then((values) => {
        console.log(values);
        navigate("/CharactersHaveItems");
      })
      .catch((error) => console.log(error));
    
  };
  return (
    <div className="content">
      <ShowIfLoaded isLoading={isLoading}>
        <h1>Add Item to Character</h1>
        <h3>
          Character:{" "}
          {character}
        </h3>
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

export default EditItemToCharacter;
