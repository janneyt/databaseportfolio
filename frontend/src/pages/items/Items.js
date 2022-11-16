import TableView from '../../components/TableView/TableView';
import { headers } from '../../data/itemData';
import Button from '../../components/Button';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { DataNext } from '../../axios/crud.js';
import { useEffect, useState } from 'react';


/**
 * Unfortunately, implementing CRUD required a rewrite of the Items page. The steps are as follows:
 * The old tableData variable has to be global to resolve the promises
 * 
 * Created a new async function (Items cannot be async or React gets mad) that calls 
 * the axios method inside itemData.js
 * 
 * Use a .then method and set the response equal to a new variable
 * Assign that variable to the global tableData variable
 * Return the new variable
 * 
 * For some reason, all three of these steps must be followed to resolve the Promise
 * and also store the value higher up
 * 
 * Call the new async function
 * 
 * Still TODO: Write a funciton that creates the currently hardcoded string of requested data
*/

const ShowIfLoaded = ({isLoading, children}) => {
    if(isLoading){
        return(<p>Loading Data...</p>)
    }
    return <>{children}</>
}

function Items() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [post, setPost] = useState([[]]);
    const location = useLocation();
    const stateData = location.state;

    console.log("state data", stateData);

    useEffect(() => {
        setPost(DataNext("Items"));
        console.log("post in Items", post);
        setIsLoading(false)
    }, [isLoading]);

    return (
        <>
            <div id="content">
                <h1>Items</h1>
                <ShowIfLoaded isLoading = {isLoading}>
                    <TableView headers={headers} listData={post ? post : stateData["items"]} page={"items"}/>
                    <Link to="/addItem"><Button>Add Item</Button></Link>
                    <Button  onClick={(e) => { 
                        e.preventDefault();
                        navigate(-1, {state: {state: post}}); 
                        }}>Cancel</Button>
                </ShowIfLoaded>
            </div>
        </>
    )
}

export default Items;