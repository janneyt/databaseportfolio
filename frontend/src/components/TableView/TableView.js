import TableRow from './TableRow'
import Button from '../../components/Button';

const TableView = ({headers, listData}) => {
    const headerItems = headers.map((headers, index) => 
        <th key={index}>{headers}</th>
    );
    
    const tableItems = listData.map((row) =>
        <TableRow row={row} key={row[0]} />

    );

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