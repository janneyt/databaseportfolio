import TableView from "../../components/TableView/TableView";
import { headers } from "../../data/countryData";
import Button from "../../components/Button";
import { useNavigate, Link } from "react-router-dom";
import ShowIfLoaded from "../../components/ShowIfLoaded";
import { DataNext } from '../../axios/DataNext.js';
import { useEffect, useState } from "react";

function Countries() {
  const navigate = useNavigate();
  const [post, setPost] = useState([[]]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    DataNext("Countries").then((response) => {
      setPost(response);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div id="content">
        <h1>Countries</h1>
        <ShowIfLoaded isLoading={isLoading}>
          <TableView headers={headers} listData={post} />
          <Link to="/addCountry">
            <Button>Add Country</Button>
          </Link>
          <Button onClick={() => {
              navigate(-1);
            }}>Cancel</Button>
        </ShowIfLoaded>
      </div>
    </>
  );
}

export default Countries;
