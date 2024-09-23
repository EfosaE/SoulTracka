import { flexRender, Table } from '@tanstack/react-table';

import { FirstTimer } from '../utils/columnsDefs';

interface TableProps {
  table: Table<FirstTimer>;
}



const FirstTimerTableComponent = ({ table }: TableProps) => {
    console.log(table)
  return (
    <div className='overflow-scroll h-[540px]'>
      <table className='table table-zebra text-center overflow-y-scroll'>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className='capitalize'>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FirstTimerTableComponent;
