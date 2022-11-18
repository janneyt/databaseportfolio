import Form from '../../components/Forms/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataNext, updateData } from '../../axios/crud.js';
import { useEffect, useState, useRef } from 'react';
import { prepareEditData } from '../../functions/submitFunctions.js';
import ShowIfLoaded from '../../components/ShowIfLoaded';
import { editFormContents } from '../../data/playerData';

function EditPlayer() {
    const location = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState(location.state ? location.state.id : 0);
    const [post, setPost] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);
    const [append, setAppend] = useState('WHERE idPlayer = '+location.state.id.toString());
    const [appendUpdate, setAppendUpdate] = useState("idPlayer = "+location.state.id.toString());

    useEffect(() => {        
        console.log("LOCATION", location)
        DataNext("Players", append, "edit", id).then(
            (response) => {
                setPost(response); 
                return response}
        )
        setIsLoading(false)
    }, []);
    

    const dataRef = useRef({});
    const submitData = useRef({"columns":[], "values": []});

    const updateForm = (e) => {
        e.preventDefault();
        prepareEditData(dataRef, submitData);
        const form = e.target
        const updates = [];
        // for (const item of form) {
        //     if (item.nodeName == "INPUT")

        //     updates.push(item.value)
        // }
        setIsLoading(true);
        updateData("Players", submitData, appendUpdate, id).then((response) => 
        setIsLoading(false)
        ).catch((error) => error);
        navigate("/players");
    }
    return (
        <div className="content">
            <h1>Edit Player Page</h1>
            <Form submitText="Save" inputState={post} onSubmit={updateForm} refDict={dataRef} />
        </div>
    )
}

export default EditPlayer;