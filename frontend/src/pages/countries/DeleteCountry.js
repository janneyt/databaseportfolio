import Form from "../../components/Forms/Form";
import { deleteFormContents } from "../../data/countryData";
import ShowIfLoaded from "../../components/ShowIfLoaded";
import { useEffect, useState, useRef } from "react";
import { DataNext } from "../../axios/DataNext.js";
import { deleteData } from "../../axios/crud.js";
import { useNavigate, useLocation } from "react-router-dom";

function DeleteCountry() {
  const navigate = useNavigate();
  const location = useLocation();

  const dataRef = useRef({});
  const id = useRef(location.state ? location.state.id : -1);

  const getDataAppend = "WHERE idCountry = " + id.current.toString();
  const updateFilter = "idCountry = " + id.current.toString();

  const [post, setPost] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DataNext("Countries", getDataAppend, "delete", id).then((response) => {
      setPost(response);

      return response;
    });
    setIsLoading(false);
  }, []);

  const deleteForm = (e) => {
    e.preventDefault();

    setIsLoading(true);
    Promise.allSettled([
      deleteData("Countries", id, updateFilter).catch((error) => error)
    ]).then(() => navigate("/countries"));
  };
  return (
    <>
      <div className="content">
        <h1>Delete Country Page</h1>
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

export default DeleteCountry;
