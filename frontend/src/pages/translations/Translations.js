import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/translationData';
import Button from '../../components/Button';

function Translations() {

    return(
        <div id="content">
            <h1>Translations</h1>
            <TableView headers={headers} listData={tableData} />
            <Button>Add Translation</Button>
            <Button>Cancel</Button>
        </div>
    )
}

export default Translations;