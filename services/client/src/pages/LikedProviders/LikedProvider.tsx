import React, { useState, useEffect, } from 'react'
import { Link } from 'react-router-dom';
import { routePaths } from '../../constants';

import StarIcon from '../../assets/icons/StarIcon'

import FiltrIcon from '../../assets/icons/FiltrIcon';
import RefreshIcon from '../../assets/icons/RefreshIcon';
import volunteerMan from '../../assets/images/volunteerMan.jpg';

interface Provider {
    first_name: string;
    age: number;
    phone: string;
    gender: string;
    profile_photo: string;
    id: number;
}



const LikedProvider = () => {
    const storedPeople = localStorage.getItem("people");
    const parsedPeople: Provider[] = storedPeople ? JSON.parse(storedPeople) : [];
    console.log(storedPeople);
    return (
        <div className='md:flex md:justify-center '>
            <div className='bg-white h-screen md:w-96 md:flex md:flex-col '>
                <div className='flex h-16 justify-between  items-center mb-1 shadow-md rounded-lg bg-white'>
                    <div className='w-1/3 pl-6'>
                        <Link to={routePaths.createTicket} className='h-12 w-12 flex ' ><FiltrIcon className='fill-slate-400' /></Link>

                    </div>
                    <div className="text-green-400 flex w-1/3 items-center flex-col ">
                        <span className="font-bold text-3xl">Elder</span>
                        <span className="font-medium text-2xl tracking-widest">Link</span>
                    </div>
                    <div className='w-1/3 flex justify-end items-center pr-6 '>
                        <Link to={routePaths.swipe} className='h-12 w-12 flex '><RefreshIcon className='fill-slate-400' /></Link>

                    </div>
                </div><div className='h-32 w-96 bg-slate-100 rounded-lg flex flex-row items-center px-3 mt-3'>
                    <div className='rounded-lg overflow-hidden h-24 w-24 mr-3'><img src={volunteerMan} /></div>
                    <div>
                        <div className='text-2xl font-semibold flex gap-2'>Imie: <div className='font-bold'>Paruyr</div></div>
                        <div className='text-2xl font-semibold flex gap-2'>Wiek: <div className='font-bold'>22</div></div>
                        <div className='text-2xl font-semibold flex gap-2'>Telefon: <div className='font-bold'><a href='+48579511207'>579511207</a></div></div></div>

                </div>
            </div>

        </div>)
}

export default LikedProvider