"use client"
import PaginationPage from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { parentsData, role, subjectsData } from '@/lib/data';
import Image from 'next/image';
import Link from 'next/link';

type Subject = {
    id: number;
    name: string;
    teachers: string[];
  };

const columns = [
    
      {
        header: "Subject Name",
        accessor: "name",
        className: "hidden md:table-cell",
      },
      {
        header: "Teachers",
        accessor: "teachers",
        className: "hidden lg:table-cell",
      },  
      {
        header: "Actions",
        accessor: "action",
      },
];
const SubjectsListPage = () => {
    const renderRaw = (item: Subject) => (
        <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
       <td className="flex items-center gap-4 p-4">{item.name}</td>
       <td className="hidden md:table-cell">{item.teachers.join(",")}</td>
        {/* <div className="flex flex-col">
        {/* <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
         
        </div> */}
      
      {/* <td className="text-xs text-gray-500">{item.teachers.join(",")}</td> */}
        <td>
          <div className='flex items-center gap-2'>
            <Link href={`/list/teacher/${item.id}`}>
              <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaSky'>
                <Image src="/edit.png" alt="" width={16} height={16} />
              </button>
            </Link>
            {role === "admin" && (
              <button className='w-7 h-7 flex items-center justify-center rounded-full bg-lamaPurple'>
              <Image src="/delete.png" alt="" width={16} height={16} />
            </button>
            )}
          </div>
        </td>
      </tr>
    );

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP */} 
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>All Subjects</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src="/filter.png" alt=" " width={20} height={20} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src="/sort.png" alt=" " width={20} height={20} />
            </button>
            {role === "admin" && (<button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src="/plus.png" alt=" " width={20} height={20} />
            </button>)}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRaw={renderRaw} data={subjectsData} />
      {/* PAGINATION */}
      <PaginationPage />
    </div>
  )
}

export default SubjectsListPage;