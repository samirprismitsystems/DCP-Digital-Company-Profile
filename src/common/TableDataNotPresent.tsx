import TableLoading from "./TableLoading";

interface ITableDataNotPresent {
  isLoading: boolean;
  data: any;
  rows:number
}

export default function TableDataNotPresent(props: ITableDataNotPresent) {
  return (
    <>
      {props.isLoading && <TableLoading rows={props.rows} />}
      {((props.data && props.data.length === 0) || !props.data) && !props.isLoading && (
        <tbody className="text-2xl text-white">
          <tr aria-rowspan={props.rows} className="text-black text-center border-b">
            <th
              colSpan={props.rows}
              className="px-6 py-10 text-2xl font-medium whitespace-nowrap"
            >
              No Records Found
            </th>
          </tr>
        </tbody>
      )}
    </>
  );
}
