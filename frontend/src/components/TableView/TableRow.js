import Button from '../../components/Button';

const TableRow = ({row, index}) => {


    const rowValues = row.map((value) =>
        <td>{value}</td>
    );

    return (
        <tr>
            {rowValues}
        </tr>

    );
};

export default TableRow;