import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/languageData';
import Button from '../../components/Button';

function Languages() {

    return(
        <div id="content">
            <h1>Languages</h1>
            <TableView headers={headers} listData={tableData} />
            <Button>Add Language</Button>
            <Button>Cancel</Button>
        </div>
    )
}

export default Languages;