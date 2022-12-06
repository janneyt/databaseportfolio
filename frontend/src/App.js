import './App.css';
import Nav from './components/Nav';

import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Index from './pages/Index';

import AddCharacter from './pages/characters/AddCharacter';
import Characters from './pages/characters/Characters';
import DeleteCharacter from './pages/characters/DeleteCharacter';
import EditCharacter from './pages/characters/EditCharacter';

import AddCountry from './pages/countries/AddCountry';
import Countries from './pages/countries/Countries';
import DeleteCountry from './pages/countries/DeleteCountry';
import EditCountry from './pages/countries/EditCountry';

import AddGame from './pages/games/AddGame';
import Games from './pages/games/Games';
import DeleteGame from './pages/games/DeleteGame';
import EditGame from './pages/games/EditGame';

import AddItem from './pages/items/AddItem';
import Items from './pages/items/Items';
import DeleteItem from './pages/items/DeleteItem';
import EditItem from './pages/items/EditItem';

import AddLanguage from './pages/languages/AddLanguage';
import Languages from './pages/languages/Languages';
import DeleteLanguage from './pages/languages/DeleteLanguage';
import EditLanguage from './pages/languages/EditLanguage';

import AddPlayer from './pages/players/AddPlayer';
import Players from './pages/players/Players';
import DeletePlayer from './pages/players/DeletePlayer';
import EditPlayer from './pages/players/EditPlayer';

import AddItemToCharacter from './pages/characters_have_items/AddItemToCharacter';
import EditItemToCharacter from './pages/characters_have_items/EditItemToCharacter';
import CharactersHaveItems from './pages/characters_have_items/CharactersHaveItems';
import DeleteItemFromCharacter from './pages/characters_have_items/DeleteItemFromCharacter';

import AddLanguageToCharacter from './pages/characters_have_languages/AddLanguageToCharacter';
import CharactersHaveLanguages from './pages/characters_have_languages/CharactersHaveLanguages';
import DeleteLanguageFromCharacter from './pages/characters_have_languages/DeleteLanguageFromCharacter';
import EditLanguageToCharacter from './pages/characters_have_languages/EditLanguageToCharacter';

import AddLanguageToCountry from './pages/countries_have_languages/AddLanguageToCountry';
import CountriesHaveLanguages from './pages/countries_have_languages/CountriesHaveLanguages';
import DeleteLanguageFromCountry from './pages/countries_have_languages/DeleteLanguageFromCountry';
import EditLanguageToCountry from './pages/countries_have_languages/EditLanguageToCountry';

import Header from './components/Header';
import Footer from './components/Footer';
import {Link} from 'react-router-dom';
import Button from './components/Button';

function App() {
  return (
    <>
      <Router>
        <Header>
         <Nav></Nav>
        </Header>
        <Routes>
        
          <Route path="/" element={<Index />} />

          <Route path="/addCharacter" element={<AddCharacter />} />
          <Route path="/editCharacter" element={<EditCharacter />} />
          <Route path="/deleteCharacter" element={<DeleteCharacter />} />
          <Route path="/characters" element={<Characters />} />

          <Route path="/addCountry" element={<AddCountry />} />
          <Route path="/editCountry" element={<EditCountry />} />
          <Route path="/deleteCountry" element={<DeleteCountry />} />
          <Route path="/countries" element={<Countries />} />

          <Route path="/addGame" element={<AddGame />} />
          <Route path="/editGame" element={<EditGame />} />
          <Route path="/deleteGame" element={<DeleteGame />} />
          <Route path="/games" element={<Games />} />

          <Route path="/addItem" element={<AddItem />} />
          <Route path="/editItem" element={<EditItem />} />
          <Route path="/deleteItem" element={<DeleteItem />} />
          <Route path="/items" element={<Items />} />

          <Route path="/addLanguage" element={<AddLanguage />} />
          <Route path="/editLanguage" element={<EditLanguage />} />
          <Route path="/deleteLanguage" element={<DeleteLanguage />} />
          <Route path="/languages" element={<Languages />} />

          <Route path="/addPlayer" element={<AddPlayer />} />
          <Route path="/editPlayer" element={<EditPlayer />} />
          <Route path="/deletePlayer" element={<DeletePlayer />} />
          <Route path="/players" element={<Players />} />

          <Route path="/addItemToCharacter" element={<AddItemToCharacter />} />
          <Route path="/editItemToCharacter" element={<EditItemToCharacter />} />
          <Route path="/deleteItemFromCharacter" element={<DeleteItemFromCharacter />} />
          <Route path="/charactersHaveItems" element={<CharactersHaveItems />} />

          <Route path="/addLanguageToCharacter" element={<AddLanguageToCharacter />} />
          <Route path="/deleteLanguageFromCharacter" element={<DeleteLanguageFromCharacter />} />
          <Route path="/charactersHaveLanguages" element={<CharactersHaveLanguages />} /> 
          <Route path="/editLanguageToCharacter" element={<EditLanguageToCharacter />} />

          <Route path="/addLanguageToCountry" element={<AddLanguageToCountry />} />
          <Route path="/deleteLanguageFromCountry" element={<DeleteLanguageFromCountry />} />
          <Route path="/countriesHaveLanguages" element={<CountriesHaveLanguages />} />
          <Route path="/editLanguageToCountry" element={<EditLanguageToCountry />} />
        </Routes>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
