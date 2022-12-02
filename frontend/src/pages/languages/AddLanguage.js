import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/languageData';

import { useEffect, useState, useRef } from 'react';
import { prepareFormData } from '../../functions/submitFunctions.js';
import { insertData } from '../../axios/crud.js';
import { useNavigate } from 'react-router-dom';

function AddLanguage() {
    const navigate = useNavigate();

    const dataRef = useRef({});
    const submitData = useRef({"columns":[], "values": []});

    const prepareAddData = (e) => {
        e.preventDefault();
        prepareFormData(dataRef, submitData);
        Promise.allSettled([insertData("Languages", submitData.current)]).then(
            () => navigate("/languages")
        ).catch(
            (error) => console.log(error)
        )
    }; 

    return (
        <div className="content">
            <h1>Add Language Page</h1>
            <Form submitText="Save" inputState={addFormContents} onSubmit={prepareAddData} refDict={dataRef} />
        </div>
    )
}

export default AddLanguage;