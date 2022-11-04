import TableRow from './TableRow'
import Button from '../../components/Button';

const TableView = ({headers, listData}) => {

    const headerItems = headers.map((headers, index) => 
        <th key={index}>{headers}</th>
    );

    for (let index=0; index < listData.length; index++) {
    }

    const tableItems = listData.map((row, index) =>
        <TableRow row={row} index={index} />
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