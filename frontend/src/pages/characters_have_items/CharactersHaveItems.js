import TableView from "../../components/TableView/TableView";
import { CharacterItemsHeaders } from '../../data/headers'
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import ShowIfLoaded from "../../components/ShowIfLoaded";
import { DataNext } from '../../axios/DataNext.js';
import { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar.js";

// Data
import {
  searchFormContents
} from "../../data/charactersItemsData";

function CharactersHaveItems() {
  const [post, setPost] = useState([{}]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to make sure the promises all complete
    DataNext("Characters_has_Items").then((response) => {
      if(response) setPost(response);
      if (response[0] && response[0].length > 0 && response[0] !== []) {
        setIsLoading(false);
      } 
      return response;
    });

  }, []);

  return (
    <>
      <div id="content">
        <h1>Characters Have Items</h1>
        Don't see what you want? Search by item or character to see the relationships
          <SearchBar searchFormContents={searchFormContents} 
            page={"Characters_has_Items"}
            joinedPage1={"Characters"}
            joinedPage2={"Items"}
            joinedValue1={"Character"}
            joinedValue2={"Item"}
            nameValue1={"characterName"}
            nameValue2={"itemName"}
            headers={CharacterItemsHeaders}/>
        <ShowIfLoaded isLoading={isLoading}>
          
          <TableView headers={CharacterItemsHeaders} listData={post} />
          <Link to="/addItemToCharacter">
            <Button>Add Item to Character</Button>
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

export default CharactersHaveItems;
