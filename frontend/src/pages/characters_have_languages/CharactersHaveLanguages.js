import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/charactersLanguagesData';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';

function CharactersHaveLanguages() {

    const navigate = useNavigate();
    
    return(
        <div id="content">
            <h1>Characters's Languages</h1>
            <TableView headers={headers} listData={tableData} />
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    )
}

export default CharactersHaveLanguages;