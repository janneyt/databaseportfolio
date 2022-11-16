import TableRow from './TableRow'
import { useLocation } from 'react-router-dom';

const TableView = ({headers, listData, page}) => {
    const location = useLocation();
    const items = location.state ? location.state[page] : [''];
    const headerItems = headers.map((headers, index) => 
        <th key={index}>{headers}</th>
    );
    
    const tableItems = listData ? listData.map((row, i) =>
        <TableRow row={row} key={i} />

    ) : items.map((row, i) => <TableRow row={row} key={i} />);

    return (
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
    );
};

export default TableView;