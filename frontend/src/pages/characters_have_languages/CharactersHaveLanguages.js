import TableView from "../../components/TableView/TableView";
import { headers, tableData } from "../../data/charactersLanguagesData";
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

import ShowIfLoaded from "../../components/ShowIfLoaded";
import { DataNext } from "../../axios/crud.js";
import { useEffect, useState } from "react";

function CharactersHaveLanguages() {
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    DataNext("Characters_has_Languages").then((response) => {
      setPost(response);
      setIsLoading(false);
      return response;
    });
  }, []);

  return (
    <>
      <div id="content">
        <h1>Characters Have Languages</h1>
        <ShowIfLoaded isLoading={isLoading}>
          <TableView headers={headers} listData={post} />
          <Link to="/addLanguageToCharacter">
            <Button>Add Language to Character</Button>
          </Link>
          <Button
            onClick={() => {
              navigate(-1);
            }}
          >
            Cancel
          </Button>
        </ShowIfLoaded>
      </div>
    </>
  );
}

export default CharactersHaveLanguages;
