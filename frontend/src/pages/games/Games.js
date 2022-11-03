import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/gameData';
import Button from '../../components/Button';

import { useNavigate } from 'react-router-dom';

function Games() {

    const navigate = useNavigate();
    
    return(
        <div id="content">
            <h1>Games</h1>
            <TableView headers={headers} listData={tableData} />
            <Button>Add Game</Button>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    )
}

export default Games;