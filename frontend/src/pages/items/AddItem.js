import Form from '../../components/Forms/Form';
import { addFormContents } from '../../data/itemData';
import { useEffect, useState } from 'react';

function AddItem() {

    const [submitData, setSubmitData] = useState();
    
    const prepareAddData = (e) => {
        e.preventDefault();
        
        const form = e.target
        for (const item of form) {
            if (item.nodeName == "INPUT")
            console.log(item)
        }
        console.log("TEST",form);
    };




    return (
        <div className="content">
            <h1>Add Item Page</h1>
            <Form submitText="Save" inputState={addFormContents} onSubmit={prepareAddData} />
        </div>
    )
}

export default AddItem;