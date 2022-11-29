import Form from "../../components/Forms/Form";
// Axios
import { insertData } from "../../axios/crud.js";

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
  const [isLoading, setIsLoading] = useState(true);
  const [addForm, setAddForm] = useState(addFormContents);

  useEffect(() => {
    DataNext("Items").then((response) => {
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

  const prepareAddData = (e) => {
    e.preventDefault();
    prepareFormData(dataRef, submitData);
    insertData("Characters_has_Items", submitData.current);
    navigate("/CharactersHaveItems");
  };
  return (
    <div className="content">
      <ShowIfLoaded isLoading={isLoading}>
        <h1>Add Item to Character</h1>
        <h3>
          Character:{" "}
          {location.state && location.state.character
            ? location.state.character
            : ""}
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

export default AddItemToCharacter;
