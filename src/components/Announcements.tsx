import Image from 'next/image'
import React from 'react'

const Announcements = () => {
  return (
    <div className='bg-white p-4 rounded-md'>
        <div className='flex justify-between items-center'>
            <h1 className='text-xl font-semibold'>Attendance</h1>
            <span className='text-xs text-gray-400'>View All</span>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
            <div className='bg-lamaSkyLight rounded-md p-4 mt-1'>
                <div className='flex items-center justify-between mb-1'>
                    <h2 className='font-medium '>Lorem ipsum dolor sit</h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>
                        2025-01-01
                    </span>
                </div>
                <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit omnis iure quia ipsum debitis culpa id fuga soluta</p>     
            </div>
            <div className='bg-lamaPurpleLight rounded-md p-4 mt-1'>
                <div className='flex items-center justify-between mb-1'>
                    <h2 className='font-medium'>Lorem ipsum dolor sit</h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>
                        2025-01-01
                    </span>
                </div>
                <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit omnis iure quia ipsum debitis culpa id fuga soluta</p>   
            </div>
            <div className='bg-lamaYellowLight rounded-md p-4 mt-1'>
                <div className='flex items-center justify-between mb-1'>
                    <h2 className='font-medium'>Lorem ipsum dolor sit</h2>
                    <span className='text-xs text-gray-400 bg-white rounded-md px-1 py-1'>
                        2025-01-01
                    </span>
                </div>
                <p className='text-sm text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit omnis iure quia ipsum debitis culpa id fuga soluta</p> 
            </div>
        </div>
    </div>
  )
}

export default Announcements