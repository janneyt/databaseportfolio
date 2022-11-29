import Form from "../../components/Forms/Form";
import { addFormContents } from "../../data/charactersLanguagesData";
import { useLocation, useNavigate } from "react-router-dom";
import { prepareFormData } from "../../functions/submitFunctions.js";
import { insertData } from "../../axios/crud.js";
import { useState, useEffect, useRef } from "react";

function AddLanguageToCharacter() {
  const location = useLocation();
  const [post, setPost] = useState([{}]);
  const navigate = useNavigate();
  const dataRef = useRef({});
  const character =
    location.state && location.state.character
      ? location.state.character
      : null;
  const character_id = location.state && location.state.id ? location.state.id : -1
  const submitData = useRef({ columns: [], values: [] });
  const prepareAddData = (e) => {
    e.preventDefault();
    prepareFormData(dataRef, submitData);
    insertData("Characters_has_Languages", submitData.current);
    navigate("/charactersHaveLanguages");
  };

  useEffect(() => {}, [submitData]);
  return (
    <div className="content">
      <h1>Add Language To Character Page</h1>
      <p>{`Editing languages assigned to: ${character}`}</p>
      <Form
        submitText="Save"
        inputState={addFormContents}
        onSubmit={prepareAddData}
        refDict={dataRef}
      />
    </div>
  );
}

export default AddLanguageToCharacter;
