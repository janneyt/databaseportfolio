import Form from '../../components/Forms/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataNext, updateData } from '../../axios/crud.js';
import { useEffect, useState, useRef } from 'react';
import { prepareEditData } from '../../functions/submitFunctions.js';
import ShowIfLoaded from '../../components/ShowIfLoaded';
import { editFormContents } from '../../data/languageData';

function EditLanguage() {
    const location = useLocation();
    const navigate = useNavigate();

    const dataRef = useRef({});
    const submitData = useRef({"columns":[], "values": []});
    const id = useRef(location.state ? location.state.id:0);

    const getDataAppend = 'WHERE idLanguage = ' + id.current.toString();
    const updateFilter = 'idLanguage = ' + id.current.toString();

    const [post, setPost] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {        
        console.log("LOCATION", location)
        DataNext("Languages", getDataAppend, "edit", id.current).then(
            (response) => {
                setPost(response); 
                return response}
        )
        setIsLoading(false)
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        prepareEditData(dataRef, submitData);
        updateData("Languages", submitData, updateFilter, id.current).catch((error) => error);
        navigate("/languages");
    }
    return (
        <div className="content">
            <h1>Edit Language Page</h1>
            <Form submitText="Save" inputState={post} onSubmit={onSubmit} refDict={dataRef} />
        </div>
    )
}

export default EditLanguage;