import Form from "../../components/Forms/Form";
import ShowIfLoaded from "../../components/ShowIfLoaded";
import { useEffect, useState, useRef } from "react";
import { DataNext, deleteData } from "../../axios/crud.js";
import { useNavigate, useLocation } from "react-router-dom";

function DeleteCharacters() {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState([{}]);

  const [id, setId] = useState(location.state ? location.state.id : -1);
  // One append to display the data, one to delete
  const [append, setAppend] = useState("WHERE idCharacter = " + id.toString());
  const [filter, setFilter] = useState(" idCharacter = " + id.toString());

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    DataNext("Items", append, "delete", id).then((response) => {
      console.log("setting post", response);
      setPost(response);

      return response;
    });
    setIsLoading(false);
  }, []);

  const dataRef = useRef({});
  const submitData = useRef({ columns: [], values: [] });

  const deleteForm = (e) => {
    e.preventDefault();

    setIsLoading(true);
    deleteData("Characters", id, filter)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => error);
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
