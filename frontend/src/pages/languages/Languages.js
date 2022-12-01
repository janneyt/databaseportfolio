import TableView from '../../components/TableView/TableView';
import {headers } from '../../data/languageData';
import Button from '../../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import ShowIfLoaded from "../../components/ShowIfLoaded";
import { DataNext } from '../../axios/DataNext.js';
import { useEffect, useState } from "react";


function Languages() {

    const [post, setPost] = useState([[]]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        DataNext("Languages").then((response) => {
          setPost(response);
          setIsLoading(false);
        });
      }, []);

    return(
        <>
      <div id="content">
        <h1>Languages</h1>
        <ShowIfLoaded isLoading={isLoading}>
          <TableView headers={headers} listData={post} />
          <Link to="/addLanguage">
            <Button>Add Language</Button>
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
    )
}

export default Languages;