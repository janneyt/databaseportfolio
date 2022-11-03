import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/countryData';
import Button from '../../components/Button';

import { useNavigate } from 'react-router-dom';

function Countries() {

    const navigate = useNavigate();

    return(
        <div id="content">
            <h1>Countries</h1>
            <TableView headers={headers} listData={tableData} />
            <Button>Add Country</Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    )
}

export default Countries;