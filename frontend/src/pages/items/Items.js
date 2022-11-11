import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/itemData';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';

// Axios for promises/APIs
import Axios from 'axios';

function Items() {

    const navigate = useNavigate();

    return(
        <div id="content">
            <h1>Items</h1>
            <TableView headers={headers} listData={tableData} />
            <Link to="/addItem"><Button>Add Item</Button></Link>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    )
}

export default Items;