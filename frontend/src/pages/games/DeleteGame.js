import Form from '../../components/Forms/Form';
import { deleteFormContents } from '../../data/gameData';

function DeleteGame() {
    return (
        <div className="content">
            <h1>Delete Game</h1>
            <p>{"${Game name will be shown here.}"}</p>
            <p>Are you sure? Once you click delete, the Game can't be recovered.</p>
            <Form submitText="Delete" inputState={deleteFormContents} />
            <p>{"${idGame in hidden field for delete purposes.}"}</p>
        </div>
    )
}

export default DeleteGame;