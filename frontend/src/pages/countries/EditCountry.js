import Form from '../../components/Forms/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataNext } from '../../axios/DataNext.js';
import { updateData } from '../../axios/crud.js';
import { useEffect, useState, useRef } from 'react';
import { prepareEditData } from '../../functions/submitFunctions.js';

import ShowIfLoaded from '../../components/ShowIfLoaded';

function EditCountry() {
    const location = useLocation();
    const navigate = useNavigate();

    const dataRef = useRef({});
    const submitData = useRef({"columns":[], "values": []});
    const id = useRef(location.state ? location.state.id:0);

    const getDataAppend = 'WHERE idCountry = ' + id.current.toString();
    const updateFilter = 'idCountry = ' + id.current.toString();

    const [post, setPost] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {        
        console.log("LOCATION", location)
        DataNext("Countries", getDataAppend, "edit", id.current).then(
            (response) => {
                setPost(response); 
                return response}
        )
        setIsLoading(false)
    }, []);

    const onSubmit = (e) => {
        e.preventDefault();
        prepareEditData(dataRef, submitData);
        Promise.allSettled([updateData("Countries", submitData, updateFilter, id.current)]).then(
            () => navigate("/countries")
        ).catch((error) => console.log(error));
    }

    return (
        <div className="content">
            <h1>Edit Country Page</h1>
            <ShowIfLoaded isLoading={isLoading}>
                <Form submitText="Save" inputState={post} onSubmit = {onSubmit} refDict={dataRef}/>
            </ShowIfLoaded>
        </div>
    )
}

export default EditCountry;