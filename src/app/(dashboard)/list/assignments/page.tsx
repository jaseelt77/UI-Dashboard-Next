// "use client"
import FormModal from '@/components/FormModal';
import PaginationPage from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { role, examsData, assignmentsData } from '@/lib/data';
import prisma from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';
import { Assignment, Class, Prisma, Subject, Teacher } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';

type AssignmentList = Assignment & {
   lesson: {
    subject: Subject;
    class :  Class;
    teacher : Teacher; 
   };
};

const columns = [
    {
        header: "Subject Name",
        accessor: "subject",
      },
      {
        header: "Class",
        accessor: "class",

      },
      {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden md:table-cell",
      }, 
      {
        header: "Due Date",
        accessor: "duedate",
        className: "hidden md:table-cell",
      },  
      {
        header: "Actions",
        accessor: "action",
      },
];

const renderRaw = (item: AssignmentList) => (
        <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className='flex items-center gap-4 p-4'>{item.lesson.subject.name}</td>
        <td>{item.lesson.class.name}</td>
        <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-Us").format(item.dueDate)}</td>
        <td>
          <div className='flex items-center gap-2 self-end'>
          
            {role === "admin" && (
            <>
              <FormModal table="assignment" type="update" data={item} />
              <FormModal table="assignment" type="delete" id={item.id} />
            </>
            )}
          </div>
        </td>
      </tr>
    );

const AssignmentsListPage = async ({
  searchParams,
} : {
  
  searchParams: { [key: string]: string | undefined };

}) => {

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) :  1;

  //URL param Condition

  const query: Prisma.AssignmentWhereInput = {};
    
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson = { classId : parseInt(value) };
          break;
          case "teacherId":
            query.lesson ={
              teacherId: value
            } 
          break;

          case "search":
           query.lesson = {
            subject: {
              name: {contains: value, mode: "insensitive"},
            },
           };
           break;
            default:
            break; 
        }
      }
    }
  }
  const [data, count] = await prisma.$transaction([
  prisma.assignment.findMany({
    where: query,
    include: {
      lesson: {
        select: {
        subject: {select: {name: true} },
        class: { select: {name: true} },
        teacher:  { select: {name: true, surname: true} },
      }
      }
    },
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * (p - 1),
  }),
  prisma.assignment.count({ where: query }),
]);
    

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP */} 
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>All Assignments</h1>
        <div className='flex flex-col md:flex-row items-center gap-4 w-full md:w-auto'>
          <TableSearch />
          <div className='flex items-center gap-4 self-end'>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src="/filter.png" alt=" " width={20} height={20} />
            </button>
            <button className='w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow'>
              <Image src="/sort.png" alt=" " width={20} height={20} />
            </button>
            {role === "admin" && (
              <FormModal table="assignment" type="create" /> 
            )}
          </div>
        </div>
      </div>
      {/* LIST */}
      <Table columns={columns} renderRaw={renderRaw} data={data} />
      {/* PAGINATION */}
    <PaginationPage page={p} count={count} />
    </div>
  )
}

export default AssignmentsListPage;