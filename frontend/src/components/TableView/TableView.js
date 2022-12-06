import TableRow from './TableRow'
import { useNavigate} from 'react-router-dom';
import Button from '../Button';

const TableView = ({headers, listData}) => {

    const navigate = useNavigate();
    const headerItems = headers.map((headers, index) => 
        <th key={index}>{headers}</th>
    );
    
    const tableItems = listData.map((row, i) =>
        <TableRow row={row} key={i} />

    );

    return (
        <>
            <p className="small">No data? Make sure you activate the right game:
            <Button onClick={() => {navigate("/games")}} className='nav-button-small'>Games</Button></p>
            <table>
                <thead>
                    <tr>
                        {headerItems}
                    </tr>
                </thead>
                <tbody>
                    {tableItems}
                </tbody>
            </table>
            </>
    );
};

export default TableView;