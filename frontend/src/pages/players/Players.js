// Import Components
import TableView from '../../components/TableView/TableView';

import ShowIfLoaded from '../../components/ShowIfLoaded';
import { PlayerHeaders } from '../../data/headers'

import Button from '../../components/Button';

// Import React requirements
import { Link, useNavigate } from 'react-router-dom';

import { DataNext } from '../../axios/DataNext.js';
import { useEffect, useState } from 'react';

function Players() {
    const navigate = useNavigate();
    const [post, setPost] = useState([[]]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        DataNext("Players").then((response) => {
            setPost(response);
            setIsLoading(false);
        });
    }, []);
    return(
        <>
            <div id="content">
                <h1>Players</h1>
                <ShowIfLoaded isLoading = {isLoading}>
                    <TableView headers={PlayerHeaders} listData={post} />
                    <Link to="/addPlayer"><Button>Add Player</Button></Link>
                    <Button  onClick={() => { navigate(-1) }}>Cancel</Button>
                </ShowIfLoaded>
            </div>
        </>
    )
}

export default Players;