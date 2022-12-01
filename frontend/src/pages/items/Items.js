// Import Components
import TableView from '../../components/TableView/TableView';

import ShowIfLoaded from '../../components/ShowIfLoaded';
import { ItemHeaders } from '../../data/headers'

import Button from '../../components/Button';

// Import React requirements
import { Link, useNavigate } from 'react-router-dom';

import { DataNext } from '../../axios/DataNext.js';
import { useEffect, useState } from 'react';


function Items() {
    const navigate = useNavigate();
    const [post, setPost] = useState([[]]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        DataNext("Items").then((response) => {
            console.log(response);
            setPost(response);
            setIsLoading(false);
        });
    }, []);

    return (
        <>
            <div id="content">
                <h1>Items</h1>
                <ShowIfLoaded isLoading = {isLoading}>
                    <TableView headers={ItemHeaders} listData={post} />
                    <Link to="/addItem"><Button>Add Item</Button></Link>
                    <Button  onClick={() => { navigate(-1) }}>Cancel</Button>
                </ShowIfLoaded>
            </div>
        </>
    )
}

export default Items;