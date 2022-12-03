import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/gameData';

import { useRef } from 'react';
import { prepareGameFormData } from '../../functions/submitFunctions.js';
import { insertData } from '../../axios/crud.js';
import { useNavigate } from 'react-router-dom';

function AddGame() {

    const navigate = useNavigate();

    const dataRef = useRef({});
    const submitData = useRef({"columns":[], "values": []});

    const prepareAddData = (e) => {
        e.preventDefault();
        prepareGameFormData(dataRef, submitData);
        Promise.allSettled([insertData("Games", submitData.current)]).then(
            () => navigate("/games")
        ).catch((error) => console.log(error))
    }; 

    return (
        <div className="content">
            <h1>Add Game Page</h1>
            <Form submitText="Save" inputState={addFormContents} onSubmit={prepareAddData} refDict={dataRef}/>
        </div>
    )
}

export default AddGame;