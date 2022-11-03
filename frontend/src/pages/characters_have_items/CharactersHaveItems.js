import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/charactersItemsData';
import Button from '../../components/Button';

function CharactersHaveItems() {

    return(
        <div id="content">
            <h1>Characters's Items</h1>
            <TableView headers={headers} listData={tableData} />
            <Button>Cancel</Button>
        </div>
    )
}

export default CharactersHaveItems;