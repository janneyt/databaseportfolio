import Form from "../../components/Forms/Form";
import ShowIfLoaded from "../../components/ShowIfLoaded";
import { useEffect, useState, useRef } from "react";
import { DataNext } from "../../axios/DataNext.js";
import { deleteData } from "../../axios/crud.js";
import { useNavigate, useLocation } from "react-router-dom";

function DeletePlayer() {
  const navigate = useNavigate();
  const location = useLocation();

  const dataRef = useRef({});
  const id = useRef(location.state ? location.state.id : -1);

  const getDataAppend = "WHERE idPlayer = " + id.current.toString();
  const updateFilter = "idPlayer = " + id.current.toString();

  const [post, setPost] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DataNext("Players", getDataAppend, "delete", id).then((response) => {
      setPost(response);

      return response;
    });
    setIsLoading(false);
  }, []);

  const deleteForm = (e) => {
    e.preventDefault();

    setIsLoading(true);
    Promise.allSettled([
      deleteData("Players", id, updateFilter).catch((error) => error)
    ]).then(() => navigate("/players"));
  };

  return (
    <>
      <div className="content">
        <h1>Delete Player Page</h1>
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

export default DeletePlayer;
