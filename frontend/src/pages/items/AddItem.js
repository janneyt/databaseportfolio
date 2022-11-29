import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/itemData';
import { useEffect, useState, useRef } from 'react';
import { prepareFormData } from '../../functions/submitFunctions.js';
import { insertData } from '../../axios/crud.js';
import { useNavigate } from 'react-router-dom';

import { DataNext } from "../../axios/crud.js";

function AddItem() {
    const [post, setPost] = useState([{}]);
    const foreign_keys = ["characters_has_items"]

    const navigate = useNavigate();
    
    const dataRef = useRef({});
    const submitData = useRef({"columns":[], "values": []});

    const prepareAddData = (e) => {
        e.preventDefault();
        console.log("items dataRef", dataRef)
        prepareFormData(dataRef, submitData);
        console.log("items submitData", submitData.current)
        insertData("Items", submitData.current);
        navigate("/items")
    }; 

    useEffect(() => {
 
    }, [submitData]);

    return (
        <div className="content">
            <h1>Add Item Page</h1>
            <Form submitText="Save" inputState={addFormContents} onSubmit={prepareAddData} refDict={dataRef} />
        </div>
    )
}

export default AddItem;