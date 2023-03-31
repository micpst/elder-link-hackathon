import React from 'react';
import CustomButton from '../../components/CustomButton/CustomButton';
import useMobile from '../../hooks/useMobile';
import grandpaImg from '../../assets/images/grandpaImg.jpg';
import volunteerImg from '../../assets/images/volunteerImg.jpg';

const LandingPage = () => {
  const isMobile = useMobile();

  return (
    <div className="h-screen flex flex-col justify-center bg-green-400 md:flex">
      {isMobile ? (
        <>
          <h1 className="text-5xl font-bold text-center mb-20">Kim jesteś?</h1>
          <div className="flex flex-col">
            <CustomButton text='SENIOR' onClick={() => { }} />
            <CustomButton text='Opiekun' onClick={() => { }} />
          </div>
        </>
      ) : (
        <>
          <div className='flex justify-around mt-40'>
            <div className='flex-col  h-screen '>
              <img src={grandpaImg} alt="Senior" className="rounded-3xl mb-12 h-2/4 shadow-xl" />
              <div className='justify-center flex'><CustomButton text='SENIOR' onClick={() => { }} /></div>

            </div>

            <h1 className="text-7xl font-bold text-center mt-80">Kim jesteś?</h1>
            <div className='flex-col  h-screen'>
              <img src={volunteerImg} alt="Senior" className="h-2/4 rounded-3xl mb-12 shadow-xl" />
              <div className='justify-center flex'><CustomButton text='Opiekun' onClick={() => { }} /></div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LandingPage;
