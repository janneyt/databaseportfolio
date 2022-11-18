// Axios
import { insertData } from '../../axios/crud.js';

// React
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Components
import Form from '../../components/Forms/Form';

// Functions
import { prepareFormData } from '../../functions/submitFunctions.js';

// Data
import { addFormContents } from '../../data/charactersData';

function AddCharacter() {
    const navigate = useNavigate();
    const dataRef = useRef({});
    const submitData = useRef({"columns":[], "values": []});

    const prepareAddData = (e) => {
        e.preventDefault();
        prepareFormData(dataRef, submitData);
        insertData("Characters", submitData.current);
        navigate("/characters")
    };

    return (
        <div className="content">
            <h1>Add Character Page</h1>
            <Form submitText="Save" inputState={addFormContents} onSubmit={prepareAddData} refDict={dataRef}/>
        </div>
    )
}

export default AddCharacter;