import React from 'react'
import volunteerTestImg from '../../assets/images/volunteerTestImg.jpg'
import CheckIcon from '../../assets/icons/CheckIcon'
import XIcon from '../../assets/icons/XIcon'
import SettingIcon from '../../assets/icons/SettingIcon'
import StarIcon from '../../assets/icons/StarIcon'


const SwipePage = () => {
    return (
        <div className='md:flex md:justify-center '>
            <div className='bg-white h-screen md:w-96 md:flex md:flex-col '>
                <div className='flex h-16 justify-between  items-center mb-1 shadow-md rounded-lg bg-white'>
                    <div className='w-1/3 pl-6'>
                        <button className='h-12 w-12 flex ' onClick={() => {
                            console.log("setting")
                        }}><SettingIcon /></button>

                    </div>
                    <div className="text-green-400 flex w-1/3 items-center flex-col ">
                        <span className="font-bold text-3xl">Elder</span>
                        <span className="font-medium text-2xl tracking-widest">Link</span>
                    </div>
                    <div className='w-1/3 flex justify-end items-center pr-6 '>
                        <button onClick={() => { console.log("star") }} className='h-12 w-12 flex '><StarIcon /></button>

                    </div>
                </div>
                <div className=' mx-4 bg-slate-200 rounded-xl shadow-md'>
                    <div className='rounded-xl overflow-hidden '><img src={volunteerTestImg} /></div>
                    <div className='flex justify-between pt-2'>
                        <div className='mb-4 px-1'>
                            <div className='flex gap-2'><div className='text-3xl font-regular'>Pani</div>
                                <div className='text-3xl font-bold flex items-center'>Natalia</div></div>
                            <div className='text-2xl font-semibold'>27 lat</div></div>
                        <div className='text-3xl font-medium flex items-center pr-1'>978 872 213</div>
                    </div>

                </div>

                <div className='flex w-screen  justify-around mt-4 md:w-96 md:mt-12 '>
                    <button onClick={() => {
                        console.log("x")
                    }} className='w-28 h-28 bg-red-600 rounded-full p-3 justify-center items-center flex shadow-lg' >
                        <XIcon />
                    </button>
                    <button onClick={() => {
                        console.log("teak")
                    }} className='w-28 h-28 bg-green-400 rounded-full p-3 justify-center items-center flex shadow-md' >
                        <CheckIcon />
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SwipePage