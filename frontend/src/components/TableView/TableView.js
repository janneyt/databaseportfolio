import TableRow from './TableRow'
import Button from '../../components/Button';

const TableView = ({headers, listData}) => {
    console.log("list data", listData)
    const headerItems = headers.map((headers, index) => 
        <th key={index}>{headers}</th>
    );
    
    const tableItems = listData.map((row, i) =>
        <TableRow row={row} key={i} />

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