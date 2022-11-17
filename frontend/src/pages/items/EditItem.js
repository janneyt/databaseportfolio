import Form from '../../components/Forms/Form';
import { useNavigate, useLocation } from 'react-router-dom';
import { DataNext, updateData } from '../../axios/crud.js';
import { useEffect, useState } from 'react';

import ShowIfLoaded from '../../components/ShowIfLoaded';

function EditItems() {
    const location = useLocation();
    const navigate = useNavigate();
    const [id, setId] = useState(location.state ? location.state.id : 0);
    const [post, setPost] = useState([{}]);
    const [isLoading, setIsLoading] = useState(true);
    const [updates, setUpdates] = useState('')
    const [append, setAppend] = useState('WHERE idItem = '+ id.toString());
    const [updateAppend, setUpdateAppend] = useState(' idItem = '+id.toString());

    useEffect(() => {        
        DataNext("Items", append, "edit", id).then(
            (response) => {
                console.log("response", response); 
                setPost(response); 
                return response}
        )
        setIsLoading(false)
    }, []);

    const updateForm = (e) => {
        e.preventDefault();
        
        const form = e.target
        const updates = [];
        for (const item of form) {
            if (item.nodeName == "INPUT")

            updates.push('"'+item.value+'"')
        }
        setIsLoading(true);
        updateData("Items", updates, updateAppend).then((response) => 
            
        setIsLoading(false)
        ).catch((error) => error);

    }
    return (
        <>
            <div className="content">

                <h1>Edit Item Page</h1>
                <ShowIfLoaded isLoading={isLoading}>
                    <Form submitText="Save" inputState={post} onSubmit={updateForm} />
                </ShowIfLoaded>
            </div>
        </>

    )
}

export default EditItems;