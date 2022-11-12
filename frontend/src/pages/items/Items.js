// Import Components
import TableView from '../../components/TableView/TableView';
import Button from '../../components/Button';

// Import Data requirements
import { headers } from '../../data/itemData';
import { ReturnedData } from '../../data/Axios';

// Import React requirements
import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, componentDidMount } from 'react';

/* WHEN PAGE LOADS
* 1. A promise is created and ReturnedData function sends POST Request
* via Axios.
* 2. When the promise is resolved it's saved as the response.
*
* THE ShowIfLoaded COMPONENT
* Experimental component that will only show contents (children)
* if the given isLoading state is set to false. Currently it
* will display "loading data..." until the response is received.
*/ 
const ShowIfLoaded = ({ isLoading, children }) => {
    if (isLoading) {
        return (
            <p>Loading Data...</p>
        )
    }

    return <>{children}</>
}

// Promise to get data
const dataPromise = ReturnedData("READ", '{"columns":["idItem","itemName","itemDescription"], "table":"Items"}')
    .then((response) => response);


function Items() {
    const navigate = useNavigate();

    // Set up use State
    const [tableData, setTableData] = useState();
    const [isLoading, setIsLoading] = useState(true);

    // useEffect will re-render the page when any
    // of the dependencies (isLoading in this case) changes.
    // 
    useEffect(() => {
        dataPromise.then((response) => {
            setTableData(response); // Set tableData from response
            setIsLoading(false); // Update isLoading, thus re-rendering
        })
    }, [isLoading]);

    return (
        <>
            <div id="content">
                <h1>Items</h1>
                <ShowIfLoaded isLoading = {isLoading}>
                    <TableView headers={headers} listData={tableData} />
                    <Link to="/addItem"><Button>Add Item</Button></Link>
                    <Button onClick={() => { navigate(-1) }}>Cancel</Button>
                </ShowIfLoaded>
            </div>
        </>
    )
}

export default Items;