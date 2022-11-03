import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/playerData';
import Button from '../../components/Button';

function Players() {

    return(
        <div id="content">
            <h1>Players</h1>
            <TableView headers={headers} listData={tableData} />
            <Button>Add Player</Button>
            <Button>Cancel</Button>
        </div>
    )
}

export default Players;