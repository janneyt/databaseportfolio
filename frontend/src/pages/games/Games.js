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
    
    return(
        <div id="content">
            <h1>Games</h1>
            <TableView headers={headers} listData={tableData} />
            <Link to="/addGame"><Button>Add Game</Button></Link>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
            <br />
            <br />
            Retrieve your game:
            <SearchBar />
            <h3>Results:</h3>
            <p><TableView headers={headers} listData={tableData} /></p>
        </div>
    )
}

export default Games;