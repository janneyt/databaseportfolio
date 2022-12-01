import TableView from '../../components/TableView/TableView';
import {headers, fetchCoHLData} from '../../data/countriesLanguagesData';
import Button from '../../components/Button';
import { Link, useNavigate } from "react-router-dom";

import ShowIfLoaded from "../../components/ShowIfLoaded";
import { DataNext } from '../../axios/DataNext.js';
import { useEffect, useState } from "react";

function CountriesHaveLanguages() {
    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(true);
  
    const navigate = useNavigate();
  
    useEffect(() => {
      DataNext("Countries_has_Languages").then((response) => {
        setPost(response);
        setIsLoading(false);
        return response;
      });
    }, []);
  
    return (
      <>
        <div id="content">
          <h1>Countries Have Languages</h1>
          <ShowIfLoaded isLoading={isLoading}>
            <TableView headers={headers} listData={post} />
            <Link to="/addLanguageToCountry">
              <Button>Add Language to Country</Button>
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

export default CountriesHaveLanguages;