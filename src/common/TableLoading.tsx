import Loading from "./Loading";

export default function TableLoading({ rows }: { rows: number }) {
  return (
    <>
      <tbody className="text-2xl text-white overflow-hidden">
        <tr aria-rowspan={rows} className="text-black text-center border-b">
          <th
            colSpan={rows}
            className="px-6 pt-20 pb-8 text-2xl font-medium whitespace-nowrap"
          >
            <Loading isTable={true}/>
          </th>
        </tr>
      </tbody>
    </>
  );
}
