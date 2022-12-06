import Form from "../../components/Forms/Form";
import { deleteFormContents } from "../../data/languageData";
import ShowIfLoaded from "../../components/ShowIfLoaded";
import { useEffect, useState, useRef } from "react";
import { DataNext } from "../../axios/DataNext.js";
import { deleteData } from "../../axios/crud.js";
import { useNavigate, useLocation } from "react-router-dom";

function DeleteLanguage() {
  const navigate = useNavigate();
  const location = useLocation();

  const dataRef = useRef({});
  const id = useRef(location.state ? location.state.id : -1);

  const getDataAppend = "WHERE idLanguage = " + id.current.toString();
  const updateFilter = "idLanguage = " + id.current.toString();

  const [post, setPost] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DataNext("Languages", getDataAppend, "delete", id).then((response) => {
      setPost(response);

      return response;
    });
    setIsLoading(false);
  }, []);
  const deleteForm = (e) => {
    e.preventDefault();

    setIsLoading(true);
    Promise.allSettled([
      deleteData("Languages", id, updateFilter).catch((error) => error)
    ]).then(() => navigate("/languages"));
  };
  return (
    <>
      <div className="content">
        <h1>Delete Language Page</h1>
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

export default DeleteLanguage;
