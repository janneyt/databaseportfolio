import Form from '../../components/Forms/Form';
import { deleteFormContents } from '../../data/playerData';

function DeletePlayer() {
    return (
        <div className="content">
            <h1>Delete Player</h1>
            <p>{"${Player name will be shown here.}"}</p>
            <p>Are you sure? Once you click delete, the Player can't be recovered.</p>
            <Form submitText="Delete" inputState={deleteFormContents} />
            <p>{"${idPlayer in hidden field for delete purposes.}"}</p>
        </div>
    )
}

export default DeletePlayer;