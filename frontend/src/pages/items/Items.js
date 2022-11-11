import TableView from '../../components/TableView/TableView';
import {headers, tableData, returnedData} from '../../data/itemData';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';

// Axios for promises/APIs
import Axios from 'axios';

const fetchTableData = () => {
    const list_param = JSON.stringify(["idItem","itemName","itemDescription"])

    console.log(list_param);
    let parameters = JSON.stringify(
        '{"columns":'+list_param+', "table":"Items"}'
    );

    const data = returnedData("READ", parameters)
    return data;
};
const fillTableData = fetchTableData();

function Items() {

    const navigate = useNavigate();

    return(
        <div id="content">
            <h1>Items</h1>
            <TableView headers={headers} listData={fillTableData} />
            <Link to="/addItem"><Button>Add Item</Button></Link>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    )
}

export default Items;