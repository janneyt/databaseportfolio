import {Link} from 'react-router-dom';
import Button from '../components/Button';

function Index() {
    return(
        <div id="contents">
            <nav>
                <Link to="/characters"><Button>Characters</Button></Link>
                <Link to="/countries"><Button>Countries</Button></Link>
                <Link to="/games"><Button>Games</Button></Link>
                <Link to="/items"><Button>Items</Button></Link>
                <Link to="/languages"><Button>Languages</Button></Link>
                <Link to="/players"><Button>Players</Button></Link>
                <Link to="/translations"><Button>Translations</Button></Link>
            </nav>
            
            <h1>Welcome</h1>
            <p>The following pages are our intersection tables. We had a bug that gave us issues implementing the regular non-intersection tables. So these are still a WIP.
            </p>

            <p>The main links implemented are above. We had to remake a lot of our code, so we had difficulties getting everything to work and expand to every item.
            </p>
            <Link to="/CharactersHaveItems"><Button>CharactersHaveItems</Button></Link>
            <Link to="/CharactersHaveLanguages"><Button>Characters Have Languages</Button></Link>
            <Link to="/CountriesHaveLanguages"><Button>Countries Have Languages</Button></Link>
            <Link to="/languageRules"><Button>Language Rules</Button></Link>
            <Link to="/LanguagesHaveLanguageRules"><Button>Languages Have Language Rules</Button></Link>

            {/* <h2>The following is a list of individual pages:</h2>

            <h2>Characters</h2>
            <Link to="/addCharacter">Add Character</Link><br></br>
            <Link to="/editCharacter">Edit Character</Link><br></br>
            <Link to="/deleteCharacter">Delete Character</Link><br></br>
            <Link to="/characters">Characters</Link><br></br>

            <h2>Countries</h2>
            <Link to="/addCountry">Add Country</Link><br></br>
            <Link to="/editCountry">Edit Country</Link><br></br>
            <Link to="/deleteCountry">Delete Country</Link><br></br>
            <Link to="/countries">Countries</Link><br></br>

            <h2>Games</h2>
            <Link to="/addGame">Add Game</Link><br></br>
            <Link to="/editGame">Edit Game</Link><br></br>
            <Link to="/deleteGame">Delete Game</Link><br></br>
            <Link to="/games">Games</Link><br></br>

            <h2>Items</h2>
            <Link to="/addItem">Add Item</Link><br></br>
            <Link to="/editItem">Edit Item</Link><br></br>
            <Link to="/deleteItem">Delete Item</Link><br></br>
            <Link to="/items">Items</Link><br></br>

            <h2>Languages</h2>
            <Link to="/addLanguage">Add Language</Link><br></br>
            <Link to="/editLanguage">Edit Language</Link><br></br>
            <Link to="/deleteLanguage">Delete Language</Link><br></br>
            <Link to="/languages">Languages</Link><br></br>

            <h2>Players</h2>
            <Link to="/addPlayer">Add Player</Link><br></br>
            <Link to="/editPlayer">Edit Player</Link><br></br>
            <Link to="/deletePlayer">Delete Player</Link><br></br>
            <Link to="/players">Players</Link><br></br>

            <h2>Translations</h2>
            <Link to="/addTranslation">Add Translation</Link><br></br>
            <Link to="/deleteTranslation">Delete Translation</Link><br></br>
            <Link to="/translations">Translations</Link><br></br>

            <h2>Language Rules</h2>
            <Link to="/addLanguageRule">Add Language Rule</Link><br></br>
            <Link to="/editLanguageRule">Edit Language Rule</Link><br></br>
            <Link to="/deleteLanguageRule">Delete Language Rule</Link><br></br>
            <Link to="/languageRules">Language Rules</Link><br></br>

            <h2>Characters Have Items</h2>
            <Link to="/addItemToCharacter">Add Item To Character</Link><br></br>
            <Link to="/deleteItemFromCharacter">Delete Item From Character</Link><br></br>
            <Link to="/CharactersHaveItems">CharactersHaveItems</Link><br></br>

            <h2>Characters Have Languages</h2>
            <Link to="/addLanguageToCharacter">Add Language To Character</Link><br></br>
            <Link to="/deleteLanguageFromCharacter">Delete Language FromCharacter</Link><br></br>
            <Link to="/CharactersHaveLanguages">CharactersHaveLanguages</Link> <br></br>

            <h2>Countries Have Languages</h2>
            <Link to="/addLanguageToCountry">Add Language To Country</Link><br></br>
            <Link to="/deleteLanguageFromCountry">Delete Language From Country</Link><br></br>
            <Link to="/CountriesHaveLanguages">Countries Have Languages</Link><br></br>

            <h2>Languages Have Language Rules</h2>
            <Link to="/addLanguageRuleToLanguage">Add Language Rule to Language</Link><br></br>
            <Link to="/LanguagesHaveLanguageRules">Languages Have Language Rules</Link><br></br> */}

        </div>
    )
}

export default Index;