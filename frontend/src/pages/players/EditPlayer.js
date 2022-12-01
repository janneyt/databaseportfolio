import Form from '../../components/Forms/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataNext } from '../../axios/DataNext.js';
import { updateData } from '../../axios/crud.js';
import { useEffect, useState, useRef } from 'react';
import { prepareEditData } from '../../functions/submitFunctions.js';

function EditPlayer() {
    const location = useLocation();
    const navigate = useNavigate();

    const dataRef = useRef({});
    const submitData = useRef({"columns":[], "values": []});
    const id = useRef(location.state ? location.state.id:0);

    const getDataAppend = 'WHERE idPlayer = ' + id.current.toString();
    const updateFilter = 'idPlayer = ' + id.current.toString();

    const [post, setPost] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {        
        console.log("LOCATION", location)
        DataNext("Players", getDataAppend, "edit", id.current).then(
            (response) => {
                setPost(response); 
                return response}
        )
        setIsLoading(false)
    }, [isLoading]);

    const onSubmit = (e) => {
        e.preventDefault();
        prepareEditData(dataRef, submitData);
        updateData("Players", submitData, updateFilter, id.current).catch((error) => error);
        navigate("/players");
    }

    return (
        <div className="content">
            <h1>Edit Player Page</h1>
            <Form submitText="Save" inputState={post} onSubmit={onSubmit} refDict={dataRef} />
        </div>
    )
}

export default EditPlayer;