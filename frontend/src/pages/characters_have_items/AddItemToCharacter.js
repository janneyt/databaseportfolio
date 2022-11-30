import Form from "../../components/Forms/Form";
// Axios
import { insertData, updateData } from "../../axios/crud.js";

// React
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Functions
import { prepareFormData } from "../../functions/submitFunctions.js";

// Data
import {
  addFormContents,
  createAddFormContents,
} from "../../data/charactersItemsData";

import { DataNext } from "../../axios/crud.js";

import ShowIfLoaded from "../../components/ShowIfLoaded";

function AddItemToCharacter() {
  const location = useLocation();
  const navigate = useNavigate();
  const dataRef = useRef({});
  const submitData = useRef({ columns: [], values: [] });
  const [items, setItems] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addForm, setAddForm] = useState(addFormContents);
  const character_id =
    location.state && location.state.character_id ? location.state.character_id : -1;
  const character =
    location.state && location.state.character
      ? location.state.character
      : null;

  useEffect(() => {
    
    const items = DataNext("Items").then((response) => {
      console.log("response in items", response);
      setItems(response);
      addFormContents[1].options = createAddFormContents(response);
      console.log("add form contents", addFormContents[1]);
      //setAddForm(addFormContents);

      return response;
    });
    const characters = DataNext("Characters").then((response) => {
      setCharacters(response);
      addFormContents[0].options = createAddFormContents(response);
      console.log("add form contents", addFormContents[0]);
      //setAddForm(addFormContents);
      if (response[0].length > 0 && response[0] !== []) {
        setIsLoading(false);
      }
      return response;
    });
    Promise.allSettled([characters, items])
      .then((values) => {
        console.log("Values in allSettled", values)
        setAddForm(addFormContents);
        return values;
      })
      .catch((error) => console.log(error));
  }, []);

  const prepareAddData = (e) => {
    e.preventDefault();
    prepareFormData(dataRef, submitData, true);
    insertData("Characters_has_Items", submitData.current);
    navigate("/CharactersHaveItems");
  };
  return (
    <div className="content">
      <ShowIfLoaded isLoading={isLoading}>
        <h1>Add Item to Character</h1>
        <h3>Character: {character}</h3>
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

export default AddItemToCharacter;
