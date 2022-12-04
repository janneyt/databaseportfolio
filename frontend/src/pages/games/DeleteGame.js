import Form from "../../components/Forms/Form";
import ShowIfLoaded from "../../components/ShowIfLoaded";
import { useEffect, useState, useRef } from "react";
import { DataNext } from '../../axios/DataNext.js';
import { deleteData } from "../../axios/crud.js";
import { useNavigate, useLocation } from "react-router-dom";

function DeleteGame() {
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState([{}]);

  const [id, setId] = useState(location.state ? location.state.id : -1);
  // One append to display the data, one to delete
  const [append, setAppend] = useState("WHERE gameName = " + id.toString());
  const [filter, setFilter] = useState(" gameName = " + id.toString());

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DataNext("Games",append, "delete", id).then((response) => {
        
        setPost(response);

        setIsLoading(false);
    });
}, []);

  const dataRef = useRef({});
  const submitData = useRef({ columns: [], values: [] });

  const deleteForm = (e) => {
    e.preventDefault();
    if (window.confirm(`
    Deleting a Game may delete data such as players, characters, and items.
    Are you sure you want to delete?`
    )) {
      setIsLoading(true);
      Promise.allSettled([deleteData("Games", id, filter)]).then(
      () => navigate("/games")
    ).catch((error) => console.log(error))
    }
  };

  return (
    <>
      <div className="content">
        <h1>Delete Game Page</h1>
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

export default DeleteGame;
