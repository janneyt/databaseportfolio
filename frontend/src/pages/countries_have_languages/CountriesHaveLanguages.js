import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/countriesLanguagesData';
import Button from '../../components/Button';

function CountriesHaveLanguages() {

    return(
        <div id="content">
            <h1>Countrys's Languages</h1>
            <TableView headers={headers} listData={tableData} />
            <Button>Cancel</Button>
        </div>
    )
}

export default CountriesHaveLanguages;