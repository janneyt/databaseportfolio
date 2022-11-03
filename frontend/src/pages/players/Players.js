import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/playerData';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';

function Players() {

    const navigate = useNavigate();
    return(
        <div id="content">
            <h1>Players</h1>
            <TableView headers={headers} listData={tableData} />
            <Link to="/AddPlayer"><Button>Add Player</Button></Link>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    )
}

export default Players;