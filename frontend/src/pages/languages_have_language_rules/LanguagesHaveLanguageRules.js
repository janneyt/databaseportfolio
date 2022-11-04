import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/languagesLanguageRulesData';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

function LanguagesHaveLanguageRules() {

    const navigate = useNavigate();

    return(
        <div id="content">
            <h1>Language Rules for Languages</h1>
            <TableView headers={headers} listData={tableData} />
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    )
}

export default LanguagesHaveLanguageRules;