import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/languagesLanguageRulesData';
import Button from '../../components/Button';
import { Link, useNavigate } from "react-router-dom";

import ShowIfLoaded from "../../components/ShowIfLoaded";
import { DataNext } from "../../axios/crud.js";
import { useEffect, useState } from "react";

function LanguagesHaveLanguageRules() {
    const [post, setPost] = useState();
    const [isLoading, setIsLoading] = useState(true);
  
    const navigate = useNavigate();

    useEffect(() => {
        DataNext("languageslanguagerules").then((response) => {
          setPost(response);
          setIsLoading(false);
          return response;
        });
      }, []);

    return(
        <>
        <div id="content">
          <h1>Languages Have Language Rules</h1>
          <ShowIfLoaded isLoading={isLoading}>
            <TableView headers={headers} listData={post} />
            <Link to="/addRuleToLanguage">
              <Button>Add Rule to Language</Button>
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

export default LanguagesHaveLanguageRules;