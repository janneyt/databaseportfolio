import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/countryData';
import Button from '../../components/Button';

function Countries() {

    return(
        <div id="content">
            <h1>Countries</h1>
            <TableView headers={headers} listData={tableData} />
            <Button>Add Country</Button>
            <Button>Cancel</Button>
        </div>
    )
}

export default Countries;