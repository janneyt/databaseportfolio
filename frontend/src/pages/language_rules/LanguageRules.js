import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/languageData';
import Button from '../../components/Button';
import { useNavigate, Link } from 'react-router-dom';

function LanguageRules() {

    const navigate = useNavigate();

    return(
        <div id="content">
            <h1>Language Rules</h1>
            <TableView headers={headers} listData={tableData} />
            <Link to="/AddLanguageRule"><Button>Add Language</Button></Link>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    )
}

export default LanguageRules;