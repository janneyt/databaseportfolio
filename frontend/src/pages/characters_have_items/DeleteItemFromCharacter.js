import Form from "../../components/Forms/Form";
import { deleteFormContents } from "../../data/charactersItemsData";
// Axios
import { deleteData } from "../../axios/crud.js";

// React
import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

// Functions
import { prepareFormData } from "../../functions/submitFunctions.js";

import { DataNext } from "../../axios/crud.js";

import ShowIfLoaded from "../../components/ShowIfLoaded";

function DeleteCharacters() {
  const location = useLocation();
  const navigate = useNavigate();
  const dataRef = useRef({});
  const submitData = useRef({ columns: [], values: [] });
  const [items, setItems] = useState([]);
  const [characters, setCharacters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [addForm, setAddForm] = useState(deleteFormContents);
  const character_id =
    location.state && location.state.character_id
      ? location.state.character_id
      : -1;
  const character =
    location.state && location.state.character
      ? location.state.character
      : null;
  const item_id =
    location.state && location.state.item_id ? location.state.item_id : -1;
  useEffect(() => {
    setIsLoading(false);
  });
  const prepareDeleteData = (e) => {
    e.preventDefault();
    prepareFormData(dataRef, submitData, true);
    const append = `idCharacter = ${character_id.toString()} and idItem = ${item_id.toString()}`;
    Promise.allSettled([
      deleteData("Characters_has_Items", submitData.current, append),
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
        <h1>Delete Item from Character</h1>
        <h3>Character: {character}</h3>
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

export default DeleteCharacters;
