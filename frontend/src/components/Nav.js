import { Link } from 'react-router-dom';
import Button from './Button';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
    const navigate = useNavigate();
    return (
        <>
            <nav id="navigation">
                <Link to="/"><Button class="nav-button">Home</Button></Link>
                <Link to="/characters"><Button class="nav-button">Characters</Button></Link>
                <Link to="/countries"><Button class="nav-button">Countries</Button></Link>
                <Link to="/games"><Button class="nav-button">Games</Button></Link>
                <Link to="/items"><Button class="nav-button">Items</Button></Link>
                <Link to="/languages"><Button class="nav-button">Languages</Button></Link>
                <Link to="/players"><Button class="nav-button">Players</Button></Link>
                <Link to="/charactersHaveItems"><Button class="nav-button">Characters Have Items</Button></Link>
                <Link to="/charactersHaveLanguages"><Button class="nav-button">Characters Have Languages</Button></Link>
                <Link to="/countriesHaveLanguages"><Button class="nav-button">Countries Have Languages</Button></Link>
                {/* <Link to="/translations"><Button>Translations</Button></Link> */}
          </nav>
        </>
    );
};

export default Nav;