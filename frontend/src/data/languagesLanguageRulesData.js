import Button from '../components/Button';
import { Link } from 'react-router-dom';

const headers = ["Language", "Language Rule", "Add Language Rule", "Delete Language or Language Rule"];

const tableData = [
    ["Elvish", "Replace every ${num letters} with ${letter}"],
    ["${language}", "${languageRule}"]
];

for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/addLanguageRuleToLanguage"><Button>Add Language Rule</Button></Link>);
    tableData[index].push(
        <div class="optionGroup">
            <Link to="/deleteLanguageRule"><Button>Delete Language Rule</Button></Link>
            <Link to="/deleteLanguage"><Button>Delete Language</Button></Link>
        </div>);
}

const bilboLanguages = [{value:"elvish", label:"Elvish"},
{value:"westron", label:"Westron"},
{value:"sylvanelvish", label:"Sylvan Elvish"}
];

const languageRules = [
    {value: "${LanguageRule1}", label:"${LanguageRule1}"},
    {value: "${LanguageRule2}", label:"${LanguageRule2}"}
]

const addFormContents = [
    {type:"select", name:"languages", label:"Choose Language", options:bilboLanguages },
    {type:"select", name:"languagerules", label:"Choose New Rule", options:languageRules }
];

export {headers, tableData, addFormContents};