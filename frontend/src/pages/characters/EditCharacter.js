// Axios
import { DataNext } from '../../axios/DataNext.js';
import { updateData } from '../../axios/crud.js';

// React
import { useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

// Functions
import { prepareEditData } from '../../functions/submitFunctions.js';

// Components
import Form from '../../components/Forms/Form';
import ShowIfLoaded from '../../components/ShowIfLoaded';

function EditCharacters() {
    const location = useLocation();
    const navigate = useNavigate();

    const dataRef = useRef({});
    const submitData = useRef({"columns":[], "values": []});
    const id = useRef(location.state ? location.state.id:0);

    const getDataAppend = 'WHERE idCharacter = ' + id.current.toString();
    const updateFilter = 'idCharacter = ' + id.current.toString();

    const [post, setPost] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {        
        DataNext("Characters", getDataAppend, "edit", id.current).then(
            (response) => {
                setPost(response); 
                return response}
        )
        setIsLoading(false)
    }, [isLoading]);

    const onSubmit = (e) => {
        e.preventDefault();
        prepareEditData(dataRef, submitData);
        Promise.allSettled([updateData("Characters", submitData, updateFilter, id.current).catch((error) => error)]).then(
            () => navigate("/characters")
        )
    }
    
    return (
        <div className="content">
            <h1>Edit Character Page</h1>
            <ShowIfLoaded isLoading={isLoading}>
                <Form submitText="Save" inputState={post} onSubmit={onSubmit} refDict={dataRef}/>
            </ShowIfLoaded>
        </div>
    )
}

export default EditCharacters;