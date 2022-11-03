import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/charactersData';
import Button from '../../components/Button';

function Characters() {

    return(
        <div id="content">
            <h1>Characters</h1>
            <TableView headers={headers} listData={tableData} />
            <Button>Add Character</Button>
            <Button>Character's Languages</Button>
            <Button>Character's Items</Button>
            <Button>Cancel</Button>
        </div>
    )
}

export default Characters;