import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/playerData';

import { useRef } from 'react';
import { prepareFormData } from '../../functions/submitFunctions.js';
import { insertData } from '../../axios/crud.js';
import { useNavigate } from 'react-router-dom';

function AddPlayer() {

    const navigate = useNavigate();

    const dataRef = useRef({});
    const submitData = useRef({"columns":[], "values": []});

    const prepareAddData = (e) => {
        e.preventDefault();
        prepareFormData(dataRef, submitData);
        Promise.allSettled([insertData("Players", submitData.current)]).then(
            () => navigate("/players")
        )
    }; 

    return (
        <div className="content">
            <h1>Add Player Page</h1>
            <Form submitText="Save" inputState={addFormContents} onSubmit={prepareAddData} refDict={dataRef}/>
        </div>
    )
}

export default AddPlayer;