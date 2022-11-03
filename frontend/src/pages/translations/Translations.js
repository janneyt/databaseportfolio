import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/translationData';
import Button from '../../components/Button';
import { Link, useNavigate } from 'react-router-dom';

function Translations() {

    const navigate = useNavigate();

    return(
        <div id="content">
            <h1>Translations</h1>
            <TableView headers={headers} listData={tableData} />
            <Link to="/addTranslation"><Button>Add Translation</Button></Link>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    )
}

export default Translations;