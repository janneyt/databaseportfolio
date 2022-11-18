import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/gameData';
import Button from '../../components/Button';
import { SearchBar } from '../../components/SearchBar';

import { Link, useNavigate } from 'react-router-dom';

import ShowIfLoaded from '../../components/ShowIfLoaded';


import { DataNext } from '../../axios/crud.js';
import { useEffect, useState } from 'react';

function Games() {

    const navigate = useNavigate();
    const [post, setPost] = useState([[]]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        DataNext("Games").then((response) => {
            console.log(response);
            setPost(response);
            setIsLoading(false);
        });
    }, []);
    
    return(
        <>
            <div id="content">
                <h1>Games</h1>
                <p>We are currently changing our implementation of our games. Please don't delete the first entry () in this table.</p>
                <ShowIfLoaded isLoading = {isLoading}>
                    <TableView headers={headers} listData={post} />
                    <Link to="/addGame"><Button>Add Item</Button></Link>
                    <Button  onClick={() => { navigate(-1) }}>Cancel</Button>
                </ShowIfLoaded>
            </div>
        </>
    )
}

export default Games;