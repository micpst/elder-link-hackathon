import React from 'react'
import { IButtonProps } from './CustomButtonTypes'


const CustomButton = ({ text, onClick }: IButtonProps) => {
    return (
        <button onClick={onClick} className="bg-white uppercase text-3xl rounded-lg mx-5 py-5 mb-10 shadow-md border border-gray-300 md:h-64 md:w-96 md:text-6xl md:mb-0 md:mx-0">{text}</button>
    )
}

export default CustomButton