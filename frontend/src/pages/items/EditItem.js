import Form from '../../components/Forms/Form';
import { useLocation } from 'react-router-dom';
import { DataNext } from '../../axios/crud.js';
import { useEffect, useState } from 'react';

const ShowIfLoaded = ({ isLoading, children }) => {
    if (isLoading) {
        return (<p>Loading Data...</p>)
    }
    return <>{children}</>
}

function EditItems() {
    const location = useLocation();
    const id = location.state.id;
    const [post, setPost] = useState([{}]);
    const append = 'WHERE idItem = ' + id.toString()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setPost(DataNext("Items", append, "edit"))
        console.log("fetched data", post)
        setIsLoading(false)
    }, [isLoading]);

    return (
        <>
            <div className="content">

                <h1>Edit Item Page</h1>
                <ShowIfLoaded isLoading={isLoading}>
                    <Form submitText="Save" inputState={post} />
                </ShowIfLoaded>
            </div>
        </>

    )
}

export default EditItems;