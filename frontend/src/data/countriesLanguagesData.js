import Button from '../components/Button';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const headers = ["Name", "Country's Known Languages", "Add Language", "Delete Language"];

const countryLanguages = [{value:"countrylanguages", label:"{$languageName}"},
{value:"westron", label:"Westron"},
{value:"sylvanelvish", label:"Sylvan Elvish"},
{value:"None", label:"Null"}
];

// Currently reusing the same Select, this is temporary anyway.
const tableData = [
    ["${countryName}", <Select options={countryLanguages}/>],
    ["USA", <Select options={countryLanguages}/>],
    ["Gondor", <Select options={countryLanguages} />]
];

for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/addLanguageToCountry"><Button>Add Language</Button></Link>);
    tableData[index].push(<Link to="/deleteLanguageFromCountry"><Button>Delete Language</Button></Link>);
}

const addFormContents = [
    {type:"select", name:"languages", label:"What language should be assigned to country?", options:countryLanguages }
];

const deleteFormContents = [
    {type:"hidden", name:"${idLanguage}"}
];


export {headers, tableData, addFormContents, deleteFormContents};