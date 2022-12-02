import Form from "../../components/Forms/Form";
import { addFormContents, createAddFormContents } from "../../data/charactersLanguagesData";
import { useLocation, useNavigate } from "react-router-dom";
import { prepareFormData } from "../../functions/submitFunctions.js";
import { DataNext } from '../../axios/DataNext.js';
import { insertData } from "../../axios/crud.js";
import { useState, useEffect, useRef } from "react";
import ShowIfLoaded from "../../components/ShowIfLoaded";

function AddLanguageToCharacter() {

  const [characters, setCharacters] = useState([]);
  const location = useLocation();
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

  useEffect(() => {
    const items = DataNext("Languages").then((response) => {
      if(response[0] )
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
    Promise.allSettled([insertData("Characters_has_Languages", submitData.current)]).then((values) =>{
      navigate("/charactersHaveLanguages");
  }).catch((error) => console.log(error));
    
  };
  
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
