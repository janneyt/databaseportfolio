import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/itemData';
import Button from '../../components/Button';

function Items() {

    return(
        <div id="content">
            <h1>Items</h1>
            <TableView headers={headers} listData={tableData} />
            <Button>Add Item</Button>
            <Button>Cancel</Button>
        </div>
    )
}

export default Items;