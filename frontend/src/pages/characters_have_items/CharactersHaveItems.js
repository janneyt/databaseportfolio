import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/charactersItemsData';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';

function CharactersHaveItems() {

    const navigate = useNavigate();

    return(
        <div id="content">
            <h1>Characters's Items</h1>
            <TableView headers={headers} listData={tableData} />
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    )
}

export default CharactersHaveItems;