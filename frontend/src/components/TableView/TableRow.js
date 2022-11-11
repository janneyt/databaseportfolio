import Button from '../../components/Button';

const TableRow = ({row, index}) => {

    console.log("row instance", row instanceof Array)
    console.log("row", row)
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