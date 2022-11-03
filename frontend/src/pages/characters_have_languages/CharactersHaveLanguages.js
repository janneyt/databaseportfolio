import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/charactersLanguagesData';
import Button from '../../components/Button';

function CharactersHaveLanguages() {

    return(
        <div id="content">
            <h1>Characters's Languages</h1>
            <TableView headers={headers} listData={tableData} />
            <Button>Cancel</Button>
        </div>
    )
}

export default CharactersHaveLanguages;