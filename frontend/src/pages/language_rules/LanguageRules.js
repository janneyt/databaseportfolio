import TableView from '../../components/TableView/TableView';
import {headers } from '../../data/languageRuleData';
import Button from '../../components/Button';
import { useNavigate, Link } from 'react-router-dom';
import ShowIfLoaded from '../../components/ShowIfLoaded';
import { DataNext } from '../../axios/DataNext.js';
import { useEffect, useState } from 'react';


function LanguageRules() {
    const navigate = useNavigate();
    const [post, setPost] = useState([[]]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        DataNext("LanguageRules").then((response) => {
            setPost(response);
            setIsLoading(false);
        });
    }, []);

    return(
        <>
            <div id="content">
                <h1>Rules for creating a language</h1>
                <ShowIfLoaded isLoading = {isLoading}>
                    <TableView headers={headers} listData={post} />
                    <Link to="/addLanguageRule"><Button>Add Language Rule</Button></Link>
                    <Button  onClick={() => { navigate(-1) }}>Cancel</Button>
                </ShowIfLoaded>
            </div>
        </>
    )
}

export default LanguageRules;