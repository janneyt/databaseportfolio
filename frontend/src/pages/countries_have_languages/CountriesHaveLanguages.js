import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/countriesLanguagesData';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

function CountriesHaveLanguages() {

    const navigate = useNavigate();

    return(
        <div id="content">
            <h1>Country's Languages</h1>
            <TableView headers={headers} listData={tableData} />
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    )
}

export default CountriesHaveLanguages;