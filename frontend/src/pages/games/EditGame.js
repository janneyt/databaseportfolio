import Form from '../../components/Forms/Form';
import { editFormContents } from '../../data/gameData';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataNext } from '../../axios/DataNext.js';
import { updateData } from '../../axios/crud.js';
import { useEffect, useState, useRef } from 'react';
import { prepareEditData } from '../../functions/submitFunctions.js';
import ShowIfLoaded from '../../components/ShowIfLoaded';

function EditGame() {
    const location = useLocation();
    const navigate = useNavigate();

    const dataRef = useRef({});
    const submitData = useRef({"columns":[], "values": []});
    const id = useRef(location.state ? location.state.id:0);

    const getDataAppend = 'WHERE idGame = ' + id.current.toString();
    const updateFilter = 'idGame = ' + id.current.toString();

    const [post, setPost] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {        
        DataNext("Games", getDataAppend, "edit", id.current, 3).then(
            (response) => {
                setPost(response);
                return response}
        )
        setIsLoading(false)
    }, [isLoading]);

    const onSubmit = (e) => {
        e.preventDefault();
        prepareEditData(dataRef, submitData);
        Promise.allSettled([updateData("Games", submitData, updateFilter)]).then(
            () => navigate("/games")
        ).catch((error) => console.log(error));
    }
    return (
        <div className="content">
            <h1>Edit Game Page</h1>
            <ShowIfLoaded isLoading={isLoading}>
                <Form submitText="Save" inputState={post} onSubmit = {onSubmit} refDict={dataRef} />
            </ShowIfLoaded>
        </div>
    )
}

export default EditGame;