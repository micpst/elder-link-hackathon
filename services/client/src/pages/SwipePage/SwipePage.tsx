import React, { useState, useEffect, } from 'react'
import { Link } from 'react-router-dom';

import { supabase } from '../../supabaseClient';
import axios from 'axios';
import { set } from 'react-hook-form';
import { Provider } from 'react-redux';
import { routePaths } from '../../constants';


import volunteerMan from '../../assets/images/volunteerMan.jpg'
import secondVol from '../../assets/images/secondVol.jpg'
import thirdVol from '../../assets/images/thirdVol.jpg'
import CheckIcon from '../../assets/icons/CheckIcon'
import XIcon from '../../assets/icons/XIcon'
import StarIcon from '../../assets/icons/StarIcon'
import RefreshIcon from '../../assets/icons/RefreshIcon';
import FiltrIcon from '../../assets/icons/FiltrIcon';




interface Provider {
    first_name: string;
    age: number;
    phone: string;
    gender: string;
    profile_photo: string;
    id: number;
}




const SwipePage = () => {
    const { auth } = supabase;
    const [providers, setProviders] = useState([]);
    const [user, setUser] = useState(0);
    const [finished, setFinished] = useState(false);
    const photos = [volunteerMan, secondVol, thirdVol];








    const getData = async () => {
        const ticketJson = window.localStorage.getItem('ticket');

        if (ticketJson !== null) {
            const geo = JSON.parse(ticketJson);
            const { latitude, longitude, activities } = geo;
            axios.get(`http://localhost/rest/providers?latitude=${latitude}&longitude=${longitude}&activities=${activities.join(',')}`, {
                headers: {
                    Accept: 'application/json'
                }
            })
                .then(response => {
                    setProviders(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });

        } else {
            console.error('ticket is null');
        }
        setUser(0);
        setFinished(false);
    };
    useEffect(() => {
        const ticketJson = window.localStorage.getItem('ticket');

        if (ticketJson !== null) {
            const geo = JSON.parse(ticketJson);
            const { latitude, longitude, activities } = geo;
            axios.get(`http://localhost/rest/providers?latitude=${latitude}&longitude=${longitude}&activities=${activities.join(',')}`, {
                headers: {
                    Accept: 'application/json'
                }
            })
                .then(response => {
                    setProviders(response.data);
                    console.log(response.data);
                })
                .catch(error => {
                    console.error(error);
                });

        } else {
            console.error('ticket is null');
        }

    }, []);






    const postData = async () => {
        localStorage.setItem("people", JSON.stringify(providers));
        try {
            const response = await axios.post('http://localhost/rest/notification', {
                provider_id: 1,
            });
            console.log(response.data);

        } catch (error) {
            console.error(error);
        }
        if (user < providers.length - 1) {
            setUser(user + 1);
        } else if (user === providers.length - 1) {
            setFinished(true);
        }
    };

    const nextHandler = () => {
        if (user < providers.length - 1) {
            setUser(user + 1);
        } else if (user === providers.length - 1) {
            setFinished(true);
        }
    }



    return providers.length > 0 && (<div className='md:flex md:justify-center '>
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
                    <Link to={routePaths.liked} className='h-12 w-12 flex '><StarIcon /></Link>

                </div>
            </div>
            {finished !== true ? <><div className=' mx-4 bg-slate-200 rounded-xl shadow-md'>
                <div className='rounded-xl overflow-hidden '><img src={photos[user]} /></div>
                <div className='flex justify-between pt-2'>
                    <div className='mb-4 px-1'>
                        <div className='flex gap-2'><div className='text-3xl font-regular'>{(providers[user] as Provider).gender === "FEMALE" ? "Pani" : "Pan"}</div>
                            <div className='text-3xl font-bold flex items-center'>{(providers[user] as Provider).first_name}</div></div>
                        <div className='text-2xl font-semibold'>{(providers[user] as Provider).age} lat</div></div>
                    <div className='text-3xl font-medium flex items-center pr-1'><a href={`tel:${(providers[user] as Provider).phone}`}>{(providers[user] as Provider).phone.slice(3)}</a></div>
                </div>

            </div>

                <div className='flex w-screen  justify-around mt-4 md:w-96 md:mt-12 '>
                    <button onClick={() => {
                        nextHandler();
                    }} className='w-28 h-28 bg-red-600 rounded-full p-3 justify-center items-center flex shadow-lg' >
                        <XIcon />
                    </button>
                    <button onClick={() => {
                        postData();

                    }} className='w-28 h-28 bg-green-400 rounded-full p-3 justify-center items-center flex shadow-md' >
                        <CheckIcon />
                    </button>
                </div> </> : (<div className='flex flex-col items-center justify-center'>
                    <div className='text-4xl font-bold text-center mt-24'>Brak dostępnych wolontariuszy</div>
                    <Link to={routePaths.createTicket} className=' flex flex-col items-center mt-24 p-2 rounded-lg shadow-md bg-green-100'><div className='w-24 h-24 p-4 rounded-full bg-white shadow-md '><FiltrIcon className='fill-green-400' /></div>
                        <div className='text-3xl font-semibold'>Dopasuj cechy</div>
                    </Link>
                    <button onClick={getData} className=' flex flex-col items-center mt-24 p-2 rounded-lg shadow-md bg-green-100'><div className='w-24 h-24 p-4 rounded-full bg-white shadow-md '><RefreshIcon className='fill-green-400' /></div>
                        <div className='text-3xl font-semibold'>Odśwież opiekunów</div>
                    </button>
                </div>)}
        </div>
    </div>)



}

export default SwipePage

