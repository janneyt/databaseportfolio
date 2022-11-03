import {Link} from 'react-router-dom';

function Index() {
    return(
        <div id="contents">
            <h1>Index Page</h1>

            <h2>The following is a list of individual pages:</h2>

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

        </div>
    )
}

export default Index;