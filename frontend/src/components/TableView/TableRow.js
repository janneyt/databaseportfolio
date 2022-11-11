import Button from '../../components/Button';

const TableRow = ({row, index}) => {

    const rowValues = row.map((value, index) =>
        <td key={index}>{value}</td>
    );

    return (
        <tr>
            {rowValues}
        </tr>

    );
};

export default TableRow;