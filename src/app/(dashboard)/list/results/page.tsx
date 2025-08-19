import FormModal from '@/components/FormModal';
import PaginationPage from '@/components/Pagination';
import Table from '@/components/Table';
import TableSearch from '@/components/TableSearch';
import { role, examsData, assignmentsData, resultsData } from '@/lib/data';
import prisma from '@/lib/prisma';
import { ITEM_PER_PAGE } from '@/lib/settings';
import { Prisma } from '@prisma/client';
import Image from 'next/image';
import Link from 'next/link';
import { title } from 'process';

type ResultList = {
    id: number;
    title:string;
    studentName: string;
    studentSurname:string;
    teacherName: string;
    teacherSurname: string;
    score: string;
    className:string;
    startTime: Date;
}

const columns = [
    {
        header: "Title",
        accessor: "title",
      },
      {
        header: "Student",
        accessor: "student",

      },
      {
        header: "Score",
        accessor: "score",
        className: "hidden md:table-cell",

      },
      
      {
        header: "Teacher",
        accessor: "teacher",
        className: "hidden md:table-cell",
      }, 
      {
        header: "Class",
        accessor: "class",
        className: "hidden md:table-cell",

      },
      {
        header: "Date",
        accessor: "date",
        className: "hidden md:table-cell",
      },  
      {
        header: "Actions",
        accessor: "action",
      },
];
 const renderRaw = (item: ResultList) => (
        <tr
        key={item.id}
        className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
      >
        <td className='flex items-center gap-4 p-4'>{item.title}</td>
        <td >{item.studentName + " " + item.studentName}</td>
        <td className="hidden md:table-cell">{item.score}</td>
        <td className="hidden md:table-cell">{item.teacherName + " " + item.teacherSurname}</td>
        <td className="hidden md:table-cell">{item.className}</td>
        <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-Us").format(item.startTime)}</td>
        <td>
          <div className='flex items-center gap-2 '>
            
          {role === "admin" && (
            <>
              <FormModal table="result" type="update" data={item} />
              <FormModal table="result" type="delete" id={item.id} />
            </>
          )}
          </div>
        </td>
      </tr>
    );

const ResultListPage = async ({
  searchParams,
} : {
  
  searchParams: { [key: string]: string | undefined };

}) => {

  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) :  1;

  //URL param Condition

  const query: Prisma.ResultWhereInput = {};
    
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
          break;
          case "search":
           query.OR = [
             { exam: {title: {contains: value, mode: "insensitive"} } },
             {student: {name: {contains: value, mode: "insensitive"} } },
           ];
           break;
           default:
            break; 
        }
      }
    }
  }
  const [dataRes, count] = await prisma.$transaction([
  prisma.result.findMany({
    where: query,
    include: {
     student : {select: {name:true, surname: true} },
     exam: {
      include: {
        lesson: {
          select: {
            class: { select: { name: true} },
            teacher: { select:{name:true, surname: true} },
          },
        },
      },
     },
      assignment: {
      include: {
        lesson: {
          select: {
            class: { select: { name: true} },
            teacher: { select:{name:true, surname: true} },
          },
        },
      },
     },

    },
    take: ITEM_PER_PAGE,
    skip: ITEM_PER_PAGE * (p - 1),
  }),
  prisma.result.count({ where: query }),
]);
   

const data = dataRes.map(item => {
  const assignment = item.exam || item.assignment;
  if(!assignment) return null;
  const isExam = "startTime" in assignment;
  return{
    id: item.id,
    title:assignment.title,
    studentName: item.student.name,
    studentSurname:item.student.surname,
    teacherName: assignment.lesson.teacher.name,
    teacherSurname: assignment.lesson.teacher.surname,
    score: item.score,
    className: assignment.lesson.class.name,
    startTime: isExam ? assignment.startTime : assignment.startDate,
  };
});

  return (
    <div className='bg-white p-4 rounded-md flex-1 m-4 mt-0'>
      {/* TOP */} 
      <div className='flex items-center justify-between'>
        <h1 className='hidden md:block text-lg font-semibold'>All Results</h1>
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
              <FormModal table="result" type="create" />
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

export default ResultListPage;