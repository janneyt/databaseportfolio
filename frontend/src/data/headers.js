// Definition of headers for each page
// Determine the table headers used
// Also used to build the SQL requests from the backend
// Any options/menu buttons at the end of the table
// must also be included here (they are filtered out, see DataNext.js)

const CharacterItemsHeaders = [
    "idItem",
    "idCharacter",
    "Add Item",
    "Delete Item",
];

const CharacterHeaders = [
    "idCharacter",
    "characterName",
    "characterDescription",
    "Edit",
    "Delete",
];

const CharacterLanguageHeaders = [
    "idLanguage",
    "idCharacter",
    "Add Item",
    "Delete Item",
];

const CountryHeaders = [
    "idCountry",
    "countryName",
    "sizeInKm",
    "population",
    "Edit",
    "Delete",
];

const CountryLanguageHeaders = [
    "idLanguage",
    "idCountry",
    "Add Language",
    "Delete Language",
];

const GameHeaders = [
    "idGame",
    "gameName",
    "Activate",
    "Edit",
    "Delete",
  ];

const ItemHeaders = [
    "idItem",
    "itemName",
    "itemDescription",
    "Edit",
    "Delete",
];

const LanguageHeaders = [
    "idLanguage",
    "languageName",
    "languageDescription",
    "Edit",
    "Delete",
];

const LanguageRuleHeaders = [
    "ruleName",
    "definition",
    "Edit",
    "Delete"
];

const LLRHeaders = [
    "idLanguage",
    "idLanguageRule",
    "Add Language Rule",
    "Delete Language or Language Rule",
];

const PlayerHeaders = [
    "idPlayer",
    "playerName",
    "Edit",
    "Delete",
];

const TranslationHeaders = [
    "idTranslationOutput",
    "outputContents",
    "inputContents",
    "Delete",
];

export {
    CharacterItemsHeaders,
    CharacterHeaders,
    CharacterLanguageHeaders,
    CountryHeaders,
    CountryLanguageHeaders,
    GameHeaders,
    ItemHeaders,
    LanguageHeaders,
    PlayerHeaders,
    LanguageRuleHeaders,
    LLRHeaders,
    TranslationHeaders,
}