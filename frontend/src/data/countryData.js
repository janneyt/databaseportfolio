import Button from '../components/Button';
import { Link } from 'react-router-dom';

const headers = ["Name", "Size in Km", "Population", "Game", "Edit", "Delete", "Languages"];

const tableData = [
    ["USA", " 	9,800,8000 km", "330,000,000", "Fun first game!"],
    ["Underwood", " 	1,000 km", "2", "Fun first game!"],
    ["Pipe", ".1 km", "1", "Fun first game!"]
];

for (let index=0; index < tableData.length; index++) {
    tableData[index].push(<Link to="/editCountry"><Button>Edit Country</Button></Link>);
    tableData[index].push(<Link to="/deleteCountry"><Button>DeleteCountry</Button></Link>);
    tableData[index].push(<Link to="/countriesHaveLanguages"><Button>Languages</Button></Link>);
}

const addFormContents = [
    {type:"text", name:"countryname", label:"Name Your Country:"},
    {type:"text", name:"sizeinkm", label:"How big is your country (in Km)?:"},
    {type:"text", name:"population", label:"What's your country's population?:"},
];

const editFormContents = [
    {type:"text", name:"countryrname", label:"Name Your Country:", value: "${countryName}"},
    {type:"text", name:"description", label:"Describe Your Country", value:"${description}"}
];

const deleteFormContents = [
    {type:"hidden", name:"${idCountry}"}
];


export {headers, tableData, addFormContents,editFormContents, deleteFormContents};