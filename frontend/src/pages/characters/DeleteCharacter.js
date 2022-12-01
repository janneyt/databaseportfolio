import Form from "../../components/Forms/Form";
import ShowIfLoaded from "../../components/ShowIfLoaded";
import { useEffect, useState, useRef } from "react";
import { DataNext } from '../../axios/DataNext.js';
import { deleteData } from "../../axios/crud.js";
import { useNavigate, useLocation } from "react-router-dom";

function DeleteCharacters() {
  const navigate = useNavigate();
  const location = useLocation();

  const dataRef = useRef({});
  const id = useRef(location.state ? location.state.id:-1);

  const getDataAppend = 'WHERE idCharacter = ' + id.current.toString();
  const updateFilter = 'idCharacter = ' + id.current.toString();

  const [post, setPost] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DataNext("Characters", getDataAppend, "delete", id).then((response) => {
      console.log("setting post", response);
      setPost(response);

      return response;
    });
    setIsLoading(false);
  }, []);

  const deleteForm = (e) => {
    e.preventDefault();
    console.log("DATAREF", dataRef)
    setIsLoading(true);
    deleteData("Characters", id, updateFilter).catch((error) => error);
    navigate("/characters");
  };

  return (
    <>
      <div className="content">
        <h1>Delete Item Page</h1>
        <ShowIfLoaded isLoading={isLoading}>
          <Form
            submitText="Delete"
            inputState={post}
            onSubmit={deleteForm}
            refDict={dataRef}
          />
        </ShowIfLoaded>
      </div>
    </>
  );
}
export default DeleteCharacters;
