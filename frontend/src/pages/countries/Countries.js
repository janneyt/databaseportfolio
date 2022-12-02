import TableView from "../../components/TableView/TableView";
import { CountryHeaders } from '../../data/headers'
import Button from "../../components/Button";
import { useNavigate, Link } from "react-router-dom";
import ShowIfLoaded from "../../components/ShowIfLoaded";
import { DataNext } from '../../axios/DataNext.js';
import { useEffect, useState } from "react";

function Countries() {
  const navigate = useNavigate();
  const [post, setPost] = useState([[]]);
  const [isLoading, setIsLoading] = useState(true);
  const countryHeader = ["Country Name", "Size of Country in Kilometers","Population", "Edit","Delete"]

  useEffect(() => {
    DataNext("Countries").then((response) => {

      // Optional setup to not show IDs
      const prettifiedCountries = [];
      for(const country of response){
        country.splice(0,1)
        prettifiedCountries.push(country);
      }
      setPost(prettifiedCountries);
      setIsLoading(false);
    });
  }, []);

  return (
    <>
      <div id="content">
        <h1>Countries</h1>
        <ShowIfLoaded isLoading={isLoading}>
          <TableView headers={countryHeader} listData={post} />
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
