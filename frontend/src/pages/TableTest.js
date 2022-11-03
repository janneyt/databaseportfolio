import TableView from '../components/TableView/TableView';
import Button from '../components/Button';
import { headers, tableData } from '../data/charactersData';

function tableTest() {

    return (
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

export default tableTest;