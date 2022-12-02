import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/countriesLanguagesData';
import { useLocation } from 'react-router-dom';
import { prepareFormData } from "../../functions/submitFunctions.js";
import { DataNext } from '../../axios/DataNext.js';
import { insertData } from "../../axios/crud.js";
import { useState, useEffect, useRef } from "react";
import ShowIfLoaded from "../../components/ShowIfLoaded";

function AddLanguageToCountry() {
    
    const location = useLocation();
    const character_id = location.state && location.state.character_id ? location.state.character_id : null
    return (
        <div className="content">
            <h1>Add Language To Country Page</h1>
            <p>{`Editing languages assigned to: ${character_id}`}</p>
            <Form submitText="Save" inputState={addFormContents} />
        </div>
    )
}

export default AddLanguageToCountry;