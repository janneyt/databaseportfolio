import TableView from '../../components/TableView/TableView';
import {headers, ReturnedData} from '../../data/itemData';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


function Items() {
    const navigate = useNavigate();
    const [tableData, setTableData] = useState([["","","","","",""]])
    ReturnedData("READ", '{"columns":["idItem","itemName","itemDescription"],"table":"Items"}')
    .then((response) =>{
        setTableData(response);

    })
    .catch((error) => console.log("error in items.js",error));

    return(
        <>
        <div id="content">
            <h1>Items</h1>
            <TableView headers={headers} listData={tableData} />
            <Link to="/addItem"><Button>Add Item</Button></Link>
            <Button onClick = {() => {navigate(-1)}}>Cancel</Button>
        </div>
        </>
    )
}

export default Items;