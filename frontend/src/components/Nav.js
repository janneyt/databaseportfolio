import { Link } from 'react-router-dom';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav id="navigation">
                <Link to="/"><Button className="nav-button">Home</Button></Link>
                <Link to="/characters"><Button className="nav-button">Characters</Button></Link>
                <Link to="/countries"><Button className="nav-button">Countries</Button></Link>
                <Link to="/games"><Button className="nav-button">Games</Button></Link>
                <Link to="/items"><Button className="nav-button">Items</Button></Link>
                <Link to="/languages"><Button className="nav-button">Languages</Button></Link>
                <Link to="/players"><Button className="nav-button">Players</Button></Link>
                <Link to="/charactersHaveItems"><Button className="nav-button">Characters Have Items</Button></Link>
                <Link to="/charactersHaveLanguages"><Button className="nav-button">Characters Have Languages</Button></Link>
                <Link to="/countriesHaveLanguages"><Button className="nav-button">Countries Have Languages</Button></Link>
          </nav>
        </>
    );
};

export default Nav;