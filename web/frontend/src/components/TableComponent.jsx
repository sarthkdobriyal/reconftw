import { useState } from 'react'
import { useReactTable, getCoreRowModel, flexRender, getPaginationRowModel, getSortedRowModel, getFilteredRowModel } from '@tanstack/react-table'


const TableComponent = ({data, columns }) => {


  const [sorting, setSorting] = useState();
  const [filtering, setFiltering] = useState('');
  
  const table = useReactTable({
      data: data,
      columns: columns,
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      state : {
        sorting: sorting,
        globalFilter: filtering,
      },
      onSortingChange: setSorting,
      onGlobalFilterChange: setFiltering,
    })

  if(!data || data && data.length === 0) return (
    <div className='text-2xl font-semibold tracking-wider mt-5 text-center text-red-600'>
      No data to show
    </div>

  )



  return (
    <div className='mb-5 mt-2 '>
    <div className='w-full flex justify-between py-2'>

       <input value={filtering} onChange={(e) => setFiltering(e.target.value)} type="text" placeholder="Search" className="input  input-bordered w-full rounded-xl focus:border-sky-600 max-w-xs" />
       {
            table.getPageCount() > 1 &&
            <div className=' w-full flex justify-end'>
          <div className="join grid grid-cols-4 ">
            <button disabled={!table.getCanPreviousPage()} onClick={() => table.setPageIndex(0)} className="join-item btn btn-outline rounded-md text-xl">&#8249; &#8249;</button>
            <button disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()} className="join-item btn btn-outline rounded-md text-xl">&#8249;</button>
            <button disabled={!table.getCanNextPage()} onClick={() => table.nextPage()} className="join-item btn btn-outline rounded-md text-xl" >&#8250;</button>
            <button disabled={!table.getCanNextPage()} onClick={() => table.setPageIndex(table.getPageCount() -1)} className="join-item btn btn-outline rounded-md text-xl" >&#8250; &#8250;</button>
          </div>
        </div>}


    </div>
        <table className=' table table-zebra table-sm  '>
          <thead className='bg-base-300 '>
            {
              table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className=''>
                  {
                    headerGroup.headers.map((header) => (
                      <th onClick={header.column.getToggleSortingHandler()} key={header.id} className='text-sky-600  text-center text-xl'>
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      {
                        {
                          asc : <span className='text-sky-600 text-xs'> &#9650;</span>,
                          desc : <span className='text-sky-600 text-xs'> &#9660;</span>
                        } [
                          header.column.getIsSorted() ?? null
                        ]
                      }
                      
                      </th>

                    ))
                  }
                </tr>
              ))
            }

          </thead>
          <tbody className=''>
            {
              table.getRowModel().rows.map((row) => (
                <tr key={row.id} className=' text-center bg-gray-600  '>
                  {
                    row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className='text-gray-100 tracking-widest '>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>

       
    </div>
  )
}

export default TableComponent