import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/countryData';

import { useEffect, useState, useRef } from 'react';
import { prepareFormData } from '../../functions/submitFunctions.js';
import { insertData } from '../../axios/crud.js';
import { useNavigate } from 'react-router-dom';

function AddCountry() {
    const navigate = useNavigate();

    const dataRef = useRef({});
    const submitData = useRef({"columns":[], "values": []});

    const prepareAddData = (e) => {
        e.preventDefault();
        prepareFormData(dataRef, submitData);
        Promise.allSettled([insertData("Countries", submitData.current)]).then(
            () => navigate("/countries")
        ).catch((error) => console.log(error))
        
    }; 

    return (
        <div className="content">
            <h1>Add Country Page</h1>
            <Form submitText="Save" inputState={addFormContents} onSubmit={prepareAddData} refDict={dataRef}/>
        </div>
    )
}

export default AddCountry;