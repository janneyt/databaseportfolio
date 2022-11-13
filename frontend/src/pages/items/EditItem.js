import Form from '../../components/Forms/Form';
import { useLocation } from 'react-router-dom';
import { DataNext } from '../../axios/crud.js';
import { useEffect, useState } from 'react';
import { fetchedData } from '../../data/itemData';

function EditItems() {
    const location = useLocation();
    const id = location.state.id;
    const [post, setPost] = useState([{}]);
    const append = 'WHERE idItem = '+id.toString()

    useEffect(() => {
        DataNext("Items", append, "edit");
        console.log("Fetched Data in edit item",fetchedData)
        setPost(fetchedData)
    }, []);

    console.log("in edit items", post)

    return (
        <div className="content">
            <h1>Edit Item Page</h1>
            <Form submitText="Save" inputState={post} />
        </div>
    )
}

export default EditItems;