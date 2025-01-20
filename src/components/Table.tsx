import React from 'react'

const Table = ({
     columns, 
     renderRaw,
     data,

    } : {
        columns : {header: string; accessor: string; className?: string }[];
        renderRaw: (item: any) => React.ReactNode;
        data: any[];
} ) => {
  return (
    <table className='w-full mt-4' >
        <thead>
            <tr className='text-left text-gray-400 text-sm'>
                {columns.map((col) => (
                  <th key={col.accessor} className={col.className}>{col.header}</th>
                ))}
            </tr>
        </thead>
        <tbody>
            {data.map((item) => renderRaw(item))}
        </tbody>
    </table>
  );
};

export default Table