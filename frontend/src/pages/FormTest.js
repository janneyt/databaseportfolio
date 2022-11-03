import Form from '../components/Forms/Form';

function FormTest() {

    const formContents = [
        {type:"text", name:"test2", value:"Nonya", label:"test"},
        {type:"text", name:"test", value:"Nonya", label:"test"},
    ]

    return (
        <div className="formContents">
            <Form submitText="Test" inputState={formContents} />
        </div>
    )
}

export default FormTest;