import Form from "../../components/Forms/Form";
import ShowIfLoaded from "../../components/ShowIfLoaded";
import { useState } from "react";
import { prepareFormData } from "../../functions/submitFunctions.js";

function DeleteItem() {
  const [post, setPost] = useState([{}]);

  // Why use edit? Because edit and delete use the same data shape, [{}]
  useEffect(() => {
    DataNext("Items", append, "edit", id).then((response) => {
      setPost(response);
      return response;
    });
    setIsLoading(false);
  }, []);

  const deleteForm = () => {
    e.preventDefault();
    prepareFormData(dataRef, submitData);
    const form = e.target;
    setIsLoading(true);
    deleteData("Items", updates, updateAppend)
      .then(() => setIsLoading(false))
      .catch((error) => error);
    navigate("/items");
  };

  return (
    <>
      <div className="content">
        <h1>Edit Item Page</h1>
        <ShowIfLoaded isLoading={isLoading}>
          <Form
            submitText="Save"
            inputState={post}
            onSubmit={deleteForm}
            refDict={dataRef}
          />
        </ShowIfLoaded>
      </div>
    </>
  );
}

export default DeleteItem;
