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

import { DataNext } from "../../axios/DataNext.js";

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
    location.state && location.state.character_id
      ? location.state.character_id
      : -1;
  const character =
    location.state && location.state.character
      ? location.state.character
      : null;

  useEffect(() => {
    const items = DataNext("Items").then((response) => {
      setItems(response);
      addFormContents[1].options = createAddFormContents(response);
      //setAddForm(addFormContents)
      return response;
    });
    const characters = DataNext("Characters").then((response) => {
      if(response[0] )
      setCharacters(response);
      addFormContents[0].options = createAddFormContents(response);
      //setAddForm(addFormContents)
      return response;
    });
    Promise.allSettled([characters, items])
      .then((values) => {

        // Race condition bug fixed where React's multiple posts were causing undefined behavior.
        if(values[0].value[0][0] && !values[0].value[0][0].$$typeof){
          
          setAddForm(addFormContents);
          setIsLoading(false);
        }

        return values;
      })
      .catch((error) => console.log(error));
  }, []);

  const prepareAddData = (e) => {
    e.preventDefault();
    prepareFormData(dataRef, submitData, true);
    Promise.allSettled([insertData("Characters_has_Items", submitData.current)]).then((values) =>{
      console.log(values);
      navigate("/CharactersHaveItems")}
    ).catch((error) => console.log(error));
    
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
