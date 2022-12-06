import TableView from "../../components/TableView/TableView";
import { CharacterLanguageHeaders } from '../../data/headers'
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";

import ShowIfLoaded from "../../components/ShowIfLoaded";
import { DataNext } from '../../axios/DataNext.js';
import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar.js";

// Data
import {
  searchFormContents
} from "../../data/charactersLanguagesData";

function CharactersHaveLanguages() {
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    DataNext("Characters_has_Languages").then((response) => {
      setPost(response);
      if(response[0].length > 0 && response[0] !== []){
        setIsLoading(false);
      }
      
      return response;
    });
    
  }, []);

  return (
    <>
      <div id="content">
        <h1>Characters Have Languages</h1>
        Don't see what you want? Search for languages or characters to see the relationships
        <SearchBar searchFormContents={searchFormContents} 
            page={"Characters_has_Languages"}
            joinedPage1={"Characters"}
            joinedPage2={"Languages"}
            joinedValue1={"Character"}
            joinedValue2={"Language"}
            nameValue1={"characterName"}
            nameValue2={"languageName"}
            headers={CharacterLanguageHeaders}/>
        <ShowIfLoaded isLoading={isLoading}>
          <TableView headers={CharacterLanguageHeaders} listData={post} />
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
