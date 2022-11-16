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
    let id = location.state.id;
    const [post, setPost] = useState([{}]);
    const append = 'WHERE idItem = ' + id.toString()
    const [isLoading, setIsLoading] = useState(true);
    const passedData = location.state.data;

    // Remove soon to be updated value from the data you're returning to the page
    for(const index = 0; index < passedData; index++){
        if(passedData[index][0] === id){
            const oldData = passedData[index];
            passedData.splice(index, 1);
        }
    }
    useEffect(() => {
        if(location.state){
            id = location.state.id ? location.state.id : 0
        }
        setPost(DataNext("Items", append, "edit", id))
        console.log("fetched data", post)
        setIsLoading(false)
    }, [isLoading]);

    const updateForm = () => {
        
    }

    return (
        <>
            <div className="content">

                <h1>Edit Item Page</h1>
                <ShowIfLoaded isLoading={isLoading}>
                    <Form submitText="Save" inputState={post} onSubmit={updateForm}/>
                </ShowIfLoaded>
            </div>
        </>

    )
}

export default EditItems;