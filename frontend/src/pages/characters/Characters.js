import TableView from '../../components/TableView/TableView';
import {headers, tableData} from '../../data/charactersData';
import Button from '../../components/Button';
import { useNavigate, Link } from 'react-router-dom';


function Characters() {

    const navigate = useNavigate();

    return(
        <div id="content">
            <h1>Characters</h1>
            <TableView headers={headers} listData={tableData} />
            <Link to="/addCharacter"><Button>Add Character</Button></Link>
            <Link to="/CharactersHaveLanguages"><Button>Character's Languages</Button></Link>
            <Link to="/CharactersHaveItems"><Button>Character's Items</Button></Link>
            <Button onClick={() => navigate(-1)}>Cancel</Button>
        </div>
    )
}

export default Characters;