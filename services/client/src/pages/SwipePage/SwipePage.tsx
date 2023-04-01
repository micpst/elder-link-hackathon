import React, { useState, useEffect } from 'react'

import { supabase } from '../../supabaseClient';
import axios from 'axios';


import volunteerTestImg from '../../assets/images/volunteerTestImg.jpg'
import CheckIcon from '../../assets/icons/CheckIcon'
import XIcon from '../../assets/icons/XIcon'
import SettingIcon from '../../assets/icons/SettingIcon'
import StarIcon from '../../assets/icons/StarIcon'
import { set } from 'react-hook-form';
import { Provider } from 'react-redux';

interface Provider {
    first_name: string;
    age: number;
    phone: string;
}



const SwipePage = () => {
    const { auth } = supabase;
    const [providers, setProviders] = useState([]);
    const [user, setUser] = useState(0);
    const [finished, setFinished] = useState(false);

    const handleLogout = async () => {
        await auth.signOut();
    };




    // const getData = async () => {

    //     try {
    //         const response = await axios.get('http://localhost/rest/providers', {
    //             headers: {
    //                 Accept: 'application/json'
    //             }
    //         });
    //         setProviders(response.data);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };
    useEffect(() => {
        axios.get('http://localhost/rest/providers', {
            headers: {
                Accept: 'application/json'
            }
        })
            .then(response => {
                setProviders(response.data);
                console.log(providers.length);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);





    const postData = async () => {
        try {
            const response = await axios.post('http://localhost/rest/notification', {
                provider_id: 1,
            });
            console.log(response.data);
        } catch (error) {
            console.error(error);
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
                    <button className='h-12 w-12 flex ' onClick={() => {

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
            {finished !== true ? <><div className=' mx-4 bg-slate-200 rounded-xl shadow-md'>
                <div className='rounded-xl overflow-hidden '><img src={volunteerTestImg} /></div>
                <div className='flex justify-between pt-2'>
                    <div className='mb-4 px-1'>
                        <div className='flex gap-2'><div className='text-3xl font-regular'>{(providers[user] as Provider).first_name.charAt((providers[user] as Provider).first_name.length - 1) === "a" ? "Pani" : "Pan"}</div>
                            <div className='text-3xl font-bold flex items-center'>{(providers[user] as Provider).first_name}</div></div>
                        <div className='text-2xl font-semibold'>27 lat</div></div>
                    <div className='text-3xl font-medium flex items-center pr-1'>{(providers[user] as Provider).phone.slice(3)}</div>
                </div>

            </div>

                <div className='flex w-screen  justify-around mt-4 md:w-96 md:mt-12 '>
                    <button onClick={() => {
                        console.log("x")
                    }} className='w-28 h-28 bg-red-600 rounded-full p-3 justify-center items-center flex shadow-lg' >
                        <XIcon />
                    </button>
                    <button onClick={() => {
                        // postData();
                        nextHandler();
                    }} className='w-28 h-28 bg-green-400 rounded-full p-3 justify-center items-center flex shadow-md' >
                        <CheckIcon />
                    </button>
                </div> </> : (<div>Brak dostępnych wolontariuszy</div>)}
        </div>
    </div>)



}

export default SwipePage

