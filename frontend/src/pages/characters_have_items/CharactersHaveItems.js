import TableView from "../../components/TableView/TableView";
import { CharacterItemsHeaders } from '../../data/headers'
import Button from "../../components/Button";
import { Link, useNavigate } from "react-router-dom";
import ShowIfLoaded from "../../components/ShowIfLoaded";
import { DataNext } from '../../axios/DataNext.js';
import { useEffect, useState } from "react";

function CharactersHaveItems() {
  const [post, setPost] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // Set a timer to make sure the promises all complete
    const timer = setTimeout(() => console.log('Initial timeout!'), 1000);
    DataNext("Characters_has_Items").then((response) => {
      setPost(response);
      if (response[0].length > 0 && response[0] !== []) {
        setIsLoading(false);
      }
      return response;
    });

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div id="content">
        <h1>Characters Have Items</h1>
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
